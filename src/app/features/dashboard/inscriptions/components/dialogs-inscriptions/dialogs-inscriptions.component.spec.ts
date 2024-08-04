import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsInscriptionsComponent } from './dialogs-inscriptions.component';

describe('DialogsInscriptionsComponent', () => {
  let component: DialogsInscriptionsComponent;
  let fixture: ComponentFixture<DialogsInscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogsInscriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogsInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
