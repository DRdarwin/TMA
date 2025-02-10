class NotificationService {
  sendNotification(userId: string, message: string): void {
    if (!userId || !message) {
      console.error("Помилка: відсутні userId або message");
      return;
    }

    try {
      // Тут буде логіка надсилання сповіщень
      console.log(`Сповіщення для користувача ${userId}: ${message}`);
    } catch (error) {
      console.error(`Помилка під час надсилання сповіщення: ${error}`);
    }
  }
}

export default new NotificationService();
