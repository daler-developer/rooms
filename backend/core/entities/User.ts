export class User {
  constructor(
    public id: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public isBlocked: boolean,
    public invitationsCount: number,
    public isOnline: boolean,
    public profilePictureUrl: string,
  ) {}
}
