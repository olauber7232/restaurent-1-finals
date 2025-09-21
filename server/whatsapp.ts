
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

class WhatsAppService {
  private client: Client;
  private isReady: boolean = false;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth()
    });

    this.initializeClient();
  }

  private initializeClient() {
    this.client.on('qr', (qr) => {
      console.log('Scan this QR code with your WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('WhatsApp client is ready!');
      this.isReady = true;
    });

    this.client.on('auth_failure', (msg) => {
      console.error('Authentication failed:', msg);
    });

    this.client.initialize();
  }

  async sendMessage(phoneNumber: string, message: string): Promise<boolean> {
    if (!this.isReady) {
      console.log('WhatsApp client is not ready yet');
      return false;
    }

    try {
      // Format phone number (remove any non-digits and add country code if needed)
      let formattedNumber = phoneNumber.replace(/\D/g, '');
      if (!formattedNumber.startsWith('91')) {
        formattedNumber = '91' + formattedNumber;
      }
      formattedNumber += '@c.us';

      await this.client.sendMessage(formattedNumber, message);
      console.log(`Message sent to ${phoneNumber}: ${message}`);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }

  async sendOrderConfirmation(phoneNumber: string, orderId: number, otp: string): Promise<boolean> {
    const message = `🍽️ *Daily Food House*\n\nYour order #${orderId} has been confirmed!\n\n✅ Order Status: Confirmed\n🔢 OTP: *${otp}*\n\n📍 Please share this OTP with the delivery boy when your order arrives.\n\nThank you for choosing Daily Food House! 😊`;
    
    return await this.sendMessage(phoneNumber, message);
  }

  isClientReady(): boolean {
    return this.isReady;
  }
}

export const whatsappService = new WhatsAppService();
