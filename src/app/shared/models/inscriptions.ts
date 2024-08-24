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
      curso: string;
    };
    course: {
      nombreCurso: string;
      dateRange: {
        fechaInicioCurso: string;
        fechaFinCurso: string;
      };
      id: string;
    };
  }
  