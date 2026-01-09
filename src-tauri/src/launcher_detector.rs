use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use steamlocate::SteamDir;

#[cfg(target_os = "windows")]
use winreg::enums::*;
#[cfg(target_os = "windows")]
use winreg::RegKey;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DetectedLauncher {
    pub id: String,
    pub name: String,
    pub path: Option<String>,
    pub status: DetectionStatus,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum DetectionStatus {
    Found,       // Otomatik bulundu
    NotFound,    // Bulunamadı, kullanıcı müdahalesi gerekli
    UserSkipped, // Kullanıcı "kurulu değil" dedi
}

/// Ana tespit fonksiyonu - tüm launcher'ları tarar
pub fn auto_detect_all_launchers() -> Vec<DetectedLauncher> {
    vec![
        detect_steam(),
        detect_epic(),
        detect_ubisoft(),
        detect_ea(),
        detect_rockstar(),
    ]
}

/// Steam Detection - mevcut steamlocate crate kullanılıyor
fn detect_steam() -> DetectedLauncher {
    // 1. steamlocate ile dene
    if let Ok(steamdir) = SteamDir::locate() {
        let steam_exe = steamdir.path().join("steam.exe");
        if steam_exe.exists() {
            return DetectedLauncher {
                id: "Steam_ALL".to_string(),
                name: "Steam".to_string(),
                path: Some(steam_exe.to_string_lossy().to_string()),
                status: DetectionStatus::Found,
            };
        }
    }

    // 2. Fallback: yaygın yolları tara
    let common_paths = [
        r"C:\Program Files (x86)\Steam\steam.exe",
        r"D:\Steam\steam.exe",
        r"E:\Steam\steam.exe",
        r"C:\Program Files\Steam\steam.exe",
    ];

    for path_str in common_paths {
        if Path::new(path_str).exists() {
            return DetectedLauncher {
                id: "Steam_ALL".to_string(),
                name: "Steam".to_string(),
                path: Some(path_str.to_string()),
                status: DetectionStatus::Found,
            };
        }
    }

    DetectedLauncher {
        id: "Steam_ALL".to_string(),
        name: "Steam".to_string(),
        path: None,
        status: DetectionStatus::NotFound,
    }
}

/// Epic Games Detection
fn detect_epic() -> DetectedLauncher {
    // 1. Registry'den dene
    #[cfg(target_os = "windows")]
    if let Some(path) = get_epic_from_registry() {
        return DetectedLauncher {
            id: "Epic".to_string(),
            name: "Epic Games".to_string(),
            path: Some(path),
            status: DetectionStatus::Found,
        };
    }

    // 2. Yaygın yolları tara
    let common_paths = [
        r"C:\Program Files (x86)\Epic Games\Launcher\Portal\Binaries\Win64\EpicGamesLauncher.exe",
        r"D:\Epic Games\Launcher\Portal\Binaries\Win64\EpicGamesLauncher.exe",
        r"C:\Program Files\Epic Games\Launcher\Portal\Binaries\Win64\EpicGamesLauncher.exe",
        r"E:\Epic Games\Launcher\Portal\Binaries\Win64\EpicGamesLauncher.exe",
    ];

    for path_str in common_paths {
        if Path::new(path_str).exists() {
            return DetectedLauncher {
                id: "Epic".to_string(),
                name: "Epic Games".to_string(),
                path: Some(path_str.to_string()),
                status: DetectionStatus::Found,
            };
        }
    }

    DetectedLauncher {
        id: "Epic".to_string(),
        name: "Epic Games".to_string(),
        path: None,
        status: DetectionStatus::NotFound,
    }
}

#[cfg(target_os = "windows")]
fn get_epic_from_registry() -> Option<String> {
    let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);

    // Try WOW6432Node (64-bit registry for 32-bit apps)
    if let Ok(key) = hklm.open_subkey(r"SOFTWARE\WOW6432Node\Epic Games\EpicGamesLauncher") {
        if let Ok(install_location) = key.get_value::<String, _>("AppDataPath") {
            // AppDataPath genellikle launcher'ın parent folder'ını verir
            let exe_path = format!(
                r"{}\Launcher\Portal\Binaries\Win64\EpicGamesLauncher.exe",
                install_location
            );
            if Path::new(&exe_path).exists() {
                return Some(exe_path);
            }
        }
    }

    None
}

/// Ubisoft Connect Detection
fn detect_ubisoft() -> DetectedLauncher {
    let common_paths = [
        r"C:\Program Files (x86)\Ubisoft\Ubisoft Game Launcher\upc.exe",
        r"D:\Ubisoft\Ubisoft Game Launcher\upc.exe",
        r"C:\Program Files\Ubisoft\Ubisoft Game Launcher\upc.exe",
        r"E:\Ubisoft\Ubisoft Game Launcher\upc.exe",
    ];

    for path_str in common_paths {
        if Path::new(path_str).exists() {
            return DetectedLauncher {
                id: "Ubisoft".to_string(),
                name: "Ubisoft Connect".to_string(),
                path: Some(path_str.to_string()),
                status: DetectionStatus::Found,
            };
        }
    }

    DetectedLauncher {
        id: "Ubisoft".to_string(),
        name: "Ubisoft Connect".to_string(),
        path: None,
        status: DetectionStatus::NotFound,
    }
}

/// EA App Detection
fn detect_ea() -> DetectedLauncher {
    let common_paths = [
        r"C:\Program Files\Electronic Arts\EA Desktop\EA Desktop\EADesktop.exe",
        r"D:\Electronic Arts\EA Desktop\EA Desktop\EADesktop.exe",
        r"C:\Program Files (x86)\Electronic Arts\EA Desktop\EA Desktop\EADesktop.exe",
        r"E:\EA Desktop\EA Desktop\EADesktop.exe",
    ];

    for path_str in common_paths {
        if Path::new(path_str).exists() {
            return DetectedLauncher {
                id: "EA".to_string(),
                name: "EA App".to_string(),
                path: Some(path_str.to_string()),
                status: DetectionStatus::Found,
            };
        }
    }

    DetectedLauncher {
        id: "EA".to_string(),
        name: "EA App".to_string(),
        path: None,
        status: DetectionStatus::NotFound,
    }
}

/// Rockstar Games Launcher Detection
fn detect_rockstar() -> DetectedLauncher {
    let common_paths = [
        r"C:\Program Files\Rockstar Games\Launcher\Launcher.exe",
        r"D:\Rockstar Games\Launcher\Launcher.exe",
        r"C:\Program Files (x86)\Rockstar Games\Launcher\Launcher.exe",
        r"E:\Rockstar Games\Launcher\Launcher.exe",
    ];

    for path_str in common_paths {
        if Path::new(path_str).exists() {
            return DetectedLauncher {
                id: "Rockstar".to_string(),
                name: "Rockstar Games".to_string(),
                path: Some(path_str.to_string()),
                status: DetectionStatus::Found,
            };
        }
    }

    DetectedLauncher {
        id: "Rockstar".to_string(),
        name: "Rockstar Games".to_string(),
        path: None,
        status: DetectionStatus::NotFound,
    }
}
