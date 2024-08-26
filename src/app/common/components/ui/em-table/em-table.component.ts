import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid,
} from 'ag-grid-community'; // Column Definition Type Interface
import { ClientSideRowModelModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule]);
import { IOlympicData } from './interfaces';
import { httpService } from '../../../../services/httpServices.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-em-table',
  standalone: true,
  imports: [AgGridAngular, HttpClientModule,RouterLink],
  templateUrl: './em-table.component.html',
  // template: "",
  styleUrl: './em-table.component.scss',
})
export class EmTableComponent {
  private gridApi!: GridApi;
  public rowHeight = 60;
  public pagination = true;
  @Input() pageSizeOption = [10, 30, 40];
  @Input() tableName = '';
  @Input() colDef: any;
  @Input() isPagination = false;
  @Input() showAddBtn=false;
  @Input() defaultPageSize = 20;
  @Input() defaultCol: ColDef = {
    // editable: false,
    // filter: true,
    // cellStyle: { fontWeight: 'bold' },
    // flex: 1,
    // sortable: false,
  };
  // public columnDefs: ColDef[] = [
  //   {
  //     field: 'project_name',
  //     headerName: 'Project',
  //     // type:"numericColumn",
  //     sortable: true,
  //     // sort:"asc"
  //     // minWidth: 170,
  //     // checkboxSelection: true,
  //     // headerCheckboxSelection: true,
  //   },
  //   { field: 'project_technology', headerName: 'tech', floatingFilter: true },
  // ];
  // handleClick() {
  //   alert('I am clicked');
  // }
  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  // onGridReady(params: GridReadyEvent) {

  // public defaultColDef: ColDef = {
  //   editable: false,
  //   filter: true,
  //   cellStyle: { fontWeight: 'bold' },
  //   flex: 1,
  //   sortable: true,
  // };
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: any;
  public themeClass: string = 'ag-theme-quartz';

  constructor(private http: httpService) {}
  handleClick(){}
  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.gridApi = params.api;
    this.http.fetchProjects().subscribe((data) => (this.rowData = data));
  }
}
