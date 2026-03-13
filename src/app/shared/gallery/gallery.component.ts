import { Component, Input, PLATFORM_ID, Inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import 'swiper/css';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gallery-grid">
      <div *ngFor="let img of images; let i = index"
           class="gallery-card"
           (click)="openModal(i)">
        <div class="gallery-wrapper">
          <img [src]="img.src" [alt]="img.title" class="gallery-img">
          <div class="gallery-overlay">
            <i class="fa fa-search-plus"></i>
          </div>
        </div>
        <div class="gallery-caption">
          <h4>{{ img.title }}</h4>
          <p *ngIf="img.description">{{ img.description }}</p>
        </div>
      </div>
    </div>

    <div class="modal-backdrop" *ngIf="isOpen" (click)="closeModal()">

      <!-- Botão fechar no canto superior direito -->
      <button class="modal-close" (click)="closeModal()">
        <i class="fa fa-times"></i>
      </button>

      <div class="modal-box" (click)="$event.stopPropagation()">

        <!-- Seta esquerda colada ao lado -->
        <button class="modal-prev" (click)="prev()">
          <i class="fa fa-chevron-left"></i>
        </button>

        <div class="swiper-container" #swiperEl>
          <div class="swiper-wrapper">
            <div class="swiper-slide" *ngFor="let img of images">
              <img [src]="img.src" [alt]="img.title" class="modal-img">
            </div>
          </div>
        </div>

        <!-- Seta direita colada ao lado -->
        <button class="modal-next" (click)="next()">
          <i class="fa fa-chevron-right"></i>
        </button>

      </div>

      <div class="modal-caption">{{ images[currentIndex].title }}</div>
      <div class="modal-counter">{{ currentIndex + 1 }} / {{ images.length }}</div>

    </div>
  `,
  styles: [`
    /* GRID */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 40px;
    }

    .gallery-card {
      height: 500px;
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .gallery-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    }

    .gallery-wrapper {
      position: relative;
      flex: 0 0 75%;
      overflow: hidden;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .gallery-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 20px;        /* aumenta este valor */
      transition: transform 0.3s ease;
    }

    .gallery-card:hover .gallery-img { transform: scale(1.05); }

    .gallery-overlay {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(102, 126, 234, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .gallery-card:hover .gallery-overlay { opacity: 1; }

    .gallery-overlay i {
      font-size: 2.5rem;
      color: white;
    }

    .gallery-caption {
      flex: 0 0 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 16px;
      background: white;
      border-top: 1px solid #f0f0f0;
    }

    .gallery-caption h4 {
      font-size: 1.1rem;
      color: #333;
      margin: 0 0 6px 0;
    }

    .gallery-caption p {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
      line-height: 1.5;
    }

    /* MODAL */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.9);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    /* Botão fechar — canto superior direito da viewport */
    .modal-close {
      position: fixed;
      top: 20px;
      right: 20px;
      font-size: 1.5rem; /* tamanho do X */
      cursor: pointer;
      color: white;      /* cor da cruz */
      z-index: 10000;
      background: transparent; /* sem fundo */
      border: none;            /* remove qualquer borda */
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-close:hover {
      color: #ccc; /* muda a cor ao passar o mouse */
      background: transparent; /* mantém sem fundo */
    }

    /* Box central com setas coladas aos lados */
    .modal-box {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0;
      width: 90vw;
    }

    .modal-prev, .modal-next {
      position: absolute;         /* coloca sobre a imagem */
      top: 50%;                   /* centraliza verticalmente */
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
      color: white;
      background: rgba(0,0,0,0.5);
      border: none;
      border-radius: 50%;         /* faz redonda */
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;                /* garante que fica acima da imagem */
      transition: all 0.2s;
    }

    .modal-prev:hover, .modal-next:hover {
      background: rgba(0,0,0,0.7);
    }

    .modal-prev { left: 10px; }
    .modal-next { right: 10px; }

    @media (max-width: 768px) {
      .modal-prev, .modal-next {
        background: transparent;
        color: white;
        font-size: 1.5rem;
      }
      .modal-prev:hover,.modal-next:hover{
        background: transparent;
        color: white;
      }
    }

    /* Swiper */
    .swiper-container {
      flex: 1;
      overflow: hidden;
    }

    .swiper-wrapper {
      display: flex;
      transition: transform 0.3s ease;
    }

    .swiper-slide {
      min-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-img {
      max-width: 100%;
      max-height: 75vh;
      object-fit: contain;
      border-radius: 18px;
      display: block;
    }

    .modal-caption {
      margin-top: 16px;
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
      text-align: center;
    }

    .modal-counter {
      margin-top: 6px;
      color: rgba(255,255,255,0.5);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .gallery-grid { grid-template-columns: 1fr; }
      .gallery-card { height: 420px; }
      .modal-prev, .modal-next { width: 36px; height: 60px; font-size: 1.2rem; }
    }
  `]
})
export class GalleryComponent implements OnInit, OnDestroy {
  @Input() images: { src: string; title: string; description?: string }[] = [];

  isOpen = false;
  currentIndex = 0;
  private swiper: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  openModal(index: number) {
    this.currentIndex = index;
    this.isOpen = true;
    setTimeout(() => this.initSwiper(index), 50);
  }

  async initSwiper(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;

    const { default: Swiper } = await import('swiper');
    const { Keyboard, A11y } = await import('swiper/modules');

    this.swiper = new Swiper('.swiper-container', {
      modules: [Keyboard, A11y],
      initialSlide: index,
      loop: true,
      keyboard: { enabled: true },
      slidesPerView: 1,
      spaceBetween: 50,
      on: {
        slideChange: () => {
          // verifica se já existe antes de aceder
          if (this.swiper) {
            this.currentIndex = this.swiper.realIndex;
          }
        }
      }
    });
  }

  closeModal() {
    this.isOpen = false;
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }

  prev() {
    this.swiper ? this.swiper.slidePrev() : this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.swiper ? this.swiper.slideNext() : this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  @HostListener('document:keydown.escape')
  onEscape() { if (this.isOpen) this.closeModal(); }

  @HostListener('document:keydown.arrowleft')
  onLeft() { if (this.isOpen) this.prev(); }

  @HostListener('document:keydown.arrowright')
  onRight() { if (this.isOpen) this.next(); }

  ngOnDestroy() {
    if (this.swiper) this.swiper.destroy(true, true);
  }
}
