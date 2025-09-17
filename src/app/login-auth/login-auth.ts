import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login';
import { LoginDTO } from '../modelos/logins';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-auth',
  standalone: false,
  templateUrl: './login-auth.html',
  styleUrl: './login-auth.css'
})
export class LoginAuth {
  loginForm: any;
  mensaje: string | undefined;
  showPassword = false;
  mensajeClase = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // En tu método donde manejas mensajes:
  mostrarMensaje(tipo: 'error' | 'exito', texto: string) {
    this.mensaje = texto;
    this.mensajeClase = tipo === 'error' ? 'mensaje-error' : 'mensaje-exito';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.mensaje = 'Debes de completar los campos';
      return;
    }

    const datos: LoginDTO = {
      usuario: this.loginForm.value.usuario || '',
      password: this.loginForm.value.password || ''
    };

    this.loginService.login(datos).subscribe({
      next: (response) => {
        this.mensaje = response.mensaje;
        localStorage.setItem('token', response.token);
        this.router.navigate(['/aspersor']);
      },
      error: (error) => {
        this.mensaje = error.error.mensaje || 'Error en la autenticación';
      }
    });
  }

}
