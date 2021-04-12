import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgendaRoutingModule } from './agenda-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VerContactoComponent } from './pages/ver-contacto/ver-contacto.component';




@NgModule({
  declarations: [
    HomeComponent,
    FormComponent,
    TableComponent,
    ContactoComponent,
    VerContactoComponent,


  ],
  imports: [CommonModule, AgendaRoutingModule, ReactiveFormsModule],
})
export class AgendaModule {}
