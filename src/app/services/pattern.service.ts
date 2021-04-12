import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatterService {
 /* -------------------------------------------------------------------------- */
  /*                                   Pattern                                  */
  /* -------------------------------------------------------------------------- */
  public nombre        : string = '([a-zA-Z ]+)';
  public apellidos     : string = '([a-zA-Z ]+)';
  public email         : string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public telefono      : string =  '^((\\+91-?)|0)?[0-9]{10}$'; 
  constructor() { }
}
