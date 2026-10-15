import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IZodiaco } from './izodiaco';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco {
  formulario !: FormGroup
  listaZodiaco: IZodiaco[] = [];
  indiceEdicion: number = -1;
  datosPersonales: IZodiaco = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dia: 0,
    mes: 0,
    ano: 0,
    masculino: false,
    femenino: false,
    zigno: ''
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apellidoPaterno: new FormControl(''),
      apellidoMaterno: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      ano: new FormControl(''),
      sexo: new FormControl('')
    });

    const indice = localStorage.getItem('indiceEdicion');
    const persona = localStorage.getItem('personaEdicion');

    if (indice !== null && persona !== null) {
      this.indiceEdicion = Number(indice);
      const datos: IZodiaco = JSON.parse(persona);
      this.datosPersonales = { ...datos };

      this.formulario.patchValue({
        nombre: datos.nombre,
        apellidoPaterno: datos.apellidoPaterno,
        apellidoMaterno: datos.apellidoMaterno,
        dia: datos.dia,
        mes: datos.mes,
        ano: datos.ano,
        sexo: datos.masculino
          ? 'masculino'
          : datos.femenino
            ? 'femenino'
            : ''
      });

      localStorage.removeItem('indiceEdicion');
      localStorage.removeItem('personaEdicion');
    }
  }

  calcularMostrarDatos(): void {
    this.datosPersonales.nombre = this.formulario.value.nombre;
    this.datosPersonales.apellidoPaterno = this.formulario.value.apellidoPaterno;
    this.datosPersonales.apellidoMaterno = this.formulario.value.apellidoMaterno;
    this.datosPersonales.dia = this.formulario.value.dia;
    this.datosPersonales.mes = this.formulario.value.mes;
    this.datosPersonales.ano = this.formulario.value.ano;
    this.datosPersonales.masculino = this.formulario.value.sexo === 'masculino';
    this.datosPersonales.femenino = this.formulario.value.sexo === 'femenino';

    const dia = Number(this.formulario.value.dia);
    const mes = Number(this.formulario.value.mes);
    const ano = Number(this.formulario.value.ano);

    const hoy = new Date();
    const fechaNacimiento = new Date(ano, mes - 1, dia);

    if (!dia || !mes || !ano || dia < 1 || dia > 31 || mes < 1 || mes > 12 || fechaNacimiento.getFullYear() !== ano || fechaNacimiento.getMonth() !== mes - 1 || fechaNacimiento.getDate() !== dia || fechaNacimiento > hoy
    ) {
      alert('Ingresa una fecha de nacimiento válida.');
      return;
    }

    let edad = hoy.getFullYear() - ano;

    if (
      hoy.getMonth() < mes - 1 ||
      (hoy.getMonth() === mes - 1 && hoy.getDate() < dia)
    ) {
      edad--;
    }

    this.datosPersonales.edad = edad;

    let rata = [1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020];
    let buey = [1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021];
    let tigre = [1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022];
    let conejo = [1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023];
    let dragon = [1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024];
    let serpiente = [1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025];
    let caballo = [1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026];
    let cabra = [1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027];
    let mono = [1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028];
    let gallo = [1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029];
    let perro = [1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030];
    let cerdo = [1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031];

    if (rata.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Rata';
      this.datosPersonales.zignoImagen = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/OMBRE_CHINOISE_RAT.jpg/250px-OMBRE_CHINOISE_RAT.jpg';
    } else if (buey.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Buey';
      this.datosPersonales.zignoImagen = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/OMBRE_CHINOISE_BUFFLE.jpg/250px-OMBRE_CHINOISE_BUFFLE.jpg';
    } else if (tigre.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Tigre';
      this.datosPersonales.zignoImagen = 'https://upload.wikimedia.org/wikipedia/commons/3/33/OMBRE_CHINOISE_TIGRE.jpg';
    } else if (conejo.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Conejo';
      this.datosPersonales.zignoImagen = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/OMBRE_CHINOISE_LIEVRE_2.jpg/250px-OMBRE_CHINOISE_LIEVRE_2.jpg';
    } else if (dragon.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Dragón';
      this.datosPersonales.zignoImagen = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Chinese_black_dragon.svg/250px-Chinese_black_dragon.svg.png';
    } else if (serpiente.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Serpiente';
      this.datosPersonales.zignoImagen = 'https://commons.wikimedia.org/wiki/Special:FilePath/OMBRE_CHINOISE_SERPENT.jpg?width=250';
    } else if (caballo.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Caballo';
      this.datosPersonales.zignoImagen = 'https://commons.wikimedia.org/wiki/Special:FilePath/OMBRE_CHINOISE_CHEVAL.jpg?width=250';
    } else if (cabra.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Cabra';
      this.datosPersonales.zignoImagen = 'https://commons.wikimedia.org/wiki/Special:FilePath/OMBRE_CHINOISE_CHEVRE.jpg?width=250';
    } else if (mono.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Mono';
      this.datosPersonales.zignoImagen = 'https://commons.wikimedia.org/wiki/Special:FilePath/OMBRE_CHINOISE_SINGE.jpg?width=250';
    } else if (gallo.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Gallo';
      this.datosPersonales.zignoImagen = 'https://commons.wikimedia.org/wiki/Special:FilePath/OMBRE_CHINOISE_COQ.jpg?width=250';
    } else if (perro.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Perro';
      this.datosPersonales.zignoImagen = 'https://commons.wikimedia.org/wiki/Special:FilePath/OMBRE_CHINOISE_CHIEN.jpg?width=250';
    } else if (cerdo.includes(this.formulario.value.ano)) {
      this.datosPersonales.zigno = 'Cerdo';
      this.datosPersonales.zignoImagen = 'https://commons.wikimedia.org/wiki/Special:FilePath/OMBRE_CHINOISE_SANGLIER.jpg?width=250';
    }
  }

  muestraZodiaco(): void {
    this.calcularMostrarDatos();

    if (
      !this.datosPersonales.zigno ||
      this.datosPersonales.edad === undefined
    ) {
      return;
    }

    const datos = localStorage.getItem('zodiaco');

    if (datos) {
      this.listaZodiaco = JSON.parse(datos);
    } else {
      this.listaZodiaco = [];
    }

    if (this.indiceEdicion !== -1) {
      this.listaZodiaco[this.indiceEdicion] = {
        ...this.datosPersonales
      };

      this.indiceEdicion = -1;
    } else {
      this.listaZodiaco.push({
        ...this.datosPersonales
      });
    }

    localStorage.setItem(
      'zodiaco',
      JSON.stringify(this.listaZodiaco)
    );
  }

  cargaZodiaco(): void {
    const datos = localStorage.getItem('zodiaco');

    if (datos) {
      this.listaZodiaco = JSON.parse(datos);
      alert(`Se cargaron ${this.listaZodiaco.length} registros de zodiaco.`);
    } else {
      this.listaZodiaco = [];
      alert('No hay registros de zodiaco guardados.');
    }
  }
}
