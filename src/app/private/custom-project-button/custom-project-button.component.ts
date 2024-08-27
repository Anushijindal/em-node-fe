import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, GridApi } from 'ag-grid-community';
import { Component } from '@angular/core';
import { httpService } from '../../services/httpServices.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  standalone: true,
  template: `
    <div class="flex justify-between">
      <button (click)="deleteButton()">Delete</button>
      <button (click)="updateButton()">Update</button>
    </div>
  `,
})
export class deleteProjectButton implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  id: number = 0;
  private gridApi!: GridApi;

  constructor(
    private httpService: httpService,
    private toastr: ToastrService,
    private router: Router,
    private projectList: ProjectListComponent 
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.id = params.data.project_id;
    this.gridApi = params.api;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  deleteButton() {
    this.httpService.deleteProject(this.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success('Project Deleted Successfully');
        this.projectList.getData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateButton() {
    this.router.navigate([`/projects/update-project/${this.id}`]);
  }
}
