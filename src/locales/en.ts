export const en = {
    app: {
        title: "GAMER HUB // LAUNCHER",
        logo: "NEXUS",
        sidebar: {
            library: "Library",
            launchers: "Launchers",
            notes: "Notes",
            settings: "Settings"
        }
    },
    library: {
        title: "LIBRARY",
        games_count: "GAMES",
        scanning: "SCANNING...",
        error: "ERROR OCCURRED",
        error_sub: "Is Steam installed? Are privacy settings open?",
        no_games: "NO GAMES FOUND",
        other_accounts: "Other Accounts",
        modal: {
            online_mode: "ONLINE MODE",
            offline_mode: "OFFLINE MODE",
            start_game: "START GAME",
            appid: "APPID",
            success: "SUCCESS"
        }
    },
    accounts: {
        title: "STEAM ACCOUNTS",
        subtitle: "Manage your saved steam accounts",
        no_accounts: "No saved accounts found.",
        no_accounts_sub: "Log in to Steam once with \"Remember Me\" enabled.",
        switch: "Switch Account",
        switching: "Switching...",
        switched_msg: "Switched to {0} and restarting Steam..."
    },
    launchers: {
        title: "LAUNCHER MANAGEMENT",
        subtitle: "Manage internet access for launchers here.",
        refresh_tooltip: "Refresh Status",
        status: {
            blocked: "BLOCKED",
            online: "ONLINE"
        },
        actions: {
            unblock: "UNBLOCK",
            block: "BLOCK",
            start: "Start"
        },
        loading: {
            title: "PLEASE WAIT",
            subtitle: "Checking Launcher Statuses..."
        },
        desc: {
            steam: "Blocks: Steam Client, WebHelper",
            ubisoft: "Blocks: upc.exe",
            ea: "Blocks: EADesktop.exe",
            epic: "Blocks: EpicGamesLauncher.exe",
            rockstar: "Blocks: Launcher, SocialClub, RDR2"
        },
        names: {
            steam: "Steam (Full)",
            ubisoft: "Ubisoft Connect",
            ea: "EA Desktop",
            epic: "Epic Games",
            rockstar: "Rockstar Games"
        }
    },
    settings: {
        title: "SETTINGS",
        language: {
            title: "Language",
            desc: "Change the application language.",
            selected: "Selected: "
        },
        general: {
            title: "General",
            reset: "Reset Application",
            reset_desc: "This will clear all saved data (language preference, cached statuses) and restart the app.",
            reset_btn: "RESET APP",
            reset_confirm: "Are you sure? This will reload the application."
        },
        launcher_settings: {
            title: "Launcher Settings",
            desc: "Use the wizard to re-detect launcher paths or add them manually",
            reset_wizard: "Restart Wizard",
            resetting: "Resetting...",
            tip: "Tip:",
            tip_desc: "The wizard automatically scans all launchers. You can manually enter paths for launchers that are not found.",
            reset_success: "Wizard has been reset! Please restart the application.",
            reset_error: "Error: "
        }
    },
    notes: {
        title: "LOCAL NOTES",
        desc: "Your private, encrypted notes.",
        privacy_warning: "PRIVACY NOTICE: All notes are stored 100% LOCALLY on this device. No data is ever sent to any server or cloud.",
        new_note: "New Note",
        edit_note: "Edit Note",
        delete_note: "Delete",
        delete_confirm: "Delete this note?",
        title_placeholder: "Note Title...",
        content_placeholder: "Write something...",
        save: "SAVE NOTE",
        cancel: "CANCEL",
        no_notes: "No notes yet. Create one!",
        created: "Created: ",
        export: "Export Notes (Backup)",
        import: "Import Notes",
        data_loss_warning: "IMPORTANT: Since data is stored ONLY on this computer, remember to EXPORT your notes before formatting your PC or uninstalling this app, otherwise they will be lost forever!"
    },
    wizard: {
        title: "Initial Setup",
        subtitle: "Your launchers have been automatically detected",
        scanning: "Scanning launchers...",
        scanning_desc: "Searching for Steam, Epic Games, Ubisoft, EA and Rockstar launchers",
        all_found: "All launchers found!",
        all_found_desc: "You will be redirected to the main screen in 3 seconds",
        select_exe: "Select {0} launcher executable",
        status: {
            found: "Found",
            not_found: "Not Found",
            skipped: "Not Installed"
        },
        actions: {
            show_location: "Show Location",
            not_installed: "Not Installed",
            complete: "Complete Setup",
            skip: "Skip for Now (You can reopen from Settings)",
            some_missing: "Some Launchers Missing"
        },
        warning: {
            title: "Warning",
            message: "Some launchers were not found or skipped!",
            settings_info: "You can restart the wizard from <strong>Settings → Launcher Settings</strong> to manually add missing launchers.",
            continue: "Got it, Continue",
            go_back: "Go Back"
        },
        info: {
            tip: "Tip:",
            settings_hint: "If you want to add any launcher later, you can restart the wizard from <strong>Settings → Launcher Settings</strong>."
        }
    }
};
