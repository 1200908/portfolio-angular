import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TunanceComponent } from './tunance.component';

describe('TunanceComponent', () => {
  let component: TunanceComponent;
  let fixture: ComponentFixture<TunanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TunanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TunanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
