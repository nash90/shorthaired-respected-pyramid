import { sendEmail } from "./SantaEmailService";

// Define a type for email tasks
export interface EmailTask {
  to: string;
  from: string;
  username: string;
  address: string;
  giftMessage: string;
  subject: string;
}

export class EmailQueue {
  private queue: EmailTask[] = [];
  private isProcessing: boolean = false;
  private consumerInterval: NodeJS.Timeout | null = null;

  // Add an email task to the queue
  enqueue(task: EmailTask) {
    this.queue.push(task);
    if (!this.isProcessing) {
      this.startProcessing();
    }
  }

  // Start processing the email queue
  private startProcessing() {
    this.isProcessing = true;
    this.processQueue();
    this.consumerInterval = setInterval(() => {
      console.log("Consumer Process at 15 sec interval ...");
      this.processQueue();
    }, 15000);
  }

  // Process the email queue
  private async processQueue() {
    // Check if the email queue is empty
    if (this.queue.length === 0) {
      // If it's empty, set the processing flag to false
      this.isProcessing = false;

      // Check if there's an active interval timer
      if (this.consumerInterval) {
        // If there is, clear the interval timer to stop periodic processing on empty queue
        clearInterval(this.consumerInterval);
        // Set the interval timer variable to null to indicate it's not active
        this.consumerInterval = null;
      }

      // Exit the function as there are no tasks to process
      return;
    }

    // TODO: Implement rate limiting to avoid exceeding email server capacity
    // Get all pending tasks from the queue
    const tasksToSend = this.queue.splice(0, this.queue.length);
    const emailPromises: Promise<void>[] = [];

    for (const task of tasksToSend) {
      // Create the email content
      const emailContent = `Username: ${task.username}\nAddress: ${task.address}\nGift Message: ${task.giftMessage}`;

      try {
        // Send the email and add the promise to the list
        const emailPromise = sendEmail(task.from, task.to, task.subject, emailContent);

        // If an error occurs during sending, add the task back to the queue
        emailPromise.catch((error) => {
          console.error('Error sending an email, adding task back to the queue:', error);
          this.enqueue(task); // Re-enqueue the failed task
        });

        emailPromises.push(emailPromise);
      } catch (error) {
        console.error('Error sending emails:', error);
        // If an error occurs during sending, add the task back to the queue
        this.enqueue(task); // Re-enqueue the failed task
      }
    }

    try {
      // Wait for all emails to be sent
      await Promise.all(emailPromises);
      console.log('Sent emails:', tasksToSend.length);
    } catch (error) {
      console.error('Error sending emails:', error);
    }

    // Continue processing the queue
    this.processQueue();
  }
}
