export class CreateMessageDto {
  public senderId: number;
  public roomId: number;
  public text: string;
  public imageUrls: string[];
  public sessionId: string;
  public scheduleAt?: string;
  public sentAt?: string;

  constructor({
    senderId,
    roomId,
    text,
    imageUrls,
    scheduleAt,
    sentAt,
    sessionId,
  }: {
    senderId: number;
    roomId: number;
    text: string;
    imageUrls: string[];
    sessionId: string;
    scheduleAt?: string;
    sentAt?: string;
  }) {
    this.senderId = senderId;
    this.roomId = roomId;
    this.text = text;
    this.imageUrls = imageUrls;
    this.scheduleAt = scheduleAt;
    this.sentAt = sentAt;
    this.sessionId = sessionId;
  }
}
