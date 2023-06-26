import { Request, Response, NextFunction } from 'express';
interface CustomRequest extends Request {
  user: any;
}

function tokenValidate(req: CustomRequest, res: Response, next: NextFunction) {
  req.user = { user_id: '648815f993741781d1067169' };
  next();
}
export default tokenValidate;
