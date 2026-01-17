import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TimelineComponent, ChatbotComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jorge-Vieira';
}
