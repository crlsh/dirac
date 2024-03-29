export interface Horario {
  diaSemana: string;
  horaInicio: {
    hour: number;
    minute: number;
  };
  horaFin: {
    hour: number;
    minute: number;
  };
}

export interface Cursos {
    alumnos: any[];
    profesores:any[];
    id: string;
    nombre: string;
    inicio: Date;
    fin: Date;
    profesor: string;
    costo: string ;
    horarios: Horario[];
    alumnosId:any[],
    profesoresId:any[],
   
  }
