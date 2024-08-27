import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
//  now = moment();
// moment(this.datepicker.value).format('YYYY/MM/DD')

@Component({
  selector: 'em-date-picker-input',
  standalone: true,
  providers: [
    // provideMomentDateAdapter(),
    provideNativeDateAdapter(),
    // provideNativeDateAdapter(MY_FORMATS),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmDatePickerInputComponent),
      multi: true,
    },
  ],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './em-date-picker-input.component.html',
  styleUrls: ['./em-date-picker-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmDatePickerInputComponent implements ControlValueAccessor {
  @Input() datePickerLabel = '';
  @Input() datePickerClass = '';
  @Input() datePickerId = '';
  //  now = moment();
  value: Date | null = null;
  disabled = false;

  onChange = (value: Date | null) => {};
  onTouched = () => {};

  onDateChange(event: any): void {
    this.value = event.value;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: Date | string | null): void {
    if (typeof value === 'string') {
      this.value = new Date(value);
    } else {
      this.value = value || null;
    }
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
