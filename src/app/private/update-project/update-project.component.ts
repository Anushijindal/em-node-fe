import { Component } from '@angular/core';
import { EmButtonComponent } from '../../common/components/ui/form-elements/em-button/em-button.component';
import { EmDisabledButtonComponent } from '../../common/components/ui/form-elements/em-disabled-button/em-disabled-button.component';
import { EmInputComponent } from '../../common/components/ui/form-elements/em-input-box/em-input-box.component';
import { EmSelectComponent } from '../../common/components/ui/form-elements/em-select-box/em-select-box.component';
import { EmDatePickerInputComponent } from '../../common/components/ui/form-elements/em-date-picker-input/em-date-picker-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { httpService } from '../../services/httpServices.service';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [
    EmButtonComponent,
    EmDisabledButtonComponent,
    EmInputComponent,
    EmSelectComponent,
    EmDatePickerInputComponent,
    ReactiveFormsModule,

  ],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.scss',
})
export class UpdateProjectComponent {
  updateProjectForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private httpService:httpService) {
    this.updateProjectForm = this.formBuilder.group({
      startDate: [''],
      // deadline: ['8/8/2024'],
      projectName: ['',[Validators.required]],
      projectTechnology: ['',[Validators.required]],
      client: ['',[Validators.required]],
      manager: ['',[Validators.required]],
      lead: ['',[Validators.required]],
      description: ['',[Validators.required]],
      status: ['Coming_Soon',[Validators.required]],
      management: ['Trello',[Validators.required]],
      repository: ['GitHub',[Validators.required]],
      management_tool_link: ['',[Validators.required]],
      repository_tool_url: ['',[Validators.required]],
    });
  }
}
