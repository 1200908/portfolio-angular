import {Component, ElementRef, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import Typed from "typed.js";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-microservices',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './microservices.component.html',
  styleUrls: ['./microservices.component.css']
})
export class MicroservicesComponent {

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

  @ViewChild('typedElement') typedElement?: ElementRef;

  typed?: Typed;
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.typedElement) {
      const element = this.typedElement.nativeElement;
      setTimeout(() => {
        this.typed = new Typed(element, {
          strings: [
            ' Personal Project',
            ' Microservices Architecture Showcase'
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
