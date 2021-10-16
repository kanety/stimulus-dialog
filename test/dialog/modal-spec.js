describe('modal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dialog">
        <div data-dialog-target="modal">
          <div data-dialog-target="dialog">
            <h1>Title</h1>
            <hr>
            <button type="button" value="ok" data-action="dialog#close">OK</button>
            <button type="button" value="cancel" data-action="dialog#close">Cancel</button>
          </div>
        </div>
        <button type="button" value="open" data-action="dialog#open">Open</button>
      </div>
    `;
  });

  it('opens modal', () => {
    $('button[value="open"]').click();
    expect($('[data-dialog-target="modal"]').matches('.st-dialog-modal--visible')).toEqual(true);
    expect($('[data-dialog-target="dialog"]').matches('.st-dialog--visible')).toEqual(true);
  });

  it('closes modal', () => {
    $('button[value="open"]').click();
    $('button[value="ok"]').click();
    expect($('[data-dialog-target="modal"]').matches('.st-dialog-modal--visible')).toEqual(false);
    expect($('[data-dialog-target="dialog"]').matches('.st-dialog--visible')).toEqual(false);
  });

  it('closes modal by mouse', () => {
    $('button[value="open"]').click();
    $('[data-dialog-target="modal"]').click();
    expect($('[data-dialog-target="modal"]').matches('.st-dialog-modal--visible')).toEqual(false);
    expect($('[data-dialog-target="dialog"]').matches('.st-dialog--visible')).toEqual(false);
  });
});
