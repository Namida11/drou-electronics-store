import UserDto from "./user-dto.js";

export default class LoginDto {
  constructor(data) {
    this.user = new UserDto(data);
  }
}
