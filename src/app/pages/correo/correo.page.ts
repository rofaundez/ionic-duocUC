import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [
    IonicModule,  // Importa los módulos de Ionic para que funcionen los componentes como ion-header y ion-item
    FormsModule   // Necesario para [(ngModel)]
  ]
})
export class CorreoPage {
  public correoIngresado: string = '';

  constructor(private router: Router) {}

  recuperarContrasena() {
    const usuario = Usuario.getListaUsuarios().find(
      user => user.correo === this.correoIngresado
    );

    if (usuario) {
      const navigationExtras = {
        state: {
          pregunta: usuario.preguntaSecreta,
          correo: usuario.correo,
        },
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }
}
