import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionDetailComponent } from './inscription-detail.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InscriptionsService } from '../../../../../core/services/inscriptions.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('InscriptionDetailComponent', () => {
  let component: InscriptionDetailComponent;
  let fixture: ComponentFixture<InscriptionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionDetailComponent],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        InscriptionsService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'some-id' }), 
            snapshot: { params: { id: 'some-id' } }
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});