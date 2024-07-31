import express from 'express';
import employeeRoutes from './routes/employeeRoutes';
import roleRoutes from './routes/roleRoutes';

const app = express();
app.use(express.json());

app.use('/api', employeeRoutes);
app.use('/api', roleRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
