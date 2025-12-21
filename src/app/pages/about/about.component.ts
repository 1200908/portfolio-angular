import {Component, ViewEncapsulation} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private router: Router) { }
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
}
