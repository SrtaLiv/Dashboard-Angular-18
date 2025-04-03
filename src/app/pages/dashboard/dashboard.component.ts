import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    { title: 'Total de Cursos', value: '24', icon: 'school', color: '#4CAF50' },
    { title: 'Estudiantes Activos', value: '156', icon: 'people', color: '#2196F3' },
    { title: 'Tareas', value: '38', icon: 'assignment', color: '#FF9800' },
    { title: 'Promedio', value: '78%', icon: 'trending_up', color: '#9C27B0' }
  ];
}