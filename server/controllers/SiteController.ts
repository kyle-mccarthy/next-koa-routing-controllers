import Render, { Renderer } from '@server/decorators/Render';
import { Controller, Ctx, Get } from 'routing-controllers';

@Controller('/')
export default class SiteController {

  @Get('/')
  public async index(@Render() render: Renderer, @Ctx() ctx: any) {
    ctx.response.status = 200;
    await render('/Index');
  }

}
