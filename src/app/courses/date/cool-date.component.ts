import {Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const COOL_DATE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CoolDateComponent),
  multi: true
};

const noop = () => {
};

@Component({
  selector: 'cool-date',
  templateUrl: `
    <div *ngIf="!validDate" class="error-date">Date should be has format "dd.MM.yyyy"</div>
    <input type="text" class="form-control" id="date" 
      [(ngModel)]="value" (blur)="onBlur()" [ngStyle]="{'border': myBorder}">
  `,
  styleUrls: ['../courses.style.css'],
  providers: [COOL_DATE_CONTROL_VALUE_ACCESSOR]
})

export class CoolDateComponent implements ControlValueAccessor {

  private _dateValue;
  private _value;
  validDate: boolean = true;

  @Input('border') myBorder;

  @Output()
  dateValueChange = new EventEmitter();

  private onTouchedCallback: () => void = noop;

  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this._value;
  };

  set value(v: any) {
    if (/([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/.test(v)) {
      this.validDate = true;
      this.myBorder = '1px solid #ccc';
      this._dateValue = v;
      this._value = v;
      this.onChangeCallback(v);
    }
    else {
      this.validDate = false;
      this.myBorder = '1px solid #c62133';
    }
  }

  writeValue(value: any) {
    if (value !== this._value) {
      this._dateValue = value;
      this._value = value;
      this.dateValueChange.emit(value);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
