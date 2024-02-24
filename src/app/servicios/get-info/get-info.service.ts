import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class GetInfoService {
  nombreUsuario!: string;


  private user$: any;


  constructor(private storageService: StorageService) {
    this.storageService.usuario$.subscribe((data) => (this.user$ = data))

  }

  getUser() {
    this.nombreUsuario = this.user$['displayName'];
  }





  resetAll() {
    this.nombreUsuario = '';

  }



}
