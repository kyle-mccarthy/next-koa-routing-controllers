import { KoaMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export default class NextMiddleware implements KoaMiddlewareInterface {

  public async use(context: any, next: (err?: any) => any) {
    context.respond = false;
    if (context.res.finished !== true) {
      await context.nextHandler(context.req, context.res);
    }
    await next();
  }
}
