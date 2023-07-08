import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightTrackComponent } from './weight-track.component';

describe('WeightTrackComponent', () => {
  let component: WeightTrackComponent;
  let fixture: ComponentFixture<WeightTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
