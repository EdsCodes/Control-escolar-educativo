export type UserRole = 'ADMIN' | 'USER';

export interface User {
name: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
  role: UserRole;
}