const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

const { getAllStops, getStops } = require("./controllers/tasks");

const port = 3000;

// middleware
app.use(express.json());

//routes
app.use("/hello", (req, res) => {
  // localhost:3000/hello adresinde ne olacak?
  res.send("ESHOT Durakları");
});
// bu direkt controllers/tasks.js'deki bütün fonksiyonları ilgilendiriyor. postmande hangi isteği yapmak istiyorsak mesela get isteği yapıcaz bu url'deki get fonksiyonu çalışır. yani biz bu sayfada ayrıyetten hepsini tek tek yazmadık. ayrı bir tasks.js açıp oraya yazıp işimize geleni kullanacak şekilde ayarladık.
app.use("/app/stops/", tasks);

app.listen(port, () => {
  console.log(`sunucu http://localhost:${port} adresinde çalışıyor....`);
});
