import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsCoursesComponent } from './dialogs-courses.component';

describe('DialogsCoursesComponent', () => {
  let component: DialogsCoursesComponent;
  let fixture: ComponentFixture<DialogsCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogsCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogsCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
