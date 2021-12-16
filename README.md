# stimulus-dialog

A stimulus controller for simple dialog.

## Dependencies

* @hotwired/stimulus 3.0

## Installation

Install from npm:

    $ npm install @kanety/stimulus-dialog --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import DialogController from '@kanety/stimulus-dialog';

const application = Application.start();
application.register('dialog', DialogController);
```

Import css:

```css
@import '@kanety/stimulus-dialog';
```

Build html as follows:

```html
<div data-controller="dialog">
  <div class="st-dialog" data-dialog-target="dialog">
    <h1>Title</h1>
    <p>content1</p>
    <p>content2</p>
    <hr>
    <button type="button" data-action="dialog#close">OK</button>
    <button type="button" data-action="dialog#close">Cancel</button>
  </div>
  <button type="button" data-action="dialog#open">Open</button>
</div>
```

### Options

#### focus

Set element focused when dialog is opened:

```html
<button type="button" data-dialog-target="focus" data-action="dialog#close">OK</button>
```

#### drag

Make dialog draggable:

```html
<div data-controller="dialog">
  <div class="st-dialog" data-dialog-target="dialog">
    <h1 data-dialog-target="drag">Title</h1>
  </div>
</div>
```

#### modal

You can use modal dialog by wrapping dialog element as follows:

```html
<div data-controller="dialog">
  <div class="st-dialog-modal" data-dialog-target="modal">
    <div class="st-dialog" data-dialog-target="dialog">
    </div>
  </div>
</div>
```

### Callbacks

Run callbacks when dialog is opened or closed:

```javascript
let element = document.querySelector('[data-controller="dialog"]');
element.addEventListener('dialog:opend', e => {
  console.log("opened by " + e.detail.target);
});
element.addEventListener('dialog:closed', e => {
  console.log("closed by " + e.detail.target);
});
```

### Event operations

Open, close or toggle dialog via event:

```html
<div data-controller="dialog"
     data-action="dialog:open->dialog#open dialog:close->dialog#close dialog:toggle->dialog#toggle">
</div>
```

```javascript
let element = document.querySelector('[data-controller="dialog"]');
element.dispatchEvent(new CustomEvent('dialog:open'));
element.dispatchEvent(new CustomEvent('dialog:close'));
element.dispatchEvent(new CustomEvent('dialog:toggle'));
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
