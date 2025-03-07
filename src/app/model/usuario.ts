import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from './nivel-educacional';
import { Persona } from "./persona";

export class Usuario extends Persona {

  public cuenta: string;
  public correo: string;
  public password: string;
  public preguntaSecreta: string;
  public respuestaSecreta: string;

  constructor() {
    super();
    this.cuenta = '';
    this.correo = '';
    this.password = '';
    this.preguntaSecreta = '';
    this.respuestaSecreta = '';
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.fechaNacimiento = undefined;
  }

  public static getNewUsuario(
    cuenta: string,
    correo: string,
    password: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    nombre: string,
    apellido: string,
    nivelEducacional: NivelEducacional,
    fechaNacimiento: Date | undefined
  ) {
    let usuario = new Usuario();
    usuario.cuenta = cuenta;
    usuario.correo = correo;
    usuario.password = password;
    usuario.preguntaSecreta = preguntaSecreta;
    usuario.respuestaSecreta = respuestaSecreta;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.nivelEducacional = nivelEducacional;
    usuario.fechaNacimiento = fechaNacimiento;
    return usuario;
  }

  public static buscarUsuarioValido(cuenta: string, password: string): Usuario | undefined {
    return Usuario.getListaUsuarios().find(
      usu => usu.cuenta === cuenta && usu.password === password);
  }

  public validarCuenta(): string {
    if (this.cuenta.trim() === '') {
      return 'Para ingresar debe seleccionar una cuenta.';
    }
    return '';
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para igresar debe escribir la contraseña.';
    }
    for (let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  public validarUsuario(): string {
    let error = this.validarCuenta();
    if (error) return error;
    error = this.validarPassword();
    if (error) return error;
    const usu = Usuario.buscarUsuarioValido(this.cuenta, this.password);
    if (!usu) return 'Las datos del usuario son incorrectas.';
    return '';
  }

  public override toString(): string {
    return `      ${this.cuenta}
      ${this.correo}
      ${this.password}
      ${this.preguntaSecreta}
      ${this.respuestaSecreta}
      ${this.nombre}
      ${this.apellido}
      ${this.nivelEducacional.getEducacion()}
      ${this.getFechaNacimiento()}`;
  }

  public static getListaUsuarios(): Usuario[] {
    return [
      Usuario.getNewUsuario(
        'mvargas', 
        'mvargas@duocuc.cl', 
        '1234', 
        '¿Cuál es tu animal favorito?', 
        'gato', 
        'Miguel', 
        'Vargas', 
        NivelEducacional.buscarNivelEducacional(6)!,
        new Date(2003, 6, 6)
      ),
      Usuario.getNewUsuario(
        'vrendick',
        'vrendick@duocuc.cl',
        '5678',
        '¿Quien es tu persona favorita?',
        'miguel',
        'Vladimir',
        'Rendick',
        NivelEducacional.buscarNivelEducacional(5)!,
        new Date(1990, 5, 5)
      ),
      Usuario.getNewUsuario(
        'mabarca',
        'mabarca@duocuc.cl',
        '0608',
        '¿Cuál es tu asignatura favorita?',
        'base de datos',
        'Martin',
        'Abarca',
        NivelEducacional.buscarNivelEducacional(6)!,
        new Date(2000, 2, 7)
      ),
      Usuario.getNewUsuario(
        'rofaundez',
        'rofaundez@duocuc.cl',
        '1111',
        '¿Nombre de tu primera mascota?',
        'dago',
        'rodrigo',
        'faundez',
        NivelEducacional.buscarNivelEducacional(6)!,
        new Date(2000, 2, 7)
      ),
    ]
  }

  recibirUsuario(activatedRoute: ActivatedRoute, router: Router) {
    activatedRoute.queryParams.subscribe(() => {
      const nav = router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          const cuenta = nav.extras.state['cuenta'];
          const password = nav.extras.state['password'];
          const usu = Usuario.buscarUsuarioValido(cuenta, password);
          if(usu){
          this.cuenta = usu.cuenta;
          this.correo = usu.correo;
          this.password = usu.password;
          this.preguntaSecreta = usu.preguntaSecreta;
          this.respuestaSecreta = usu.respuestaSecreta;
          this.nombre = usu.nombre;
          this.apellido = usu.apellido;
          this.nivelEducacional = usu.nivelEducacional;
          this.fechaNacimiento = usu.fechaNacimiento;
          return;
        }
        }
      }
      router.navigate(['/login']);
    });
  }

  navegarEnviandousuario(router: Router, pagina: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        cuenta: this.cuenta,
        password: this.password,
      }
    }
    if (this.cuenta !== '' && this.password !== '')
      router.navigate([pagina], navigationExtras);
    else
      router.navigate(['/login']);
  }
}