---
description: Lokal ve remote repository'yi senkronize etme
---

# Sync Workflow

Bu workflow, lokal çalışmanızı GitHub ile senkronize etmek için kullanılır.

## Günlük Senkronizasyon

### Sabah (Çalışmaya başlamadan)
// turbo-all
```bash
# Remote'taki değişiklikleri çek
git pull

# Bağımlılıklar güncellendiyse
npm install
```

### Akşam (Çalışma bittiğinde)
// turbo-all
```bash
# Değişiklikleri kaydet
git add .
git commit -m "chore: günlük çalışma kaydedildi"
git push
```

## Fast Sync (Hızlı Senkronizasyon)

Hızlıca değişiklikleri GitHub'a göndermek için:

```bash
git add . && git commit -m "WIP: work in progress" && git push
```

**Not:** WIP (Work In Progress) commit'leri daha sonra düzgün mesajlarla değiştirilmelidir.

## Merge Conflict Çözümü

### 1. Conflict tespit et
```bash
git pull
# CONFLICT mesajı alırsanız...
```

### 2. Conflicted dosyaları görüntüle
```bash
git status
```

Çakışan dosyalar "both modified" olarak işaretlenecek.

### 3. Dosyaları düzenle
Çakışan dosyalarda şu işaretleri göreceksiniz:
```
<<<<<<< HEAD
Sizin değişikliğiniz
=======
Remote'taki değişiklik
>>>>>>> origin/main
```

Doğru versiyonu seçin veya ikisini birleştirin.

### 4. Conflict'i çözümle
```bash
git add [düzeltilen_dosya]
git commit -m "fix: merge conflict çözüldü"
git push
```

## Branch Senkronizasyonu

Feature branch'inizde çalışıyorsanız:

```bash
# Main'deki güncellemeleri al
git checkout main
git pull

# Feature branch'e merge et
git checkout feature/your-feature
git merge main

# Veya rebase et (daha temiz geçmiş)
git rebase main
```

## Stash Kullanımı

Yarım kalan değişiklikleri geçici olarak kaydet:

```bash
# Değişiklikleri sakla
git stash save "WIP: firewall rules improvement"

# Başka bir branch'e geç
git checkout main
git pull

# Geri dön ve stash'i uygula
git checkout feature/your-feature
git stash pop
```

## Remote Kontrolü

### Remote URL'yi kontrol et
// turbo
```bash
git remote -v
```

Çıktı:
```
origin  https://github.com/akmaster/games-launchers-firewall-control.git (fetch)
origin  https://github.com/akmaster/games-launchers-firewall-control.git (push)
```

### Remote'u değiştir (gerekirse)
```bash
git remote set-url origin https://github.com/akmaster/games-launchers-firewall-control.git
```

## Senkronizasyon Kontrol Listesi

Düzenli olarak kontrol edin:

- [ ] Lokal değişiklikler commit edildi mi?
- [ ] Remote değişiklikler pull edildi mi?
- [ ] Conflict var mı?
- [ ] Tüm branch'ler senkronize mi?
- [ ] Unpushed commit'ler var mı?

### Unpushed commit'leri kontrol et
```bash
git log origin/main..HEAD
```

Boş çıktı = her şey senkronize.

## Otomatik Sync Script (İsteğe Bağlı)

Günlük otomatik sync için `sync.bat` oluşturun:

```batch
@echo off
echo Syncing with GitHub...

git pull
if errorlevel 1 (
    echo Pull failed! Check for conflicts.
    pause
    exit /b 1
)

git add .
git commit -m "auto-sync: %date% %time%"
git push

echo Sync complete!
pause
```

**Kullanım:** Çift tıklayın!

## Best Practices

1. **Her gün pull edin:** Conflict'leri erken yakalayın
2. **Sık push edin:** Kod kaybını önleyin
3. **Anlamlı commit'ler:** WIP kullanımını minimize edin
4. **Branch temizliği:** Merge edilen branch'leri silin
5. **Backup:** Kritik değişikliklerden önce backup alın
