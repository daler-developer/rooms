export class AddUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePictureUrl?: string;

  constructor({
    firstName,
    lastName,
    email,
    password,
    profilePictureUrl,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePictureUrl?: string;
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.profilePictureUrl = profilePictureUrl;
  }
}
