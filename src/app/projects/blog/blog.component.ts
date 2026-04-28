import {Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import Typed from "typed.js";
import {GithubLanguagesChartComponent} from "../../components/github-languages-chart/github-languages-chart.component";
import {isPlatformBrowser} from "@angular/common";
import { GalleryComponent } from '../../shared/gallery/gallery.component';
import {NavbarComponent} from "../../components/navbar/navbar.component";


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, GithubLanguagesChartComponent,GalleryComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  goToAbout() {
    NavbarComponent.activeSection$.next('about');
    this.router.navigate(['/about']).then(() => {
        const el = document.getElementById('container-principal');
        if (el) el.scrollIntoView({behavior: 'smooth'});
      });
  }

  goToHome() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    });
  }

  isModalOpen = false;          // controla se está aberto
  modalImageSrc = '';           // caminho da imagem
  modalImageTitle = '';         // título da imagem

  openImageModal(src: string, title: string) {
    this.modalImageSrc = src;
    this.modalImageTitle = title;
    this.isModalOpen = true;
  }

  closeImageModal() {
    this.isModalOpen = false;
    this.modalImageSrc = '';
    this.modalImageTitle = '';
  }

  @ViewChild('typedElement') typedElement?: ElementRef;

  typed?: Typed;
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.typedElement) {
      const element = this.typedElement.nativeElement;
      setTimeout(() => {
        this.typed = new Typed(element, {
          strings: [
            ' Full-Stack Technical Challenge',
            ' Dockerized',
            ' Node.js Backend',
            ' React Frontend',
            ' AWS Deployment'
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

  imagesList = [
    {
      src: 'assets/blog-frontend.png',
      title: 'Frontend',
      description: 'React interface showing the main dashboard for generating blog articles.'
    },
    {
      src: 'assets/blog-frontend-details.png',
      title: 'Article Details',
      description: 'React interface displaying the detailed view of a selected blog article.'
    }
  ];

}
