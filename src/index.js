import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import './index.scss';

import Dragger from './dragger';

export default class extends Controller {
  static targets = ['dialog', 'modal', 'focus', 'drag'];
  static actions = [
    ['element', 'keydown@window->closeByKey'],
    ['modal', 'click->closeByModal'],
    ['drag', 'mousedown->dragStart'],
    ['drag', 'touchstart->dragStart']
  ];
  static dragActions = [
    ['element', 'mousemove@window->dragMove'],
    ['element', 'touchmove@window->dragMove'],
    ['element', 'mouseup@window->dragEnd'],
    ['element', 'touchend@window->dragEnd']
  ];

  initialize() {
    this.dragger = new Dragger(this);
  }

  open(e) {
    this.openBy(e.target);
    e.preventDefault();
  }

  close(e) {
    this.closeBy(e.target);
    e.preventDefault();
  }

  toggle(e) {
    if (this.isVisible()) {
      this.closeBy(e.target);
    } else {
      this.openBy(e.target);
    }
    e.preventDefault();
  }

  closeByKey(e) {
    if (e.keyCode == 27) {
      this.closeBy(e.target);
      e.preventDefault();
    }
  }

  closeByModal(e) {
    if (!this.dialogTarget.contains(e.target)) {
      this.closeBy(e.target);
    }
  }

  dragStart(e) {
    let ee = e.changedTouches ? e.changedTouches[0] : e;
    this.dragger.start([ee.pageX, ee.pageY]);
    this.context.actionSet.add(this.constructor.dragActions);
  }

  dragMove(e) {
    let ee = e.changedTouches ? e.changedTouches[0] : e;
    this.dragger.move([ee.pageX, ee.pageY]);
  }

  dragEnd(e) {
    this.dragger.end([e.pageX, e.pageY]);
    this.context.actionSet.remove(this.constructor.dragActions);
  }

  isVisible() {
    return this.dialogTarget.classList.contains('st-dialog--visible');
  }

  openBy(target) {
    this.toggleClass(true);

    if (this.hasFocusTarget) {
      this.focusTarget.focus();
    }
  
    this.dispatch('opened', { detail: { target: target } });
  }

  closeBy(target) {
    this.toggleClass(false);

    this.dispatch('closed', { detail: { target: target } });
  }

  toggleClass(visible) {
    if (visible) {
      this.dialogTarget.classList.add('st-dialog--visible');
      if (this.hasModalTarget) {
        this.modalTarget.classList.add('st-dialog-modal--visible');
        document.body.classList.add('st-dialog--disable-scroll');
      }
    } else {
      this.dialogTarget.classList.remove('st-dialog--visible');
      if (this.hasModalTarget) {
        this.modalTarget.classList.remove('st-dialog-modal--visible');
        document.body.classList.remove('st-dialog--disable-scroll');
      }
    }
  }
}
