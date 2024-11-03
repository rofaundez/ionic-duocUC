import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [
    IonicModule,  // Importa los módulos de Ionic
    RouterModule   // Importa RouterModule para el enrutamiento
  ]
})
export class IncorrectoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
