describe('basic', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dialog">
        <div data-dialog-target="dialog">
          <h1>Title</h1>
          <hr>
          <button type="button" value="ok" data-dialog-target="focus" data-action="dialog#close">OK</button>
          <button type="button" value="cancel" data-action="dialog#close">Cancel</button>
        </div>
        <button type="button" value="open" data-action="dialog#open">Open</button>
      </div>
    `;
  });

  it('opens and closes dialog', () => {
    $('button[value="open"]').click();
    expect($('[data-dialog-target="dialog"]').matches('.st-dialog--visible')).toEqual(true);
    $('button[value="ok"]').click();
    expect($('[data-dialog-target="dialog"]').matches('.st-dialog--visible')).toEqual(false);
  });

  it('closes dialog by ESC', () => {
    $('button[value="open"]').click();
    window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }));
    expect($('[data-dialog-target="dialog"]').matches('.st-dialog--visible')).toEqual(false);
  });

  it('focuses', () => {
    $('button[value="open"]').click();
    expect(document.activeElement.value).toEqual('ok');
  });
});
