import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.VITE_APP_SERVER_PORT || 6060;

app.use(cors());

app.get('/api/messages/protected', (req: Request, res: Response) => {
  res.json({
    message:
      'This is a protected message from protectedApi server running on 6060',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
