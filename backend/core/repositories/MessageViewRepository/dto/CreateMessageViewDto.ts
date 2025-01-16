export class CreateMessageViewDto {
  public userId: number;
  public messageId: number;

  constructor({ userId, messageId }: { userId: number; messageId: number }) {
    this.userId = userId;
    this.messageId = messageId;
  }
}
