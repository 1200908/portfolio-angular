import {Component, HostListener, Inject, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {BehaviorSubject} from "rxjs";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isHome = false;
  isScrolled: boolean = false;

  static activeSection$ = new BehaviorSubject<string>('home');

  get activeSection() {
    return NavbarComponent.activeSection$.value;
  }
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/home';
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;

    this.isScrolled = scrollY > 300; // ajusta este valor
  }
  goToAbout() {
    NavbarComponent.activeSection$.next('about');
    this.router.navigate(['/about']).then(() => {
      const el = document.getElementById('container-principal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  goToHome() {
    this.router.navigate(['/']).then(() => {
      const el = document.getElementById('home');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }


  goToProjects() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500); // espera o HomeComponent + GSAP inicializarem
    });
  }

  goToJourney() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {

        const el = document.getElementById('journey');
        if (el) el.scrollIntoView({ behavior: 'smooth' });

      }, 500);
    });
  }

}
