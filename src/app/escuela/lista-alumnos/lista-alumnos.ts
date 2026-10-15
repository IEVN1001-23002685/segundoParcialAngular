import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAlumnos } from './alumnos';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos implements OnInit {
  formulario !: FormGroup
  indiceEdicion: number = -1
  listaAlumnos: IAlumnos[] = []
  alumnos: IAlumnos = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl('')
    })

    this.cargaAlumnos()
  }

  agregarAlumnos(): void {
    if (
      this.alumnos.matricula === '' ||
      this.alumnos.nombre === '' ||
      this.alumnos.correo === '' ||
      this.alumnos.materia === ''
    ) {
      alert('Todos los campos son obligatorios')
      return
    }

    if (this.indiceEdicion !== -1) {
      this.listaAlumnos[this.indiceEdicion] = {
        ...this.alumnos
      }
    } else {
      this.listaAlumnos.push({ ...this.alumnos })
    }

    localStorage.setItem('alumnos', JSON.stringify(this.listaAlumnos))
    this.indiceEdicion = -1
  }


  muestraAlumnos(): void {
    this.alumnos.matricula = this.formulario.value.matricula
    this.alumnos.nombre = this.formulario.value.nombre
    this.alumnos.correo = this.formulario.value.correo
    this.alumnos.materia = this.formulario.value.materia
    this.agregarAlumnos()
  }

  cargaAlumnos(): void {
    const datos = localStorage.getItem('alumnos')

    if (datos) {
      this.listaAlumnos = JSON.parse(datos)
    }
  }

  editarAlumnos(index: number): void {
    const alumno = this.listaAlumnos[index]

    this.alumnos = { ...alumno }

    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    })

    this.indiceEdicion = index
  }

  eliminarAlumno(index: number): void {
    this.listaAlumnos.splice(index, 1)

    localStorage.setItem('alumnos',
      JSON.stringify(this.listaAlumnos))
  }
}
