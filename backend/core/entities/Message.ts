export class Message {
  constructor(
    public id: number,
    public text: string,
    public senderId: number,
    public createdAt: string,
    public roomId: number,
    public sentAt?: string | null,
    public scheduleAt?: string | null,
  ) {}
}
