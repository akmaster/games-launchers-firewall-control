# Security Policy

## 🔒 Reporting a Vulnerability

The security of **Games Launchers Firewall Control** is a top priority. We appreciate the security community's efforts to responsibly disclose vulnerabilities.

### How to Report
**DO NOT** open public issues for security vulnerabilities.

Instead, please report security issues via:

1. **Email**: Send details to **[INSERT_SECURITY_EMAIL]** with subject "SECURITY: [Brief Description]"
2. **GitHub Security Advisories**: Use the [private vulnerability reporting feature](https://github.com/yourusername/games-launchers-firewall-control/security/advisories/new)

### What to Include
Please provide:
- **Description**: Detailed explanation of the vulnerability
- **Impact**: What an attacker could achieve
- **Steps to Reproduce**: Exact steps to demonstrate the issue
- **Affected Versions**: Which versions are vulnerable
- **Suggested Fix**: If you have ideas on how to resolve it
- **Proof of Concept**: Code or screenshots (if applicable)

### Response Timeline
- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Fix Development**: Depends on severity (critical: 1-7 days, high: 7-30 days)
- **Public Disclosure**: After patch is released, coordinated with reporter

---

## 🛡️ Security Best Practices for Users

### Installation Security
✅ **Download from Official Sources Only**
- GitHub Releases page (verified signatures)
- Official website (if applicable)

❌ **Avoid Third-Party Sites**
- Never download from unofficial mirror sites
- Beware of modified versions claiming "extra features"

### Runtime Security
✅ **Run as Administrator Only When Necessary**
- The app requires admin rights for firewall operations
- Windows UAC prompts are expected and legitimate

✅ **Keep Software Updated**
- Security patches are released promptly
- Enable automatic update notifications

❌ **Never Share Credentials**
- This app does NOT ask for your Steam/Epic passwords
- If a version asks for passwords, it's compromised

### Firewall Rules
⚠️ **Review Rules Periodically**
- Check `Windows Defender Firewall with Advanced Security` for rules created by the app
- Remove rules if you uninstall the application

---

## 🔍 Security Architecture

### What We DO
✅ **Local-Only Data Storage**
- All account data, tokens, and configurations stored locally
- No data transmitted to external servers

✅ **Read-Only Credential Access**
- Only reads existing Steam `loginusers.vdf` and `config.vdf`
- Never modifies passwords or 2FA secrets

✅ **Standard Windows APIs**
- Uses `netsh` and Windows Firewall COM API
- No kernel-level drivers or rootkit-like behavior

✅ **Open Source Transparency**
- Full source code available for audit
- Community security reviews welcome

### What We DO NOT DO
❌ **No Memory Injection**
- No process manipulation or DLL injection
- No interaction with game executables

❌ **No Network Communication**
- No telemetry, analytics, or crash reporting sent to servers
- No license validation or activation servers

❌ **No Anti-Cheat Interference**
- Does not interact with VAC, EasyAntiCheat, BattlEye, or similar systems

---

## 🔧 Security Considerations for Developers

### Code Review Requirements
- All Rust dependencies must be from crates.io with active maintenance
- No `unsafe` code blocks without explicit justification and review
- All Tauri commands must validate input parameters

### Secrets Management
- **NO hardcoded credentials** in source code
- Use environment variables for testing (never commit `.env` files)
- Steam API keys (if used) must be user-provided

### Build Pipeline Security
- GitHub Actions builds are reproducible
- Dependencies are pinned with exact versions in `Cargo.lock` and `package-lock.json`
- Build artifacts are scanned for malware before release

---

## 📜 Supported Versions

| Version | Supported          | End of Life |
| ------- | ------------------ | ----------- |
| 0.1.x   | ✅ Active support  | TBD         |
| < 0.1.0 | ❌ Not supported   | -           |

**Note**: Only the latest minor version receives security updates. Users should upgrade to the newest release.

---

## 🚨 Known Security Limitations

### Windows Firewall Privileges
- **Admin rights required**: The application MUST run with elevated privileges to modify firewall rules
- **Potential for Misuse**: Like any firewall management tool, improper use can block critical system services

### Third-Party Launchers
- **Launcher Updates**: Game launcher updates may change executable names/paths, breaking firewall rules
- **No Control Over Launchers**: We cannot guarantee launcher-side security (e.g., Steam's encryption)

### Account Switching
- **Local Machine Access**: Anyone with physical access to your PC and this app can switch accounts
- **No Multi-Factor Override**: This tool does not bypass 2FA; Steam Guard must still be satisfied

---

## 🏆 Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

<!-- Future entries will be added here upon disclosure -->
_No reported vulnerabilities yet (as of v0.1.0)_

---

## 📞 Contact

For non-security-related issues, please use [GitHub Issues](https://github.com/yourusername/games-launchers-firewall-control/issues).

For security concerns: **[INSERT_SECURITY_EMAIL]** or [GitHub Security Advisories](https://github.com/yourusername/games-launchers-firewall-control/security/advisories).

---

**Thank you for helping keep Games Launchers Firewall Control secure!** 🔐
