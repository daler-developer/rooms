export class AddOneInvitationDto {
  constructor(
    public userId: number,
    public roomId: number,
    public inviterId: number,
  ) {}
}
