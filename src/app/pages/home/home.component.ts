import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  Inject,
  ViewChild,
  HostListener,
  OnInit, OnDestroy
} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import { isPlatformBrowser } from '@angular/common';
import {TimelineComponent} from "../../components/timeline/timeline.component";
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import {ScrollRevealDirective} from '../../shared/directives/scroll-reveal.directive';
interface FloatingIcon {
  class: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  duration: number;
  delay: number;
}


import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink , CommonModule, TimelineComponent, ChatbotComponent, ScrollRevealDirective ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
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
      id: 'tunance-website',
      title: 'Tunance Website',
      description: 'Fully deployed and live web platform at tunance.pt, built with modern HTML5, CSS3, and Angular. Features responsive layouts, interactive elements, and smooth animations, providing a real-world user experience.',
      image: 'assets/tunance_project.png',
      tags: ['Angular', 'TypeScript', 'Routing', 'Responsive Design', 'HTML5 / CSS3', 'Animations', 'Live Deployment'],
      route: '/projects/tunance'
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


  mouseX = -999;
  mouseY = -999;
  animationId: any;

  // posições iniciais aleatórias espalhadas pelo ecrã
  icons: FloatingIcon[] = [
    { class: 'fab fa-angular',  x: 5,  y: 10, vx: 0, vy: 0, duration: 10, delay: 0 },
    { class: 'fab fa-js',       x: 18, y: 65, vx: 0, vy: 0, duration: 12, delay: 0.5 },
    { class: 'fab fa-python',   x: 30, y: 30, vx: 0, vy: 0, duration: 9,  delay: 1 },
    { class: 'fab fa-docker',   x: 45, y: 75, vx: 0, vy: 0, duration: 11, delay: 1.5 },
    { class: 'fab fa-git-alt',  x: 55, y: 15, vx: 0, vy: 0, duration: 13, delay: 2 },
    { class: 'fab fa-html5',    x: 68, y: 50, vx: 0, vy: 0, duration: 8,  delay: 2.5 },
    { class: 'fab fa-css3-alt', x: 80, y: 25, vx: 0, vy: 0, duration: 14, delay: 3 },
    { class: 'fab fa-node',     x: 92, y: 70, vx: 0, vy: 0, duration: 10, delay: 3.5 },
    { class: 'fab fa-github',   x: 10, y: 85, vx: 0, vy: 0, duration: 11, delay: 4 },
    { class: 'fab fa-linux',    x: 38, y: 55, vx: 0, vy: 0, duration: 9,  delay: 4.5 },
    { class: 'fab fa-java',     x: 72, y: 82, vx: 0, vy: 0, duration: 12, delay: 5 },
    { class: 'fab fa-aws',      x: 88, y: 40, vx: 0, vy: 0, duration: 10, delay: 5.5 },
    { class: 'fa fa-cloud',     x: 25, y: 45, vx: 0, vy: 0, duration: 13, delay: 1 },
    { class: 'fa fa-leaf',      x: 60, y: 88, vx: 0, vy: 0, duration: 9,  delay: 2 },
    { class: 'fa fa-cubes',     x: 78, y: 60, vx: 0, vy: 0, duration: 11, delay: 3 },
    { class: 'fa fa-database',  x: 42, y: 20, vx: 0, vy: 0, duration: 14, delay: 4 },
    { class: 'fa fa-lock',      x: 15, y: 50, vx: 0, vy: 0, duration: 10, delay: 5 },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAnimation();  // ← nome diferente
    }
  }
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationId);
    }
    this.typed?.destroy();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.mouseX = (e.clientX / window.innerWidth) * 100;
    this.mouseY = (e.clientY / window.innerHeight) * 100;
  }

  startAnimation() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.icons = this.icons.map(icon => {
      const dx = icon.x - this.mouseX;
      const dy = icon.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 15;

      if (dist < repelRadius && dist > 0) {
        const force = (repelRadius - dist) / repelRadius;
        icon.vx += (dx / dist) * force * 0.5;
        icon.vy += (dy / dist) * force * 0.5;
      }

      icon.vx *= 0.92;
      icon.vy *= 0.92;
      icon.x  += icon.vx;
      icon.y  += icon.vy;

      if (icon.x < 0)  { icon.x = 0;  icon.vx *= -1; }
      if (icon.x > 95) { icon.x = 95; icon.vx *= -1; }
      if (icon.y < 0)  { icon.y = 0;  icon.vy *= -1; }
      if (icon.y > 90) { icon.y = 90; icon.vy *= -1; }

      return icon;
    });

    this.animationId = requestAnimationFrame(() => this.startAnimation());
  }


}
