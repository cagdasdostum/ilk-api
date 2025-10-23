// JSON dosyasını içeri aktarıyorum.
// bu JSON dosyasının içeriği, İzmir BB ESHOT otobüslerinin duraklarının id'si, adı, enlem-boylam ve duraktan geçen hatlarının bilgisini içeriyor.
const tasksJSON = require("../duraklar.json");

const connectionSuccess = (req, res) => {
  res.send("bağlantı başarılı");
};

const getAllStops = (req, res) => {
  res.json({
    message: `Otobüs durağı listesi`,
    count: tasksJSON.length,
    data: tasksJSON,
  });
};

const getStops = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Lütfen geçerli bir id girin.." });
  }
  const durak = tasksJSON.find((d) => d.DURAK_ID === id);
  if (!durak) {
    return res.status(404).json({
      message: "Aranan ID'de durak bulunamadı..",
      arananID: id,
    });
  } else {
    let acikAdres = "Açık adres bilgisi alınamadı...";
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
      console.error("Nominatim API hatası: ", error.message);
    }

    res.json({
      message: `${durak.DURAK_ADI} durağı.`,
      bekleyenYolcuSayisi: Math.round(Math.random() * 10),
      acikAdres: acikAdres,
    });
  }
};

module.exports = {
  connectionSuccess,
  getAllStops,
  getStops,
};
