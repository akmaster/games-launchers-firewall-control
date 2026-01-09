# Contributing to Games Launchers Firewall Control

Thank you for your interest in contributing to **Games Launchers Firewall Control**! We welcome contributions from the community to make this tool even better.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please read it before contributing.

---

## How Can I Contribute?

### 🐛 Reporting Bugs
Found a bug? Please [open an issue](https://github.com/yourusername/games-launchers-firewall-control/issues/new?template=bug_report.md) with:
- Clear title describing the issue
- Steps to reproduce
- Expected vs. actual behavior
- System information (OS version, Rust version, etc.)
- Screenshots if applicable

### ✨ Suggesting Features
Have an idea? [Open a feature request](https://github.com/yourusername/games-launchers-firewall-control/issues/new?template=feature_request.md) describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

### 🔧 Code Contributions
1. Check existing [issues](https://github.com/yourusername/games-launchers-firewall-control/issues) for work to do
2. Comment on an issue to claim it
3. Fork the repository and create a branch
4. Write your code following our standards
5. Submit a pull request

---

## Development Setup

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **Rust** 1.75+ ([Install via rustup](https://rustup.rs/))
- **Visual Studio C++ Build Tools** ([Download](https://visualstudio.microsoft.com/downloads/))
- **Git** ([Download](https://git-scm.com/))

### Initial Setup
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/games-launchers-firewall-control.git
cd games-launchers-firewall-control

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/games-launchers-firewall-control.git

# Install dependencies
npm install

# Run in development mode
npm run tauri dev
```

### Keeping Your Fork Updated
```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## Coding Standards

### Rust (Backend)
- **Formatting**: Use `cargo fmt` before committing
- **Linting**: Run `cargo clippy` and address all warnings
- **Documentation**: Document public functions with `///` comments
- **Error Handling**: Use `Result<T, E>` types, avoid unwrapping in production code
- **Naming**: Follow Rust naming conventions (snake_case for functions/variables, PascalCase for types)

Example:
```rust
/// Launches the specified game launcher with firewall rules applied.
///
/// # Arguments
/// * `launcher_id` - The unique identifier for the launcher
/// * `apply_rules` - Whether to apply firewall rules before launching
///
/// # Returns
/// * `Ok(())` if successful, `Err(LauncherError)` otherwise
pub fn launch_with_firewall(
    launcher_id: &str,
    apply_rules: bool,
) -> Result<(), LauncherError> {
    // Implementation
}
```

### TypeScript/React (Frontend)
- **Formatting**: Use Prettier (integrated with Vite)
- **Linting**: ESLint rules will be checked on save
- **Components**: Use functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Styling**: Use TailwindCSS utility classes

Example:
```typescript
interface LauncherCardProps {
  launcherId: string;
  isBlocked: boolean;
  onToggle: (id: string) => void;
}

export const LauncherCard: React.FC<LauncherCardProps> = ({
  launcherId,
  isBlocked,
  onToggle,
}) => {
  return (
    <div className="rounded-lg bg-gray-800 p-4">
      {/* Component content */}
    </div>
  );
};
```

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or tooling changes
- `ci`: CI/CD pipeline changes

### Examples
```bash
feat(firewall): add support for EA App launcher

- Implemented executable detection for EA App
- Added firewall rule templates
- Updated UI to display EA App status

Closes #42
```

```bash
fix(steam): resolve account switching on Windows 11

Fixed issue where loginusers.vdf was not properly updated
on Windows 11 systems with UAC enabled.

Fixes #67
```

---

## Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation if needed

3. **Test Thoroughly**
   ```bash
   # Rust tests
   cd src-tauri
   cargo test
   
   # Build the app
   cd ..
   npm run tauri build
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat(scope): your descriptive commit message"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feat/your-feature-name
   ```

6. **Open a Pull Request**
   - Go to the [repository](https://github.com/yourusername/games-launchers-firewall-control)
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template completely
   - Link any related issues

### PR Checklist
Before submitting, ensure:
- [ ] Code follows project style guidelines
- [ ] `cargo fmt` and `cargo clippy` pass without warnings
- [ ] All existing tests pass
- [ ] New tests added for new features
- [ ] Documentation updated (README, code comments, etc.)
- [ ] Commit messages follow Conventional Commits
- [ ] PR description clearly explains changes
- [ ] No merge conflicts with `main` branch

---

## Testing

### Running Tests
```bash
# Rust unit tests
cd src-tauri
cargo test

# Rust tests with output
cargo test -- --nocapture

# Specific test
cargo test test_firewall_rules
```

### Manual Testing Checklist
- [ ] Application launches without errors
- [ ] All launcher icons display correctly
- [ ] Account switching works for Steam
- [ ] Basic firewall toggle functions properly
- [ ] Advanced mode shows all executables
- [ ] Settings save and persist
- [ ] No console errors in dev tools

---

## Project Structure

```
games-launchers-firewall-control/
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── App.tsx            # Main app component
├── src-tauri/             # Rust backend
│   ├── src/
│   │   ├── commands/      # Tauri commands
│   │   ├── firewall/      # Firewall management
│   │   ├── launchers/     # Launcher integration
│   │   └── main.rs        # Entry point
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
├── public/                # Static assets
├── .github/               # GitHub templates & workflows
└── docs/                  # Additional documentation
```

---

## Getting Help

- **Questions**: [GitHub Discussions](https://github.com/yourusername/games-launchers-firewall-control/discussions)
- **Bugs**: [GitHub Issues](https://github.com/yourusername/games-launchers-firewall-control/issues)
- **Security Issues**: See [SECURITY.md](./SECURITY.md)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🎉**
