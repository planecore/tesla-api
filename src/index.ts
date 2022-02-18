import express from 'express';
import { authMiddleware } from './middlewares/authentication';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.post('/sentry', authMiddleware, async (req, res) => {
  const on = req.body.on ?? true;
  const result = await req.vehicle?.commands.sentry(on).catch(() => false);
  return res.status(result ? 200 : 500).send({ success: result });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
