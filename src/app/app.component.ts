import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './modules/app/app.module';
import { EmpAddEditComponent } from './modules/app/emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CoreService } from './core/core/core.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    MatToolbar,
    MatIcon,
    MatButton,
    MatDialogModule,
    AppModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action' 
 ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}
  
  /**
   * It is the lifecycle event which is initialized when the component is initialized
   * It call get employeeList function .  
   */
  ngOnInit(): void {
    this.getEmployeeList();
  }

  /**
   * It open the dialog box with EmpAddEditComponent.
   * After it is closed it calls the getEmployeeList
   */
  openAddEditEmpForm(): void {
   const _dialogRef = this._dialog.open(EmpAddEditComponent);
   _dialogRef.afterClosed().subscribe({
    next: (val)=>{
      if(val){
        this.getEmployeeList();
      }
    }
   }) 
  }

  /**
   * It call the getEmployeeList from the empService and give the data to display on table
   */
  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  
  /**
   * It is used to filter the data of the table
   * @param event Event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * It calls the delete employee from emp serice and after the success request it open the snackbar and call getEmployeeList
   * @param id number
   */
  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar('Employee deleted','done');
        this.getEmployeeList();
      },
      error:console.log
    });
  }
  
  /**
   * It open the dialog box with EmpAddEditComponent.
   * After it is closed it calls the getEmployeeList function
   * @param data any
   */
  openEditForm(data:any){
   const dialogRef = this._dialog.open(EmpAddEditComponent,{
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
     }) 
  }
}
