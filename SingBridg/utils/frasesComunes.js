// Diccionario de frases comunes en lenguaje de señas
// Cada frase se descompone en las señas individuales disponibles

export const FRASES_COMUNES = {
  // Saludos básicos
  'hola': ['hola'],
  'adios': ['adios'],
  'buenos dias': ['bueno', 'dia'],
  'buenas tardes': ['bueno', 'tarde'],
  'buenas noches': ['bueno', 'noche'],
  
  // Expresiones de cortesía
  'gracias': ['gracias'],
  'por favor': ['favor'],
  'de nada': ['nada'],
  'disculpa': ['pena'],
  'lo siento': ['pena'],
  'perdona': ['pena'],
  
  // Estados y emociones
  'como estas': ['como', 'estar'],
  'estoy bien': ['estar', 'bueno'],
  'estoy mal': ['estar', 'malo'],
  'tengo hambre': ['tener', 'hambre'],
  'estoy enojado': ['estar', 'enojado'],
  'estoy triste': ['estar', 'pena'],
  
  // Respuestas básicas
  'si': ['si'],
  'no': ['no'],
  'bien': ['bueno'],
  'mal': ['malo'],
  'bonito': ['bonito'],
  
  // Ubicación y tiempo
  'aqui': ['aqui'],
  'alla': ['alla'],
  'abajo': ['abajo'],
  'hoy': ['hoy'],
  'mañana': ['manana'],
  'ayer': ['ayer'],
  'ahora': ['ahora'],
  'despues': ['despues'],
  'antes': ['antes'],
  'momentito': ['momentito'],
  
  // Frases de necesidad
  'no puedo': ['no', 'poder'],
  'hoy no puedo': ['hoy', 'no', 'poder'],
  'necesito ayuda': ['necesitar', 'ayudar'],
  'ayudame': ['ayudar', 'persona'],
  
  // Familia
  'mama': ['mama'],
  'papa': ['papa'],
  'niño': ['nino'],
  'niña': ['nina'],
  'señor': ['senor'],
  'mujer': ['mujer'],
  'persona': ['persona'],
  
  // Casa y lugares
  'casa': ['hogar'],
  'hogar': ['hogar'],
  'iglesia': ['iglesia'],
  'tienda': ['tienda'],
  'jardin': ['jardin'],
  
  // Comida y bebida
  'agua': ['agua'],
  'comida': ['comida'],
  'quiero comer': ['querer', 'comida'],
  'quiero agua': ['querer', 'agua'],
  'dulce': ['dulce'],
  
  // Acciones comunes
  'ir': ['ir'],
  'venir': ['venir'],
  'ver': ['ver'],
  'oir': ['oir'],
  'hacer': ['hacer'],
  'tomar': ['tomar'],
  'jugar': ['jugar'],
  'nadar': ['nadar'],
  'manejar': ['manejar'],
  'sentar': ['sentar'],
  'cerrar': ['cerrar'],
  'invitar': ['invitar'],
  'entregar': ['entregar'],
  'regresar': ['regresar'],
  'soltar': ['soltar'],
  'volar': ['volar'],
  'soñar': ['sonar'],
  'golpear': ['golpear'],
  'rebanar': ['rebanar'],
  'untar': ['untar'],
  'guardar': ['guardar'],
  'usar': ['usar'],
  'dirigir': ['dirigir'],
  'transformar': ['transformar'],
  
  // Sentimientos y estados
  'quiero': ['querer'],
  'tengo': ['tener'],
  'ojala': ['ojala'],
  'duda': ['duda'],
  'paz': ['paz'],
  'bondad': ['bondad'],
  'cuidado': ['cuidado'],
  'urgente': ['urgente'],
  
  // Objetos
  'balon': ['balon'],
  'escalera': ['escalera'],
  'espejo': ['espejo'],
  'foco': ['foco'],
  'fuego': ['fuego'],
  'horno': ['horno'],
  'lampara': ['lampara'],
  'licuadora': ['licuadora'],
  'llave': ['llave'],
  'radio': ['radio'],
  'zapato': ['zapato'],
  
  // Otros
  'otro': ['otro'],
  'otra vez': ['otra', 'vez'],
  'diferente': ['diferente'],
  'libre': ['libre'],
  'unido': ['unido'],
  'valioso': ['valioso'],
  'viejo': ['viejo'],
  'cual': ['cual'],
  'fin': ['fin'],
  'acompañado': ['acompanado'],
  'no esta': ['no', 'estar'],
  'frio': ['frio'],
  'luna': ['luna'],
  'pasos': ['pasos'],
  'quinto': ['quinto'],
  'resumen': ['resumen'],
  'jerga': ['jerga'],
  'whisky': ['whisky'],
  'xalapa': ['xalapa'],
  'yucatan': ['yucatan'],
  'zanahoria': ['zanahoria'],
  'zapote': ['zapote'],
};

// Palabras individuales disponibles (extraídas de las imágenes)
export const PALABRAS_DISPONIBLES = [
  'abajo', 'acompanado', 'aqui', 'balon', 'bondad', 'bonito', 'bueno',
  'cerrar', 'comida', 'cual', 'cuidado', 'diferente', 'dirigir', 'duda',
  'dulce', 'enojado', 'entregar', 'escalera', 'espejo', 'favor', 'fin',
  'foco', 'frio', 'fuego', 'golpear', 'guardar', 'hacer', 'hambre',
  'hogar', 'horno', 'iglesia', 'invitar', 'jardin', 'jerga', 'jugar',
  'lampara', 'libre', 'licuadora', 'llave', 'luna', 'mama', 'manejar',
  'momentito', 'mujer', 'nadar', 'nina', 'nino', 'no esta', 'oir',
  'ojala', 'otra vez', 'otro', 'papa', 'pasos', 'paz', 'pena',
  'persona', 'querer', 'quinto', 'radio', 'rebanar', 'regresar',
  'resumen', 'senor', 'sentar', 'soltar', 'sonar', 'tener', 'tienda',
  'tomar', 'transformar', 'unido', 'untar', 'urgente', 'usar', 'valioso',
  'ver', 'viejo', 'volar', 'whisky', 'xalapa', 'yucatan', 'zanahoria',
  'zapato', 'zapote'
];

export default FRASES_COMUNES;
