export class CreateRoomDto {
  constructor(
    public creatorId: number,
    public name: string,
    public thumbnailUrl: string,
  ) {}
}
