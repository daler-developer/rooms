export class UserRoomNewMessagesCountAddDto {
  constructor(
    public userId: number,
    public roomId: number,
    public count: number,
  ) {}
}
