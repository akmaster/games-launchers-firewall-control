---
description: Bug düzeltme ve hotfix workflow'u
---

# Bug Fix Workflow

Bu workflow, hataları düzeltirken izlemeniz gereken adımları içerir.

## Acil Olmayan Bug Fix

### 1. Bugfix branch oluştur
```bash
git checkout -b fix/bug-aciklamasi
```

Örnek branch isimleri:
- `fix/steam-launcher-not-detected`
- `fix/firewall-rule-deletion-error`
- `fix/ui-crash-on-startup`

### 2. Bug'ı düzelt
Sorunu tespit edip düzeltin.

### 3. Test et
Bug'ın gerçekten düzeldiğini doğrulayın:
// turbo
```bash
npm run dev
```

### 4. Commit yap
```bash
git add .
git commit -m "fix: Steam launcher registry okuması düzeltildi"
```

Commit mesajında:
- Neyin düzeltildiğini belirtin
- Mümkünse issue numarasını ekleyin: `fix #123: ...`

### 5. Main'e merge et
```bash
git checkout main
git merge fix/bug-aciklamasi
git push
```

### 6. Branch'i temizle
```bash
git branch -d fix/bug-aciklamasi
```

## Acil Hotfix (Production'daki Kritik Bug)

### 1. Hotfix branch oluştur
Main branch'ten direkt hotfix açın:
```bash
git checkout main
git pull
git checkout -b hotfix/kritik-sorun
```

### 2. Hızlıca düzelt
Minimum değişiklikle sorunu çözün.

### 3. Acil test
```bash
npm run build
```

Build başarılıysa devam edin.

### 4. Commit ve push
```bash
git add .
git commit -m "hotfix: kritik güvenlik açığı kapatıldı"
git checkout main
git merge hotfix/kritik-sorun
git push
```

### 5. Tag oluştur (versiyon güncellemesi)
```bash
git tag -a v1.0.1 -m "Hotfix: kritik güvenlik yamasi"
git push --tags
```

## Bug Triage Checklist

Bir bug bulduğunuzda:

1. **Reproduce et:** Bug'ı tekrar oluşturabilir misiniz?
2. **Scope belirle:** Hangi launcher'ları/özellikleri etkiliyor?
3. **Severity değerlendir:**
   - **Critical:** Uygulama çöküyor / Veri kaybı
   - **High:** Önemli özellik çalışmıyor
   - **Medium:** Küçük özellik sorunu / UI hatası
   - **Low:** Kozmetik sorun
4. **Root cause:** Asıl neden nedir?
5. **Fix planla:** En az değişiklikle nasıl düzeltilir?

## Hata Loglama

Bug düzeltirken debug log ekleyin:
```javascript
// Sorunlu kod bölümünde
console.log('[DEBUG] Launcher path:', launcherPath);
console.error('[ERROR] Firewall rule creation failed:', error);
```

Build öncesi debug loglarını temizleyin!

## Regression Test

Düzeltme sonrası test edin:
- [ ] Bug düzeldive mi?
- [ ] Başka bir şey bozulmadı mı?
- [ ] Tüm launcher'lar çalışıyor mu?
- [ ] Firewall kuralları düzgün oluşuyor mu?
