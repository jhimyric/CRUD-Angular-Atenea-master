import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ActivatedRoute , Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-estudiantes',
  templateUrl: './create-estudiantes.component.html',
  styleUrls: ['./create-estudiantes.component.css']
})
export class CreateEstudiantesComponent implements OnInit {

  createEstudiante: FormGroup;
  submitted = false;
  loading= false;
  id: string | null;
  titulo = 'Agregar Estudiante ';

  constructor(private fb: FormBuilder, 
              private _estudianteService: EstudianteService, 
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {

    this.createEstudiante = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      ci: ['', Validators.required],
      carrera: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
    })
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditaEstudiante(){
    this.submitted=true;
    this.loading=true;
    if(this.createEstudiante.invalid){
      return;
    }

    if(this.id == null){
      this.agregarEstudiante();
    }else{
      this.editarEstudiante(this.id);
    }
  } 

agregarEstudiante() {
  const estudiante: any = {
    nombre: this.createEstudiante.value.nombre,
    apellido: this.createEstudiante.value.apellido,
    ci: this.createEstudiante.value.ci,
    carrera: this.createEstudiante.value.carrera,
    telfono: this.createEstudiante.value.telefono,
    email: this.createEstudiante.value.email,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  }
  this._estudianteService.agregarEstudiante(estudiante).then(()=>{
    this.toastr.success("Estudiante registrado correctamente!", 'Estudiante registrado', {positionClass: 'toast-bottom-right'});
    this.router.navigate(['/list-estudiantes'])
  }).catch(error =>{
    console.log("ERROR");
  })
  this.id = this.aRoute.snapshot.paramMap.get('id');
  console.log(this.id)
}

editarEstudiante(id: string){

  const estudiante: any = {
    nombre: this.createEstudiante.value.nombre,
    apellido: this.createEstudiante.value.apellido,
    ci: this.createEstudiante.value.ci,
    carrera: this.createEstudiante.value.carrera,
    telfono: this.createEstudiante.value.telefono,
    email: this.createEstudiante.value.email,
    fechaActualizacion: new Date()
  }

  this.loading = true;

  this._estudianteService.actualizarEstudiante(id, estudiante).then(() => {
    this.loading = false;
    this.toastr.info('El estudiante fue modificado con exito' , 'Estudiante modificado', {
      positionClass: 'toast-bottom-right'
    })
    this.router.navigate(['/list-estudiantes']);
  })

}

  esEditar(){
    this.titulo = 'Editar Estudiante'
    if(this.id !== null){
      this.loading =true;

      this._estudianteService.getEstudiante(this.id).subscribe(data =>{
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.createEstudiante.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          ci: data.payload.data()['ci'],
          carrera: data.payload.data()['carrera'],
          telefono: data.payload.data()['telefono'],
          email: data.payload.data()['email'],
        })
      })
    }
  }
}
