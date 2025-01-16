export class CreateMessageDto {
  public senderId: number;
  public roomId: number;
  public text: string;
  public imageUrls: string[];
  public scheduleAt?: string;
  public sentAt?: Date;

  constructor({
    senderId,
    roomId,
    text,
    imageUrls,
    scheduleAt,
    sentAt,
  }: {
    senderId: number;
    roomId: number;
    text: string;
    imageUrls: string[];
    scheduleAt?: string;
    sentAt?: Date;
  }) {
    this.senderId = senderId;
    this.roomId = roomId;
    this.text = text;
    this.imageUrls = imageUrls;
    this.scheduleAt = scheduleAt;
    this.sentAt = sentAt;
  }
}
