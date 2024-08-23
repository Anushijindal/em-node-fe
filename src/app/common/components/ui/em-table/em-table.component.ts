import { Component } from '@angular/core';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular'; // Angular Data Grid Component
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
// import {ICellRendererParams} from "ag-grid-angular"
import { ClientSideRowModelModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule]);
import { IOlympicData } from './interfaces';
@Component({
  selector: 'app-em-table',
  standalone: true,
  imports: [AgGridAngular, HttpClientModule],
  // templateUrl: './em-table.component.html',
  template: `
    <h1>Users Table</h1>
    <input
      type="text"
      id="filter-text-box"
      placeholder="Filter..."
      (input)="onFilterTextBoxChanged()"
    />
    <button (click)="handleClick()" >Click Me</button>
    <ag-grid-angular
      style="width: 100%; height: 700px; "
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [suppressRowClickSelection]="true"
      [groupSelectsChildren]="true"
      [rowSelection]="rowSelection"
      [pagination]="pagination"
      [paginationPageSize]=20
      [paginationPageSizeSelector]='paginationPageSizeSelector'
      [rowData]="rowData?.data"
      [class]="themeClass"
      (gridReady)="onGridReady($event)"
    />
  `,
  styleUrl: './em-table.component.scss',
})
export class EmTableComponent {
  private gridApi!: GridApi;
  public rowHeight = 60;
  public pagination=true
  public paginationPageSizeSelector=[20,30,40]
  // rowData = [
  //   { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  //   { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  //   { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  // ];

  // // Column Definitions: Defines the columns to be displayed.
  // colDefs: ColDef[] = [
  //   { field: 'make' },
  //   { field: 'model' },
  //   { field: 'price' },
  //   { field: 'electric' },
  // ];
  public columnDefs: ColDef[] = [
    {
      field: 'user_first_name',
      headerName: 'firstName',
      sortable: true,
      // minWidth: 170,
      // checkboxSelection: true,
      // headerCheckboxSelection: true,
    },
    { field: 'user_last_name', headerName: 'lastName',floatingFilter:true },
    { field: 'user_email', headerName: 'email' },
    { field: 'user_phone', headerName: 'Phone Number' },
    { field: 'user_gender', headerName: 'Gender' },
    // { field: 'sport' },
    // { field: 'gold' },
    // { field: 'silver' },
    // { field: 'bronze' },
    // { field: 'total' },
  ];
  handleClick(){
    alert("I am clicked");
  }
  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  // onGridReady(params: GridReadyEvent) {

  public defaultColDef: ColDef = {
    editable: false,
    filter: true,
    flex: 1,
    sortable: false,
    minWidth: 100,
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: any;
  public themeClass: string = 'ag-theme-quartz';

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.gridApi = params.api;
    this.http
      .get('http://localhost/employees_management/api/v1/users/')
      .subscribe((data) => (this.rowData = data));
  }
}
