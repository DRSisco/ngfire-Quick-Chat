import { QuickChatPage } from './app.po';

describe('quick-chat App', () => {
  let page: QuickChatPage;

  beforeEach(() => {
    page = new QuickChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
