import { Routes} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LibraryComponent } from './projects/library/library.component';
import {BlogComponent} from "./projects/blog/blog.component";
import {PortfolioComponent} from "./projects/portfolio/portfolio.component";
import {MicroservicesComponent} from "./projects/microservices/microservices.component";


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects/library', component: LibraryComponent },
  { path: 'projects/blog', component: BlogComponent },
  { path: 'projects/portfolio', component: PortfolioComponent },
  { path: 'projects/microservices', component: MicroservicesComponent },
  { path: '**', redirectTo: '' }
];


