import { IPerson } from '@src/lib/interfaces/IPersone';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse<IPerson | Error>): void => {
  const {
    query: { id },
  } = req;

  if (typeof id === 'string') {
    console.log(`getting person by id: ${id}`);
    res.status(200).json({ name: 'John Doe,', id: '1', age: 25 });
  } else {
    res.status(500).json(new Error('id '));
  }
};
