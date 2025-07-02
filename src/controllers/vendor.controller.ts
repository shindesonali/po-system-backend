import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Vendor } from '../entities/Vendor';

const vendorRepo = AppDataSource.getRepository(Vendor);

export const getAllVendors = async (_req: Request, res: Response) => {
  try {
    const vendors = await vendorRepo.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createVendor = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, rating } = req.body;

    const vendor = vendorRepo.create({ name, email, phone, address, rating });
    const result = await vendorRepo.save(vendor);

    res.status(201).json({ message: 'Vendor created', vendor: result });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
