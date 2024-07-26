import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRoutingModule } from './table.routing';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    
  
    TableComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule
  ]
})
export class TabelModule { }
