import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../model/usuario';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [
    IonicModule,    // Importa los módulos de Ionic
    FormsModule     // Importa FormsModule para [(ngModel)]
  ]
})
export class CorrectoPage {
  public correo: string = '';
  public nuevaContrasena: string = '';
  public confirmarContrasena: string = ''; 

  constructor(private router: Router, private route: ActivatedRoute ) {
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.correo = navigation.extras.state['correo'];
      }
    } );
    
  }

  restablecerContrasena() { 
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    const usuarios = Usuario.getListaUsuarios();
    const usuario = usuarios.find((user: Usuario) => user.correo === this.correo);

    if (usuario) {
      usuario.password = this.nuevaContrasena;

      this.router.navigate(['/login']);
    } else {

      console.error('Usuario no encontrado');
    }
  }
}
