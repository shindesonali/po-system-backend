import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { PurchaseOrder } from '../entities/PurchaseOrder';

const orderRepo = AppDataSource.getRepository(PurchaseOrder);

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { requestID, vendorID, amount, deliveryDate } = req.body;

    const order = orderRepo.create({
      requestID,
      vendorID,
      amount,
      deliveryDate,
    });

    const result = await orderRepo.save(order);
    res.status(201).json({ message: 'Order created', order: result });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderRepo.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
