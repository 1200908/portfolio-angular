import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink , CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  projects = [
    {
      id: 'library-management',
      title: 'Library Management System',
      description: 'Distributed library management system with microservices architecture, JWT authentication, and multi-platform frontend (Android & React).',
      image: 'assets/img.png',
      tags: ['Java', 'Spring Boot', 'Kafka', 'Android', 'React'],
      route: '/projects/library'
    },
    {
      id: 'project1',
      title: 'E-Commerce Platform',
      description: 'Full-stack application with Spring Boot and Angular',
      image: 'assets/project1.jpg',
      tags: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
      route: '/projects/library'
    },
    {
      id: 'project2',
      title: 'Real-time Chat App',
      description: 'Microservices architecture with RabbitMQ',
      image: 'assets/project2.jpg',
      tags: ['Node.js', 'RabbitMQ', 'Docker', 'AWS'],
      route: '/projects/chat-app'
    },
    {
      id: 'project3',
      title: 'Data Analytics Dashboard',
      description: 'Interactive dashboard with real-time data visualization',
      image: 'assets/project3.jpg',
      tags: ['Python', 'Kafka', 'React', 'AWS'],
      route: '/projects/analytics'
    },
    {
      id: 'project4',
      title: 'IoT Monitoring System',
      description: 'Sensors monitoring with cloud integration',
      image: 'assets/project4.jpg',
      tags: ['C++', 'Python', 'AWS IoT', 'PostgreSQL'],
      route: '/projects/iot-system'
    }
  ];

  scrollToProjects() {
    const el = document.getElementById('tech');
    if (!el) return;

    const yOffset = -90; // altura da navbar
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
  constructor(private router: Router) { }
  goToEducation() {
    this.router.navigate(['/about']).then(() => {
      const el = document.getElementById('container-principal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
