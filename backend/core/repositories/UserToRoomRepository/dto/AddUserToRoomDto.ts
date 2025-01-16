export class AddUserToRoomDto {
  constructor(
    public userId: number,
    public roomId: number,
  ) {}
}
