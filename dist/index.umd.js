!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("@hotwired/stimulus"),require("@kanety/stimulus-static-actions")):"function"==typeof define&&define.amd?define(["@hotwired/stimulus","@kanety/stimulus-static-actions"],e):(t||self).StimulusDialog=e(t.Stimulus)}(this,function(t){class e{constructor(t){this.controller=t,this.startPos=[0,0],this.targetPos=[0,0]}get dialogTarget(){return this.controller.dialogTarget}get dragTarget(){return this.controller.dragTarget}start(t){this.startPos=t,this.targetPos=this.parseTransform(this.dialogTarget),this.dragTarget.classList.add("st-dialog--disable-select")}move(t){var e=[t[0]-this.startPos[0],t[1]-this.startPos[1]],s=[this.targetPos[0]+e[0],this.targetPos[1]+e[1]];this.dialogTarget.style.transform="translate("+s[0]+"px, "+s[1]+"px)"}end(){this.dragTarget.classList.remove("st-dialog--disable-select")}parseTransform(t){var e=window.getComputedStyle(t).transform.match(/matrix\((.+)\)/);if(e){var s=e[1].split(",");return[parseInt(s[4]),parseInt(s[5])]}return[0,0]}}class s extends t.Controller{initialize(){this.dragger=new e(this)}open(t){this.openBy(t.target),t.preventDefault()}close(t){this.closeBy(t.target),t.preventDefault()}closeByKey(t){27==t.keyCode&&(this.closeBy(t.target),t.preventDefault())}closeByModal(t){this.dialogTarget.contains(t.target)||this.closeBy(t.target)}dragStart(t){var e=t.changedTouches?t.changedTouches[0]:t;this.dragger.start([e.pageX,e.pageY]),this.context.actionSet.add(this.constructor.dragActions)}dragMove(t){var e=t.changedTouches?t.changedTouches[0]:t;this.dragger.move([e.pageX,e.pageY])}dragEnd(t){this.dragger.end([t.pageX,t.pageY]),this.context.actionSet.remove(this.constructor.dragActions)}openBy(t){this.dialogTarget.classList.add("st-dialog--visible"),this.hasModalTarget&&this.setModal(),this.hasFocusTarget&&this.focusTarget.focus(),this.dispatch("opened",{detail:{target:t}})}closeBy(t){this.dialogTarget.classList.remove("st-dialog--visible"),this.hasModalTarget&&this.unsetModal(),this.dispatch("closed",{detail:{target:t}})}setModal(){this.modalTarget.classList.add("st-dialog--visible"),document.body.classList.add("st-dialog--disable-scroll")}unsetModal(){this.modalTarget.classList.remove("st-dialog--visible"),document.body.classList.remove("st-dialog--disable-scroll")}}return s.targets=["dialog","modal","focus","drag"],s.actions=[["element",":open->open"],["element",":close->close"],["element","keydown@window->closeByKey"],["modal","click->closeByModal"],["drag","mousedown->dragStart"],["drag","touchstart->dragStart"]],s.dragActions=[["element","mousemove@window->dragMove"],["element","touchmove@window->dragMove"],["element","mouseup@window->dragEnd"],["element","touchend@window->dragEnd"]],s});
//# sourceMappingURL=index.umd.js.map
