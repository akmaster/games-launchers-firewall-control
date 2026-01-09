---
description: Yeni özellik (feature) geliştirme süreci
---

# Yeni Özellik Geliştirme Workflow

Bu workflow, yeni bir özellik eklerken izlemeniz gereken adımları içerir.

## Adımlar

### 1. Yeni feature branch oluştur
```bash
git checkout -b feature/ozellik-adi
```

Örnek branch isimleri:
- `feature/epic-games-support`
- `feature/advanced-firewall-rules`
- `feature/dark-mode-ui`

### 2. Kodu geliştir
Özelliği geliştirirken:
- Küçük, anlamlı commit'ler yapın
- Her commit'te test edin
- Kod stiline dikkat edin

### 3. Sık sık commit yapın
```bash
git add .
git commit -m "feat: kullanıcı arayüzüne dark mode eklendi"
```

### 4. Main branch'teki değişiklikleri al
Geliştirme sırasında main branch güncellenebilir:
```bash
git checkout main
git pull
git checkout feature/ozellik-adi
git rebase main
```

### 5. Testleri çalıştır
Uygulamanın çalıştığından emin olun:

**Electron app test:**
// turbo
```bash
npm run dev
```

**Build test:**
```bash
npm run build
```

### 6. Feature tamamlandığında main'e merge et
```bash
git checkout main
git merge feature/ozellik-adi
```

### 7. GitHub'a push et
```bash
git push origin main
```

### 8. Feature branch'i temizle (opsiyonel)
Artık ihtiyaç yoksa:
```bash
git branch -d feature/ozellik-adi
```

## En İyi Pratikler

1. **Branch isimlendirme:**
   - `feature/` öneki kullanın
   - Kısa ve açıklayıcı olsun
   - Türkçe karakter kullanmayın

2. **Commit mesajları:**
   - Her commit bir değişikliği temsil etmeli
   - Açıklayıcı mesajlar yazın
   - `feat:` öneki kullanın

3. **Kod kalitesi:**
   - Linter uyarılarını düzeltin
   - Console.log'ları temizleyin
   - Gereksiz yorumları silin

4. **Dokümantasyon:**
   - README.md'yi güncelleyin
   - CHANGELOG.md'ye yeni özelliği ekleyin
