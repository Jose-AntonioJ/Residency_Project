import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-cartesian-plane',
  standalone: false,
  templateUrl: './cartesian-plane.html',
  styleUrl: './cartesian-plane.css'
})
export class CartesianPlane implements OnInit {

  constructor(
    public navigation: NavigationService,
    private activateRouter: ActivatedRoute,
    private notifyService: NotifyService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.ejecutarSimulacion({
      EjeInicioX: 5,
      EjeInicioY: 20,
      EjeFinalX: 15,
      EjeFinalY: 10,
      EjeZ: 5,
      Velocidad: 3,
      Flujo: 5,
      Cobertura: 30,
      Pasadas: 2
    })

  }

  public lineChartType: 'line' = 'line';

  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [{ x: 0, y: 0 }],
        label: 'Movimiento físico',
        borderColor: 'blue',
        backgroundColor: 'transparent',
        pointRadius: 4,
        tension: 0.2
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 30,
        ticks: {
          stepSize: 5
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        min: 0,
        max: 30,
        ticks: {
          stepSize: 5
        }
      }
    }
  };

  // Método para ejecutar la simulación
  public ejecutarSimulacion(movimiento: any) {
    // Limpiar gráfico antes de iniciar
    this.lineChartData.datasets[0].data = [];
    this.cdr.detectChanges();

    let pasadaActual = 0;
    const totalPasadas = movimiento.Pasadas || 1;

    const xInicio = movimiento.EjeInicioX || 0;
    const xFinal = movimiento.EjeFinalX || 0;
    const yInicio = movimiento.EjeInicioY || 0;
    const yFinal = movimiento.EjeFinalY || 0;

    const pasos = 50;       // cantidad de pasos entre inicio y fin
    const intervalo = 100;  // ms por paso

    const deltaX = (xFinal - xInicio) / pasos;
    const deltaY = (yFinal - yInicio) / pasos;

    let step = 0;

    const animar = setInterval(() => {
      // Calcular posición actual
      const x = xInicio + deltaX * step;
      const y = yInicio + deltaY * step;

      // Agregar al dataset
      this.lineChartData.datasets[0].data.push({ x, y });

      // Refrescar gráfico
      this.cdr.detectChanges();

      step++;

      // Cuando termina una pasada
      if (step > pasos) {
        pasadaActual++;
        step = 0;

        this.notifyService.infoNotification(`Pasada ${pasadaActual} completada`);

        // Verificar si terminó todas las pasadas
        if (pasadaActual >= totalPasadas) {
          clearInterval(animar);
          this.notifyService.successFull("Aspersión finalizada");
          return;
        }
      }
    }, intervalo);
  }



}
