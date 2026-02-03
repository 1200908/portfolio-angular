import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {RouterLink} from "@angular/router";

interface GithubLanguages {
  [language: string]: number;
}

@Component({
  selector: 'app-github-languages-chart',
  standalone: true,
  imports: [RouterLink,
    HttpClientModule,
    CommonModule],
  templateUrl: './github-languages-chart.component.html',
  styleUrls: ['./github-languages-chart.component.css']
})
export class GithubLanguagesChartComponent implements OnInit {
  @Input() owner: string = '';
  @Input() repo: string = '';

  languages: any[] = [];
  totalBytes = 0;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (this.owner && this.repo) {
      this.loadLanguages();
    }
  }

  getRepoLanguages(owner: string, repo: string): Observable<GithubLanguages> {
    return this.http.get<GithubLanguages>(`https://api.github.com/repos/${owner}/${repo}/languages`);
  }

  loadLanguages() {
    this.getRepoLanguages(this.owner, this.repo).subscribe({
      next: (data) => {
        this.totalBytes = Object.values(data).reduce((a, b) => a + b, 0);
        let accumulatedPercentage = 0;
        this.languages = Object.entries(data).map(([name, bytes]) => {
          const percentage = ((bytes / this.totalBytes) * 100).toFixed(1);
          const lang = {
            name,
            bytes,
            percentage,
            color: this.getLanguageColor(name),
            offset: accumulatedPercentage
          };
          accumulatedPercentage += parseFloat(percentage);
          return lang;
        });
      },
      error: (err) => console.error('Erro ao carregar linguagens', err)
    });
  }

  getArcPath(startPercent: number, endPercent: number): string {
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    const startAngle = (startPercent / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (endPercent / 100) * 2 * Math.PI - Math.PI / 2;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArc = endPercent - startPercent > 50 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  }

  getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'SCSS': '#c6538c',
      'Python': '#3572A5',
      'Java': '#b07219'
    };
    return colors[language] || '#8257e6';
  }
  protected readonly parseFloat = parseFloat;

}
