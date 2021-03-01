import { connectFind } from '../../../shared/mongo';

export default async (_: any, res: any) => {
  const response: any = await connectFind({
    col: 'categories',
    query: {},
    options: {},
  });

  console.log(response);

  res.statusCode = 200;
  res.json(response);
};
