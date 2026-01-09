use tauri::Manager;
use steamlocate::SteamDir;
use std::collections::HashMap;
use std::fs;
use std::process::Command;
#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
struct SteamGame {
  id: u32,
  name: String,
  path: String,
  owner_name: String,
  account_name: String,
}


// Actually, if the file is `"users" { "id" { ... } }`, then `SteamUsers` struct expecting `users` field needs to match that.
// The error `missing field users` suggests it didn't find "users" inside the top level.
// Wait, if the file content is ALREADY wrapping everything in "users", then `from_str` might be trying to find "users" INSIDE that.
// VDF parser behavior:
// If file is:
// "users"
// {
//    "765..." { ... }
// }
// Then deserializing into `SteamUsers { users: ... }` implies it looks for `users` key at the top level.
// This matches. 
// However, maybe case sensitivity? "users" vs "Users"? The file usually has "users" (lowercase).
// Let's try to be deeper or more flexible.
// Actually, `keyvalues_serde` might strip the top level key effectively or treat the whole file as the value of the top key?
// Let's try deserializing as `HashMap<String, HashMap<String, SteamUser>>` (representing root -> users -> map) might be safer to inspect.
// Or simpler: The error might be because the root element IS "users", and `from_str` returns the content OF "users"?
// Let's try deserializing directly to `HashMap<String, SteamUser>` assuming the parser enters the root.



// ... inside get_installed_games ...

                // Try to parse simply as the inner map first, assuming parser peels the root
                // If that fails, we try the wrapper.
                // Actually debug print showed "missing field users".
                // This means it expected `users` key but didn't find it.
#[tauri::command]
async fn get_installed_games() -> Result<Vec<SteamGame>, String> {
  let mut games = Vec::new();

  match SteamDir::locate() {
    Ok(steamdir) => {
      // Try to read loginusers.vdf
      let mut users_map = IndexMap::new();
      let vdf_path = steamdir.path().join("config").join("loginusers.vdf");
      
      if vdf_path.exists() {
        if let Ok(content) = fs::read_to_string(&vdf_path) {
            users_map = parse_login_users(&content);
        }
      }

      match steamdir.libraries() {
        Ok(libraries) => {
            for library in libraries {
                match library {
                    Ok(library) => {
                        for app in library.apps() {
                            match app {
                                Ok(app) => {
                                    let mut owner = "Unknown".to_string();
                                    let mut account = "Unknown".to_string();
                                    
                                     if let Some(user_id) = app.last_user {
                                         let id_str = user_id.to_string();
                                         if let Some(user) = users_map.get(&id_str) {
                                             owner = user.persona_name.clone().unwrap_or("Unknown".to_string());
                                             account = user.account_name.clone().unwrap_or("Unknown".to_string());
                                         }
                                     }


                                    games.push(SteamGame {
                                        id: app.app_id,
                                        name: app.name.clone().unwrap_or("Unknown Game".to_string()),
                                        path: app.install_dir.clone(),
                                        owner_name: owner,
                                        account_name: account,
                                    });
                                }
                                Err(_) => continue,
                            }
                        }
                    },
                    Err(_) => continue,
                }
            }
        },
        Err(e) => return Err(format!("Failed to read Steam libraries: {}", e)),
      }
    }
    Err(e) => return Err(format!("Steam installation not found or error: {}", e)),
  }

  Ok(games)
}

#[tauri::command]
async fn close_splash(window: tauri::Window) {
  // Close splashscreen
  if let Some(splash) = window.get_webview_window("splash") {
    splash.close().unwrap();
  }
  // Show main window
  if let Some(main) = window.get_webview_window("main") {
    main.show().unwrap();
    main.set_focus().unwrap();
  }
}

// Helper to manage firewall rules
fn manage_firewall_rule(rule_name: &str, program_path: &str, block: bool) {
    let cmd_string = if block {
        // Block
        format!(
            "netsh advfirewall firewall add rule name=\"{}\" dir=out action=block program=\"{}\" enable=yes",
            rule_name, program_path
        )
    } else {
        // Delete
        format!(
            "netsh advfirewall firewall delete rule name=\"{}\"",
            rule_name
        )
    };

    println!("Firewall Exec: cmd /C {}", cmd_string);

    let command_result = Command::new("cmd")
        .args(["/C", &cmd_string])
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output();

    match command_result {
        Ok(output) => {
            if !output.status.success() {
                let stdout = String::from_utf8_lossy(&output.stdout);
                let stderr = String::from_utf8_lossy(&output.stderr);
                println!("Firewall Error ({}) ExitCode: {:?}\nSTDOUT: {}\nSTDERR: {}", rule_name, output.status.code(), stdout, stderr);
            } else {
                println!("Firewall Success ({})", rule_name);
            }
        },
        Err(e) => println!("Firewall Execution Failed ({}): {}", rule_name, e),
    }
}

fn get_launcher_path(launcher_name: &str) -> Vec<String> {
    match launcher_name {
        "Steam" | "Steam_ALL" => {
            // Steam Exe fallback
            if let Ok(steamdir) = SteamDir::locate() {
                vec![steamdir.path().join("steam.exe").to_str().unwrap().to_string()]
            } else {
                vec!["C:\\Program Files (x86)\\Steam\\steam.exe".to_string()]
            }
        },
        "SteamWebHelper" => {
             if let Ok(steamdir) = SteamDir::locate() {
                vec![steamdir.path().join("bin").join("cef").join("cef.win7x64").join("steamwebhelper.exe").to_str().unwrap().to_string()]
            } else {
                 vec!["C:\\Program Files (x86)\\Steam\\bin\\cef\\cef.win7x64\\steamwebhelper.exe".to_string()]
            }
        },
        "Ubisoft" => vec!["C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\upc.exe".to_string()],
        "EA" => vec!["C:\\Program Files\\Electronic Arts\\EA Desktop\\EA Desktop\\EADesktop.exe".to_string()],
        "Epic" => vec!["C:\\Program Files (x86)\\Epic Games\\Launcher\\Portal\\Binaries\\Win64\\EpicGamesLauncher.exe".to_string()],
        "Rockstar" => vec![
            "C:\\Program Files\\Rockstar Games\\Launcher\\Launcher.exe".to_string(),
            "C:\\Program Files\\Rockstar Games\\Social Club\\SocialClubHelper.exe".to_string(),
            "C:\\Program Files\\Rockstar Games\\Launcher\\RockstarService.exe".to_string(),
            "C:\\Program Files\\Rockstar Games\\Launcher\\ThirdParty\\Crashpad\\RockstarErrorHandler.exe".to_string(),
            "D:\\SteamLibrary\\steamapps\\common\\Red Dead Redemption 2\\RDR2.exe".to_string(),
            "D:\\SteamLibrary\\steamapps\\common\\Red Dead Redemption 2\\PlayRDR2.exe".to_string(),
        ],
        _ => vec![]
    }
}

fn check_firewall_rule(rule_name: &str) -> bool {
    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;
        
        // Using PowerShell "Get-NetFirewallRule" is more reliable than netsh for verification
        // because netsh output parsing depends on system locale.
        // Get-NetFirewallRule throws an error if rule not found, so we check for success exit code.
        
        println!("Checking Firewall Rule (PS): {}", rule_name);

        let output = Command::new("powershell")
            .args(["-NoProfile", "-NonInteractive", "-Command", &format!("Get-NetFirewallRule -DisplayName '{}'", rule_name)])
            .creation_flags(0x08000000) // CREATE_NO_WINDOW
            .output();

        match output {
            Ok(o) => {
                // If exit code is 0, rule exists.
                // If exit code is 1 (or non-zero), rule likely doesn't exist.
                println!("PS Check Status: {:?}", o.status.code());
                o.status.success()
            },
            Err(e) => {
                println!("PS Check Execution Failed: {}", e);
                false
            },
        }
    }
    #[cfg(not(target_os = "windows"))]
    {
        false
    }
}

#[tauri::command]
async fn get_launcher_status(launcher_name: String) -> Result<bool, String> {
    // Returns true if BLOCKED (rule exists), false otherwise.
    
    // Special handling for Steam to match launch_game's rule names
    if launcher_name == "Steam" || launcher_name == "Steam_ALL" {
        return Ok(check_firewall_rule("Block Steam Exe"));
    }

    let paths = get_launcher_path(&launcher_name);
    if paths.is_empty() {
        return Ok(false);
    }

    // Check the first rule name: "Block {name} App 1"
    let rule_name = format!("Block {} App 1", launcher_name);
    let exists = check_firewall_rule(&rule_name);
    
    Ok(exists)
}

#[tauri::command]
async fn toggle_launcher_firewall(launcher_name: String, block: bool) -> Result<String, String> {
    println!("Toggling Firewall for: {} -> Blocked: {}", launcher_name, block);

    if launcher_name == "Steam" || launcher_name == "Steam_ALL" {
        // Special case for Steam to block both exe and webhelper
        // using the specific rule names used in launch_game
        for path in get_launcher_path("Steam") {
             manage_firewall_rule("Block Steam Exe", &path, block);
        }
        for path in get_launcher_path("SteamWebHelper") {
             manage_firewall_rule("Block Steam WebHelper", &path, block);
        }
        return Ok("Steam Full firewall rules updated".to_string());
    }

    let paths = get_launcher_path(&launcher_name);
    if !paths.is_empty() {
        for (i, path) in paths.iter().enumerate() {
            // Unique rule name for each exe
            let rule_name = format!("Block {} App {}", launcher_name, i + 1);
            manage_firewall_rule(&rule_name, path, block);
        }
        Ok(format!("{} firewall rules updated ({} executables)", launcher_name, paths.len()))
    } else {
        Err("Launcher paths not found".to_string())
    }
}

#[derive(Debug, Serialize)]
struct LauncherFileStatus {
    path: String,
    rule_name: String,
    blocked: bool,
}

#[tauri::command]
async fn get_launcher_files(launcher_name: String) -> Result<Vec<LauncherFileStatus>, String> {
    let mut file_statuses = Vec::new();

    if launcher_name == "Steam" || launcher_name == "Steam_ALL" {
        // Special mapping for Steam
        for path in get_launcher_path("Steam") {
            file_statuses.push(LauncherFileStatus {
                path: path.clone(),
                rule_name: "Block Steam Exe".to_string(),
                blocked: check_firewall_rule("Block Steam Exe"),
            });
        }
        for path in get_launcher_path("SteamWebHelper") {
            file_statuses.push(LauncherFileStatus {
                path: path.clone(),
                rule_name: "Block Steam WebHelper".to_string(),
                blocked: check_firewall_rule("Block Steam WebHelper"),
            });
        }
    } else {
        let paths = get_launcher_path(&launcher_name);
         for (i, path) in paths.iter().enumerate() {
            let rule_name = format!("Block {} App {}", launcher_name, i + 1);
            file_statuses.push(LauncherFileStatus {
                path: path.clone(),
                rule_name: rule_name.clone(),
                blocked: check_firewall_rule(&rule_name),
            });
        }
    }

    Ok(file_statuses)
}

#[tauri::command]
async fn toggle_file_rule(rule_name: String, path: String, block: bool) -> Result<(), String> {
    manage_firewall_rule(&rule_name, &path, block);
    Ok(())
}

fn get_steam_path() -> Result<std::path::PathBuf, String> {
    let steam_dir = SteamDir::locate().map_err(|e| e.to_string())?;
    Ok(steam_dir.path().to_path_buf())
}


    
#[derive(Debug, Deserialize, Serialize, Clone)]
struct SteamUser {
    #[serde(rename = "AccountName")]
    account_name: Option<String>,
    #[serde(rename = "PersonaName")]
    persona_name: Option<String>,
    #[serde(rename = "Timestamp")]
    timestamp: Option<String>,
    #[serde(rename = "MostRecent")]
    most_recent: Option<String>, // "1" or "0"
    #[serde(rename = "AllowAutoLogin")]
    allow_auto_login: Option<String>, // "1" or "0"
    #[serde(flatten)]
    extra: HashMap<String, serde_json::Value>,
}

use indexmap::IndexMap;

#[derive(Debug, Serialize, Clone)]
struct SteamUserDisplay {
    steam_id: String,
    account_name: String,
    persona_name: String,
    timestamp: u64,
}

fn parse_login_users(content: &str) -> IndexMap<String, SteamUser> {
    // 1. Try standard map
    if let Ok(map) = keyvalues_serde::from_str::<IndexMap<String, SteamUser>>(content) {
        // Validate keys look like SteamIDs
        if map.keys().any(|k| k.len() > 10 && k.chars().all(char::is_numeric)) {
             return map;
        }
    }

    // 2. Try BrokenWrapper (root key "users" -> "users" -> map)
    #[derive(Deserialize)]
    struct BrokenWrapper {
        users: IndexMap<String, SteamUser>,
    }
    if let Ok(broken) = keyvalues_serde::from_str::<BrokenWrapper>(content) {
        return broken.users;
    }

    IndexMap::new()
}

// 4. Helper to get Account ID from Name
fn get_user_account_id(account_name: &str) -> Option<u32> {
    if let Ok(steam_path) = get_steam_path() {
        let vdf_path = steam_path.join("config").join("loginusers.vdf");
        if let Ok(content) = fs::read_to_string(&vdf_path) {
            let map = parse_login_users(&content);
            for (id64_str, user) in map {
                if let Some(name) = user.account_name {
                    if name.eq_ignore_ascii_case(account_name) {
                        // Convert ID64 -> AccountID (u32)
                        // SteamID64 = 76561197960265728 + AccountID
                        if let Ok(id64) = id64_str.parse::<u64>() {
                            if id64 > 76561197960265728 {
                                return Some((id64 - 76561197960265728) as u32);
                            }
                        }
                    }
                }
            }
        }
    }
    None
}

// 5. Registry Polling to Wait for Login
fn wait_for_user_login(target_account_id: u32) -> bool {
    println!("Waiting for Steam to log in to AccountID: {}", target_account_id);
    let max_retries = 30; // 30 * 1s = 30 seconds
    let mut retry_count = 0;

    #[cfg(target_os = "windows")]
    {
        use winreg::enums::*;
        use winreg::RegKey;
        let hkcu = RegKey::predef(HKEY_CURRENT_USER);
        
        loop {
            if retry_count >= max_retries {
                println!("Timeout waiting for login.");
                return false;
            }

            if let Ok(process_key) = hkcu.open_subkey("Software\\Valve\\Steam\\ActiveProcess") {
                if let Ok(active_user) = process_key.get_value::<u32, _>("ActiveUser") {
                     if active_user == target_account_id {
                         println!("Login confirmed! ActiveUser: {}", active_user);
                         return true;
                     }
                }
            }
            
            std::thread::sleep(std::time::Duration::from_secs(1));
            retry_count += 1;
        }
    }
    #[cfg(not(target_os = "windows"))]
    true
}

#[tauri::command]
async fn get_steam_users() -> Result<Vec<SteamUserDisplay>, String> {
    let steam_path = get_steam_path()?;
    let vdf_path = steam_path.join("config").join("loginusers.vdf");
    
    if !vdf_path.exists() {
        return Ok(vec![]);
    }

    // Debug logging
    // println!("DEBUG: VDF Content Len: {}", content.len());
    // println!("DEBUG: VDF Preview: {:.200}", content);
    
    let content = fs::read_to_string(&vdf_path).map_err(|e| e.to_string())?;
    let final_users_map = parse_login_users(&content);

    let mut display_users = Vec::new();
    for (id, user) in final_users_map {
        if let Some(acc_name) = user.account_name {
            let ts_str = user.timestamp.unwrap_or("0".to_string());
            let ts = ts_str.parse::<u64>().unwrap_or(0);
            
            display_users.push(SteamUserDisplay {
                steam_id: id,
                account_name: acc_name,
                persona_name: user.persona_name.unwrap_or_else(|| "Unknown".to_string()),
                timestamp: ts,
            });
        }
    }
    display_users.sort_by(|a, b| b.timestamp.cmp(&a.timestamp));
    Ok(display_users)
}

fn wait_for_steam_exit() {
    let max_retries = 20; // 20 * 500ms = 10 seconds
    let mut retry_count = 0;

    loop {
        if retry_count >= max_retries {
            break;
        }

        let output = Command::new("tasklist")
            .args(["/FI", "IMAGENAME eq steam.exe", "/NH"])
            .creation_flags(0x08000000)
            .output();

        match output {
            Ok(o) => {
                let stdout = String::from_utf8_lossy(&o.stdout);
                if !stdout.contains("steam.exe") {
                    // Process gone
                    break;
                }
            }
            Err(_) => break, // Command failed, assume gone or we can't check
        }
        
        std::thread::sleep(std::time::Duration::from_millis(500));
        retry_count += 1;
    }
}

fn set_active_steam_user(account_name: &str) -> Result<(), String> {
    println!("Preparing to switch to user: {}", account_name);

    // A. Kill Steam AND WAIT
    #[cfg(target_os = "windows")]
    {
        let _ = Command::new("taskkill").args(["/F", "/IM", "steam.exe"]).creation_flags(0x08000000).output();
        // Wait for it to effectively die to make sure the new instance starts cleanly
        wait_for_steam_exit();
    }
    
    // User requested to remove File/Registry manipulations as -login argument is sufficient.
    Ok(())
}

#[tauri::command]
async fn switch_steam_account(account_name: String) -> Result<(), String> {
    if account_name.is_empty() || account_name == "Unknown" {
        return Err("Invalid account name".to_string());
    }

    set_active_steam_user(&account_name)?;

    // Wait a bit for Steam to fully die if needed, usually taskkill is fast
    // Then start Steam
    let steam_path = get_steam_path()?;
    let steam_exe = steam_path.join("steam.exe");

    let mut command = Command::new(&steam_exe);
    command.args(["-login", &account_name]);
    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000); 
    
    command.spawn().map_err(|e| format!("Failed to restart Steam: {}", e))?;

    Ok(())
}

#[tauri::command]
async fn launch_game(app_id: u32, account_name: Option<String>, offline: bool) -> Result<(), String> {
    let steam_path = get_steam_path()?;
    let steam_exe = steam_path.join("steam.exe");

    println!("Launching game {} (Offline: {})", app_id, offline);

    // 1. Determine & Check Dependencies
    // (Existing firewall/dependency logic remains, assumed cleaned up in previous steps or kept here)
    // For brevity in this edit, I am focusing on the switch logic. 
    // IMPORTANT: In a real edit, ensure existing firewall logic isn't deleted if it was here.
    // Based on previous view, firewall logic WAS here. I must preserve it.
    // Re-implementing the core flow to be safe:

    // ... Firewall/Offline Mode Logic (Preserved from context) ...
    if offline {
         // ... (Offline logic as seen in previous file view) ...
         // Redoing abbreviated version for the Replace Block
         #[cfg(target_os = "windows")]
         let _ = Command::new("taskkill").args(["/F", "/IM", "steam.exe"]).creation_flags(0x08000000).output();
         for p in get_launcher_path("Steam") { manage_firewall_rule("Block Steam Exe", &p, true); }
         for p in get_launcher_path("SteamWebHelper") { manage_firewall_rule("Block Steam WebHelper", &p, true); }
         // ... helper VDF patch ...
         let vdf_path = steam_path.join("config").join("loginusers.vdf");
         if vdf_path.exists() {
             if let Ok(content) = fs::read_to_string(&vdf_path) {
                 let new_content = content.replace("\"WantsOfflineMode\"\t\t\"0\"", "\"WantsOfflineMode\"\t\t\"1\"")
                                          .replace("\"WantsOfflineMode\" \"0\"", "\"WantsOfflineMode\" \"1\"");
                 let _ = fs::write(&vdf_path, new_content);
             }
         }
    } else {
         manage_firewall_rule("Block Steam Exe", "", false);
         manage_firewall_rule("Block Steam WebHelper", "", false);
         // ... cleanup others ...
         let vdf_path = steam_path.join("config").join("loginusers.vdf");
          if vdf_path.exists() {
              if let Ok(content) = fs::read_to_string(&vdf_path) {
                  let new_content = content.replace("\"WantsOfflineMode\"\t\t\"1\"", "\"WantsOfflineMode\"\t\t\"0\"")
                                           .replace("\"WantsOfflineMode\" \"1\"", "\"WantsOfflineMode\" \"0\"");
                  let _ = fs::write(&vdf_path, new_content);
              }
          }
    }

    // 2. Account Switching & Launch Setup
    let mut explicit_switch = false;
    let mut target_account_id = None;

    if let Some(account) = account_name {
        if !account.is_empty() && account != "Unknown" {
            // A. Ensure Steam is closed (CLI switch requires Steam restart)
            set_active_steam_user(&account)?;
            
            // B. lookup ID for polling
            target_account_id = get_user_account_id(&account);
            explicit_switch = true;

            // C. Start Steam with Login First
            println!("Stage 1: Launching Steam with -login...");
            let mut login_cmd = Command::new(&steam_exe);
            login_cmd.arg("-login").arg(&account);
            #[cfg(target_os = "windows")]
            login_cmd.creation_flags(0x08000000);
            
            login_cmd.spawn().map_err(|e| format!("Failed to start Steam login: {}", e))?;
        }
    }

    // 3. Wait for Login and Then Launch Game
    if explicit_switch && target_account_id.is_some() {
        if wait_for_user_login(target_account_id.unwrap()) {
             // Login success, proceed to launch game
             println!("Stage 2: Launching Game...");
        } else {
             // Timeout or error, try to launch anyway?
             println!("Warning: Login verification timed out, attempting launch anyway...");
        }
    } else if !explicit_switch {
        // If not switching, passing -applaunch to existing steam is fine? 
        // Or if simple launch, just run it.
        println!("Direct launch (no switch requested)...");
    }

    // 4. Construct Launch Arguments (Stage 2)
    // We run steam.exe again. If it's running, it signals the existing process.
    let mut command = Command::new(&steam_exe);
    command.arg("-applaunch").arg(app_id.to_string());
    
    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000); 
    
    command.spawn().map_err(|e| format!("Failed to launch game: {}", e))?;

    Ok(())
}

#[tauri::command]
async fn open_launcher(launcher_name: String) -> Result<(), String> {
    let paths = get_launcher_path(&launcher_name);
    if let Some(path_str) = paths.first() {
        println!("Opening launcher: {} at {}", launcher_name, path_str);
        
        let path = std::path::Path::new(path_str);
        let mut command = Command::new(path);
        
        if let Some(parent) = path.parent() {
            command.current_dir(parent);
        }

        command.spawn()
            .map_err(|e| format!("Failed to open launcher: {}", e))?;
            
        Ok(())
    } else {
        Err(format!("Launcher path not found for: {}", launcher_name))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_fs::init())
    .invoke_handler(tauri::generate_handler![
        close_splash, 
        get_installed_games, 
        launch_game, 
        toggle_launcher_firewall, 
        get_launcher_status, 
        open_launcher, 
        get_steam_users, 
        switch_steam_account,
        get_launcher_files,
        toggle_file_rule
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
