export default class UserDto {
  constructor(data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.role = data.role;
    this.active = data.isActive;
  }
}
