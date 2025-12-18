import { Routes} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LibraryComponent } from './projects/library/library.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects/library', component: LibraryComponent },
  { path: '**', redirectTo: '' }
];


