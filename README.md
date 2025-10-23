# 🚌 İzmir ESHOT Durak API

Bu proje, Node.js ve Express.js kullanılarak oluşturulmuş basit bir REST API sunucusudur. Sunucu, İzmir Büyükşehir Belediyesi ESHOT otobüs duraklarının bilgilerini (ID, ad, konum, geçen hatlar) içeren yerel bir `duraklar.json` dosyasını okur ve bu verileri JSON formatında sunar.

## ✨ Temel Özellikler

* Tüm otobüs duraklarını listeleyin.
* Belirli bir durağı `ID` ile sorgulayın.
* Geçersiz `ID` istekleri için hata yönetimi içerir.
* Dinamik olarak rastgele "bekleyen yolcu sayısı" bilgisi üretir (simülasyon amaçlı).

## 🔧 Kullanılan Teknolojiler

* **Node.js:** Sunucu taraflı JavaScript çalışma ortamı.
* **Express.js:** Hızlı ve minimalist bir Node.js web uygulama çatısı.

## 🚀 Projeyi Başlatma

### 1. Kurulum

Öncelikle gerekli bağımlılıkları (sadece `express`) yükleyin:

```bash
npm install express
```

### 2. Veri Dosyası

Projenin çalışması için ana dizinde `duraklar.json` adında bir dosya bulunmalıdır. Bu dosya, durak nesnelerinden oluşan bir dizi (array) içermelidir.

**Örnek `duraklar.json` Yapısı:**

```json
[
  {
    "DURAK_ID": 10001,
    "ADI": "ÖRNEK DURAK 1",
    "ENLEM": 38.4192,
    "BOYLAM": 27.1287,
    "GECEN_HATLAR": ["10", "20", "90"]
  },
  {
    "DURAK_ID": 10002,
    "ADI": "ÖRNEK DURAK 2",
    "ENLEM": 38.4205,
    "BOYLAM": 27.1299,
    "GECEN_HATLAR": ["15", "121", "550"]
  }
]
```

### 3. Sunucuyu Çalıştırma

Sunucuyu başlatmak için (dosya adınızın `app.js` veya `index.js` olduğunu varsayarak):

```bash
node app.js
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışmaya başlayacaktır.

---

## 📍 API Uç Noktaları (Endpoints)

API, aşağıdaki uç noktaları sağlar:

### 1. API Durum Kontrolü

Sunucunun ayakta olup olmadığını kontrol eder.

* **Endpoint:** `GET /`
* **Başarılı Yanıt (200 OK):**
    ```
    bağlantı başarılı
    ```

### 2. Tüm Durakları Listeleme

Sistemde kayıtlı tüm otobüs duraklarının listesini döndürür.

* **Endpoint:** `GET /app/stops/`
* **Başarılı Yanıt (200 OK):**
    ```json
    {
      "message": "Otobüs durağı listesi",
      "count": 2,
      "data": [
        {
          "DURAK_ID": 10001,
          "ADI": "ÖRNEK DURAK 1",
          "ENLEM": 38.4192,
          "BOYLAM": 27.1287,
          "GECEN_HATLAR": ["10", "20", "90"]
        },
        {
          "DURAK_ID": 10002,
          "ADI": "ÖRNEK DURAK 2",
          "ENLEM": 38.4205,
          "BOYLAM": 27.1299,
          "GECEN_HATLAR": ["15", "121", "550"]
        }
      ]
    }
    ```

### 3. ID'ye Göre Belirli Bir Durağı Getirme

Parametre olarak gönderilen `DURAK_ID`'ye sahip durağın detaylarını getirir.

* **Endpoint:** `GET /app/stops/:id`
* **Örnek İstek:** `GET /app/stops/10001`
* **Başarılı Yanıt (200 OK):**
    ```json
    {
      "message": "10001. durak.",
      "bekleyenYolcuSayisi": 7,
      "durak": {
        "DURAK_ID": 10001,
        "ADI": "ÖRNEK DURAK 1",
        "ENLEM": 38.4192,
        "BOYLAM": 27.1287,
        "GECEN_HATLAR": ["10", "20", "90"]
      }
    }
    ```

#### Hata Durumları (ID ile Sorgulama)

* **Durak Bulunamazsa (404 Not Found):**
    * *İstek:* `GET /app/stops/99999`
    * *Yanıt:*
        ```json
        {
          "message": "Aranan ID'de durak bulunamadı...",
          "arananID": 99999
        }
        ```

* **Geçersiz ID Formatı (400 Bad Request):**
    * *İstek:* `GET /app/stops/abcde`
    * *Yanıt:*
        ```json
        {
          "message": "Lütfen geçerli bir sayı girin."
        }
        ```
