describe('event', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dialog" data-action="dialog:open->dialog#open dialog:close->dialog#close dialog:toggle->dialog#toggle">
        <div data-dialog-target="dialog">
          <h1>Title</h1>
          <hr>
        </div>
      </div>
    `;
  });

  it('toggles dialog', () => {
    $('[data-controller="dialog"]').dispatchEvent(new CustomEvent('dialog:toggle'))
    expect($('[data-dialog-target="dialog"]').matches('.st-dialog--visible')).toEqual(true);
    $('[data-controller="dialog"]').dispatchEvent(new CustomEvent('dialog:toggle'))
    expect($('[data-dialog-target="dialog"]').matches('.st-dialog--visible')).toEqual(false);
  });
});
