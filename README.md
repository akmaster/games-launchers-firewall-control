# 🎮 Games Launchers Firewall Control

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows-0078D6.svg)
![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%20v2-FFC131.svg)
![Rust](https://img.shields.io/badge/Rust-1.75+-orange.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg)

**Professional-grade launcher management and network control solution for gaming environments.**

[Features](#-key-features) • [Installation](#-installation) • [Usage](#-usage-guide) • [Documentation](#-documentation) • [Support](#-support)

</div>

---

## 📋 Overview

**Games Launchers Firewall Control** is a powerful desktop application designed for IT administrators, gaming cafes, and power users who need precise control over game launchers and their network connectivity. Built with modern technologies (Tauri v2, Rust, React 19), it provides enterprise-level features with consumer-friendly interface.

### 🎯 Use Cases

- **Gaming Cafes**: Manage multiple accounts across different launchers efficiently
- **IT Administrators**: Control network traffic and enforce policies on gaming workstations
- **Power Users**: Optimize bandwidth, enforce offline modes, and manage multiple game libraries
- **Network Testing**: Professional-grade tools for testing game behavior under various network conditions

---

## ✨ Key Features

### 🔄 Multi-Account Management System
Professional account switching solution with security-first approach.

- **Instant Account Switching**: One-click transitions between profiles for Steam, Epic, and other platforms
- **Secure Credential Handling**: Leverages platform-native configuration files (e.g., Steam's `config.vdf`, `loginusers.vdf`)
- **Profile Binding**: Automatically switch to designated accounts when launching specific games
- **Zero Cloud Storage**: All authentication tokens remain local for maximum security

### 🛡️ Advanced Firewall Management
Granular network control with professional-grade capabilities.

- **Per-Launcher Control**: Block or allow internet access for specific launchers (Steam, Epic Games, EA, Rockstar, Ubisoft)
- **Advanced Mode**: Executable-level control - block launcher telemetry while keeping games online, or vice versa
- **Rule Persistence**: Firewall rules survive system restarts
- **Network Isolation**: Force launchers into offline mode for single-player gaming without interruptions
- **Bandwidth Management**: Test and control network behavior for diagnostic purposes

### 🎮 Multi-Launcher Support
Native integration with major gaming platforms.

- Steam
- Epic Games Store
- Rockstar Games Launcher
- Ubisoft Connect (formerly Uplay)
- EA App (formerly Origin)

### 📊 Productivity Tools
Built-in utilities for enhanced workflow.

- **Notes & Task Manager**: Keep track of maintenance schedules, account credentials (encrypted), and to-do lists
- **Unified Dashboard**: Single interface for all launcher operations
- **Activity Logging**: Track launcher operations and firewall changes

---

## 🛠️ Technology Stack

Built with cutting-edge technologies for performance, security, and reliability.

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Backend** | Rust (Tauri v2) | Native performance, memory safety, minimal footprint |
| **Frontend** | React 19 | Modern, reactive user interface |
| **Styling** | TailwindCSS v4 | Clean, professional dark-themed UI |
| **Build System** | Vite | Optimized builds and rapid development |
| **Platform** | Windows 10/11 | Native Windows API integration |

---

## 📦 Installation

### For End Users

#### Download Pre-built Installer
1. Visit the [Releases](https://github.com/yourusername/games-launchers-firewall-control/releases) page
2. Download the latest `.msi` or `.exe` installer
3. Run the installer with **Administrator privileges** (required for firewall operations)
4. Follow the installation wizard

#### System Requirements
- **OS**: Windows 10 (build 1903+) or Windows 11
- **RAM**: 256 MB minimum
- **Disk Space**: 150 MB
- **Permissions**: Administrator rights (for firewall rule management)

---

### For Developers

#### Prerequisites
Ensure the following tools are installed:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **Rust** (latest stable) ([Install via rustup](https://rustup.rs/))
- **Visual Studio C++ Build Tools** ([Download](https://visualstudio.microsoft.com/downloads/))

#### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/games-launchers-firewall-control.git
   cd games-launchers-firewall-control
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run tauri dev
   ```
   The application will launch with hot-reload enabled.

#### Building for Production

Create optimized installers:
```bash
npm run tauri build
```

Output locations:
- **MSI Installer**: `src-tauri/target/release/bundle/msi/`
- **NSIS Installer**: `src-tauri/target/release/bundle/nsis/`
- **Portable Executable**: `src-tauri/target/release/`

---

## 🚀 Usage Guide

### First Launch

1. **Administrator Rights**: The application will request Administrator privileges on first launch (required for firewall operations)
2. **Launcher Detection**: The app automatically scans for installed launchers (Steam, Epic, etc.)
3. **Account Import**: Steam accounts are automatically detected from `loginusers.vdf`

### Basic Operations

#### Switching Steam Accounts
1. Navigate to **Accounts** tab
2. Select desired account from the dropdown
3. Click **Switch Account**
4. Steam will restart with the new account

#### Managing Firewall Rules

**Basic Mode**: One-click launcher blocking
1. Navigate to **Firewall** tab
2. Toggle switches next to launcher names (Steam, Epic, etc.)
3. Rules are applied instantly

**Advanced Mode**: Executable-level control
1. Click **Advanced Mode** button
2. Expand launcher to see all associated executables
3. Toggle individual executables (e.g., block `Steam.exe` telemetry but allow `steamwebhelper.exe`)

---

## ⚠️ Safety & Compliance

### Security Guarantees
✅ **No Memory Manipulation**: This software does NOT inject into game processes  
✅ **No Anti-Cheat Interference**: Does not interact with VAC, EAC, BattlEye, or similar systems  
✅ **Local-Only Data**: No credentials or tokens are transmitted externally  
✅ **Open Source**: Full codebase available for security audit  

### Terms of Service Compliance
⚠️ **User Responsibility**: While this tool uses standard Windows APIs and configuration files, users must:
- Review platform Terms of Service (Steam SSA, Epic EULA, etc.)
- Understand that rapid account switching or firewall manipulation may trigger security flags
- Use features responsibly and in compliance with local laws

> **We assume no liability for account suspensions or violations arising from misuse.**

### Firewall Modification Disclaimer
This application modifies Windows Firewall rules. Users should:
- Maintain backups of original firewall configurations
- Understand that blocking critical services may affect launcher functionality
- Disable the application's rules before troubleshooting launcher issues

---

## 📚 Documentation

- **[User Guide](./docs/USER_GUIDE.md)**: Step-by-step tutorials for all features
- **[API Reference](./docs/API.md)**: Tauri commands and Rust backend documentation
- **[Contributing Guide](./CONTRIBUTING.md)**: How to contribute to the project
- **[Security Policy](./SECURITY.md)**: Reporting vulnerabilities

---

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Make your changes and commit (`git commit -m 'Add YourFeature'`)
4. Push to your fork (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

```
MIT License - Copyright (c) 2026
Permission is granted to use, modify, and distribute this software
for both commercial and non-commercial purposes.
```

---

## 💼 Support

### For Clients & Enterprise Users
If you've received this software as part of a professional service:
- **Technical Support**: Contact your service provider
- **Custom Features**: Enterprise feature requests are welcome
- **Training**: Documentation and training materials available

### For Community Users
- **Issues**: [GitHub Issues](https://github.com/yourusername/games-launchers-firewall-control/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/games-launchers-firewall-control/discussions)

---

<div align="center">

**Built with ❤️ for the gaming community**

⭐ Star this repo if you find it useful!

</div>
