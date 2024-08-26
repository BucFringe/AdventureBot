import axios from 'axios';

const webhookUrl = "https://discordapp.com/api/webhooks/1277590828176379935/tRPT7xqouHUO7lJasm8moLEx5HBwd3_JGM9cnaGo5okghbfrufApqFr4NKDzGgM8axBH"

export async function sendDiscordAlert(message: string) {
  try {
    const response = await axios.post(webhookUrl, {
      content: message,
    });

    if (response.status === 204) {
      console.log('Discord alert sent successfully!');
    } else {
      console.error('Failed to send Discord alert:', response.data);
    }
  } catch (error) {
    console.error('Error sending Discord alert:', error);
  }
}