export default class SubCategoryDto {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.parentCtgID = data.parentCategoryID;
  }
}
