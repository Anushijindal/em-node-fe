import { Component, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
 
@Component({
  selector: 'em-input-box',
  standalone: true,
  templateUrl: './em-input-box.component.html',
  styleUrls: ['./em-input-box.component.scss'],
  imports: [MatInputModule,ReactiveFormsModule],
  encapsulation:ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmInputComponent),
      multi: true
    }
  ],
})
export class EmInputComponent implements ControlValueAccessor {
  @Input() inputLabel = '';
  @Input() inputPlaceholder = '';
  @Input() inputClass = '';
  @Input() inputId = '';
  @Input() inputType:any;
  @Input() formName!: FormGroup
  @Input() controlName='';
 
  value: string = '';
  disabled = false;
 
  onChange = (value: string) => {};
  onTouched = () => {};
 
  // Called when the value in the UI is changed
  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
    
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