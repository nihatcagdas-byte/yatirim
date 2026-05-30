# 📈 YatırımTakip

Tek dosyadan çalışan, tamamen yerel, şifreli bir kişisel yatırım ve finans takip uygulaması.  
Hiçbir sunucu yok, hiçbir veri dışarı gitmez — her şey tarayıcınızda saklanır.

---

## 🖥️ Ekran Görüntüsü

> Sol sidebar navigasyon · 4 tema · Şifre koruması · Gelir/Gider · BES · Projeksiyon

---

## ✨ Özellikler

### 🔐 Güvenlik
- **8 karakterli şifre** ile uygulama kilidi (SHA-256 hash, localStorage'da saklanır)
- **15 dakika hareketsizlik** sonrası otomatik kilit
- Veriler yalnızca bu tarayıcıda — sunucuya hiçbir şey gönderilmez

### 📐 Arayüz
- **Sol sidebar** navigasyon — açılıp kapanabilir (toggle)
- **4 tema:** Gece Okyanusu · Amber Gün · Gece Moru · Açık Tema
- Tamamen responsive, tüm modern tarayıcılarda çalışır

### 📊 Portföy Takibi
- **Hisse senedi** alım kaydı, ortalama maliyet, kâr/zarar hesabı
- **Yatırım fonu** takibi — TEFAS üzerinden otomatik NAV güncelleme
- **Altın & Döviz** takibi
- Temettü geçmişi, ısı haritası, portföy dağılım grafikleri
- Yahoo Finance & Milliyet üzerinden **canlı fiyat güncelleme**

### ⚖️ Servet & Finans (yeni)
| Alt Sekme | İçerik |
|---|---|
| 💸 Gelir / Gider | Manuel + otomatik kalemler, kategori pasta grafik, net akış |
| ⚖️ Bilanço | Varlık/Borç tablosu, net değer, finansal sağlık skoru, acil fon |
| 🔮 Projeksiyon | 3 senaryo karşılaştırması (muhafazakar/dengeli/agresif), 30 yıla kadar |
| 🏦 BES | Hesap takibi, %25 devlet katkısı, emeklilik projeksiyonu |

- Gelir/gider kalemleri **manuel veya otomatik** (temettü, fon dağıtımı, BES katkısı portföyden otomatik çekilir)
- İstediğiniz her kalemi ekleyebilirsiniz: oyun parası, Netflix, spor salonu vb.
- **Finansal sağlık skoru** (0-100): tasarruf oranı, borç/gelir, acil fon, net değer
- **Enflasyon + maaş artışı + portföy getirisi** parametreli gelişmiş projeksiyon

### 🔬 Analiz & Araçlar
- Hisse karşılaştırma (A vs B)
- Fon karşılaştırma
- Alım planlayıcısı (bütçeyi yüzdesel dağıt)
- KAP haberleri entegrasyonu
- Risk analizi (çeşitlendirme skoru)
- Portföy büyüme projeksiyonu

### 📅 Takvim & Notlar
- Temettü takvimi (kart & zaman çizelgesi görünümü)
- Yaklaşan ödemeler uyarısı
- Yatırım notları (etiketli)

### 💾 Veri Yönetimi
- **JSON yedek al / geri yükle** — farklı cihazlara taşıma
- CSV import/export (hisse alımları, temettüler, fon işlemleri)
- Şifreli JSON export

---

## 🚀 Kurulum

### Yöntem 1 — Direkt açın (en kolay)
```
index.html dosyasını indirin → tarayıcıda açın
```
Bitti. Kurulum yok, npm yok, build yok.

### Yöntem 2 — GitHub Pages
1. Bu repoyu fork edin
2. Settings → Pages → Branch: `main`, folder: `/ (root)`
3. `https://kullanici-adi.github.io/repo-adi` adresinden erişin

### Yöntem 3 — Lokal sunucu (TEFAS NAV için önerilir)
```bash
# Python ile
python3 -m http.server 8080

# Node ile
npx serve .
```
Ardından `http://localhost:8080` adresini açın.

---

## 📖 Kullanım

### İlk Açılış
1. Uygulama açıldığında **8 karakterli şifre** oluşturmanız istenir
2. Şifrenizi belirleyin ve kilidi açın
3. Sol sidebar'dan istediğiniz bölüme geçin

### Hisse Eklemek
- **Portföy** → `+ Hisse Ekle` → Hisse kodu (BIST: TUPRS, GARAN vb.)
- Alım tarihi, fiyat ve adet girin
- Beklenen yıllık temettü ve temettü aylarını işaretleyin

### Fon Eklemek
- **Fonlar** → `+ Fon Ekle` → TEFAS fon kodu (örn: AAK, TI2)
- `🔄 NAV Güncelle` butonu ile güncel fiyatı çekin

### Gelir/Gider Takibi
- **Servet** sekmesi → Gelir/Gider alt sekmesi
- `+ Ekle` ile yeni kalem ekleyin (kategori, tutar, tekrar türü)
- Temettü ve fon dağıtımları portföyden **otomatik** gelir

### BES Takibi
- **Servet** → BES sekmesi → `+ BES Ekle`
- Şirket, başlangıç tarihi, aylık katkı payı
- Devlet katkısı (%25) otomatik hesaplanır
- Doğum yılı ve emeklilik yaşı girerek projeksiyon görün

---

## 🔧 Teknik Detaylar

| Özellik | Detay |
|---|---|
| Dil | Vanilla HTML/CSS/JS — sıfır bağımlılık |
| Grafik | Chart.js 4.4.1 (CDN) |
| Font | Syne + DM Mono (Google Fonts) |
| Depolama | localStorage (yalnızca tarayıcı) |
| Şifreleme | SHA-256 (Web Crypto API) |
| Fiyat Kaynağı | Milliyet Uzmanpara (BIST) |
| NAV Kaynağı | TEFAS API (CORS proxy üzerinden) |
| Döviz | Serbest piyasa verileri |

### CORS Proxy Notu
TEFAS ve bazı fiyat kaynakları direkt tarayıcı isteklerini engeller. Uygulama aşağıdaki proxy'leri sırayla dener:
- `api.allorigins.win`
- `corsproxy.io`
- `thingproxy.freeboard.io`

Lokal geliştirme için Cloudflare Worker kurabilirsiniz (Ayarlar → Worker URL).

---

## 📁 Dosya Yapısı

```
├── index.html     ← Uygulamanın tamamı tek dosyada
└── README.md
```

---

## 🗺️ Yol Haritası

- [ ] PWA desteği (offline çalışma, ana ekrana ekle)
- [ ] Kripto para takibi
- [ ] Çoklu portföy desteği
- [ ] Mobil optimizasyon iyileştirmeleri
- [ ] Dark/Light mod otomatik algılama
- [ ] iCloud / Google Drive yedekleme

---

## ⚠️ Uyarılar

- Bu uygulama **yatırım tavsiyesi vermez**
- Fiyat verileri **15 dakika gecikmeli** olabilir
- Verilerinizi düzenli olarak **JSON yedek** alın
- Şifrenizi unutursanız veriyi kaybetmeden sıfırlamak için:
  ```
  localStorage.removeItem('tt_lock_hash')
  ```
  komutunu tarayıcı konsolunda çalıştırın (veriler silinmez)

---

## 📄 Lisans

MIT License — dilediğiniz gibi kullanabilir, değiştirebilir ve dağıtabilirsiniz.

---

<div align="center">
  <sub>Kendi portföyünüz için yapıldı · Verileriniz sizin</sub>
</div>
