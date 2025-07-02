import { Request, Response } from 'express';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/data-source';
import { generateToken } from '../utils/jwt';

const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, department } = req.body;

    const existing = await userRepo.findOneBy({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = userRepo.create({ name, email, password: hashed, role, department });

    const savedUser = await userRepo.save(user);
    res.status(201).json({ message: 'User registered', user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepo.findOneBy({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken({
      userID: user.userID,
      role: user.role,
      department: user.department,
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
