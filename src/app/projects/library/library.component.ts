import {Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import Typed from "typed.js";
import {isPlatformBrowser} from "@angular/common";
import {GithubLanguagesChartComponent} from "../../components/github-languages-chart/github-languages-chart.component";
import { CommonModule } from '@angular/common';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/dist/photoswipe.css';
import {GalleryComponent} from "../../shared/gallery/gallery.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";


@Component({
  selector: 'app-library',
  standalone: true,
  imports: [RouterLink, GithubLanguagesChartComponent, CommonModule, GalleryComponent   ],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  goToAbout() {
    NavbarComponent.activeSection$.next('about');
    this.router.navigate(['/about']).then(() => {
      const el = document.getElementById('container-principal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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
            ' Distributed Architecture',
            ' Mobile Development',
            ' ISEP Academic Project'
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
      src: 'assets/image1.png',
      title: 'Login Screen (Android)',
      description: 'Secure authentication interface with JWT token management'
    },
    {
      src: 'assets/Screenshot_Library_1.jpg',
      title: 'Register User (Android)',
      description: 'Registration page with name, email, phone ...etc and frontend validations'
    },
    {
      src: 'assets/image2.png',
      title: 'Librarian Menu (Android)',
      description: 'Main menu for users with Librarian role, showing role-specific options'
    },
    {
      src: 'assets/Screenshot_Library_4.jpg',
      title: 'Reader Menu (Android)',
      description: 'Main menu for users with Reader role, showing lending and browsing options'
    },
    {
      src: 'assets/Screenshot_Library_5.jpg',
      title: 'Book Details (Android)',
      description: 'Detailed view of a book including author, genre, availability, and other metadata'
    },
    {
      src: 'assets/Screenshot_Library_6.png',
      title: 'Main Menu (React Native)',
      description: 'Main dashboard interface for React Native frontend, showing login options'
    },
    {
      src: 'assets/Screenshot_Library_7.png',
      title: 'Librarian Menu (React Native)',
      description: 'Mobile interface for Librarian role, demonstrating cross-platform design with React Native'
    }
  ];

}
