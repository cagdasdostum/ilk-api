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
app.get("/app/stops/:id", (req, res) => {
  const id = Number(req.params.id); // id'yi number'a çevirdik.

  if (isNaN(id)) {
    res.status(400).json({ message: "Lütfen geçerli bir sayı girin." });
  }
  // json'daki DURAK_ID, bizim istek yolladığımız id'ye eşitse bunu buluyoruz.
  const durak = tasksJSON.find((d) => d.DURAK_ID === id);
  if (!durak) {
    return res
      .status(404)
      .json({ message: "Aranan ID'de durak bulunamadı...", arananID: id });
  } else {
    res.status(200).json({
      message: `${req.params.id}. durak.`,
      bekleyenYolcuSayisi: Math.round(Math.random() * 10), // bunu kendim uydurdum.
      durak: durak,
    });
  }
});

app.listen(port, () => {
  console.log(`sunucu http://localhost:${port} adresinde çalışıyor....`);
});
