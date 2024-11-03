import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController, IonicModule } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule // Agrega CommonModule aquí
  ],
})
export class MisdatosPage implements AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemCorreo', { read: ElementRef }) itemCorreo!: ElementRef;
  @ViewChild('itemContraseña', { read: ElementRef }) itemContraseña!: ElementRef;
  @ViewChild('itemContraseña2', { read: ElementRef }) itemContraseña2!: ElementRef;
  @ViewChild('itemContraseña3', { read: ElementRef }) itemContraseña3!: ElementRef;
  @ViewChild('itemPreguntaSecreta', { read: ElementRef }) itemPreguntaSecreta!: ElementRef;
  @ViewChild('itemRespuestaSecreta', { read: ElementRef }) itemRespuestaSecreta!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController) { 
      this.usuario = new Usuario();
      this.usuario.recibirUsuario(this.activatedRoute, this.router);
    }

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();

  public usuario: Usuario;

  ngAfterViewInit() {
    this.animarTituloIzqDer();
  }

  public actualizarNivelEducacional(event: any) {
    this.usuario.nivelEducacional 
      = NivelEducacional.buscarNivelEducacional(event.detail.value)!;
  }

  limpiarPagina() {
    this.usuario.cuenta = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.correo = '';
    this.usuario.preguntaSecreta = '';
    this.usuario.respuestaSecreta = '';
    this.usuario.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.usuario.fechaNacimiento = undefined;
    this.usuario.password = '';
  }

  opacityReturn(elementRef: any, duration: number) {
    this.animationController
    .create()
    .addElement(elementRef)
    .iterations(1)
    .duration(duration)
    .fromTo('opacity', 0, 1)
    .play();
  }

  opacityLimpiando() {
    this.opacityReturn(this.itemCuenta.nativeElement, 1200);
    this.opacityReturn(this.itemNombre.nativeElement, 1400);
    this.opacityReturn(this.itemApellido.nativeElement, 1600);
    this.opacityReturn(this.itemCorreo.nativeElement, 1800);
    this.opacityReturn(this.itemPreguntaSecreta.nativeElement, 2000);
    this.opacityReturn(this.itemRespuestaSecreta.nativeElement, 2200);
    this.opacityReturn(this.itemEducacion.nativeElement, 2400);
    this.opacityReturn(this.itemFechaNacimiento.nativeElement, 2600);
    this.opacityReturn(this.itemContraseña.nativeElement, 2800);
    this.opacityReturn(this.itemContraseña2.nativeElement, 3000);
    this.opacityReturn(this.itemContraseña3.nativeElement, 3200);
    this.limpiarPagina();
  }
  
  guardarDatos() {
    if (
      this.itemContraseña3.nativeElement === ''){
        this.mostrarMensajeAlerta('Para guardar los datos, vuelva a escribir su contraseña')
      } else {
        this.mostrarMensajeAlerta('datos guardados correctamente')
      }

    }





  animarTituloIzqDer() {
    const animation = this.animationController.create()
      .addElement(this.itemTitulo.nativeElement)
      .duration(5000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(-100%)', 'translateX(100%)')
      .fromTo('opacity', 0.2, 1) 
      .afterClearStyles(['transform', 'opacity']); 
  
    // Reproduce la animación
    animation.play();
  }

  async mostrarMensajeAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Datos personales',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }
}
