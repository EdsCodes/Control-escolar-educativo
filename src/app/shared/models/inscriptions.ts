export interface inscriptions {
  id: string;
  studentId: string;
  courseId: string;
  student: {
    id: string;
    nombre: string;
    apellidos: string;
    fechaNacimiento: string; 
    celular: string;
    direccion: string;
  };
  course: {
    nombreCurso: string;
    fechaInicioCurso: string; 
    fechaFinCurso: string; 
    id: string;
  };
}


export interface Student {
  id: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  celular: string;
  direccion: string;
  curso: string;
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
  id: string;
  studentId: string;
  courseId: string;
  student: {
    id: string;
    nombre: string;
    apellidos: string;
    fechaNacimiento: string; 
    celular: string;
    direccion: string;
  };
  course: {
    id: string;
    nombreCurso: string;
    fechaInicioCurso: string; 
    fechaFinCurso: string; 
  };
}