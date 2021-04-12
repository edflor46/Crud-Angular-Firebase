import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VerContactoComponent } from './pages/ver-contacto/ver-contacto.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'contactos', component: HomeComponent },
      { path: 'contacto/:id', component: ContactoComponent },
      { path: 'ver-contacto/:id', component: VerContactoComponent },
      { path: '**', redirectTo: 'contactos' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
