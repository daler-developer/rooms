export class UserToRoomParticipationAddManyDto {
  constructor(
    public userIds: number[],
    public roomId: number,
  ) {}
}
