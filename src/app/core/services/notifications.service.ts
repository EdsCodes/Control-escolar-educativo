import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notification$ = new Subject<{message: string, type: 'info' | 'success' | 'error' | 'warning' | 'question' }>();

  notify$ = this.notification$.asObservable();

  constructor() {
    this.notify$.subscribe({
      next: (notif) => {
        let icon: 'info' | 'success' | 'error' | 'warning' | 'question';
        switch (notif.type) {
          case 'info':
            icon = 'info';
            break;
          case 'success':
            icon = 'success';
            break;
          case 'error':
            icon = 'error';
            break;
          case 'warning':
            icon = 'warning';
            break;
          case 'question':
            icon = 'question';
            break;
          default: 
            icon = 'info';
        }
        swal.fire(notif.message, '', icon);
      },
    });
  }

  showInfoNotification(notif: string) {
    this.notification$.next({ message: notif, type: 'info' });
  }

  showSuccessNotification(notif: string) {
    this.notification$.next({ message: notif, type: 'success' });
  }

  showErrorNotification(notif: string) {
    this.notification$.next({ message: notif, type: 'error' });
  }
  
  showWarningNotification(notif: string) {
    this.notification$.next({ message: notif, type: 'warning' });
  }
  
  showQuestionNotification(notif: string) {
    this.notification$.next({ message: notif, type: 'question' });
  }
}