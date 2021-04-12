import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contacto } from '../../../interfaces/interface';
import { AgendaService } from '../../../services/agenda.service';

@Component({
  selector: 'app-ver-contacto',
  templateUrl: './ver-contacto.component.html',
  styles: [
  ]
})
export class VerContactoComponent implements OnInit {
  contacto:Contacto;

  constructor(private route:ActivatedRoute, private agendaService:AgendaService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

   
      this.agendaService.getContacto(id)
      .subscribe((contacto:Contacto) => {
        this.contacto = contacto;
        this.contacto.id = id;

        console.log(contacto);
        
       
      })
  }

}
