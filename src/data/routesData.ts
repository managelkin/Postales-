import { RouteData } from '../types';

export const RUTAS: Record<string, RouteData> = {
  "1": {
    nombre: "Chiclayo y Costa",
    paradas: [
      { fs: "FS01", dia: "19", mes: "JUN", n: "Catedral de Chiclayo — Reapertura", l: "Parque Principal de Chiclayo", t: "Reapertura oficial", b: "especial" },
      { fs: "FS01", dia: "20", mes: "JUN", n: "Santuario Ntra. Sra. de la Paz", l: "Chiclayo", t: "Santuario", b: "sab" },
      { fs: "FS02", dia: "26", mes: "JUN", n: "Iglesia San Pedro de Monsefú", l: "Monsefú — ciudad artesanal", t: "Iglesia colonial", b: "vie" },
      { fs: "FS02", dia: "27", mes: "JUN", n: "Iglesia Sta. María Magdalena de Eten", l: "Eten — Niño del Milagro", t: "Turismo religioso", b: "sab" },
      { fs: "FS03", dia: "03", mes: "JUL", n: "Playa Pimentel", l: "Pimentel — balneario emblemático", t: "Balneario", b: "vie" },
      { fs: "FS03", dia: "04", mes: "JUL", n: "Playa Santa Rosa", l: "Santa Rosa — puerto pesquero artesanal", t: "Puerto artesanal", b: "sab" },
      { fs: "FS04", dia: "10", mes: "JUL", n: "Iglesia La Veracruz de Chiclayo", l: "Chiclayo — parroquia histórica", t: "Patrimonio religioso", b: "vie" },
      { fs: "FS04", dia: "11", mes: "JUL", n: "Mercado Modelo de Chiclayo", l: "Chiclayo — mayor mercado regional", t: "Alta densidad ciudadana", b: "sab" },
      { fs: "FS05", dia: "17", mes: "JUL", n: "Parque Principal de La Victoria", l: "La Victoria — área metropolitana", t: "Espacio público", b: "vie" }
    ]
  },
  "2": {
    nombre: "Ferreñafe y Sicán",
    paradas: [
      { fs: "FS05", dia: "18", mes: "JUL", n: "Iglesia Santa Lucía de Ferreñafe", l: "Ferreñafe — Patrimonio Cultural de la Nación", t: "Joya colonial", b: "sab" },
      { fs: "FS06", dia: "24", mes: "JUL", n: "Museo Nacional Sicán", l: "Ferreñafe — museo de clase mundial", t: "Arqueología", b: "vie" },
      { fs: "FS06", dia: "25", mes: "JUL", n: "Bosque de Pómac — Santuario Histórico", l: "Área natural protegida", t: "Ecoturismo", b: "sab" },
      { fs: "FS07", dia: "31", mes: "JUL", n: "Complejo Arqueológico Túcume", l: "Túcume — sitio piramidal", t: "Turismo cultural", b: "vie" },
      { fs: "FS07", dia: "01", mes: "AGO", n: "Parque Histórico de Ferreñafe", l: "Ferreñafe — espacio cívico", t: "Convocatoria familiar", b: "sab" },
      { fs: "FS08", dia: "07", mes: "AGO", n: "Iglesia Ntra. Sra. del Rosario de Íllimo", l: "Íllimo — parroquia de tradición", t: "Religioso", b: "vie" }
    ]
  },
  "3": {
    nombre: "Norte y Sipán",
    paradas: [
      { fs: "FS08", dia: "08", mes: "AGO", n: "Museo Tumbas Reales de Sipán", l: "Lambayeque — museo insigne del Perú", t: "Patrimonio mundial", b: "sab" },
      { fs: "FS09", dia: "14", mes: "AGO", n: "Museo Brüning", l: "Lambayeque — museo de sitio histórico", t: "Arqueología", b: "vie" },
      { fs: "FS09", dia: "15", mes: "AGO", n: "Plaza de Armas de Lambayeque", l: "Lambayeque — corazón cívico", t: "Espacio público", b: "sab" },
      { fs: "FS10", dia: "21", mes: "AGO", n: "Santuario Cruz de Chalpón", l: "Motupe — santuario popular", t: "Peregrinación", b: "vie" },
      { fs: "FS10", dia: "22", mes: "AGO", n: "Iglesia Santo Domingo de Olmos", l: "Olmos — extremo norte", t: "Parroquia histórica", b: "sab" },
      { fs: "FS11", dia: "28", mes: "AGO", n: "Huaca Rajada — Sipán", l: "Descubrimiento del Señor de Sipán", t: "Sitio arqueológico", b: "vie" },
      { fs: "FS11", dia: "29", mes: "AGO", n: "Museo de Sitio Huaca Rajada", l: "Extensión natural de Huaca Rajada", t: "Museo de sitio", b: "sab" }
    ]
  },
  "4": {
    nombre: "Zaña y Sur",
    paradas: [
      { fs: "FS12", dia: "04", mes: "SEP", n: "Convento San Agustín de Zaña", l: "Zaña — ruinas coloniales", t: "Patrimonio", b: "vie" },
      { fs: "FS12", dia: "05", mes: "SEP", n: "Plaza de Armas de Zaña", l: "Zaña — memoria histórica", t: "Historia", b: "sab" },
      { fs: "FS13", dia: "11", mes: "SEP", n: "Iglesia San Pedro de Reque", l: "Reque — parroquia colonial", t: "Arraigo comunitario", b: "vie" },
      { fs: "FS13", dia: "12", mes: "SEP", n: "Parroquia San Juan Bautista de Cayaltí", l: "Cayaltí — cooperativa agraria", t: "Comunidad", b: "sab" },
      { fs: "FS14", dia: "19", mes: "SEP", n: "Catedral de Chiclayo — Cierre oficial ★", l: "Parque Principal de Chiclayo", t: "Sellado del archivo ciudadano", b: "especial" }
    ]
  }
};
