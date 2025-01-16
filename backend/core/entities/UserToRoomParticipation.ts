export class UserToRoomParticipation {
  constructor(
    public userId: number,
    public roomId: number,
    public createdAt: string,
  ) {}
}
