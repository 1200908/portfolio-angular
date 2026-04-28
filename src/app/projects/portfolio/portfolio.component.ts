import {Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnInit} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import Typed from "typed.js";
import {isPlatformBrowser, CommonModule} from "@angular/common";
import {GithubLanguagesChartComponent} from "../../components/github-languages-chart/github-languages-chart.component";

import { Chart, registerables } from 'chart.js';
import {NavbarComponent} from "../../components/navbar/navbar.component";

Chart.register(...registerables);
interface GithubLanguages {
  [language: string]: number;
}
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink,
    HttpClientModule,
    CommonModule,
    GithubLanguagesChartComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {


  @ViewChild('languageChart') languageChart?: ElementRef<HTMLCanvasElement>;


  chart?: Chart;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }


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
            ' HTML &amp; CSS Project',
            ' Angular Development'
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
