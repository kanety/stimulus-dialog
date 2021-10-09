import { Application } from '@hotwired/stimulus';
import DialogController from 'index';

const application = Application.start();
application.register('dialog', DialogController);

describe('callbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dialog">
        <div data-dialog-target="dialog">
          <h1 data-dialog-target="drag">Title</h1>
          <hr>
          <button type="button" value="ok" data-action="dialog#close">OK</button>
          <button type="button" value="cancel" data-action="dialog#close">Cancel</button>
        </div>
        <button type="button" value="open" data-action="dialog#open">Open</button>
      </div>
    `;
  });

  let message;
  beforeEach(() => {
    $('[data-controller="dialog"]').addEventListener('dialog:opened', e => {
      message = 'opened by ' + e.detail.target.value;
    });
    $('[data-controller="dialog"]').addEventListener('dialog:closed', e => {
      message = 'closed by ' + e.detail.target.value;
    });
  });

  it('runs callbacks', () => {
    $('button[value="open"]').click();
    expect(message).toEqual('opened by open');
    $('button[value="ok"]').click();
    expect(message).toEqual('closed by ok');
  });
});
