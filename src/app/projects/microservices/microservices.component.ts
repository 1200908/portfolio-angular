import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-microservices',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './microservices.component.html',
  styleUrls: ['./microservices.component.css']
})
export class MicroservicesComponent {}
