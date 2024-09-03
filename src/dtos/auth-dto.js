import UserDto from "./user-dto.js";

export default class AuthDto {
  constructor(data) {
    this.token = data.token;
    this.user = new UserDto(data.user);
  }
}
