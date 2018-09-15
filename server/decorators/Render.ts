import { createParamDecorator } from 'routing-controllers';

export type Renderer = (path: string, query?: any) => any;

export default function Render() {
  return createParamDecorator({
    value: (action) => {
      return (path: string, query: any): Renderer => {
        action.context.respond = false;
        return action.context.render(action.context.req, action.context.res, path, query);
      };
    },
  });
}
