import OrderService from "../services/order-service.js";
import { ErrorResponse, SuccessResponse } from "../utils/response/response.js";

const OrderController = {
  create: async function (req, res, next) {
    try {
      const userId = req.user.id;
      console.log(userId);
      const orderData = { ...req.body, userId };
      console.log(orderData);

      const order = await OrderService.create(orderData);

      if (!order) {
        return res.json(new ErrorResponse(400, "Order could not be created"));
      }

      return res.json(
        new SuccessResponse(201, "Order created successfully", order)
      );
    } catch (error) {
      next(error);
    }
  },

  getAll: async function (req, res, next) {
    try {
      const orders = await OrderService.getAll();

      if (orders.length === 0) {
        return res.json(new ErrorResponse(404, "No orders found"));
      }

      return res.json(
        new SuccessResponse(200, "Orders retrieved successfully", orders)
      );
    } catch (error) {
      next(error);
    }
  },

  getById: async function (req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.getById(id);

      if (!order) {
        return res.json(new ErrorResponse(404, "Order not found"));
      }

      return res.json(
        new SuccessResponse(200, "Order retrieved successfully", order)
      );
    } catch (error) {
      next(error);
    }
  },

  update: async function (req, res, next) {
    try {
      const { id } = req.params;
      const orderData = req.body;

      const updatedOrder = await OrderService.update(id, orderData);

      if (!updatedOrder) {
        return res.json(
          new ErrorResponse(404, "Order not found or not updated")
        );
      }

      return res.json(
        new SuccessResponse(200, "Order updated successfully", updatedOrder)
      );
    } catch (error) {
      next(error);
    }
  },

  delete: async function (req, res, next) {
    try {
      const { id } = req.params;

      const deletedOrder = await OrderService.delete(id);

      if (!deletedOrder) {
        return res.json(
          new ErrorResponse(404, "Order not found or already deleted")
        );
      }

      return res.json(
        new SuccessResponse(200, "Order deleted successfully", deletedOrder)
      );
    } catch (error) {
      next(error);
    }
  },

  deleteAll: async function (req, res, next) {
    try {
      const deletedOrders = await OrderService.deleteAll();

      if (deletedOrders.length === 0) {
        return res.json(new ErrorResponse(404, "No orders found to delete"));
      }

      return res.json(
        new SuccessResponse(
          200,
          "All orders deleted successfully",
          deletedOrders
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default OrderController;
