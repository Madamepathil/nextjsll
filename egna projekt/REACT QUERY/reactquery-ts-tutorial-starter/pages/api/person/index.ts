import { IPerson } from '@src/lib/interfaces/IPersone';
import { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse<IPerson>): void => {
  console.log('getting person');
  res.status(200).json({ name: 'John Doe,', id: '1', age: 25 });
};
