import { Response } from 'express';

const sendToken = (data: object, status: number, res: Response) => {
  return res.status(status).json(data);
};

export { sendToken };
