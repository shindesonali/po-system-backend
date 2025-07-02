import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { PurchaseRequest } from '../entities/PurchaseRequest';
import { PurchaseOrder } from '../entities/PurchaseOrder';
import { Budget } from '../entities/Budget';

export const getDashboardSummary = async (_req: Request, res: Response) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const requestRepo = AppDataSource.getRepository(PurchaseRequest);
    const orderRepo = AppDataSource.getRepository(PurchaseOrder);
    const budgetRepo = AppDataSource.getRepository(Budget);

    const [userCount, requestCount, orderCount, approvedCount, pendingCount, budgets] = await Promise.all([
      userRepo.count(),
      requestRepo.count(),
      orderRepo.count(),
      requestRepo.count({ where: { status: 'Approved' } }),
      requestRepo.count({ where: { status: 'Pending' } }),
      budgetRepo.find()
    ]);

    const totalAllocated = budgets.reduce((sum, b) => sum + b.allocatedBudget, 0);
    const totalUtilized = budgets.reduce((sum, b) => sum + b.utilizedBudget, 0);

    res.json({
      users: userCount,
      requests: {
        total: requestCount,
        approved: approvedCount,
        pending: pendingCount
      },
      orders: orderCount,
      budget: {
        totalAllocated,
        totalUtilized
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
