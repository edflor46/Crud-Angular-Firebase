import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contacto } from '../interfaces/interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  constructor(private http: HttpClient) {}

  /* -------------------------------------------------------------------------- */
  /*                               Crear contacto                               */
  /* -------------------------------------------------------------------------- */

  crearContacto(contacto: Contacto) {
    const url = `${environment.urlApi}/contactos.json`;

    return this.http.post(url, contacto).pipe(
      map((resp: any) => {
        contacto.id = resp.name;

        return contacto;
      })
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                             Obtener Conctactos                             */
  /* -------------------------------------------------------------------------- */

  getContactos() {
    const url = `${environment.urlApi}/contactos.json`;

    return this.http.get(url).pipe(map((resp) => this.array(resp)));
  }

  /* -------------------------------------------------------------------------- */
  /*                              Obtener contacto                              */
  /* -------------------------------------------------------------------------- */

  getContacto(id: string) {
    const url = `${environment.urlApi}/contactos/${id}.json`;
    return this.http.get(url);
  }

  /* -------------------------------------------------------------------------- */
  /*                                Obj => Array                                */
  /* -------------------------------------------------------------------------- */

  private array(contactoObj: Object) {
    if (contactoObj === null) {
      return [];
    }

    const contactos: Contacto[] = [];

    Object.keys(contactoObj).forEach((key) => {
      const contacto: Contacto = contactoObj[key];

      contacto.id = key;

      contactos.push(contacto);
    });

    return contactos;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Borrar Contacto                              */
  /* -------------------------------------------------------------------------- */

  borrarContacto(id: string) {
    const url = `${environment.urlApi}/contactos/${id}.json`;
    return this.http.delete(url);
  }

  /* -------------------------------------------------------------------------- */
  /*                             Actualizar contacto                            */
  /* -------------------------------------------------------------------------- */

  actualizarContacto(contacto:Contacto){
    
    const contact = { ...contacto };

    delete contact.id;
    return this.http.put(`${environment.urlApi}/contactos/${contacto.id}.json`, contact);

  }
}
