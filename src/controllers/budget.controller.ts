import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Budget } from '../entities/Budget';

const budgetRepo = AppDataSource.getRepository(Budget);

export const getAllBudgets = async (_req: Request, res: Response) => {
  try {
    const budgets = await budgetRepo.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createBudget = async (req: Request, res: Response) => {
  try {
    const { department, allocatedBudget } = req.body;

    const existing = await budgetRepo.findOneBy({ department });
    if (existing) {
      return res.status(400).json({ message: 'Budget already exists for this department' });
    }

    const budget = budgetRepo.create({ department, allocatedBudget });
    const result = await budgetRepo.save(budget);
    res.status(201).json({ message: 'Budget created', budget: result });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const useBudget = async (req: Request, res: Response) => {
  const { department } = req.params;
  const { amount } = req.body;

  try {
    const budget = await budgetRepo.findOneBy({ department });
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    budget.utilizedBudget += parseFloat(amount);
    await budgetRepo.save(budget);
    res.json({ message: 'Budget updated', budget });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
