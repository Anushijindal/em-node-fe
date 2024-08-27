import { Component } from '@angular/core';
import { EmTableComponent } from '../../common/components/ui/em-table/em-table.component';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid,
} from 'ag-grid-community';
import { right } from '@popperjs/core';
import { deleteProjectButton } from '../custom-project-button/custom-project-button.component';
import { httpService } from '../../services/httpServices.service';
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [EmTableComponent, AgGridAngular],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  isPagination = true;
  showAddBtn=true
  navigateUrl="/projects/add-project"
  defaultCol = {
    sortable: true,
    filter: true,
    editable: false,
    // maxWidth:100
  };
  constructor(private httpService: httpService) {}
  public colDef: ColDef[] = [
    {
      field: 'project_name',
      headerName: 'Project Name',
      // sortable:true
      pinned: true,
    },
    {
      field: 'project_technology',
      headerName: 'Technology',
    },
    {
      field: 'project_start_date',
      headerName: 'Started At',
    },
    {
      field: 'project_deadline_date',
      headerName: 'Deadline Date',
    },
    {
      field: 'project_lead',
      headerName: 'Lead',
    },
    {
      field: 'project_manager',
      headerName: 'Manager',
    },
    {
      field: 'project_client',
      headerName: 'Client',
    },
    {
      field: 'project_status',
      headerName: 'Status',
    },
    {
      field: 'management_tool',
      headerName: 'Management Tool',
    },
    {
      field: 'management_tool_link',
      headerName: 'Management Tool URL',
    },
    {
      field: 'repository_tool',
      headerName: 'Repository Tool',
    },
    {
      field: 'repository_tool_url',
      headerName: 'Repository Tool URL',
    },
    {
      field: 'project_description',
      headerName: 'Description',
    },
    {
      field: 'Action',
      pinned: right,
      sortable: false,
      filter: false,
      cellRenderer: deleteProjectButton,
    },
  ];
  ngOnInit() {
    this.getData();
  }
  rowData: any;
  getData() {
    this.httpService.fetchProjects().subscribe({
      next: (Response: any) => {
        console.log(Response);
        this.rowData = Response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
