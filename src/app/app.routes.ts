import { Routes } from '@angular/router';
import { ingresoGuard } from './guards/ingreso-guard.service';
import { inicioGuard } from './guards/inicio-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [ingresoGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [inicioGuard]
  },
  {
    path: 'theme',
    loadComponent: () => import('./pages/theme/theme.page').then(m => m.ThemePage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then(m => m.InicioPage)
  },
  {
    path: 'correo',
    loadComponent: () => import('./pages/correo/correo.page').then(m => m.CorreoPage)
  },
  {
    path: 'pregunta',
    loadComponent: () => import('./pages/pregunta/pregunta.page').then(m => m.PreguntaPage)
  },
  {
    path: 'correcto',
    loadComponent: () => import('./pages/correcto/correcto.page').then(m => m.CorrectoPage)
  },
  {
    path: 'incorrecto',
    loadComponent: () => import('./pages/incorrecto/incorrecto.page').then(m => m.IncorrectoPage)
  },
  {
    path: 'misdatos',
    loadComponent: () => import('./pages/misdatos/misdatos.page').then(m => m.MisdatosPage)
  },
  {
    path: 'miclase',
    loadComponent: () => import('./pages/miclase/miclase.page').then(m => m.MiclasePage)
  },
];
