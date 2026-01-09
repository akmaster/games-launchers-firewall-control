---
description: Yeni versiyon release hazırlama süreci
---

# Release Workflow

Bu workflow, yeni bir versiyon yayınlarken izlemeniz gereken adımları içerir.

## Adımlar

### 1. Versiyonu belirle
Semantic Versioning kullanın: `MAJOR.MINOR.PATCH`

- **MAJOR (1.x.x):** Breaking changes, büyük yeni özellikler
- **MINOR (x.1.x):** Yeni özellikler, geriye dönük uyumlu
- **PATCH (x.x.1):** Bug düzeltmeleri

Örnek: `v1.2.0` → `v1.3.0` (yeni özellik)
Örnek: `v1.2.0` → `v1.2.1` (bug fix)

### 2. CHANGELOG.md'yi güncelle
```markdown
## [1.3.0] - 2026-01-09

### Added
- Epic Games Launcher desteği eklendi
- Gelişmiş firewall kural önizlemesi
- Dark mode tema desteği

### Changed
- UI modernize edildi
- Launcher algılama performansı iyileştirildi

### Fixed
- Steam launcher registry okuma hatası düzeltildi
- Firewall kuralı silme sorunu giderildi
```

### 3. package.json versiyonunu güncelle
```bash
npm version minor -m "Release v%s"
```

Bu otomatik olarak:
- package.json'daki version'ı günceller
- Git commit oluşturur
- Git tag ekler

**Alternatif manuel yöntem:**
```json
{
  "version": "1.3.0"
}
```

### 4. Tauri versiyonunu güncelle (eğer Tauri kullanıyorsanız)
`src-tauri/Cargo.toml`:
```toml
[package]
version = "1.3.0"
```

`src-tauri/tauri.conf.json`:
```json
{
  "package": {
    "version": "1.3.0"
  }
}
```

### 5. Son değişiklikleri commit et
```bash
git add .
git commit -m "chore: bump version to 1.3.0"
```

### 6. Production build oluştur
// turbo
```bash
npm run build
```

### 7. Build'i test et
Oluşturulan executable'ı çalıştırıp test edin.

### 8. Git tag oluştur
```bash
git tag -a v1.3.0 -m "Release v1.3.0: Epic Games support ve UI improvements"
```

### 9. GitHub'a push et (commit + tag)
```bash
git push
git push --tags
```

### 10. GitHub Release oluştur
GitHub web arayüzünde:

1. Repository → Releases → "Create a new release"
2. Tag seç: `v1.3.0`
3. Release title: `v1.3.0 - Epic Games Support`
4. Description'a CHANGELOG kopyala
5. Build artifact'larını ekle (installer .exe)
6. "Publish release" tıkla

## Pre-Release Checklist

Release öncesi kontrol listesi:

- [ ] Tüm testler geçiyor
- [ ] Build başarılı oluşuyor
- [ ] CHANGELOG.md güncellendi
- [ ] package.json version güncellendi
- [ ] Tauri config version güncellendi (varsa)
- [ ] README.md'deki screenshot'lar güncel
- [ ] Gereksiz console.log'lar temizlendi
- [ ] Debug modları kapatıldı
- [ ] Lisans ve copyright bilgileri doğru

## Hızlı Release Komutları

Tüm adımları hızlıca yapmak için:

```bash
# 1. Version bump
npm version minor

# 2. Build
npm run build

# 3. Push everything
git push && git push --tags
```

Sonra GitHub'da manuel olarak release oluşturun.

## Rollback (Geri Alma)

Eğer release'de sorun çıkarsa:

```bash
# Tag'i sil
git tag -d v1.3.0
git push origin :refs/tags/v1.3.0

# Önceki commit'e dön
git revert HEAD
git push
```

## Post-Release

Release'den sonra:

1. GitHub Issues'ta ilgili issue'ları kapatın
2. Kullanıcılara duyuru yapın
3. Dokümantasyonu güncelleyin
4. Yeni development branch başlatın (varsa)
