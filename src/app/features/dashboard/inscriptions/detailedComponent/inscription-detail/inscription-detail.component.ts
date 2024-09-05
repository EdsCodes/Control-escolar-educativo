import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { inscriptions } from '../../../../../shared/models/inscriptions';
import { InscriptionsService } from '../../../../../core/services/inscriptions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscription-detail',
  templateUrl: './inscription-detail.component.html',
  styleUrl: './inscription-detail.component.scss'
})
export class InscriptionDetailComponent {
  inscription$: Observable<inscriptions | undefined>;

  constructor(private inscriptionsService: InscriptionsService, private activatedRoute: ActivatedRoute){
    this.inscription$  = this.inscriptionsService.getInscriptionById(this.activatedRoute.snapshot.params['id']);
  }
}