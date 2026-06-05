export interface Postal {
  num: string;
  nombre: string;
  edad: string;
  msg: string;
  foto: string;
}

export interface Parada {
  fs: string;
  dia: string;
  mes: string;
  n: string;
  l: string;
  t: string;
  b: 'vie' | 'sab' | 'especial';
}

export interface RouteData {
  nombre: string;
  paradas: Parada[];
}
