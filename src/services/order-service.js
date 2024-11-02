import OrderDto from "../dtos/order-dto.js";
import { OrderRepository } from "../repositories/order-repository.js";
import APIError from "../utils/response/error.js";
import ProductService from "./product-service.js";
const orderRepo = new OrderRepository();

const OrderService = {
  create: async function (orderData) {
    if (
      !orderData.userId ||
      !orderData.products ||
      orderData.products.length === 0
    ) {
      throw new APIError("Order must include a user and at least one product.");
    }
    console.log(orderData.products, "products");

    const totalPrice = orderData.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    for (const item of orderData.products) {
      await ProductService.decreaseProductCount(item.product, item.quantity);
    }

    const newOrder = await orderRepo.create({
      ...orderData,
      user: orderData.userId,
      totalPrice,
      status: orderData.status || "pending",
      paymentMethod: orderData.paymentMethod || "cash",
    });
    console.log(newOrder, "neworder");

    return new OrderDto(newOrder);
  },

  getAll: async function () {
    const { result } = await orderRepo.findAll();

    if (result.length === 0) {
      throw new APIError("No orders found!");
    }

    const activeOrders = result.filter((order) => !order.isDeleted);

    return activeOrders.map((order) => new OrderDto(order));
  },

  getById: async function (orderId) {
    const order = await orderRepo.findByID(orderId);
    if (!order || order.isDeleted) {
      throw new APIError("Order not found!");
    }

    return new OrderDto(order);
  },

  update: async function (orderId, orderData) {
    const order = await orderRepo.findByID(orderId);

    if (!order) {
      throw new APIError("Order not found!");
    }

    order.status = orderData.status || order.status;
    order.paymentMethod = orderData.paymentMethod || order.paymentMethod;
    order.shippingAddress = orderData.shippingAddress || order.shippingAddress;

    const updatedOrder = await orderRepo.update(orderId, order);

    return new OrderDto(updatedOrder);
  },

  delete: async function (orderId) {
    const order = await orderRepo.findByID(orderId);

    if (!order || order.isDeleted) {
      throw new APIError("Order not found!");
    }

    order.isDeleted = true;
    const deletedOrder = await orderRepo.update(orderId, order);

    return new OrderDto(deletedOrder);
  },

  deleteAll: async function () {
    const orders = await orderRepo.findByFields({ isDeleted: false });

    if (orders.length === 0) {
      throw new APIError("No orders found!");
    }

    const deletedOrders = [];
    for (let order of orders) {
      order.isDeleted = true;
      const deletedOrder = await orderRepo.update(order._id, order);
      deletedOrders.push(new OrderDto(deletedOrder));
    }

    return deletedOrders;
  },
};

export default OrderService;
