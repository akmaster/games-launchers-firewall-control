# 📋 Workflow Rehberi

Bu klasördeki workflow dosyaları, **Games Launchers Firewall Control** projesini GitHub ile uyumlu bir şekilde geliştirmeniz için hazırlanmıştır.

## 🚀 Hızlı Başlangıç

İlk kez proje kurulumu yapıyorsanız:
```bash
/setup
```

Değişikliklerinizi GitHub'a göndermek için:
```bash
/commit
```

## 📚 Mevcut Workflow'lar

### 1. `/setup` - Kurulum ve Başlangıç
**Ne zaman kullanılır:** İlk kurulum, yeni geliştirme ortamı
- Repository klonlama
- Bağımlılıkları yükleme
- Geliştirme ortamını başlatma
- Sorun giderme

### 2. `/commit` - Commit ve Push
**Ne zaman kullanılır:** Her kod değişikliğinden sonra
- Değişiklikleri staging area'ya ekleme
- Commit mesajı yazma (conventional commits)
- GitHub'a push etme
- Sorun giderme (rejected push, merge conflicts)

### 3. `/feature` - Yeni Özellik Geliştirme
**Ne zaman kullanılır:** Yeni bir özellik eklerken
- Feature branch oluşturma
- Geliştirme süreci
- Main branch ile senkronizasyon
- Merge işlemi

### 4. `/bugfix` - Bug Düzeltme
**Ne zaman kullanılır:** Hata düzeltirken
- Bugfix/hotfix branch'leri
- Bug triage (önceliklendirme)
- Test ve regression
- Acil düzeltmeler

### 5. `/release` - Versiyon Yayınlama
**Ne zaman kullanılır:** Yeni versiyon çıkarırken
- Semantic versioning
- CHANGELOG güncelleme
- Build oluşturma
- GitHub Release
- Tag yönetimi

### 6. `/sync` - Senkronizasyon
**Ne zaman kullanılır:** Günlük, çalışma başında/sonunda
- Lokal ve remote senkronizasyonu
- Merge conflict çözümü
- Stash kullanımı
- Branch senkronizasyonu

## 🎯 Günlük Rutin

### Sabah (Çalışmaya Başlarken)
```bash
/sync  # Remote değişiklikleri çek
```

### Geliştirme Sırasında
```bash
/feature  # Yeni özellik için
# veya
/bugfix   # Hata düzeltme için
```

### Akşam (Gün Sonu)
```bash
/commit   # Değişiklikleri kaydet
/sync     # GitHub'a gönder
```

## 🏷️ Commit Mesaj Formatı

Tüm commit'lerde **Conventional Commits** standardını kullanın:

- `feat:` - Yeni özellik
- `fix:` - Bug düzeltme
- `docs:` - Dokümantasyon
- `style:` - Kod formatı
- `refactor:` - Kod yeniden düzenleme
- `test:` - Test ekleme/güncelleme
- `chore:` - Build/tooling güncellemeleri

**Örnek:**
```bash
git commit -m "feat: Epic Games Launcher desteği eklendi"
git commit -m "fix: Steam launcher algılama hatası düzeltildi"
git commit -m "docs: README'ye kurulum talimatları eklendi"
```

## 🌿 Branch Stratejisi

```
main
├── feature/epic-games-support
├── feature/dark-mode
├── fix/steam-detection-bug
└── hotfix/critical-security-patch
```

**Branch isimlendirme:**
- `feature/` - Yeni özellikler
- `fix/` - Bug düzeltmeleri
- `hotfix/` - Acil düzeltmeler
- `docs/` - Dokümantasyon
- `refactor/` - Kod iyileştirmeleri

## ⚡ Turbo Mod

Bazı workflow komutları `// turbo` veya `// turbo-all` işaretine sahip. Bu komutlar AI tarafından otomatik çalıştırılabilir.

**Örnek:**
```markdown
// turbo
git push
```
Bu komut kullanıcı onayı beklemeden çalışır.

## 🔧 Workflow Özelleştirme

Kendi workflow'unuzu eklemek için:

1. `.agent/workflows/` klasöründe yeni `.md` dosyası oluşturun
2. YAML frontmatter ekleyin:
```yaml
---
description: Kısa açıklama
---
```
3. Markdown formatında adımları yazın
4. Slash command olarak çağırın: `/dosya-adi`

## 📝 İpuçları

1. **Küçük commit'ler:** Her commit tek bir değişikliği temsil etmeli
2. **Sık sık push:** Kod kaybını önlemek için günde birkaç kez push edin
3. **Anlamlı mesajlar:** "update" yerine "feat: launcher detection eklendi"
4. **Branch temizliği:** Merge edilen branch'leri silin
5. **Pull before push:** Push etmeden önce remote değişiklikleri çekin

## 🆘 Yardım

Takıldığınızda:
1. İlgili workflow dosyasını açın
2. "Sorun Giderme" bölümüne bakın
3. GitHub Issues'ta arayın
4. AI asistana sorun

## 📞 Katkıda Bulunma

Workflow iyileştirmeleri için:
1. `.agent/workflows/` klasöründeki dosyaları düzenleyin
2. Değişikliği commit edin
3. Pull request oluşturun

---

**Hazırlayan:** Gaming Platforms & Security Specialist AI
**Versiyon:** 1.0
**Güncelleme:** 2026-01-09
