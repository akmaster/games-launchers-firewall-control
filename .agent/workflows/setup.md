---
description: Proje başlangıç kurulumu ve ilk çalıştırma
---

# Kurulum ve Başlangıç Workflow

Bu workflow, projeyi klonladıktan veya yeni bir geliştirme ortamı kurduğunuzda izlemeniz gereken adımları içerir.

## İlk Kurulum

### 1. Repository'yi klonla
```bash
git clone https://github.com/akmaster/games-launchers-firewall-control.git
cd games-launchers-firewall-control
```

### 2. Bağımlılıkları yükle
// turbo
```bash
npm install
```

Bu komut:
- `package.json`'daki tüm dependencies'i indirir
- `node_modules` klasörünü oluşturur
- Electron ve diğer tool'ları kurar

### 3. Geliştirme ortamını kontrol et
// turbo
```bash
npm run dev
```

Uygulama açılırsa kurulum başarılı!

### 4. Git konfigürasyonunu ayarla
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Günlük Geliştirme

### Projeyi başlat
// turbo-all
```bash
# Development mode
npm run dev

# Veya hot-reload ile
npm run dev:watch
```

### Kod değişikliklerini test et
Her değişiklikten sonra:
1. Uygulamayı yeniden başlat
2. İlgili launcher'ı test et
3. Firewall kurallarını kontrol et

### Terminal komutları
**Linting:**
```bash
npm run lint
```

**Format:**
```bash
npm run format
```

**Build:**
```bash
npm run build
```

## Sorun Giderme

### node_modules hatası
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port zaten kullanımda
Development server portunu değiştirin:
```bash
PORT=3001 npm run dev
```

### Electron açılmıyor
Cache temizle:
```bash
npm run clean
npm install
npm run dev
```

### PowerShell execution policy hatası
PowerShell'i admin olarak açıp:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Gereksinimler

Projeyi çalıştırmak için:

- **Node.js:** v16.x veya üzeri
- **npm:** v8.x veya üzeri
- **Git:** v2.x veya üzeri
- **Windows:** 10/11 (64-bit)
- **PowerShell:** 5.1 veya üzeri

Versiyonları kontrol et:
// turbo-all
```bash
node --version
npm --version
git --version
```

## İpuçları

1. **VS Code kullanıyorsanız:**
   - Önerilen extension'ları yükleyin
   - Workspace settings'i aktifleştirin

2. **Git best practices:**
   - Her gün çalışmaya başlamadan `git pull`
   - Küçük, sık commit'ler
   - Anlamlı commit mesajları

3. **Performance:**
   - `node_modules` ve `dist` klasörlerini antivirus'ten exclude edin
   - SSD kullanıyorsanız daha hızlı olacaktır
