export class Message {
  constructor(
    public id: number,
    public text: string,
    public senderId: number,
    public createdAt: string,
    public roomId: number,
    public isDeleted: boolean,
    public sessionId: string,
    public viewsCount: number,
    public sentAt?: string | null,
    public scheduledAt?: string | null,
  ) {}
}
