import 'reflect-metadata';
import { setupSwaggerDocs } from './swagger';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/auth.routes';
import purchaseRequestRoutes from './routes/purchaseRequest.routes';
import vendorRoutes from './routes/vendor.routes';
import orderRoutes from './routes/order.routes';
import approvalRoutes from './routes/approval.routes';
import budgetRoutes from './routes/budget.routes';
import dashboardRoutes from './routes/dashboard.routes';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
// Start the server after DB connects
AppDataSource.initialize()
  .then(() => {
    setupSwaggerDocs(app);
    console.log('✅ Database connected');

    app.get('/', (req, res) => {
      res.send('PO System API running...');
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
    app.use('/api/auth', authRoutes);
    app.use('/api/requests', purchaseRequestRoutes);
    app.use('/api/vendors', vendorRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/approvals', approvalRoutes);
    app.use('/api/budgets', budgetRoutes);
    app.use('/api/dashboard', dashboardRoutes);
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
  });
