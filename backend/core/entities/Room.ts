export class Room {
  constructor(
    public id: number,
    public name: string,
    public participantsCount: number,
    public messagesCount: number,
    public pendingInvitationsCount: number,
    public thumbnailUrl?: string,
  ) {}
}
