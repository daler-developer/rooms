export class Invitation {
  constructor(
    public userId: number,
    public roomId: number,
    public inviterId: number,
    public createdAt: String,
  ) {}
}
