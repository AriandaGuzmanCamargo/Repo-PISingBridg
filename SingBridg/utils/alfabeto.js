// Mapeo del alfabeto en lenguaje de señas
export const ALFABETO_SENAS = {
  'a': require('../assets/A.jpg'),
  'b': require('../assets/B.jpg'),
  'c': require('../assets/C.jpg'),
  'd': require('../assets/D.jpg'),
  'e': require('../assets/E.jpg'),
  'f': require('../assets/F.jpg'),
  'g': require('../assets/G.jpg'),
  'h': require('../assets/H.jpg'),
  'i': require('../assets/I.jpg'),
  'j': require('../assets/J.jpg'),
  'k': require('../assets/K.jpg'),
  'l': require('../assets/L.jpg'),
  'm': require('../assets/M.jpg'),
  'n': require('../assets/N.jpg'),
  'o': require('../assets/O.jpg'),
  'p': require('../assets/P.jpg'),
  'q': require('../assets/Q.jpg'),
  'r': require('../assets/R.jpg'),
  's': require('../assets/S.jpg'),
  't': require('../assets/T.jpg'),
  'u': require('../assets/U.jpg'),
  'v': require('../assets/V.jpg'),
  'w': require('../assets/W.jpg'),
  'x': require('../assets/X.jpg'),
  'y': require('../assets/Y.jpg'),
  'z': require('../assets/Z.jpg'),
};

export const obtenerLetrasSeñas = (palabra) => {
  if (!palabra) return [];
  
  return palabra
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .split('')
    .filter(letra => ALFABETO_SENAS[letra])
    .map(letra => ({
      letra: letra.toUpperCase(),
      imagen: ALFABETO_SENAS[letra]
    }));
};

export default ALFABETO_SENAS;
