import { Controller, Get, Route } from 'tsoa';

@Route('test')
export class TestController extends Controller {
  @Get('/')
  public async test(): Promise<string> {
    return 'API is working!';
  }
}
