import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { inscriptions } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private MY_INSCRIPTIONSDATABASE: inscriptions[] = [
    { inscriptionId: '1', studentId: '1', courseId: '5' },
    { inscriptionId: '2', studentId: '3', courseId: '2' },
    { inscriptionId: '3', studentId: '4', courseId: '3' },
    { inscriptionId: '4', studentId: '6', courseId: '1' },
  ];
    
  getAllInscriptions(): Observable<inscriptions[]> {
    return of(this.MY_INSCRIPTIONSDATABASE).pipe(
      delay(500)
    );
  }

  addInscription(newInscription: inscriptions): Observable<inscriptions[]> {
    this.MY_INSCRIPTIONSDATABASE.push(newInscription);
    return of(this.MY_INSCRIPTIONSDATABASE);
  }

  deleteInscriptionById(id: string): Observable<inscriptions[]>{
    this.MY_INSCRIPTIONSDATABASE = this.MY_INSCRIPTIONSDATABASE.filter(element => element.inscriptionId !== id);
    return this.getAllInscriptions();
  }

  editInscriptonById(id: string, update: inscriptions) {
    this.MY_INSCRIPTIONSDATABASE = this.MY_INSCRIPTIONSDATABASE.map((element) =>
      element.inscriptionId === id ? { ...update, id } : element
    );
    return this.getAllInscriptions();
  }

}

