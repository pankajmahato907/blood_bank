
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

async function Sms(message, to) {
  const token = process.env.Token;
  const sender = process.env.Sender;

  try {
    const numbers = formatRecipients(to);
    const params = new URLSearchParams({ token, to: numbers, sender, message });

    const response = await axios.get(`http://beta.thesmscentral.com/api/v3/sms?${params.toString()}`);
    console.log('SMS sent response:', response.data);
    return response.data;
  } catch (err) {
    console.error('SMS send error:', err.message);
    throw err;
  }
}

export default Sms;
