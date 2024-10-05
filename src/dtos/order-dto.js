export default class OrderDto {
  constructor(order) {
    this.id = order._id;
    this.user = order.user;
    this.products = order.products.map((item) => ({
      ...item.product,
      quantity: item.quantity,
      price: item.price,
    }));
    this.totalPrice = order.totalPrice;
    this.status = order.status;
    this.paymentMethod = order.paymentMethod;
    this.shippingAddress = order.shippingAddress;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }
}
