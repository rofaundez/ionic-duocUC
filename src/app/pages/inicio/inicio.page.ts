import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Agrega RouterModule aquí
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AnimationController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';

import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Usuario } from 'src/app/model/usuario';
import { Asistencia } from 'src/app/interfaces/asistencia';


@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule,
    RouterModule],
})

export class InicioPage implements AfterViewInit {

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public usuario: Usuario;
  public asistencia: Asistencia | undefined = undefined;
  public escaneando = false;
  public datosQR: string = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController,
    private asistenciaService: AsistenciaService 
  ) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngAfterViewInit() {
    this.comenzarEscaneoQR();
    this.animarTituloIzqDer()
  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    this.asistencia = JSON.parse(datosQR);

    this.asistenciaService.setAsistencia(this.asistencia!);
  
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  animarTituloIzqDer() {
    const animation = this.animationController.create()
      .addElement(this.itemTitulo.nativeElement)
      .duration(5000) 
      .iterations(Infinity) 
      .fromTo('transform', 'translateX(-100%)', 'translateX(100%)')
      .fromTo('opacity', 0.2, 1) 
      .afterClearStyles(['transform', 'opacity']);
 
    animation.play();
  }
  

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

}