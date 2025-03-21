import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesGrapchicsComponent } from './courses-grapchics.component';

describe('CoursesGrapchicsComponent', () => {
  let component: CoursesGrapchicsComponent;
  let fixture: ComponentFixture<CoursesGrapchicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesGrapchicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesGrapchicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
