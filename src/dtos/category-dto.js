export default class CategoryDto {
  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.isDeleted = data.isDeleted;
  }
}
