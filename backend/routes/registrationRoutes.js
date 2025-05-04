const express = require("express");
const router = express.Router();
const sendTelegramAlert = require("../telegramAlert");

// 🧑 Patient registration
router.post("/register-patient", async (req, res) => {
  const { name, bloodGroup } = req.body;

  //  Save patient to DB here...

  //  Send Telegram Alert
  const message = ` *New Patient Registered!*\n Name: ${name}\n Blood Group: ${bloodGroup}`;
  await sendTelegramAlert(message);

  res.status(200).json({ message: "Patient registered and alert sent." });
});

// 🧑 Donor registration
router.post("/register-donor", async (req, res) => {
  const { name, bloodGroup } = req.body;

  //  Save donor to DB here...

  //  Send Telegram Alert
  const message = ` *New Donor Registered!*\n👤 Name: ${name}\n Blood Group: ${bloodGroup}`;
  await sendTelegramAlert(message);

  res.status(200).json({ message: "Donor registered and alert sent." });
});

module.exports = router;
