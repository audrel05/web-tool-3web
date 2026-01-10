# web-tool-3web

## L'Idée du projet
Le projet explore la notion de typographie flexible et expressive à travers un outil interactif.
L’objectif est de proposer une expérience visuelle et ludique où les mots deviennent des objets graphiques vivants.
Chaque mot n’est plus seulement un support de lecture, mais une forme en mouvement, modulable selon les envies de l’utilisateur.
Le point de départ est simple : jouer avec les mots et leur apparence.
À partir d’un ensemble de paramètres aléatoires:
- Typographie
- Taille
- Couleur
- Effet
  
Cette approche vise à questionner la manière dont la forme influence le sens et à inviter l’utilisateur à expérimenter librement la typographie.


## Descritpion de l'outil
L'outil se présente sous la forme d'une interface web épurée, alliant un fond Blanc Cassé (#f8f7f2) et un écran de rendu Bleu Nuit (#132440).

Fonctionnalités Clés :

Carrousel Infini 2D : Un défilement fluide et perpétuel de mots.

Interaction Directe : Cliquez sur n'importe quel mot dans l'écran pour le sélectionner. Un indicateur rouge (surlignage) apparaît pour confirmer la sélection.

Édition en Temps Réel : Une fois un mot sélectionné, vous pouvez modifier instantanément :

La Typographie : Choix parmi 10 polices expressives (Tilt Warp, Tourney, Rubik Glitch, etc.).

La Taille : Via un slider (de 10 à 150px).

La Couleur : Via un sélecteur avec aperçu dynamique sur les boutons de l'interface.

Navigation Manuelle : Des boutons "Gauche" et "Droite" permettent de prendre le contrôle du défilement.

Ajout Dynamique : Créez de nouveaux mots qui s'intègrent immédiatement dans la boucle du carrousel.

## Snippets
- Interface : slider pour modifier la taille d’un texte
```js
let slider;

function setup() {
  createCanvas(600, 200);
  textAlign(CENTER, CENTER);
  textSize(32);

  slider = createSlider(10, 100, 32); // min, max, valeur de départ
  slider.position(20, 20);
}

function draw() {
  background(240);
  let size = slider.value();
  textSize(size);
  text("Hello p5.js!", width / 2, height / 2);
}
```
- Palette de couleurs avec boutons
```js
let colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
let currentColor = "#000";

function setup() {
  createCanvas(600, 400);
  createButtons();
}

function draw() {
  background(currentColor);
}

function createButtons() {
  for (let i = 0; i < colors.length; i++) {
    let btn = createButton(colors[i]);
    btn.style("background-color", colors[i]);
    btn.style("color", "#fff");
    btn.mousePressed(() => currentColor = colors[i]);
  }
}
```
- Générateur de mot aléatoire
```js
const words = [
  "Rêve", "Chaos", "Lumière", "Pixel", "Souffle",
  "Flux", "Écho", "Mouvement", "Onde", "Instant"
];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

console.log(getRandomWord());
```
- Générateur de style typographique aléatoire
```js
const fonts = ["Arial", "Georgia", "Courier New", "Poppins", "Montserrat", "Playfair Display"];

function getRandomStyle() {
  return {
    fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
    fontSize: `${Math.floor(Math.random() * 80) + 20}px`, // entre 20 et 100px
    color: `hsl(${Math.random() * 360}, 80%, 60%)`,       // couleur aléatoire
    transform: `rotate(${Math.floor(Math.random() * 20) - 10}deg)` // rotation légère
  };
}

console.log(getRandomStyle());
```
- Panneau Contrôle de personnalisation
```js
panel.innerHTML = `
    <h3>Modifier le mot : "${targetWord.textContent}"</h3>
    <label>Couleur : <input type="color" id="colorInput"></label><br>
    <label>Taille : <input type="range" id="sizeInput" min="10" max="120"></label><br>
    <label>Police :
      <select id="fontSelect">
        ${fonts.map(f => `<option value="${f}">${f}</option>`).join("")}
      </select>
    </label><br>
    <button id="closePanel">Fermer</button>
  `;
  ```

## Typographies Intégrées

Le projet utilise une sélection de polices Google Fonts pour offrir des styles contrastés :

Modernes : Inter, Montserrat

Expressives : Tilt Warp, Londrina Sketch

Futuristes : Tourney, Orbitron

Rétro / Glitch : VT323, Press Start 2P, Rubik Glitch