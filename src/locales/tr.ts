export const tr = {
    app: {
        title: "GAMER HUB // BAŞLATICI",
        logo: "NEXUS",
        sidebar: {
            library: "Kütüphane",
            launchers: "Başlatıcılar",
            notes: "Not Defteri",
            settings: "Ayarlar"
        }
    },
    library: {
        title: "KÜTÜPHANE",
        games_count: "OYUN",
        scanning: "TARANIYOR...",
        error: "BİR HATA OLUŞTU",
        error_sub: "Steam kurulu mu? Veya gizlilik ayarları açık mı?",
        no_games: "OYUN BULUNAMADI",
        other_accounts: "Diğer Hesaplar",
        modal: {
            online_mode: "ONLINE MOD",
            offline_mode: "OFFLINE MOD",
            start_game: "OYUNU BAŞLAT",
            appid: "APPID",
            success: "BAŞARILI"
        }
    },
    accounts: {
        title: "STEAM HESAPLARI",
        subtitle: "Kayıtlı Steam hesaplarını yönet",
        no_accounts: "Kayıtlı hesap bulunamadı.",
        no_accounts_sub: "Lütfen Steam'e bir kez \"Beni Hatırla\" diyerek giriş yapın.",
        switch: "Hesaba Geç",
        switching: "Geçiliyor...",
        switched_msg: "{0} hesabına geçildi, Steam yeniden başlatılıyor..."
    },
    launchers: {
        title: "LAUNCHER YÖNETİMİ",
        subtitle: "İnternet erişimini kesmek istediğin platformları buradan yönetebilirsin.",
        refresh_tooltip: "Durumları Yenile",
        status: {
            blocked: "ENGELLENDİ",
            online: "ÇEVRİMİÇİ"
        },
        actions: {
            unblock: "ENGELİ KALDIR",
            block: "ENGELLE",
            start: "Başlat"
        },
        loading: {
            title: "LÜTFEN BEKLEYİN",
            subtitle: "Başlatıcıların Durumları Kontrol Ediliyor..."
        },
        desc: {
            steam: "Engeller: Steam Client, WebHelper",
            ubisoft: "Engeller: upc.exe",
            ea: "Engeller: EADesktop.exe",
            epic: "Engeller: EpicGamesLauncher.exe",
            rockstar: "Engeller: Launcher, SocialClub, RDR2"
        },
        names: {
            steam: "Steam (Tam)",
            ubisoft: "Ubisoft Connect",
            ea: "EA Desktop",
            epic: "Epic Games",
            rockstar: "Rockstar Games"
        }
    },
    settings: {
        title: "AYARLAR",
        language: {
            title: "Dil / Language",
            desc: "Uygulama dilini değiştirin.",
            selected: "Seçili: "
        },
        general: {
            title: "Genel",
            reset: "Uygulamayı Sıfırla",
            reset_desc: "Bu işlem kayıtlı tüm verileri (dil tercihi, önbellek) silecek ve uygulamayı yeniden başlatacaktır.",
            reset_btn: "SIFIRLA",
            reset_confirm: "Emin misiniz? Uygulama yeniden başlatılacak."
        },
        launcher_settings: {
            title: "Launcher Ayarları",
            desc: "Launcher yollarını yeniden tespit etmek veya manuel olarak eklemek için sihirbazı kullanın",
            reset_wizard: "Sihirbazı Tekrar Başlat",
            resetting: "Sıfırlanıyor...",
            tip: "İpucu:",
            tip_desc: "Sihirbaz, tüm launcher'ları otomatik olarak tarar. Bulunamayan launcher'lar için manuel yol girişi yapabilirsiniz.",
            reset_success: "Sihirbaz sıfırlandı! Uygulamayı yeniden başlatın.",
            reset_error: "Hata: "
        }
    },
    notes: {
        title: "YEREL NOTLAR",
        desc: "Kişisel, şifrelenmiş notlarınız.",
        privacy_warning: "GİZLİLİK UYARISI: Tüm notlar %100 YEREL olarak bu cihazda saklanır. Hiçbir sunucuya veya buluta veri gönderilmez.",
        new_note: "Yeni Not",
        edit_note: "Notu Düzenle",
        delete_note: "Sil",
        delete_confirm: "Bu notu silmek istiyor musunuz?",
        title_placeholder: "Not Başlığı...",
        content_placeholder: "Bir şeyler yaz...",
        save: "KAYDET",
        cancel: "İPTAL",
        no_notes: "Henüz not yok. Bir tane oluştur!",
        created: "Oluşturuldu: ",
        export: "Notları Dışa Aktar (Yedekle)",
        import: "Notları İçe Aktar",
        data_loss_warning: "ÖNEMLİ: Veriler SADECE bu bilgisayarda saklandığı için, bilgisayara format atmadan veya uygulamayı silmeden önce notlarınızı DIŞA AKTARMAYI unutmayın, aksi takdirde sonsuza kadar kaybolurlar!"
    },
    wizard: {
        title: "İlk Kurulum",
        subtitle: "Launcher'larınız otomatik olarak tespit edildi",
        scanning: "Launcher'lar taranıyor...",
        scanning_desc: "Steam, Epic Games, Ubisoft, EA ve Rockstar launcher'ları aranıyor",
        all_found: "Tüm launcher'lar bulundu!",
        all_found_desc: "3 saniye içinde otomatik olarak ana ekrana yönlendirileceksiniz",
        select_exe: "{0} launcher dosyasını seçin",
        status: {
            found: "Bulundu",
            not_found: "Bulunamadı",
            skipped: "Kurulu Değil"
        },
        actions: {
            show_location: "Konumunu Göster",
            not_installed: "Kurulu Değil",
            complete: "Kurulumu Tamamla",
            skip: "Şimdilik Atla (Settings'ten tekrar açabilirsiniz)",
            some_missing: "Bazı Launcher'lar Eksik"
        },
        warning: {
            title: "Uyarı",
            message: "Bazı launcher'lar bulunamadı veya atlandı!",
            settings_info: "<strong>Ayarlar → Launcher Settings</strong> kısmından sihirbazı tekrar başlatabilir ve eksik launcher'ları manuel olarak ekleyebilirsiniz.",
            continue: "Anladım, Devam Et",
            go_back: "Geri Dön"
        },
        info: {
            tip: "İpucu:",
            settings_hint: "Herhangi bir launcher'ı daha sonra eklemek isterseniz, <strong>Ayarlar → Launcher Settings</strong> kısmından sihirbazı tekrar başlatabilirsiniz."
        }
    }
};
