import { Component } from '@angular/core';
import { EmButtonComponent } from '../../common/components/ui/form-elements/em-button/em-button.component';
import { EmDisabledButtonComponent } from '../../common/components/ui/form-elements/em-disabled-button/em-disabled-button.component';
import { EmInputComponent } from '../../common/components/ui/form-elements/em-input-box/em-input-box.component';
import { EmSelectComponent } from '../../common/components/ui/form-elements/em-select-box/em-select-box.component';
import { EmDatePickerInputComponent } from '../../common/components/ui/form-elements/em-date-picker-input/em-date-picker-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { httpService } from '../../services/httpServices.service';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';

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
    RouterLink
  ],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.scss',
})
export class UpdateProjectComponent {
  updateProjectForm: FormGroup;
  routeSub!: Subscription;
  date!: string;
  statusItems = ['Development_Started', 'Launched', 'Coming_Soon'];
  repoItems = ['GitHub', 'GitLab', 'BigBucket'];
  managementItems = ['Trello', 'Zira'];
  id!: number;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: httpService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.updateProjectForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      projectName: ['', [Validators.required]],
      projectTechnology: ['', [Validators.required]],
      client: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      lead: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['Coming_Soon', [Validators.required]],
      management: ['Trello', [Validators.required]],
      repository: ['GitHub', [Validators.required]],
      management_tool_link: ['', [Validators.required]],
      repository_tool_url: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params);
      console.log(params['id']);
      this.id = params['id'];
    });
    this.getProjectData();
    console.log(this.updateProjectForm.value.deadine);
  }
  getProjectData() {
    this.httpService.getProject(this.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.updateProjectForm.patchValue({
          client: response.data[0].project_client,
          deadline: new Date(response?.data[0]?.project_deadline_date),
          startDate: new Date(response?.data[0]?.project_start_date),
          projectName: response.data[0].project_name,
          projectTechnology: response.data[0].project_technology,
          manager: response.data[0].project_manager,
          lead: response.data[0].project_lead,
          description: response.data[0].project_description,
          status: response.data[0].project_status,
          management: response.data[0].management_tool,
          repository: response.data[0].repository_tool,
          management_tool_link: response.data[0].management_tool_link,
          repository_tool_url: response.data[0].repository_tool_url,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateProject() {
    if (this.updateProjectForm.valid) {
      const deadline = moment(this.updateProjectForm.value.deadline).format(
        'YYYY-MM-DD'
      );
      const startDate = moment(this.updateProjectForm.value.startDate).format(
        'YYYY-MM-DD'
      );
      const data = {
        name: this.updateProjectForm.value.projectName,
        client: this.updateProjectForm.value.client,
        deadline: deadline,
        startDate: startDate,
        technology: this.updateProjectForm.value.projectTechnology,
        manager: this.updateProjectForm.value.manager,
        lead: this.updateProjectForm.value.lead,
        description: this.updateProjectForm.value.description,
        status: this.updateProjectForm.value.status,
        management_tool: this.updateProjectForm.value.management,
        repository_tool: this.updateProjectForm.value.repository,
        management_tool_link: this.updateProjectForm.value.management_tool_link,
        repository_tool_url: this.updateProjectForm.value.repository_tool_url,
      };
      this.httpService.updateProject(this.id, data).subscribe({
        next: (response: any) => {
          console.log(response);
          this.toastr.success(response.message);
          this.router.navigate(['my-profile/projects']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.statusText);
        },
      });
    }
  }
}
