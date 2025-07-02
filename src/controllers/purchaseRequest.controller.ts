import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { PurchaseRequest } from '../entities/PurchaseRequest';
import { AuthRequest } from '../middleware/auth.middleware';

const repo = AppDataSource.getRepository(PurchaseRequest);

export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { itemName, quantity, department } = req.body;
    const request = repo.create({
      itemName,
      quantity,
      department,
      requestedBy: req.user.userID,
    });
    const result = await repo.save(request);
    res.status(201).json({ message: 'Request created', result });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await repo.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateRequestStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await repo.findOneBy({ requestID: parseInt(id) });
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    await repo.save(request);
    res.json({ message: 'Status updated', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
