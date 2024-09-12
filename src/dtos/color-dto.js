export default class ColorDto {
  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.hex = data.hex;
    this.isDeleted = data.isDeleted;
  }
}
