import { IPerson } from '@src/lib/interfaces/IPersone';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse<IPerson>): void => {
  console.log(req.body);
  const data: IPerson = JSON.parse(req.body);
  res.status(200).json(data);
};
