import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import setupSwagger from './swagger';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const checkAuthHeader = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const token = authHeader.split(' ')[1];
    if (token !== 'DEVCREW-BACKEND-TEST') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    next();
  };
  

  const validatePayload = (req: Request, res: Response, next: NextFunction) => {
    const { a, b } = req.body;
  
    //a,b must be defined
    if (a === undefined || b === undefined) {
      return res.status(422).json({ error: 'Unsupported data format' });
    }
    
    //a,b must be number
    if (typeof a !== 'number' || typeof b !== 'number') {
      return res.status(422).json({ error: 'Unsupported data format' });
    }
  
    next();
  };

// check if the error is a JSON syntax error
const isJsonSyntaxError = (err: any) => {
return err instanceof SyntaxError && ('body' in err || err instanceof SyntaxError);
};

// handle JSON syntax errors
const handleJsonSyntaxErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (isJsonSyntaxError(err)) {
      return res.status(400).json({ error: 'Invalid JSON syntax' });
    }
    next();
};

  // handle other errors
  const handleOtherErrorsMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  };


/**
 * @swagger
 * /multiply:
 *   post:
 *     summary: Multiply two numbers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               a:
 *                 type: number
 *                 example: 10
 *               b:
 *                 type: number
 *                 example: 6
 *     responses:
 *       200:
 *         description: Result of multiplication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   example: 60
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       422:
 *         description: Unsupported data format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unsupported data format
 */
app.post('/multiply', checkAuthHeader, validatePayload, (req: Request, res: Response) => {
  const { a, b } = req.body;
  const result = a * b;
  res.status(200).json({ result });
});

setupSwagger(app);

app.use(handleJsonSyntaxErrorMiddleware);
app.use(handleOtherErrorsMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});