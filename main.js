let player = document.getElementById("Playing");
let namesound = document.getElementById("nombre");
var Sounds = [
  "SALSA/001.ogg",
  "SALSA/002.ogg",
  "SALSA/003.ogg",
  "SALSA/004.ogg",
  "SALSA/005.ogg",
  "SALSA/006.ogg",
  "MERENGUE/001.ogg",
  "MERENGUE/002.ogg",
  "MERENGUE/003.ogg",
  "MERENGUE/004.ogg",
  "MERENGUE/005.ogg",
  "MERENGUE/006.ogg", 
  "REGGAE/001.mp3",
  "REGGAE/002.mp3",
  "REGGAE/003.mp3",
  "REGGAE/004.mp3",
  "REGGAE/005.mp3",
  "REGGAE/006.mp3", 
  "BALLENATO/001.mp3",
  "BALLENATO/002.mp3",
  "BALLENATO/003.mp3",
  "708090/001.ogg",
  "708090/002.ogg",
  "708090/003.ogg",
  "708090/004.ogg",
  "708090/005.ogg",
  "708090/006.ogg",
  "708090/007.ogg",
  "708090/008.ogg",
  "708090/009.ogg",
  "AUDIOS/001.js",
  "AUDIOS/002.json",
  "AUDIOS/003.txt",
  "AUDIOS/004.json",
  "AUDIOS/005.mp3"
];
let Entradas = ["ENTRADAS/001.mp3", "ENTRADAS/002.mp3", "ENTRADAS/003.mp3"];
let Intermedios = [
  "INTERMEDIO-1/001.mp3",
  "INTERMEDIO-1/002.mp3",
  "INTERMEDIO-1/003.mp3",
  "INTERMEDIO-1/004.mp3",
  "INTERMEDIO-1/005.mp3",
  "INTERMEDIO-1/006.mp3",
  "INTERMEDIO-1/007.mp3",
  "INTERMEDIO-1/008.mp3",
  "INTERMEDIO-2/001.mp3",
  "INTERMEDIO-2/002.mp3",
  "INTERMEDIO-2/003.mp3",
  "INTERMEDIO-2/004.mp3",
  "INTERMEDIO-2/005.mp3",
  "INTERMEDIO-2/006.mp3",
  "INTERMEDIO-2/007.mp3",
  "INTERMEDIO-2/008.mp3"
];
let Salidas = [
  "SALIDAS/SALSA-1.mp3",
  "SALIDAS/SALSA-2.mp3",
  "SALIDAS/SALSA-3.mp3",
  "SALIDAS/MERENGUE-1.mp3",
  "SALIDAS/MERENGUE-2.mp3",
  "SALIDAS/MERENGUE-3.mp3",
  "SALIDAS/REGGAE-1.mp3",
  "SALIDAS/REGGAE-2.mp3",
  "SALIDAS/REGGAE-3.mp3",
  "SALIDAS/BALLENATO-1.mp3",
  "SALIDAS/BALLENATO-2.mp3",
  "SALIDAS/BALLENATO-3.mp3",
  "SALIDAS/80-1.mp3",
  "SALIDAS/80-2.mp3",
  "SALIDAS/80-3.mp3"
];
let Generos = [
  "MERENGUE",
  "SALSA",
  "REGGAE",
  "BALLENATO",
  "708090",
  "AUDIOS"
];

let CurrentSounds = []; //Array para la lista que esta siendo tocada
let CurrentSoundstmp = []; //Array temporal para la ultima lista tocada
let CurrentGeneros = []; // Array para lista de generos que esta siendo tocada
let CurrentGenerostmp = []; //Array temporal para la ultima lista de generos tocada
let pointer = 0; //Puntero para el array de canciones barajeadas
let algorithmoption = 1; // Fisher.Yates 1 _ Sattolo _ 2 Según el Número : Se eleige el Algoritmo que hará el Random
let debug = true; //Muestra la salida de los array en consola

const PlaySounds = () => {
  if (CurrentSounds.length === 0) {
    //De ser la primera vez en cargar barajeamos antes de sonar la cancion
    // CurrentSounds = Barajear(Sounds, algorithmoption);
    CurrentGeneros = Barajear(Generos, algorithmoption);
    SetCurrentSound();
  }
  //Tocamos la cancion segun el puntero en el array
  // SetSource(CurrentSounds[pointer]).then(_ => player.play());
  namesound.innerHTML = "Cancion en curso: " + CurrentSounds[pointer];
  //Para quitar esa línea del reporoductor solo hay que comentarla con 2 //
};

const SetSource = source =>
  new Promise((resolve, reject) => {
    if (/\.(txt|js|json)$/.test(source)) {
      var script = document.createElement("script");

      script.onload = _ => {
        player.src = base64;
        script.remove();
        resolve();
      };

      script.src = source;
      document.body.appendChild(script);
    } else {
      player.src = source;
      resolve();
    }
  });

const FisherYates = array => {
  //Reorganizamos la musica al azar con la misma probabilidad
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const SattoloSounds = array => {
  //Volvamos el array en un nuevo objeto
  var array1 = [];
  for (var i = 0; i < array.length; i++) {
    array1[i] = array[i];
  }
  //Procedemos con el algoritmo de Sattolo
  const len = array1.length;
  for (let i = 0; i < len - 1; i++) {
    // 0 to n -1, exclusive because the last item doesn't need swapping
    let j = Math.floor(Math.random() * (len - (i + 1))) + (i + 1); // i+1 to len, exclusive
    const temp = array1[i];
    array1[i] = array1[j];
    array1[j] = temp;
  }
  return array1;
}

// Fisher.Yates 1 _ Sattolo _ 2 Según el Número : Se eleige el Algoritmo que hará el Random
const Barajear = (lista, metodo = 1) => {
  if (metodo == 1) {
    return FisherYates(lista);
  } else if (metodo == 2) {
    return SattoloSounds(lista);
  } else {
    //Predeterminado seria shuffle
    return FisherYates(lista);
  }
}

const SetCurrentSound = () => {
  //Barajeamos
  // CurrentSounds = Barajear(CurrentSounds, algorithmoption);
  // Agrupar Audios por Genero
  let newLists = [];
  CurrentGeneros.forEach(genero => {
    const newSounds = Sounds.filter( sound => sound.split('/')[0] === genero);
     //  console.log('newSounds', Barajear(newSounds, algorithmoption));
     // Barajear cada Cancione del genero y agregarla a la lista de reproduccion
     newLists = [...newLists, ...Barajear(newSounds, algorithmoption)];
   });
   CurrentSounds = newLists;
  //  console.log('CurrentSounds next 1', CurrentSounds);
}

const Next = () => {
  /*Pasamos a la siguiente cancion y es el final del array barajeamos y validamos
   *que la ultima cancion no se repita con la primera del nuevo array de ser asi
   *entonces volvemos a barajear para volver a validar.
   ********************************************************************************/

  pointer++; //Puntero de donde va reproduciendo en el array
  if (pointer > CurrentSounds.length - 1) {
    //Si es la ultima cancion barajemaos
    //Volvamos la info del array a un temporal para comparar
    for (var i = 0; i < CurrentSounds.length; i++) {
      CurrentSoundstmp[i] = CurrentSounds[i];
    }
    for (var i = 0; i < CurrentGeneros.length; i++) {
      CurrentGenerostmp[i] = CurrentGeneros[i];
    }
    // SetCurrentSound();
    CurrentGeneros = Barajear(Generos, algorithmoption);
    //Validamos que la ultima no sea la primea cancion en el nuevo array
    var resolve = true;
    var ultimasonada = CurrentGenerostmp.length - 1;
    while (resolve) {
      console.log('condicion', CurrentGenerostmp[ultimasonada].split('/')[0] == CurrentGeneros[0]);
      // console.log('condicion1', CurrentGenerostmp[ultimasonada].split('/')[0]);
      // console.log('condicion2', CurrentGeneros[0]);
      if (CurrentGenerostmp[ultimasonada].split('/')[0] == CurrentGeneros[0]) {
        // CurrentSounds = Barajear(CurrentSounds, algorithmoption);
        // SetCurrentSound();
        CurrentGeneros = Barajear(Generos, algorithmoption);
      } else {
        resolve = false;
      }
    }
    SetCurrentSound();
    //Como es un nuevo array iniciamos el puntero
    pointer = 0;

    //Solo para debug muestra resultado del antiguo array con respecto al nuevo
    if (debug == true) {
      console.log(
        "---------------------------------------------------------------"
        );
      console.info([CurrentSounds[0].split('/')[0], CurrentSoundstmp[0].split('/')[0]])
      // console.log("Nueva lista:");
      // console.log(CurrentSounds[0].split('/')[0]);
      // console.log("Lista Anterior:");
      // console.log(CurrentSoundstmp[0].split('/')[0]);
      console.log(
        "---------------------------------------------------------------"
      );
    }
  }
  //Llamamos a la funcion de tocar la cancion
  PlaySounds();
};


for (let i = 0; i < 600; i++) {
  if (i === 0) {
    PlaySounds();
  } else {
    Next();
  }
}

// window.addEventListener("load", PlaySounds);
player.addEventListener("ended", Next);
