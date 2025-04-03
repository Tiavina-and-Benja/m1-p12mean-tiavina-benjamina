import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { Vehicle } from '@app/models/vehicle.model';

@Component({
  selector: 'app-vehicle-card',
  imports: [MaterialModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss',
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;
  @Output() update = new EventEmitter<any>(); 
}
