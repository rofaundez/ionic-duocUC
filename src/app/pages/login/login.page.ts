import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AnimationController } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular'; 
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule], // Agregar ambos módulos aquí
})
export class LoginPage {
  public usuario: Usuario;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private animationController: AnimationController
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
    this.usuario.cuenta = 'mvargas';
    this.usuario.password = '1234';
  }

  vibrarBoton(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const vibrateAnimation = this.animationController.create()
      .addElement(button)
      .duration(100)
      .iterations(3)
      .fromTo('transform', 'translate(0)', 'translate(2px)')
      .fromTo('transform', 'translate(2px)', 'translate(-2px)')
      .fromTo('transform', 'translate(-2px)', 'translate(0)');

    vibrateAnimation.play();
  }

  ingresar() {
    const error = this.usuario.validarUsuario();
    if (error) {
      this.mostrarMensajeEmergente(error);
      return;
    }
    this.mostrarMensajeEmergente('¡Bienvenido(a) a tu Aula Virtual de DUOC!');
    this.usuario.navegarEnviandousuario(this.router, '/inicio');
  }

  recuperarContrasena() {
    this.router.navigate(['/correo']);
  }
  

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 1500
    });
    toast.present();
  }
}
