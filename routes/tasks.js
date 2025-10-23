const express = require("express");
const router = express.Router();
const {
  connectionSuccess,
  getAllStops,
  getStops,
} = require("../controllers/tasks");

router.route("/").get(connectionSuccess);
router.route("/all").get(getAllStops);
router.route("/:id").get(getStops);

module.exports = router;
