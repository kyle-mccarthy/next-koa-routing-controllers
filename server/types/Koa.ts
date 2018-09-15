import { BaseContext } from 'koa';

export interface IContext extends BaseContext {
  render: (req: any, res: any, path: string, query?: any) => any;
  nextHandler: (req: any, res: any) => any;
}
