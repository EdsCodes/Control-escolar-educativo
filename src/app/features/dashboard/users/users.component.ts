import { Component } from '@angular/core';
import { User } from '../../../shared/models/users';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notifications.service';
import { UsersService } from '../../../core/services/users.service';
import { DialogsUsersComponent } from './components/dialogs-users/dialogs-users.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  usersDataSource: User[] = [];
  loadingInProcess = false;
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  autenticatedUser: Observable<User | null>;

  constructor(private matDialog: MatDialog, private usersService: UsersService, private authService: AuthService, private notifier: NotificationService) {
    this.autenticatedUser = this.authService.autenticatedUser;
  }

  ngOnInit(): void {
    this.loadingUsers();
  }

  loadingUsers() {
    this.loadingInProcess = true;
    this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.usersDataSource = users;
      },
      error: () => {
        this.notifier.showErrorNotification('Error al cargar los usuarios')
      },
      complete: () => {
        this.loadingInProcess = false;
      }
    });
  }


  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogsUsersComponent, {});

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.loadingInProcess = true;
          
          const newUser = { 
            ...value, token: value.token || uuidv4(),
            ...value, id: value.id || uuidv4(),
          };

          this.usersService.addUsers(newUser).subscribe({
            next: (user: User) => {
              this.usersDataSource.push(user);
            },
            error: () => {
              this.notifier.showErrorNotification('Error al agregar el usuario');
            },
            complete: () => {
              this.loadingInProcess = false;
            }
          });
        }
      }
    });
  }
  
  editUser(editingUser: User) {
    this.matDialog
    .open(DialogsUsersComponent, { data: editingUser })
    .afterClosed()
    .subscribe({
      next: (value) => {
        if (!!value) {
          this.usersService.editUserById(editingUser.id, value)
          .subscribe({
            next: (user) => {
              this.usersDataSource = this.usersDataSource.map(c => c.id === user.id ? user : c);
            },
            error: () => {
              this.notifier.showErrorNotification('Error al editar el usuario');
            }
          });
        }
      }
    });
  }

  deleteUser(id: string) {
    this.loadingInProcess = true;
    if (confirm('Confirma borrado de usuario?')) {
      this.usersService.deleteUserById(id)
      .pipe(
        tap(() => this.loadingUsers())
      )
      .subscribe({
        error: () => {
          this.notifier.showErrorNotification('Error al borrar el usuario');
        },
        complete: () => {
          this.notifier.showSuccessNotification('Usuario borrado correctamente')
          this.loadingInProcess = false;
        }
      });
    } else {
      this.loadingInProcess = false;
    }
  }
}
