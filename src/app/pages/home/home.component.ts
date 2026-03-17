import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  Inject,
  ViewChild,
  HostListener,
  OnInit, OnDestroy, ChangeDetectorRef
} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import { isPlatformBrowser } from '@angular/common';
import {TimelineComponent} from "../../components/timeline/timeline.component";
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import {ScrollRevealDirective} from '../../shared/directives/scroll-reveal.directive';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
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
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) { }
  goToEducation() {
    this.router.navigate(['/about']).then(() => {
      const el = document.getElementById('container-principal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  @ViewChild('typedElement') typedElement?: ElementRef;
  @ViewChild('projectTitle') projectTitle?: ElementRef;
  @ViewChild('projectSubtitle') projectSubtitle?: ElementRef;

  typed?: Typed;
  ngAfterViewInit() {
    this.cdr.detectChanges();

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

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {

            // GSAP começa após 1s — tempo da animação CSS do título
            const tl = gsap.timeline({
              delay: 1,   // ← espera 1s pelo CSS terminar
              defaults: { ease: 'power3.out' },
              onComplete: () => initScrollAnimations()
            });

            tl.fromTo('.hero-subtitle',
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.6 })
              .fromTo('.hero-description',
                { autoAlpha: 0, y: 20, filter: 'blur(6px)' },
                { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '-=0.3')
              .fromTo('.hero-buttons .btn-primary',
                { autoAlpha: 0, x: -60 },
                { autoAlpha: 1, x: 0, duration: 0.5 }, '-=0.3')
              .fromTo('.hero-buttons .btn-secondary',
                { autoAlpha: 0, x: 60 },
                { autoAlpha: 1, x: 0, duration: 0.5 }, '-=0.5')
              .fromTo('.social-link',
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.4 }, '-=0.2')
              .fromTo('.scroll-indicator',
                { autoAlpha: 0, y: 10 },
                { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.1');

            const onScroll = () => {
              if (window.scrollY > 10) {
                // Anima o timeScale de 1 para 6 suavemente
                gsap.to(tl, {
                  timeScale: 6,
                  duration: 0.3,
                  ease: 'power2.in'
                });
                window.removeEventListener('scroll', onScroll);
              }
            };

          }, 50);
        }
        function initScrollAnimations() {

          // Description — entra de baixo, sai com blur
          gsap.fromTo('.hero-description',
            { y: 0, opacity: 1, filter: 'blur(0px)' },
            {
              y: 30, opacity: 0, filter: 'blur(5px)',
              immediateRender: false,
              scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: '+=300',
                scrub: 1.5
              },
              ease: 'none'
            }
          );

          // Botão primary — sai para a esquerda ao scrollar
          gsap.to('.hero-buttons .btn-primary', {
            x: -80, opacity: 0, rotation: -5,
            immediateRender: false,
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: '+=400',
              scrub: 1.5
            },
            ease: 'none'
          });

          // Botão secondary — sai para a direita ao scrollar
          gsap.to('.hero-buttons .btn-secondary', {
            x: 80, opacity: 0, rotation: 5,
            immediateRender: false,
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: '+=400',
              scrub: 1.5
            },
            ease: 'none'
          });

          // Social links — saem para baixo em stagger ao scrollar
          gsap.to('.social-link', {
            y: 40, opacity: 0, stagger: 0.05,
            immediateRender: false,
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: '+=350',
              scrub: 1.5
            },
            ease: 'none'
          });
        }

        // Scroll indicator desaparece
        gsap.to('.scroll-indicator', {
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: '+=150',
            scrub: true
          },
          opacity: 0,
          ease: 'none'
        });

        // Tech Stack title entra da esquerda
        gsap.fromTo('.tech-stack-section .section-title',
          { x: -60, rotation: -8, opacity: 0 },
          {
            x: 0, rotation: 0, opacity: 1,
            scrollTrigger: {
              trigger: '.tech-stack-section',
              start: 'top 80%',
              end: 'top 40%',
              scrub: true
            },
            ease: 'none'
          }
        );

// Saída para a direita
        gsap.to('.tech-stack-section .section-title', {
          x: 60, rotation: 8, opacity: 0, immediateRender: false,
          scrollTrigger: {
            trigger: '.tech-stack-section',
            start: 'top 10%',
            end: 'top -20%',
            scrub: true
          },
          ease: 'none'
        });


        gsap.utils.toArray<Element>('.tech-item').forEach((item, i) => {

          // Alterna — par entra da esquerda, ímpar da direita
          const fromX = i % 2 === 0 ? -60 : 60;
          const toX   = i % 2 === 0 ?  60 : -60; // saída lado oposto

          // Entrada
          gsap.fromTo(item,
            { x: fromX, opacity: 0, scale: 0.85 },
            {
              x: 0, opacity: 1, scale: 1,
              scrollTrigger: {
                trigger: item,         // ← cada item é o seu próprio trigger
                start: 'top 90%',
                end: 'top 60%',
                scrub: true
              },
              ease: 'none'
            }
          );

          // Saída
          gsap.to(item, {
            x: toX, opacity: 0, scale: 0.85,
            immediateRender: false,
            scrollTrigger: {
              trigger: item,
              start: 'bottom 20%',   // ← quando o item sai pelo topo
              end: 'bottom -10%',
              scrub: true
            },
            ease: 'none'
          });

        });

        // ── PROJECTS — só UM par de entrada + saída ──
        gsap.fromTo('.projects-section .section-title',
          { x: -60, rotation: -8, opacity: 0 },
          {
            x: 0, rotation: 0, opacity: 1,
            scrollTrigger: {
              trigger: '.projects-section',
              start: 'top 80%',
              end: 'top 40%',
              scrub: true
            },
            ease: 'none'
          }
        );

        gsap.fromTo('.projects-section .section-subtitle',
          { x: 60, rotation: 8, opacity: 0 },
          {
            x: 0, rotation: 0, opacity: 1,
            scrollTrigger: {
              trigger: '.projects-section',
              start: 'top 80%',
              end: 'top 40%',
              scrub: true
            },
            ease: 'none'
          }
        );

        // Saída para o lado oposto
        gsap.to('.projects-section .section-title', {
          x: 60, rotation: 8, opacity: 0, immediateRender: false,
          scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 10%',
            end: 'top -20%',
            scrub: true
          },
          ease: 'none'
        });

        gsap.to('.projects-section .section-subtitle', {
          x: -60, rotation: -8, opacity: 0, immediateRender: false,
          scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 10%',
            end: 'top -20%',
            scrub: true
          },
          ease: 'none'
        });

      }, 100);
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
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
