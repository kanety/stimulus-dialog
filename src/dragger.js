export default class Dragger {
  constructor(controller) {
    this.controller = controller;

    this.startPos = [0, 0];
    this.targetPos = [0, 0];
  }

  get dialogTarget() {
    return this.controller.dialogTarget;
  }

  get dragTarget() {
    return this.controller.dragTarget;
  }

  start(pos) {
    this.startPos = pos;
    this.targetPos = this.parseTransform(this.dialogTarget);
    this.dragTarget.classList.add('st-dialog--disable-select');
  }

  move(pos) {
    let d = [pos[0] - this.startPos[0], pos[1] - this.startPos[1]];
    let t = [this.targetPos[0] + d[0], this.targetPos[1] + d[1]];
    this.dialogTarget.style.transform = `translate(${t[0]}px, ${t[1]}px)`;
  }

  end() {
    this.dragTarget.classList.remove('st-dialog--disable-select');
  }

  parseTransform(element) {
    let matched = window.getComputedStyle(element).transform.match(/matrix\((.+)\)/)
    if (matched) {
      let values = matched[1].split(',');
      return [parseInt(values[4]), parseInt(values[5])];
    } else {
      return [0, 0]
    }
  }
}
