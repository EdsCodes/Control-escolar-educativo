import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { inscriptions } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private MY_INSCRIPTIONSDATABASE: inscriptions[] = [
    { inscriptionId: '1', studentId: '1', studentName: 'Josefa Poblado', courseId: '5', courseName: 'SQL' },
    { inscriptionId: '2', studentId: '3', studentName:'John Hernandez', courseId: '2', courseName: 'Angular' },
    { inscriptionId: '3', studentId: '4', studentName:'Fernando Casas', courseId: '3', courseName: 'Js' },
    { inscriptionId: '4', studentId: '6', studentName:'Johanna Messi', courseId: '1', courseName: 'React' },
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

