import { Request, Response } from 'express';

export default {
  'GET /api/product/list': async (req: Request, res: Response) => {
    res.send({
      code: 200,
      success: true,
      data: {},
    });
  },
};
