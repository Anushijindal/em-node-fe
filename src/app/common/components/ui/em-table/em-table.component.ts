import { Component } from '@angular/core';
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
@Component({
  selector: 'app-em-table',
  standalone: true,
  imports: [AgGridAngular, HttpClientModule],
  // templateUrl: './em-table.component.html',
  template: `<ag-grid-angular
    style="width: 100%; height: 500px; margin-top: 100px;"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [suppressRowClickSelection]="true"
    [groupSelectsChildren]="true"
    [rowSelection]="rowSelection"
    [pagination]="true"
    [rowData]="rowData"
    [class]="themeClass"
    (gridReady)="onGridReady($event)"
  /> `,
  styleUrl: './em-table.component.scss',
})
export class EmTableComponent {
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
      field: 'athlete',
      // headerName:'abc'
      // minWidth: 170,
      // checkboxSelection: true,
      // headerCheckboxSelection: true,
    },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    editable: false,
    filter: true,
    flex: 1,
    
    minWidth: 100,
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: IOlympicData[];
  public themeClass: string = 'ag-theme-quartz';

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => (this.rowData = data));
  }
}
