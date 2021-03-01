import { connectFind } from '../../../shared/mongo';

export default async (req: any, res: any) => {
  const {
    query: { article = '' },
  } = req;
  const response: any = await connectFind({
    col: 'products',
    query: { article },
    options: {},
  });

  res.statusCode = 200;
  res.json(response?.items?.[0]);
};
