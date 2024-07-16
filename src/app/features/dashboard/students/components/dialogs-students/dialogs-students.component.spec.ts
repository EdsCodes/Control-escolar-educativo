import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsStudentsComponent } from './dialogs-students.component';

describe('DialogsStudentsComponent', () => {
  let component: DialogsStudentsComponent;
  let fixture: ComponentFixture<DialogsStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogsStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
