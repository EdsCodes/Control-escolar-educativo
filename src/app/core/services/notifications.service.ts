import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notification$ = new Subject<string>();

  notify$ = this.notification$.asObservable();

  constructor() {
    this.notify$.subscribe({
      next: (notif) => {
        swal.fire(notif, '', 'info');
      },
    });
  }

  showNotification(notif: string) {
    this.notification$.next(notif);
  }
}