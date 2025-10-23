const express = require("express");
const app = express();

// JSON dosyasını içeri aktarıyorum.
// bu JSON dosyasının içeriği, İzmir BB ESHOT otobüslerinin duraklarının id'si, adı, enlem-boylam ve duraktan geçen hatlarının bilgisini içeriyor.
const tasksJSON = require("./duraklar.json");

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("bağlantı başarılı");
});

app.get("/app/stops/", (req, res) => {
  res.status(200).json({
    message: `Otobüs durağı listesi`,
    count: tasksJSON.length,
    data: tasksJSON,
  });
});

// durak id'sine göre bir yanıt döndürüyor.
app.get("/app/stops/:id", async (req, res) => {
  const id = Number(req.params.id); // id'yi number'a çevirdik.

  if (isNaN(id)) {
    return res.status(400).json({ message: "Lütfen geçerli bir sayı girin." });
  }
  // json'daki DURAK_ID, bizim istek yolladığımız id'ye eşitse bunu buluyoruz.
  const durak = tasksJSON.find((d) => d.DURAK_ID === id);
  if (!durak) {
    return res
      .status(404)
      .json({ message: "Aranan ID'de durak bulunamadı...", arananID: id });
  } else {
    let acikAdres = "Adres bilgisi alınamadı..";
    try {
      const lat = durak.ENLEM;
      const lon = durak.BOYLAM;
      const geoApiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

      const response = await fetch(geoApiUrl, {
        headers: {
          "User-Agent": "ESHOT-Duraklari-API/1.0 (cagdas3515@proton.me)",
        },
      });

      const geoData = await response.json();

      if (geoData && geoData.display_name) {
        acikAdres = geoData.display_name;
      }
    } catch (error) {
      console.error("Nominatim API Hatası:", error.message);
    }

    res.status(200).json({
      message: `${durak.DURAK_ADI} durağı.`,
      bekleyenYolcuSayisi: Math.round(Math.random() * 10), // bunu kendim uydurdum.
      acikAdres: acikAdres,
    });
  }
});

app.listen(port, () => {
  console.log(`sunucu http://localhost:${port} adresinde çalışıyor....`);
});
