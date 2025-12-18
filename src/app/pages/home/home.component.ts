import {AfterViewInit, Component, ElementRef, PLATFORM_ID, Inject, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import { isPlatformBrowser } from '@angular/common';
import {TimelineComponent} from "../../components/timeline/timeline.component";
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink , CommonModule, TimelineComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  projects = [
    {
      id: 'library-management',
      title: 'Library Management System',
      description: 'Distributed library management system with microservices architecture, JWT authentication, and multi-platform frontend (Android & React).',
      image: 'assets/img.png',
      tags: ['Java', 'Spring Boot', 'RabbitMQ', 'Android', 'React Native'],
      route: '/projects/library'
    },
    {
      id: 'auto-generated-blog',
      title: 'Auto-Generated Blogs',
      description: 'Full-stack blog with automated content generation using AI, built as a technical challenge.',
      image: 'assets/pic_blog.png',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS EC2', 'AWS ECR', 'AWS CodeBuild'],
      route: '/projects/blog'
    },
    {
      id: 'frontend-portfolio',
      title: 'Frontend Portfolio',
      description: 'Responsive and interactive web interface built with modern HTML5, CSS3, and Flexbox/Grid.',
      image: 'assets/pic_portfolio.png',
      tags: ['Angular', 'TypeScript', 'Routing', 'Responsive Design','HTML5 / CSS3', 'Animations'],
      route: '/projects/portfolio'
    },
    {
      id: 'java-microservices',
      title: 'Java Microservices Manager',
      description: 'Personal project showcasing a robust, scalable, and fully modular Java-based microservices architecture.',
      image: 'assets/backend.png',
      tags: ['Java', 'Spring Boot', 'Spring Cloud Config', 'Eureka', 'Spring Cloud Gateway', 'Spring Mail', 'CQRS', 'Docker', 'JUnit'],
      route: '/projects/microservices'
    },
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
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  goToEducation() {
    this.router.navigate(['/about']).then(() => {
      const el = document.getElementById('container-principal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  @ViewChild('typedElement') typedElement?: ElementRef;

  typed?: Typed;
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.typedElement) {
      const element = this.typedElement.nativeElement;
      setTimeout(() => {
        this.typed = new Typed(element, {
          strings: [
            'Telecommunications &amp; Informatics Engineer',
            'Backend Developer',
            'Cloud &amp; Distributed Systems Enthusiast'
          ],
          typeSpeed: 50,
          backSpeed: 30,
          backDelay: 1500,
          loop: true,
          showCursor: true
        });
      }, 50);
    }
  }

  goToProject(route: string) {
    this.router.navigate([route]).then(() => {
      const el = document.getElementById('top');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
