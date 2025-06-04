const routines = [
  {
    id: 'press-banca',
    name: 'Press de banca con barra',
    category: 'Pecho',
    description: 'Ejercicio básico para desarrollar el pecho, hombros y tríceps.',
    instructions: [
      'Acuéstate boca arriba en un banco plano con los pies apoyados en el suelo.',
      'Agarra la barra con las manos un poco más anchas que los hombros.',
      'Baja la barra al pecho de manera controlada.',
      'Empuja la barra hacia arriba hasta extender los brazos por completo.',
      'Mantén la espalda apoyada en el banco en todo momento.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=4Y2ZdHCOXok',
    image: 'https://i.ytimg.com/vi/4Y2ZdHCOXok/maxresdefault.jpg'
  },
  {
    id: 'sentadilla',
    name: 'Sentadilla',
    category: 'Piernas',
    description: 'Ejercicio fundamental para desarrollar piernas y glúteos.',
    instructions: [
      'Coloca la barra sobre los trapecios, no sobre el cuello.',
      'Pies separados al ancho de los hombros, puntas ligeramente hacia afuera.',
      'Baja el cuerpo como si te fueras a sentar, manteniendo la espalda recta.',
      'Las rodillas deben seguir la dirección de los pies.',
      'Baja hasta que los muslos estén paralelos al suelo y luego vuelve a la posición inicial.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=U3HlEF_E9fo',
    image: 'https://i.ytimg.com/vi/U3HlEF_E9fo/maxresdefault.jpg'
  },
  {
    id: 'peso-muerto',
    name: 'Peso muerto',
    category: 'Espalda/Piernas',
    description: 'Ejercicio compuesto que trabaja múltiples grupos musculares.',
    instructions: [
      'Párate con los pies separados al ancho de las caderas.',
      'Agáchate y agarra la barra con las manos al ancho de los hombros.',
      'Mantén la espalda recta y el pecho hacia afuera.',
      'Levántate extendiendo caderas y rodillas.',
      'Baja la barra de manera controlada al suelo.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
    image: 'https://i.ytimg.com/vi/op9kVnSso6Q/maxresdefault.jpg'
  },
  {
    id: 'dominadas',
    name: 'Dominadas',
    category: 'Espalda/Brazos',
    description: 'Ejercicio excelente para la espalda y brazos.',
    instructions: [
      'Agarra la barra con las palmas hacia afuera, más ancho que los hombros.',
      'Cuelga con los brazos completamente extendidos.',
      'Tira de tu cuerpo hacia arriba hasta que la barbilla pase la barra.',
      'Baja de manera controlada a la posición inicial.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    image: 'https://i.ytimg.com/vi/eGo4IYlbE5g/maxresdefault.jpg'
  },
  {
    id: 'press-militar',
    name: 'Press militar',
    category: 'Hombros',
    description: 'Ejercicio para desarrollar los hombros.',
    instructions: [
      'De pie o sentado, sostén la barra a la altura de los hombros.',
      'Empuja la barra hacia arriba hasta extender completamente los brazos.',
      'Baja la barra de manera controlada a la posición inicial.',
      'Mantén el core activado durante todo el movimiento.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
    image: 'https://i.ytimg.com/vi/2yjwXTZQDDI/maxresdefault.jpg'
  },
  {
    id: 'curl-biceps',
    name: 'Curl de bíceps con barra',
    category: 'Brazos',
    description: 'Ejercicio clásico para el desarrollo del bíceps.',
    instructions: [
      'De pie, sujeta una barra con las palmas hacia arriba.',
      'Mantén los codos pegados al cuerpo.',
      'Levanta la barra flexionando los codos.',
      'Baja lentamente a la posición inicial.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo',
    image: 'https://i.ytimg.com/vi/kwG2ipFRgfo/maxresdefault.jpg'
  },
  {
    id: 'fondo-triceps',
    name: 'Fondos en paralelas',
    category: 'Tríceps/Pecho',
    description: 'Ejercicio efectivo para tríceps y pecho.',
    instructions: [
      'Sujétate de las barras paralelas con los brazos extendidos.',
      'Baja el cuerpo doblando los codos hasta que los brazos formen 90 grados.',
      'Empuja hacia arriba hasta extender los brazos por completo.',
      'Mantén el cuerpo ligeramente inclinado hacia adelante.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=6kALZikBxLc',
    image: 'https://i.ytimg.com/vi/6kALZikBxLc/maxresdefault.jpg'
  },
  {
    id: 'elevaciones-laterales',
    name: 'Elevaciones laterales',
    category: 'Hombros',
    description: 'Aísla los deltoides laterales.',
    instructions: [
      'De pie, con una mancuerna en cada mano a los lados.',
      'Levanta los brazos lateralmente hasta la altura de los hombros.',
      'Baja lentamente a la posición inicial.',
      'Mantén una ligera flexión en los codos.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
    image: 'https://i.ytimg.com/vi/3VcKaXpzqRo/maxresdefault.jpg'
  },
  {
    id: 'prensa-piernas',
    name: 'Prensa de piernas',
    category: 'Piernas',
    description: 'Ejercicio efectivo para cuádriceps y glúteos.',
    instructions: [
      'Siéntate en la máquina con la espalda apoyada.',
      'Coloca los pies en la plataforma al ancho de los hombros.',
      'Baja el peso doblando las rodillas hasta 90 grados.',
      'Empuja la plataforma hacia arriba sin bloquear las rodillas.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    image: 'https://i.ytimg.com/vi/IZxyjW7MPJQ/maxresdefault.jpg'
  },
  {
    id: 'curl-femoral',
    name: 'Curl femoral acostado',
    category: 'Piernas',
    description: 'Aísla los isquiotibiales.',
    instructions: [
      'Acuéstate boca abajo en la máquina de curl femoral.',
      'Ajusta el rodillo justo encima de los talones.',
      'Dobla las rodillas para llevar los talones hacia los glúteos.',
      'Baja lentamente a la posición inicial.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=oFxEDkppb2w',
    image: 'https://i.ytimg.com/vi/oFxEDkppb2w/maxresdefault.jpg'
  }
];

export default routines;
