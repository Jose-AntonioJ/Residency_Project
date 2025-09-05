import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notify',
  standalone: false,
  templateUrl: './notify.component.html',
  styleUrl: './notify.component.css'
})
export class NotifyComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit(): void {
    
  }

}
