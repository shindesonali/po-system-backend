import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Approval } from '../entities/Approval';
import { AuthRequest } from '../middleware/auth.middleware';
import { PurchaseRequest } from '../entities/PurchaseRequest';

const approvalRepo = AppDataSource.getRepository(Approval);
const requestRepo = AppDataSource.getRepository(PurchaseRequest);

export const getAllApprovals = async (_req: Request, res: Response) => {
  try {
    const approvals = await approvalRepo.find();
    res.json(approvals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const approveRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { requestID, status, comments } = req.body;

    const purchaseRequest = await requestRepo.findOneBy({ requestID });
    if (!purchaseRequest) {
      return res.status(404).json({ message: 'Purchase request not found' });
    }

    purchaseRequest.status = status;
    await requestRepo.save(purchaseRequest);

    const approval = approvalRepo.create({
      requestID,
      approvedBy: req.user.userID,
      status,
      comments,
    });

    const saved = await approvalRepo.save(approval);

    res.status(201).json({ message: 'Approval saved', approval: saved });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
