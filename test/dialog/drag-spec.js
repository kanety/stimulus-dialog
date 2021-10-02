import { Application } from '@hotwired/stimulus';
import DialogController from 'index';

const application = Application.start();
application.register('dialog', DialogController);

describe('drag', () => {
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

  let drag, transform;
  beforeEach(() => {
    $('button[value="open"]').click();
    drag = $('[data-dialog-target="drag"]');
    transform = drag.style.transform;
    drag.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, pageX: 0, pageY: 0 }));
  });

  beforeEach(() => {
    drag.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, pageX: 5, pageY: 5 }));
    drag.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  });

  it('moves dialog by drag', () => {
    expect(drag.transform).not.toEqual(transform);
  });
});
