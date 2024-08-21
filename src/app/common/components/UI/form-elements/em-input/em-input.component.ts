import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-em-input',
  standalone: true,
  imports: [MatInputModule,ReactiveFormsModule],
  templateUrl: './em-input.component.html',
  styleUrl: './em-input.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class EmInputComponent {
  constructor(private formBuilder:FormBuilder){

  }
  @Input() inputLabel = '';
  @Input() inputPlaceholder=''
  @Input() formcontrolname:any;
  @Input() inputClass=''
  @Input() inputId='';

}
