import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmButtonComponent } from '../../common/components/ui/form-elements/em-button/em-button.component';
import { EmDisabledButtonComponent } from '../../common/components/ui/form-elements/em-disabled-button/em-disabled-button.component';
import { EmInputComponent } from '../../common/components/ui/form-elements/em-input-box/em-input-box.component';
import { EmSelectComponent } from '../../common/components/ui/form-elements/em-select-box/em-select-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { httpService } from '../../services/httpServices.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmDatePickerInputComponent } from '../../common/components/ui/form-elements/em-date-picker-input/em-date-picker-input.component';
@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    EmButtonComponent,
    EmDisabledButtonComponent,
    EmInputComponent,
    EmSelectComponent,
    EmDatePickerInputComponent
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent {
  addProjectForm: FormGroup;
  statusItems = ['Development_Started', 'Launched', 'Coming_Soon'];
  repoItems = ['GitHub', 'GitLab', 'BigBucket'];
  managementItems = ['Trello', 'Zira'];
  constructor(
    private formBuilder: FormBuilder,
    private httpService: httpService,
    private toastr: ToastrService,
    private router:Router
  ) {
    this.addProjectForm = this.formBuilder.group({
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
  addProject() {
    const data = {
      name: this.addProjectForm.value.projectName,
      // deadline:this.addProjectForm.value.deadline,
      technology: this.addProjectForm.value.projectTechnology,
      client: this.addProjectForm.value.client,
      manager: this.addProjectForm.value.manager,
      lead: this.addProjectForm.value.lead,
      description: this.addProjectForm.value.description,
      status: this.addProjectForm.value.status,
      management_tool: this.addProjectForm.value.management,
      repository_tool: this.addProjectForm.value.repository,
      repository_tool_url: this.addProjectForm.value.repository_tool_url,
      management_tool_link: this.addProjectForm.value.management_tool_link,
    };
    this.httpService.addProject(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success('done');
        this.router.navigate(['/project-list'])
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
}
