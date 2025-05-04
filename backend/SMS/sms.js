import axios from 'axios';

function isValidMobileNumber(number) {
  return /^\d{10}$/.test(number);
}

function formatRecipients(numbers) {
  if (Array.isArray(numbers)) {
    const validNumbers = numbers.filter(isValidMobileNumber);
    return validNumbers.join(',');
  } else if (typeof numbers === 'string' && isValidMobileNumber(numbers)) {
    return numbers;
  } else {
    throw new Error('Invalid phone number format');
  }
}

async function SmsSender(message, sender, to, token) {
  try {
    const numbers = formatRecipients(to);
    const params = new URLSearchParams({
      token,
      to: numbers,
      sender,
      message
    });

    const response = await axios.get(`http://beta.thesmscentral.com/api/v3/sms?${params.toString()}`);
    console.log(response.data);
  } catch (err) {
    console.log("Error occurred:", err.message);
  }
}

const sender = "BloodBank";
const token = "p50nzAunP2QiUx3D1918BwvwnWSEULepL6sA";
const number = '9807886763';
const numbers = ['9807886763', "9801092670"]; 

SmsSender("Hello, how are you?", sender, numbers, token);

