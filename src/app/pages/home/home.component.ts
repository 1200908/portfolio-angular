import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  Inject,
  ViewChild,
  HostListener,
  OnInit, OnDestroy, ChangeDetectorRef, NgZone
} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import { isPlatformBrowser } from '@angular/common';
import {TimelineComponent} from "../../components/timeline/timeline.component";
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import {ScrollRevealDirective} from '../../shared/directives/scroll-reveal.directive';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import {NavbarComponent} from "../../components/navbar/navbar.component";
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink , CommonModule, TimelineComponent, ChatbotComponent, ScrollRevealDirective, LottieComponent ],
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
      tags: ['Java', 'Spring Boot', 'Android', 'RabbitMQ', 'React Native'],
      route: '/projects/library'
    },
    {
      id: 'auto-generated-blog',
      title: 'Auto-Generated Blogs',
      description: 'Full-stack blog with automated content generation using AI, built as a technical challenge.',
      image: 'assets/pic_blog.png',
      tags: ['React', 'Node.js', 'AWS EC2', 'PostgreSQL', 'Docker', 'AWS ECR', 'AWS CodeBuild'],
      route: '/projects/blog'
    },
    {
      id: 'tunance-website',
      title: 'Tunance Website',
      description: 'Fully deployed and live web platform at tunance.pt, built with modern HTML5, CSS3, and Angular. Features responsive layouts, interactive elements, and smooth animations, providing a real-world user experience.',
      image: 'assets/tunance_project.png',
      tags: ['Angular' , 'Nonprofit Project', 'Production', 'Animations', 'Live Deployment'],
      route: '/projects/tunance'
    },
    {
      id: 'frontend-portfolio',
      title: 'Frontend Portfolio',
      description: 'Responsive and interactive web interface built with modern HTML5, CSS3, and Flexbox/Grid.',
      image: 'assets/pic_portfolio.png',
      tags: ['Angular', 'Portfolio', 'HTML5/CSS3', 'Responsive Design', 'Animations'],
      route: '/projects/portfolio'
    },
    {
      id: 'java-microservices',
      title: 'Java Microservices Manager',
      description: 'Personal project showcasing a robust, scalable, and fully modular Java-based microservices architecture.',
      image: 'assets/backend.png',
      tags: ['Java', 'Spring Boot', 'Microservices', 'Spring Cloud', 'CQRS', 'Docker', 'JUnit'],
      route: '/projects/microservices'
    },
  ];



  lottieOptions: AnimationOptions = {
    path: 'assets/computer_operator_typing.json',
    loop: true,
    autoplay: true,
  };
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
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef, private ngZone: NgZone) { }

  goToEducation() {
    NavbarComponent.activeSection$.next('about');
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

    if (!isPlatformBrowser(this.platformId)) return;
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger, Observer);
    }

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


        const bg = document.querySelector('.hero-background') as HTMLElement;

        ScrollTrigger.create({
          trigger: '.hero-section',
          start: 'bottom 80%',
          onEnter: () => {
            this.paused = true;  // pausa a animação quando scroll entra
          },
          onLeaveBack: () => {
            this.paused = false; // retoma a animação quando scroll volta
          },
        });

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
              .fromTo('.hero-lottie',          // ← adiciona isto no fim
                { autoAlpha: 0, x: 80, scale: 0.85 },
                { autoAlpha: 1, x: 0, scale: 1, duration: 0.8 }, '-=0.4')
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
                { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.1')
              ;

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
              y: 80, opacity: 0, filter: 'blur(5px)',
              immediateRender: false,
              scrollTrigger: {
                trigger: '.hero-section',
                start: 'bottom 90%',
                end: '+=500',
                scrub: 1.5
              },
              ease: 'none'
            }
          );

          // Lottie — sai para a direita ao scrollar
          gsap.to('.hero-lottie', {
            y: -30, opacity: 0, filter: 'blur(5px)',
            immediateRender: false,
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: '+=400',
              scrub: 1.5
            },
            ease: 'none'
          });

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
            end: '+=75',
            scrub: true
          },
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
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


        const width = window.innerWidth;

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isIOSSafari = isIOS && isSafari;

        const isSamsungInternet = /SamsungBrowser/i.test(navigator.userAgent);

        const forceDesktopAnimations =
          isIOSSafari || isSamsungInternet;

        if (width > 768 || forceDesktopAnimations) {
          this.initDesktopCards();
        } else {
          this.initMobileDeck();
        }

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 300);

        this.setupIntersectionObserver();
      }, 100);
    }

}



  private initMobileDeck() {
    const header = document.querySelector<HTMLElement>('.projects-header');
    const headerTitle = header?.querySelector<HTMLElement>('.section-title') ?? null;
    const headerSubtitle = header?.querySelector<HTMLElement>('.section-subtitle') ?? null;
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.projects-grid .project-card'));
    const grid = document.querySelector<HTMLElement>('.projects-grid');


    if (!cards.length || !grid) return;

    const total = cards.length;
    const STEPS = 120;
    const ANIMATE_COUNT = total - 1; // último card nunca sai

    if (header) {
      const headerHeight = header.offsetHeight;
      const placeholder = document.createElement('div');
      placeholder.style.height = `${headerHeight}px`;
      placeholder.style.pointerEvents = 'none';

      let inserted = false;
      const vh = document.documentElement.clientHeight;


      ScrollTrigger.create({
        trigger: grid,
        start: 'top 20%',
        end: `+=${ vh * total}`,
        onEnter: () => {
          if (header) {
            header.classList.add('is-fixed');
            if (!inserted) {
              header.parentElement?.insertBefore(placeholder, header);
              inserted = true;
            }
          }
        },

        onLeave: () => {
          if (header) {
            gsap.to(headerTitle, {
              x:0,
              y: -40,           // sobe
              opacity: 0,
              duration: 0.35,
              ease: 'power2.in'
            });
            gsap.to(headerSubtitle, {
              x:0,
              y: -40,           // sobe também
              opacity: 0,
              duration: 0.35,
              ease: 'power2.in',
              delay: 0.05,
              onComplete: () => {
                header.classList.remove('is-fixed');
                if (inserted) { placeholder.remove(); inserted = false; }
                gsap.set([headerTitle, headerSubtitle], { clearProps: 'all' });
              }
            });
          }
        },

        onEnterBack: () => {
          if (header) {
            header.classList.add('is-fixed');
            if (!inserted) {
              header.parentElement?.insertBefore(placeholder, header);
              inserted = true;
            }
            gsap.set(header, { clearProps: 'all' });

            gsap.fromTo(headerTitle,
              { x: -60, opacity: 0, rotation: -8 },
              { x: 0, opacity: 1, rotation: 0, duration: 0.5, ease: 'power3.out' }
            );
            gsap.fromTo(headerSubtitle,
              { x: 60, opacity: 0, rotation: 8 },
              { x: 0, opacity: 1, rotation: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
            );
          }
        },

        onLeaveBack: () => {
          if (header) {
            gsap.to(headerTitle, {
              x: 60,        // sai para a direita
              opacity: 0,
              scale: 0.9,
              duration: 0.35,
              ease: 'power2.in'
            });

            gsap.to(headerSubtitle, {
              x: 60,        // idem
              opacity: 0,
              scale: 0.9,
              duration: 0.3,
              ease: 'power2.in',
              delay: 0.05,
              onComplete: () => {
                header.classList.remove('is-fixed');
                if (inserted) { placeholder.remove(); inserted = false; }
                gsap.set([headerTitle, headerSubtitle], { clearProps: 'all' });
              }
            });
          }
        },
      });
    }

    type CardState = {
      x: number; y: number;
      scale: number; rotation: number;
      opacity: number; zIndex: number;
    };

    const easeInCubic  = (t: number) => t * t * t;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const cardHeight  = cards[0].offsetHeight;
    const screenWidth = window.innerWidth;

    gsap.set(grid, { position: 'relative', height: cardHeight });

    cards.forEach(card => {
      gsap.set(card, {
        position: 'absolute', top: 0, left: 0, width: '100%',
      });
    });

    // ─────────────────────────────────────────────
    // PRÉ-CÁLCULO
    // ─────────────────────────────────────────────
    const stateTable: CardState[][] = cards.map((_, i) => {
      const depth0 = total - 1 - i;
      const dir    = i % 2 === 0 ? -1 : 1;

      // ── último card: estado fixo para sempre ─────
      if (i === total - 1) {
        const fixedState: CardState = {
          x: 0, y: 0,
          scale: 1, rotation: 0,
          opacity: 1, zIndex: 1,
        };
        return Array(STEPS + 1).fill(fixedState);
      }

      // só os primeiros ANIMATE_COUNT cards têm step próprio
      const step  = 1 / ANIMATE_COUNT;
      const start = i * step;

      const states: CardState[] = [];

      for (let s = 0; s <= STEPS; s++) {
        const p      = s / STEPS;
        const localP = Math.max(0, Math.min(1, (p - start) / step));

        // ── ainda não activado ───────────────────────
        if (localP === 0) {
          const saidos = Array.from({ length: i }, (_, j) => {
            const lp = Math.max(0, Math.min(1, (p - j * step) / step));
            return lp >= 1 ? 1 : 0;
          }).reduce((a: number, b: number) => a + b, 0);

          const depth = Math.max(0, depth0 - saidos);
          states.push({
            x: 0,
            y: depth * 15,
            rotation: depth * 3 * (i % 2 === 0 ? 1 : -1),
            scale: 1 - depth * 0.05,
            opacity: 1,
            zIndex: total - i,
          });
          continue;
        }

        // ── já saiu ──────────────────────────────────
        if (localP >= 1) {
          states.push({
            x: dir * screenWidth * 1.5,
            y: -40, scale: 1.08,
            rotation: dir * 30,
            opacity: 0, zIndex: 0,
          });
          continue;
        }

        // ── em animação ──────────────────────────────
        if (localP <= 0.4) {
          const t    = localP / 0.4;
          const ease = easeOutCubic(t);
          states.push({
            x: 0, y: -44 * ease,
            scale: 1 + 0.07 * ease,
            rotation: 0, opacity: 1,
            zIndex: 9999,
          });
        } else if (localP <= 0.6) {
          states.push({
            x: 0, y: -40, scale: 1.08,
            rotation: 0, opacity: 1,
            zIndex: 9999,
          });
        } else {
          const t    = (localP - 0.6) / 0.4;
          const ease = easeInCubic(t);
          states.push({
            x: dir * screenWidth * 1.2 * ease,
            y: -40, scale: 1.08 - ease * 0.1,
            rotation: dir * 30 * ease,
            opacity: 1 - ease,
            zIndex: 9999,
          });
        }
      }

      return states;
    });

    // ─────────────────────────────────────────────
    // quickSetters
    // ─────────────────────────────────────────────
    const setters = cards.map(card => ({
      x:        gsap.quickSetter(card, 'x', 'px')         as (v: number) => void,
      y:        gsap.quickSetter(card, 'y', 'px')         as (v: number) => void,
      scale:    gsap.quickSetter(card, 'scale')           as (v: number) => void,
      rotation: gsap.quickSetter(card, 'rotation', 'deg') as (v: number) => void,
      opacity:  gsap.quickSetter(card, 'opacity')         as (v: number) => void,
    }));

    const applyState = (card: HTMLElement, s: CardState, qi: typeof setters[0]) => {
      qi.x(s.x);
      qi.y(s.y);
      qi.scale(s.scale);
      qi.rotation(s.rotation);
      qi.opacity(s.opacity);
      card.style.zIndex = String(s.zIndex);
    };

    // estado inicial
    cards.forEach((card, i) => applyState(card, stateTable[i][0], setters[i]));

    // ─────────────────────────────────────────────
    // SCROLL TRIGGER
    // ─────────────────────────────────────────────
    const vh = document.documentElement.clientHeight;

    ScrollTrigger.create({
      trigger: grid,
      start: 'top 30%',        // ← topo do grid cola ao topo do viewport
      end: `+=${vh * total}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      markers: false,
      id: 'projects-grid',
      onUpdate(self) {
        const idx = Math.min(STEPS, Math.floor(self.progress * STEPS));
        cards.forEach((card, i) => {
          applyState(card, stateTable[i][idx], setters[i]);
        });
      },
    });
  }

  private initDesktopCards() {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('.projects-grid .project-card')
    );

    // 1. Stagger entrance ao scroll
    gsap.fromTo(cards,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );

    // 2. Hover 3D tilt por card
    cards.forEach(card => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);   // -1 a 1
        const dy = (e.clientY - cy) / (rect.height / 2);  // -1 a 1

        gsap.to(card, {
          rotateY: dx * 8,          // máx 8° horizontal
          rotateX: -dy * 5,         // máx 5° vertical
          scale: 1.03,
          boxShadow: `${-dx * 12}px ${-dy * 8}px 30px rgba(0,0,0,0.25)`,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800,
        });
      };

      const onLeave = () => {
        gsap.to(card, {
          rotateY: 0, rotateX: 0, scale: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          duration: 0.5,
          ease: 'power3.out',
        });
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  goToProject(route: string) {
    NavbarComponent.activeSection$.next('projects');
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
    { class: 'fab fa-react',       x: 22, y: 18, vx: 0, vy: 0, duration: 11, delay: 0.8 },  // React (tens no blog)
    { class: 'fab fa-npm',         x: 50, y: 40, vx: 0, vy: 0, duration: 9,  delay: 1.8 },  // npm / Node ecosystem
    { class: 'fa fa-server',       x: 85, y: 78, vx: 0, vy: 0, duration: 13, delay: 2.3 },  // microservices/servidor
    { class: 'fa fa-network-wired',x: 35, y: 72, vx: 0, vy: 0, duration: 10, delay: 3.2 },  // redes / telecom
    { class: 'fa fa-shield-alt',   x: 63, y: 35, vx: 0, vy: 0, duration: 12, delay: 4.1 },  // segurança / JWT
    { class: 'fa fa-code-branch',  x: 7,  y: 60, vx: 0, vy: 0, duration: 8,  delay: 5.2 },  // git branching
    { class: 'fa fa-cogs',         x: 95, y: 20, vx: 0, vy: 0, duration: 14, delay: 0.3 },  // configuração / Spring Cloud
    { class: 'fa fa-exchange-alt', x: 48, y: 90, vx: 0, vy: 0, duration: 11, delay: 6.0 },  // Rabb
  ];

  activeSection: string = 'home'; // secção atual
  private observer!: IntersectionObserver;
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
        this.startAnimation();
    }
  }
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationId);
    }
    this.typed?.destroy();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (this.observer) this.observer.disconnect();
  }

  setupIntersectionObserver() {
    const sections = ['home', 'projects', 'journey'];

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          NavbarComponent.activeSection$.next(entry.target.id);
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }
  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.mouseX = (e.clientX / window.innerWidth) * 100;
    this.mouseY = (e.clientY / window.innerHeight) * 100;
  }

  private paused = false; // controla se a animação está pausada

  startAnimation() {
    if (!isPlatformBrowser(this.platformId)) return;

    // evita múltiplos loops
    if (this.animationId) return;

    const animate = () => {
      if (!this.paused) {
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
      }

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  goToAbout() {
    NavbarComponent.activeSection$.next('about');
    this.router.navigate(['/about']).then(() => {
      const el = document.getElementById('container-principal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

}
