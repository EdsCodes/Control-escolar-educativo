import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inscriptions } from '../../shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor(private httpClient: HttpClient) {}

  getAllInscriptions(): Observable<inscriptions[]> {
    return this.httpClient.get<inscriptions[]>(`${environment.apiUrl}/inscriptions`);
  }

  addInscription(inscription: inscriptions): Observable<inscriptions> {
    return this.httpClient.post<inscriptions>(`${environment.apiUrl}/inscriptions`, inscription);
  }

  deleteInscriptionById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/inscriptions/${id}`);
  }

  editInscriptonById(id: string, update: inscriptions): Observable<inscriptions> {
    return this.httpClient.put<inscriptions>(`${environment.apiUrl}/inscriptions/${id}`, update);
  }
}
