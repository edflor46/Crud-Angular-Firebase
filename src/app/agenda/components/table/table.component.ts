import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../../services/agenda.service';
import { Contacto } from '../../../interfaces/interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [],
})
export class TableComponent implements OnInit {

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */

  contactos: Contacto[] = [];
  loading:boolean = false;
 

  constructor(private agendaService: AgendaService) {}

  /* -------------------------------------------------------------------------- */
  /*                                   Oninit                                   */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.loading = true;
    this.agendaService
      .getContactos()
      .subscribe(resp => {
        this.contactos = resp;
         this.loading = false;
      })
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Borrar                                   */
  /* -------------------------------------------------------------------------- */
  borrarContacto(contacto:Contacto, i:number){

    Swal.fire({
      title: 'ATENCION',
      icon: 'warning',
      html: `Estas apunto de borrar a <strong>${contacto.nombre}</strong>, <br> ¿Deseas a continuar?`,
      showDenyButton: true,
      confirmButtonText: `Si, eliminar`,
      confirmButtonColor: '#F72A05',
      denyButtonText: `No, dejame pensarlo`,
      denyButtonColor: '#F7A305'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.contactos.splice(i, 1);
        this.agendaService.borrarContacto(contacto.id).subscribe(resp => {
          Swal.fire({
            title: 'Contacto eliminado',
            icon: 'success'
          });
        });

      } else if (result.isDenied) {
        Swal.fire('Peticion cancelada', '', 'info');
      }
    })
  }
}
