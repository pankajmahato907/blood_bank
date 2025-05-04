const axios = require("axios");

const sendTelegramAlert = async (message) => {
  const botToken = "7573058836:AAHUmWuFjSOgm_H9BNGTRJUv7xPfluf897Q"; // Your bot token
  const chatId = "8113684051"; // Your Telegram chat ID

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown"
    });
    console.log(" Telegram alert sent!");
  } catch (err) {
    console.error("Error sending alert:", err.message);
  }
};

module.exports = sendTelegramAlert;
