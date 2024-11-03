import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { AlertController, IonicModule } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { AnimationController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule] // Importaciones necesarias
})
export class MiclasePage implements OnInit, AfterViewInit {
  public usuario: Usuario;
  public asistencia: Asistencia | undefined; 
  public escaneando = false;
  public datosQR: string = '';

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private asistenciaService: AsistenciaService 
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {

    this.asistencia = this.asistenciaService.getAsistencia();
    
 
    if (this.asistencia) {
      this.datosQR = JSON.stringify(this.asistencia);
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
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  setAsistencia(asistencia: Asistencia) {
    this.asistencia = asistencia; 
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }
}