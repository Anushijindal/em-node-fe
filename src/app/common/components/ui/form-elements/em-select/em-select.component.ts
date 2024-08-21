import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-em-select',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './em-select.component.html',
  styleUrl: './em-select.component.scss',
  encapsulation:ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmSelectComponent),
      multi: true,
    },
  ],
})
export class EmSelectComponent implements ControlValueAccessor {
  @Input() selectLabel = '';
  @Input() selectId = '';
  @Input() selectClass = '';
  @Input() items: any[] = [];
  @Input() formName!: FormGroup
  @Input() controlName='';
  @Output() valueChange = new EventEmitter<any>();

  value: string = '';
  disabled = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  // Called when the value in the UI is changed
  handleSelectionChange(event: MatSelectChange): void {
    this.value = event?.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  // ControlValueAccessor interface methods
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}