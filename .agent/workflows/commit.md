---
description: Değişiklikleri commit edip GitHub'a push etme
---

# Commit ve Push Workflow

Bu workflow, yaptığınız değişiklikleri commit edip GitHub'a göndermek için kullanılır.

## Adımlar

### 1. Değişiklikleri kontrol et
```bash
git status
```
Hangi dosyaların değiştiğini görün.

### 2. Değişiklikleri staging area'ya ekle
**Tüm değişiklikler için:**
// turbo
```bash
git add .
```

**Belirli dosyalar için:**
```bash
git add [dosya_yolu]
```

### 3. Commit mesajı yaz
Anlamlı bir commit mesajı yazın. Mesaj formatı:
- **feat:** Yeni özellik eklendiğinde
- **fix:** Bir bug düzeltildiğinde
- **docs:** Dokümantasyon güncellendiğinde
- **style:** Kod formatı değiştiğinde (işlevsellik değişmez)
- **refactor:** Kod yeniden düzenlendiğinde
- **test:** Test eklendiğinde veya güncellendiğinde
- **chore:** Build process veya yardımcı araçlar güncellendiğinde

```bash
git commit -m "feat: yeni özellik açıklaması"
```

veya çoklu satır için:
```bash
git commit -m "feat: başlık" -m "Detaylı açıklama burada"
```

### 4. GitHub'a push et
**İlk push (branch henüz remote'ta yoksa):**
```bash
git push -u origin main
```

**Normal push:**
// turbo
```bash
git push
```

### 5. Push durumunu kontrol et
GitHub repository sayfanızı ziyaret ederek commit'in başarıyla gittiğini doğrulayın:
```
https://github.com/akmaster/games-launchers-firewall-control
```

## Hızlı Komut (Tümü bir arada)
// turbo-all
```bash
git add .
git commit -m "commit mesajınız"
git push
```

## Sorun Giderme

### Push reddedildi (rejected)
Eğer `! [rejected]` hatası alırsanız:
```bash
git pull --rebase
git push
```

### Merge conflict
Eğer conflict varsa:
1. Çakışan dosyaları düzenleyin
2. `git add [dosya]` ile düzeltilmiş dosyaları ekleyin
3. `git rebase --continue` ile devam edin
4. `git push` ile gönderin
