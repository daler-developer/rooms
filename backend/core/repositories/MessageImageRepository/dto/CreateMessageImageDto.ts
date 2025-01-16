export class CreateMessageImageDto {
  public url: string;
  public messageId: number;

  constructor({ url, messageId }: { url: string; messageId: number }) {
    this.messageId = messageId;
    this.url = url;
  }
}
