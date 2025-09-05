import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-cartesian-plane',
  standalone: false,
  templateUrl: './cartesian-plane.html',
  styleUrl: './cartesian-plane.css'
})
export class CartesianPlane implements OnInit{

  constructor(
    public navigation: NavigationService,
    private activateRouter: ActivatedRoute,
    private notifyService: NotifyService
  ){}

  ngOnInit(): void {
    
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

}
