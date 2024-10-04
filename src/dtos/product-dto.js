export default class ProductDto {
  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.category = data.category;
    this.subcategory = data.subcategory;
    this.brand = data.brand;
    this.price = data.price;
    this.stock = data.stock;
    this.inStock = data.inStock;
    this.color = data.color;
    this.description = data.description;
    this.image = data.image;
    this.reviews = data.reviews;
    this.isDeleted = data.isDeleted;
  }
}
