import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IZodiaco } from '../zodiaco/izodiaco';

@Component({
  imports: [CommonModule],
  selector: 'app-lista-zodiaco',
  templateUrl: './lista-zodiaco.html',
})
export class ListaZodiaco implements OnInit {
  listaZodiaco: IZodiaco[] = [];
  indiceEdicion: number = -1;

  ngOnInit(): void {
    this.cargaZodiaco();
  }

  cargaZodiaco(): void {
    const datos = localStorage.getItem('zodiaco');

    if (datos) {
      this.listaZodiaco = JSON.parse(datos);
    }
  }

  editarZodiaco(index: number): void {
    const datos = localStorage.getItem('zodiaco');

    if (!datos) {
      return;
    }

    const lista: IZodiaco[] = JSON.parse(datos);
    const persona = lista[index];

    if (!persona) {
      return;
    }

    localStorage.setItem('indiceEdicion', index.toString());
    localStorage.setItem('personaEdicion', JSON.stringify(persona));
  }

  eliminarZodiaco(index: number): void {
    this.listaZodiaco.splice(index, 1);

    localStorage.setItem(
      'zodiaco',
      JSON.stringify(this.listaZodiaco)
    );
  }
}