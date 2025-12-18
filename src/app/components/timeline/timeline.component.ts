import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  icon: string;
  color: string;
  achievements: string[];
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, AfterViewInit {
  @ViewChild('timelineContainer') timelineContainer!: ElementRef;

  activeIndex: number | null = null;
  visibleItems: Set<number> = new Set();

  timelineData: TimelineItem[] = [
    {
      year: '2020',
      title: 'Started Engineering Journey',
      organization: 'ISEP',
      description: 'Began Bachelor\'s in Telecommunications & Informatics Engineering',
      icon: '🎓',
      color: '#667eea',
      achievements: [
        'First programming course',
        'Object-oriented programming concepts',
        'Code structuring and best practices'
      ]
    },
    {
      year: '2022',
      title: 'First Backend Projects',
      organization: 'Academic Projects',
      description: 'Developed microservices architecture and REST APIs',
      icon: '💻',
      color: '#a0e8cd',
      achievements: [
        'Spring Boot ',
        'Docker deployment',
        'PostgreSQL '
      ]
    },
    {
      year: '2023',
      title: 'Mobile Application Development',
      organization: 'Academic / Personal Project',
      description: 'Design and development of a cross-platform mobile application, focusing on performance, usability, and clean architecture.',
      icon: '📱',
      color: '#f093fb',
      achievements: [
        'Android/React Native ',
        'REST API integration',
        'UI/UX design for mobile'
      ]
    },
    {
      year: '2023-2025',
      title: 'Volunteering Experience',
      organization: 'Byonritmos/IPDJ',
      description: 'Participation in youth volunteering initiatives, including environmental projects and event planning',
      icon: '🤝',
      color: '#b093fb',
      achievements: [
        'Team collaboration ',
        'Community and environmental engagement',
        'Communication skills'
      ]
    },
    {
      year: '2025',
      title: 'Curricular Internship',
      organization: 'Fashable',
      description: 'Selenium automation and web scraping with Python',
      icon: '🚀',
      color: '#4facfe',
      achievements: [
        'Selenium + Scrapy',
        'Data classification',
        'Tool optimization'
      ]
    },
    {
      year: '2025',
      title: 'Cloud & DevOps',
      organization: 'Personal Projects',
      description: 'AWS deployment, CI/CD pipelines, and infrastructure as code',
      icon: '☁️',
      color: '#43e97b',
      achievements: [
        'AWS EC2/ECR',
        'CodeBuild pipelines',
        'Docker orchestration'
      ]
    }
  ];

  private observer!: IntersectionObserver;

  isMobile = false;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) return;
    if (!('IntersectionObserver' in window)) {
      this.visibleItems = new Set(this.timelineData.map((_, i) => i));
      return;
    }

    setTimeout(() => this.setupIntersectionObserver(), 50);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            this.visibleItems.add(index);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observar cada item do timeline
    const items = this.timelineContainer.nativeElement.querySelectorAll('.timeline-item');
    items.forEach((item: Element) => {
      this.observer.observe(item);
    });
  }

  isVisible(index: number): boolean {
    return this.visibleItems.has(index);
  }

  isLeft(index: number): boolean {
    return index % 2 === 0;
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

  clearActive(): void {
    if (!this.isMobile) {
      this.activeIndex = null;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  getItemDelay(index: number): string {
    return `${index * 0.2}s`;
  }

  getDotDelay(index: number): string {
    return `${index * 0.2 + 0.3}s`;
  }

  getAchievementDelay(achievementIndex: number): string {
    return `${achievementIndex * 0.05}s`;
  }

  toggleActive(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
