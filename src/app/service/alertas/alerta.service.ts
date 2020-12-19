import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private toast: ToastrService) { }

  showsuccess(texto,titulo){
    this.toast.success(texto,titulo, {
      timeOut: 9000,
    });
  }
  showwarning(texto,titulo){
    this.toast.warning(texto,titulo, {
      timeOut: 9000,
    });
  }
}
