import { Component, inject, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface Velocidad {
  value: number;
  viewValue: string;
}

interface Flujo {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private formBuilder = inject(FormBuilder);
  private ngZone = inject(NgZone);
  opciondeMinutos = [5, 10,15, 20, 25, 30];
  selecciondeMinutos = this.opciondeMinutos[0];
  tiempoRestante = 0;
  tiempo: any;
  tiempodeEjecucion = false;

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  threeFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = false;

  velocidades: Velocidad[] = [
    {value: 1, viewValue: 'Nivel 1'},
    {value: 2, viewValue: 'Nivel 2'},
    {value: 3, viewValue: 'Nivel 3'},
    {value: 4, viewValue: 'Nivel 4'},
    {value: 5, viewValue: 'Nivel 5'},
  ]

  flujos: Flujo[] = [
    {value: 1, viewValue: 'Bajo'},
    {value: 5, viewValue: 'Medio'},
    {value: 10, viewValue: 'Alto'},
  ]

  startTimer() {
    this.stopTimer();
    this.tiempoRestante = this.selecciondeMinutos * 60;
    this.tiempodeEjecucion = true;
    console.log("Tiempo de ejecución:", this.selecciondeMinutos, "minutos");
    console.log("Tiempo restante en segundos:", this.tiempoRestante);
    console.log(this.tiempodeEjecucion);

    this.tiempo = setInterval(() => {
      this.ngZone.run(() => {   // 👈 asegura que Angular refresque la vista
        if (this.tiempoRestante > 0) {
          this.tiempoRestante--;
        } else {
          this.stopTimer();
        }
      });
    }, 1000);
  }

  stopTimer() {
    if (this.tiempo) {
      clearInterval(this.tiempo);
    }
    this.tiempo = null;
  }

  ngOnDestroy() {
    this.stopTimer();
  }

}
