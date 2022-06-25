import { Order, OrderStatus } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";
import { OrderInput, OrderUpdateInput } from "../dto";

export const findOrders = async (): Promise<Order[]> => {
  return database.order.findMany();
};

export const findOrderById = async (id: string): Promise<Order | null> => {
  return database.order.findUnique({
    where: {
      id,
    },
  });
};

export const createOrder = async (data: OrderInput): Promise<Order> => {
  return database.order.create({
    data,
  });
};

export const updateOrder = async (
  id: string,
  data: OrderUpdateInput
): Promise<Order | null> => {
  return database.order.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteOrder = async (id: string): Promise<Order | null> => {
  try {
    return database.order.delete({
      where: {
        id,
      },
    });
  } catch (_) {
    return null;
  }
};

export const findCustomerOrders = async (
  customerId: string
): Promise<Order[]> => {
  return database.order.findMany({
    where: {
      customerId,
    },
  });
};

export const findOrdersByStatus = async (
  status: OrderStatus
): Promise<Order[]> => {
  return database.order.findMany({
    where: {
      status,
    },
  });
};

export const findOrdersWithinOrderedDates = async (
  startDate: Date,
  endDate: Date
): Promise<Order[]> => {
  return database.order.findMany({
    where: {
      orderedAt: {
        lte: endDate,
        gte: startDate,
      },
    },
  });
};

export const findOrdersWithinShippedDates = async (
  startDate: Date,
  endDate: Date
): Promise<Order[]> => {
  return database.order.findMany({
    where: {
      shippedAt: {
        lte: endDate,
        gte: startDate,
      },
    },
  });
};

export const findOrdersWithinDeliveredDates = async (
  startDate: Date,
  endDate: Date
): Promise<Order[]> => {
  return database.order.findMany({
    where: {
      deliveredAt: {
        lte: endDate,
        gte: startDate,
      },
    },
  });
};
