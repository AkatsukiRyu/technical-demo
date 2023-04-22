import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

@Component({
  template: ''
})
export abstract class fieldBased implements ControlValueAccessor {
  @Input() public label!: string;
  @Input() public isRequired: boolean = false;
  @Input() public type: string = 'text';
  @Input() public labelClassName!: string | string[];
  @Input() public inputClassName!: string | string[];
  @Input() public placeholder!: string;
  @Input() public disabled!: boolean;
  @Input() public errorMessage!: string;

  @Output() changes = new EventEmitter<string | number>();
  @Output() blurs = new EventEmitter();

  public onchange = (value: string | number) => { };
  public onTouched = () => { };

  public abstract writeValue(obj: any): void;

  public onBlur(event: any): void {
    this.blurs.emit();
  }

  registerOnChange(fn: () => void): void {
    this.onchange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
