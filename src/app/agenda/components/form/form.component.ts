import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatterService } from '../../../services/pattern.service';
import { Contacto } from '../../../interfaces/interface';
import { AgendaService } from '../../../services/agenda.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [],
})
export class FormComponent implements OnInit {

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  actualizar:boolean = false;
  contacto:Contacto;
  formAgregar: FormGroup;
  fecha = new Date();


  /* -------------------------------------------------------------------------- */
  /*                                 Constuctor                                 */
  /* -------------------------------------------------------------------------- */

  constructor(
    private fb: FormBuilder,
    private patter: PatterService,
    private agendaService: AgendaService,
    private route:ActivatedRoute,
    private router:Router
  )
    {
      this.formAgregar = this.fb.group({
        id       : [ ''],
        nombre   : [ ''.trim(), [Validators.required, Validators.minLength(3), Validators.pattern(this.patter.nombre)]],
        apellidos: [''.trim(), [Validators.required, Validators.minLength(3), Validators.pattern(this.patter.apellidos)]],
        telefono : [ ''.trim(), [Validators.required, Validators.pattern(this.patter.telefono)]],
        email    : [ ''.trim(), [Validators.required, Validators.pattern(this.patter.email)]],
        fecha    : [this.fecha] 
      });

    }

  /* -------------------------------------------------------------------------- */
  /*                                   Oninit                                   */
  /* -------------------------------------------------------------------------- */

  ngOnInit(): void {   
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id !=='agregar') {
      this.actualizar = true;
      this.agendaService.getContacto(id)
      .subscribe((contacto:Contacto) => {
        this.contacto = contacto;
        this.contacto.id = id;

        this.formAgregar.patchValue(this.contacto);
       
      })
    }
    
  }

  /* -------------------------------------------------------------------------- */
  /*                                Validar Input                               */
  /* -------------------------------------------------------------------------- */

  validInput(input: string) {
    return (
      this.formAgregar.get(input).invalid && this.formAgregar.get(input).touched
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                              Guardar / Editar                              */
  /* -------------------------------------------------------------------------- */
  guardar() {
    const form = this.formAgregar.value;

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();


    if (!this.contacto?.id) {

      this.agendaService.crearContacto(form).
      subscribe(resp => {
        this.contacto = resp;
  
        Swal.fire({
          title: this.contacto.nombre,
          text: 'ha sido creado',
          icon: 'success'
        }).then((result)=>{
          if (result.value) {
            
            this.router.navigate(['home']);

          }
        })  
      }) 
      
    } else{
      
      this.agendaService.actualizarContacto(form).subscribe(resp => {
        console.log(resp);

        Swal.fire({
          title: '¡Actualizado',
          text: 'Contacto actualizado con exito',
          icon: 'success'
        }).then((result)=>{
          if (result.value) {
            
            this.router.navigate(['home']);

          }
        })  
        
        
      })
    }

  }

  /* -------------------------------------------------------------------------- */
  /*                                   toHome                                   */
  /* -------------------------------------------------------------------------- */

  toHome(){
    this.router.navigate(['home']);
  }
}
