import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [
    IonicModule,     // Importa los componentes de Ionic
    FormsModule      // Necesario para el [(ngModel)] en ion-input
  ]
})
export class PreguntaPage {
  public preguntaSecreta: string = '';
  public respuestaIngresada: string = '';
  private correo: string = '';
  public nombreUsuario: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.preguntaSecreta = navigation.extras.state['pregunta'];
        this.correo = navigation.extras.state['correo'];

     
        const usuario = Usuario.getListaUsuarios().find(
          user => user.correo === this.correo
        );

        if (usuario) {
          this.nombreUsuario = usuario.nombre; 
        }
      }
    });
  }

  verificarRespuesta() {
    const usuario = Usuario.getListaUsuarios().find(
      user => user.correo === this.correo && user.respuestaSecreta === this.respuestaIngresada
    );

    if (usuario) {
      this.router.navigate(['/correcto'], { state: { correo: this.correo } });
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }
}

