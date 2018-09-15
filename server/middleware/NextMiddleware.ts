import { KoaMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export default class NextMiddleware implements KoaMiddlewareInterface {

  public async use(context: any, next: (err?: any) => any) {
    await context.nextHandler(context.req, context.res);
    context.respond = false;
    await next();
  }
}
