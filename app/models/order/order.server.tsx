import { Order, OrderStatus } from "@prisma/client";
import { database } from "~/helpers/db-helper.server";
import type { OrderInput, OrderUpdateInput } from "../dto";

export const findOrders = async (): Promise<Order[]> => {
  return database.order.findMany({
    include: {
      productInstances: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const findOrderById = async (id: string): Promise<Order | null> => {
  return database.order.findUnique({
    where: {
      id,
    },
    include: {
      productInstances: {
        include: {
          product: true,
        },
      },
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
    return database.order.update({
      where: {
        id,
      },
      data: {
        status: OrderStatus.CANCELLED,
      }
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
    include: {
      productInstances: {
        include: {
          product: true,
        },
      },
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
    include: {
      productInstances: {
        include: {
          product: true,
        },
      },
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
    include: {
      productInstances: {
        include: {
          product: true,
        },
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
    include: {
      productInstances: {
        include: {
          product: true,
        },
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
    include: {
      productInstances: {
        include: {
          product: true,
        },
      },
    },
  });
};
