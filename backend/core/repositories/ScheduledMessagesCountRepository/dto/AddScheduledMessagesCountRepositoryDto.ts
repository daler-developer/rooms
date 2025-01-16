export class AddScheduledMessagesCountRepositoryDto {
  constructor(
    public userId: number,
    public roomId: number,
    public count: number,
  ) {}
}
