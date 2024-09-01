import UserDto from "./user-dto.js";

export default class AuthDto {
  constructor(data) {
    this.token = data.token;
    this.confirmPassword = data.confirmPassword;
    this.user = new UserDto(data.user);
  }
}
