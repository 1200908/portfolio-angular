import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) { }
  goToAbout() {
    this.router.navigate(['/about']).then(() => {
      const el = document.getElementById('container-principal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  goToHome() {
    this.router.navigate(['/']).then(() => {
      const el = document.getElementById('container-principals');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }


  goToProjects() {
    this.router.navigate(['/']).then(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  goToJourney() {
    this.router.navigate(['/']).then(() => {
      const el = document.getElementById('journey');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

}
