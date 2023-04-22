import { Component, forwardRef, ViewChild, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { fieldBased } from 'd-library/forms/based/field.based';

const CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
}

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR]
})
export class InputComponent extends fieldBased {
  @ViewChild('inputElement', {static: false})
  public inputElementRef!: ElementRef;

  @Input() public maxLength!: number;

  private _value!: string | number;

  constructor() { 
    super();
  }

  public get value() : string | number {
    return this._value
  }

  
  public set value(val: string | number) {
    if (this._value === val) {
      return;
    }

    const isValid = this.validateStringLength(`${val}`);
    if (!isValid) {
      this._value = `${val}`.slice(0, this.maxLength);
      this.inputElementRef.nativeElement.value = this._value;
      return;
    }

    this._value = val;

    if (this.inputElementRef) {
      this.inputElementRef.nativeElement.value = this._value;
    }
  
    this.changes.emit(this._value);
    this.onTouched();
    this.onchange(this._value);
  }

  public override writeValue(value: string | number): void {
    this.value = value;
  }

  private validateStringLength(value: string): boolean {
    if (typeof this.maxLength === 'number' && this.maxLength > 0) {
      return value.length <= this.maxLength;
    }

    return true;
  } 
}
