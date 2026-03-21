import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { GithubLanguagesChartComponent } from './components/github-languages-chart/github-languages-chart.component';
import {ScrollProgressComponent} from "./shared/scroll-progress/scroll-progress.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TimelineComponent, ChatbotComponent, GithubLanguagesChartComponent, ScrollProgressComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jorge-Vieira';
  scrollBottom = 28;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollBottom = event.url === '/' || event.url === '/home' ? 120 : 28;
      }
    });
  }


}
