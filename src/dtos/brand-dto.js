export default class BrandDto {
  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.isDeleted = data.isDeleted;
  }
}
