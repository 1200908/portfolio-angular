import {Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import Typed from "typed.js";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  goToAbout() {
    this.router.navigate(['/about']).then(() => {
      const el = document.getElementById('container-principal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  goToHome() {
    this.router.navigate(['/']).then(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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

}
