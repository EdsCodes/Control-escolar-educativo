export interface inscriptions {
  studentId: string;
  courseId: string;
}

export interface Student {
  id: string;
  nombre: string;
  apellidos: string;
}

export interface Course {
  id: string;
  nombreCurso: string;
  fechaInicioCurso: string;
  fechaFinCurso: string;
}

export interface LoadStudentsAndCoursesResp {
  students: Student[];
  courses: Course[];
}

export interface CreateInscriptionPayload {
  studentId: string;
  courseId: string;
}