# Changelog

All notable changes to **Games Launchers Firewall Control** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned Features
- Support for additional launchers (GOG Galaxy, Battle.net)
- Cloud profile backup and sync
- Scheduled firewall rule automation
- Multi-language support (Turkish, German, Spanish)

---

## [0.1.0] - 2026-01-09

### 🎉 Initial Release

#### Added
- **Multi-Account Management**
  - Instant Steam account switching via loginusers.vdf manipulation
  - Profile binding (auto-switch accounts for specific games)
  - Secure local credential handling (no cloud storage)

- **Firewall Management**
  - Basic mode: One-click launcher blocking (Steam, Epic, Rockstar, Ubisoft, EA)
  - Advanced mode: Granular executable-level control
  - Persistent firewall rules across system restarts
  - Real-time rule status monitoring

- **Launcher Integration**
  - Steam launcher support with automatic installation detection
  - Epic Games Store integration
  - Rockstar Games Launcher support
  - Ubisoft Connect (Uplay) support
  - EA App (Origin) support

- **User Interface**
  - Modern dark-themed interface with TailwindCSS v4
  - Responsive layout optimized for 1920x1080 and 1366x768 displays
  - Real-time status updates for launchers

- **Productivity Tools**
  - Built-in notes manager for tracking accounts and tasks
  - Activity logging for firewall operations

#### Technical Details
- Built with Tauri v2 (Rust + React 19)
- Windows 10/11 native support
- Automatic launcher path detection using registry and common paths
- Low memory footprint (~50MB idle)

#### Known Issues
- Steam must be restarted manually after account switch (will auto-restart in v0.2.0)
- Advanced mode executable names may appear technical (user-friendly names coming in v0.2.0)
- No support for macOS/Linux in this release (Windows-only due to firewall API limitations)

---

## Release Notes Template (For Future Releases)

### [Version] - YYYY-MM-DD

#### Added
- New features

#### Changed
- Changes to existing functionality

#### Deprecated
- Features that will be removed in upcoming releases

#### Removed
- Features that were removed

#### Fixed
- Bug fixes

#### Security
- Security patches and improvements

---

## Version History Legend

- **Major version (X.0.0)**: Breaking changes or significant rewrites
- **Minor version (0.X.0)**: New features, backward compatible
- **Patch version (0.0.X)**: Bug fixes and minor improvements

---

[Unreleased]: https://github.com/yourusername/games-launchers-firewall-control/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourusername/games-launchers-firewall-control/releases/tag/v0.1.0
