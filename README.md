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
L’outil prend la forme d’une page web interactive.
Sur la page, un carrousel de mots défile continuellement.
Chaque mot possède un style généré aléatoirement :
Typographie choisie parmi une sélection de polices variées,
Taille et couleur aléatoires, Effets visuels appliqués (rotation, étirement, espacement, animation…).
Lorsque l’utilisateur clique sur un mot, un panneau de personnalisation s’ouvre :
il peut alors modifier ses paramètres (police, couleur, taille, effet) et visualiser les changements en temps réel.
Chaque mot devient ainsi une composition typographique personnalisable, que l’on peut transformer ou régénérer à volonté.
L’expérience repose sur la création aléatoire et l’interaction directe, mêlant hasard et intention.
L’utilisateur n’est pas spectateur, mais acteur du processus visuel, capable de manipuler la forme du langage.

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
