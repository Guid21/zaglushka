import { connectFind } from '../../../shared/mongo';

export default async (req: any, res: any) => {
  const {
    query: { name = '' },
  } = req;
  const response: any = await connectFind({
    col: 'products',
    query: { sub_cat: name },
    options: {},
  });

  res.statusCode = 200;
  res.json(response);
};
