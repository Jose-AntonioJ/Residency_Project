import { Component, inject, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AspersionService } from '../services/aspersion';
import { ControlTiempoDTO, MovimientoDTO } from '../modelos/moviments';
//                                           👆 NUEVO

import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatStepper } from '@angular/material/stepper';
import { CartesianPlane } from '../cartesian-plane/cartesian-plane';


interface Velocidad {
  value: number;
  viewValue: string;
}

interface Flujo {
  value: number;
  viewValue: string;
}

interface Capas {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('plano') plano!: CartesianPlane;

  private formBuilder = inject(FormBuilder);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef); // 👈 NUEVO
  private aspersionService = inject(AspersionService);

  selecciondeMinutos: number = 0;
  tiempoRestante = 0;
  tiempo: any;
  tiempoInicial = 0;
  enPausa = false;
  tiempodeEjecucion = false;
  trayectoriaEnviada = false;
  tiempoPasada: number = 0;
  tiempoTotal: number = 0;

  firstFormGroup = this.formBuilder.group({
    ejeInicioX: ['', Validators.required],
    ejeFinalX: ['', Validators.required],
    ejeInicioY: ['', Validators.required],
    ejeFinalY: ['', Validators.required],
    ejeZ: ['', Validators.required]
  });

  secondFormGroup = this.formBuilder.group({
    flujo: ['', Validators.required],
    velocidad: ['', Validators.required],
    cobertura: [30, Validators.required],
  });

  threeFormGroup = this.formBuilder.group({
    pasadas: [null, Validators.required],

  });

  fourFormGroup = this.formBuilder.group({
    duracion: [null, Validators.required],
    accion: ['', Validators.required],
  });

  isLinear = false;

  velocidades: Velocidad[] = [
    { value: 1, viewValue: 'Nivel 1' },
    { value: 2, viewValue: 'Nivel 2' },
    { value: 3, viewValue: 'Nivel 3' },
    { value: 4, viewValue: 'Nivel 4' },
    { value: 5, viewValue: 'Nivel 5' },
  ]

  flujos: Flujo[] = [
    { value: 1, viewValue: 'Bajo' },
    { value: 5, viewValue: 'Medio' },
    { value: 10, viewValue: 'Alto' },
  ]

  capas: Capas[] = [
    { value: 1, viewValue: '1 Capa' },
    { value: 2, viewValue: '2 Capas' },
    { value: 3, viewValue: '3 Capas' },
    { value: 4, viewValue: '4 Capas' },
  ]

  firstFormGroupBackend: any = null;
  secondFormGroupBackend: any = null;
  threeFormGroupBackend: any = null;

  resetBackendData() {
    // Reinicia todo lo que envías al backend
    this.firstFormGroupBackend = null;
    this.secondFormGroupBackend = null;
    this.threeFormGroupBackend = null;
    this.fourFormGroup.patchValue({ accion: '' }); // acción vacía
    this.trayectoriaEnviada = false;
    this.tiempoRestante = 0;
    this.tiempodeEjecucion = false;
    this.enPausa = false;
  }


  iniciarAspersion() {
    this.stopTimer();
    // toma directamente el valor ingresado por el usuario
    this.tiempoInicial = this.selecciondeMinutos * 60;
    this.tiempoRestante = this.tiempoInicial;
    this.enPausa = false;
    this.tiempodeEjecucion = true;

    this.fourFormGroup.patchValue({ accion: 'Iniciar' });
    this.controlarTirmpo();

    this.tiempo = setInterval(() => {
      if (!this.enPausa && this.tiempoRestante > 0) {
        this.tiempoRestante--;
        this.cdr.detectChanges(); // asegura refrescar la UI
      }
      if (this.tiempoRestante === 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  pausarReanudar() {
    this.enPausa = !this.enPausa;
    this.fourFormGroup.patchValue({ accion: this.enPausa ? 'Pausar' : 'Continuar' });
    this.controlarTirmpo();
  }

  detenerAspersion() {
    this.stopTimer();
    this.tiempoRestante = this.tiempoInicial;
    this.enPausa = false;

    //Accion para detener
    this.fourFormGroup.patchValue({ accion: 'Detener' });
    this.controlarTirmpo();

    //Resetear lo que se envia al backend
    this.resetBackendData();
  }

  stopTimer() {
    if (this.tiempo) {
      clearInterval(this.tiempo);
      this.tiempo = null;
    }
    this.tiempodeEjecucion = false;
    this.cdr.detectChanges();               // 👈 asegura reflejar el stop
  }

  ngOnDestroy() { this.stopTimer(); }

  get tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoRestante / 60);
    const segundos = this.tiempoRestante % 60;
    return `${this.pad(minutos)}:${this.pad(segundos)}`;
  }
  private pad(v: number) { return v < 10 ? '0' + v : String(v); }


  // Método para enviar datos al backend
  enviarTrayectoria() {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.threeFormGroup.invalid) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    // Guardar valores para enviar al backend
    this.firstFormGroupBackend = { ...this.firstFormGroup.value };
    this.secondFormGroupBackend = { ...this.secondFormGroup.value };
    this.threeFormGroupBackend = { ...this.threeFormGroup.value };

    const dto: MovimientoDTO = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      pasadas: this.threeFormGroup.value.pasadas!,
    } as unknown as MovimientoDTO;

    this.aspersionService.trayectoria(dto).subscribe({
      next: (response) => {
        console.log('Trayectoria enviada con éxito:', response);

        this.tiempoPasada = response.tiempoEstimadoPasadaMin;
        this.tiempoTotal = response.tiempoEstimadoTotalMin;

        console.log('Tiempo por pasada:', this.tiempoPasada.toFixed(2));
        console.log('Tiempo total:', this.tiempoTotal.toFixed(2));

        Swal.fire({
          icon: 'success',
          title: 'Good job!',
          text: `Trayectoria enviada con éxito.
             Tiempo por pasada: ${this.tiempoPasada.toFixed(2)} min
             Tiempo total: ${this.tiempoTotal.toFixed(2)} min`,
          confirmButtonText: 'OK'
        });

        this.ngZone.run(() => {
          this.trayectoriaEnviada = true;
          this.stepper.next();
        });

        const plano = document.querySelector('app-cartesian-plane') as any;
        // luego en enviarTrayectoria:
        if (this.plano) {
          this.plano.ejecutarSimulacion(dto);
        }

      },
      error: (error) => {
        console.error('Error al enviar la trayectoria:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de envio!',
          text: 'Control de tiempo enviado erroneo.',
          confirmButtonText: 'OK'
        });
      }
    });

  }

  controlarTirmpo() {
    const dto: ControlTiempoDTO = {
      duracion: this.fourFormGroup.value.duracion!,
      accion: this.fourFormGroup.value.accion!,
    };

    this.aspersionService.controlTiempo(dto).subscribe({
      next: (response) => {
        console.log('Control de tiempo enviado con éxito:', response);
        Swal.fire({
          icon: 'success',
          title: 'Control enviado!',
          text: 'Control de tiempo enviado con éxito.',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        console.error('Error al enviar el control de tiempo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al envio!',
          text: 'Control de tiempo enviado erroneo.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

}
