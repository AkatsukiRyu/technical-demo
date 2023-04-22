import { Directive } from '@angular/core';

@Directive({
    selector: '[toDoTaskTemplate]',
})
export class TodoTaskDirective { }

@Directive({
    selector: '[inprogressTaskTemplate]',
})
export class InprogressTaskDirective { }

@Directive({
    selector: '[doneTaskTemplate]',
})
export class DoneDirective { }