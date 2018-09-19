import { default as Koa } from 'koa';
import { useKoaServer} from 'routing-controllers';

import { IContext } from '@server/types';
// import compress from 'koa-compress';
// import helmet from 'koa-helmet';
import serve from 'koa-static';
import { default as Next } from 'next';
import { resolve } from 'path';

const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const server = new Koa();

  //  bootstrap koa middleware
  // server
  //  .use(compress({
  //    threshold: 256,
  //  }))
  //  .use(helmet({
  //    frameguard: false,
  //  }))
  server.use(serve('/static', {
   }));

  // server.use(async (ctx: any, next: () => any) => {
  //    ctx.status = 200;
  //    ctx.respond = false;
  //    await next();
  //  });

  useKoaServer(server, {
    controllers: [resolve(__dirname, './controllers/**/*')],
    middlewares: [resolve(__dirname, './middleware/**/*')],
    defaults: {
      undefinedResultCode: 200,
    },
  });

  // inject render to context
  const context: IContext = server.context as IContext;
  context.render = app.render.bind(app);
  context.nextHandler = handler.bind(app);
  server.context = context;

  server.listen(3000);
});
