import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from '../servicios/storage/storage.service';

@Component({
  selector: 'app-experimento',
  templateUrl: './experimento.component.html',
  styleUrls: ['./experimento.component.scss'],
})
export class ExperimentoComponent implements OnInit {
  @Input() fromParent: any; // Recibe el curso y sus datos
  alumnosInscritos: any[] = [];
  otrosAlumnos: any[] = [];

  snapshotIds: any[] = [];
  mostrarVistaCompleta: boolean = false;
  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.storage.alumnos$.subscribe((alumnos) => {
      this.actualizarAlumnos(alumnos);
    });
    this.snapshotIds = this.fromParent.item.alumnosId;
  }

  actualizarAlumnos(alumnos: any[]): void {
    this.alumnosInscritos = alumnos.filter((alumno) =>
      this.snapshotIds.includes(alumno.id)
    );
    this.otrosAlumnos = alumnos.filter(
      (alumno) => !this.snapshotIds.includes(alumno.id)
    );
  }

  agregarAlumno(alumno: any): void {
    // Lógica para agregar el alumno
    console.log('Alumno agregado:', alumno);
    this.alumnosInscritos.push(alumno); // Agregar alumno a la lista de inscritos
    this.otrosAlumnos = this.otrosAlumnos.filter((a) => a.id !== alumno.id); // Remover alumno de otros alumnos
  }

  quitarAlumno(alumno: any): void {
    // Lógica para quitar el alumno
    console.log('Alumno eliminado:', alumno);
    this.alumnosInscritos = this.alumnosInscritos.filter(
      (a) => a.id !== alumno.id
    ); // Remover alumno de la lista de inscritos
    this.otrosAlumnos.push(alumno); // Agregar alumno a otros alumnos
  }

  aceptarCambios(): void {
    console.log(
      'IDs de los alumnos inscritos:',
      this.alumnosInscritos.map((alumno) => alumno.id)
    );
    this.toggleVistaCompleta();
    // Lógica para aceptar cambios
  }
  resetearDatos() {
    // Volver a cargar los datos originales del curso o restablecer los datos según sea necesario
    this.storage.alumnos$.subscribe((alumnos) => {
      this.actualizarAlumnos(alumnos);
    });
    this.snapshotIds = this.fromParent.item.alumnosId;
  }
  cancelar() {
    this.mostrarVistaCompleta = false; // Cambiar de nuevo a vista normal
    this.resetearDatos(); // Restablecer los datos a su estado inicial
  }
  toggleVistaCompleta() {
    this.mostrarVistaCompleta = !this.mostrarVistaCompleta;
  }
}
