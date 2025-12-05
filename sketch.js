tailwind.config = {
  theme: {
    extend: {
      colors: {
        'primary': '#4f46e5',
      }
    }
  }
}

let mots = [];
let espacementHorizontal = 400; // Distance entre les centres de chaque mot
let vitesseRotation = 1.5; // Vitesse de défilement automatique
let angle = 0; // Décalage de translation global
let p5Instance; // Stocke l'instance P5.js
let currentFont = 'Inter'; // Police sélectionnée par défaut (pour les nouveaux mots)
let selectedMot = null; // Stocke le mot sélectionné
let manualSpeed = 0; // Vitesse de défilement manuel

// --- CLASSE MOT ---
class Mot {
  constructor(p, texte, taille, couleur, font) {
    this.texte = texte;
    this.taille = taille;
    this.couleur = couleur;
    this.font = font;
    this.widthEstimate = 0;
    this.updateWidth(p);
  }

  // Met à jour l'estimation de la largeur du mot
  updateWidth(p) {
    p.push();
    p.textFont(this.font);
    p.textSize(this.taille);
    this.widthEstimate = p.textWidth(this.texte) + 20; // + marge
    p.pop();
  }

  /**
   * Affiche le mot dans le carrousel 2D horizontal.
   */
  afficher(p, index, offsetX = 0) {
    const x = index * espacementHorizontal + offsetX;
    const y = p.height / 2;

    p.push();

    p.translate(x, y);

    // Surlignage du mot sélectionné
    if (selectedMot === this) {
      p.rectMode(p.CENTER);
      p.noStroke();
      p.fill(255, 0, 0, 100);
      p.rect(0, 0, this.widthEstimate, this.taille * 1.5, 10);
    }

    // Configuration et dessin
    p.fill(this.couleur);

    // CLÉ : Appliquer la taille et la police du mot INDIVIDUELLEMENT
    p.textFont(this.font);
    p.textSize(this.taille);

    p.textAlign(p.CENTER, p.CENTER);
    p.noStroke();

    p.text(this.texte, 0, 0);

    p.pop();
  }
}

function updateRangeValue() {
  const inputTaille = document.getElementById('input-taille');
  const tailleValueSpan = document.getElementById('taille-value');
  const inputCouleur = document.getElementById('input-couleur');

  if (inputTaille && tailleValueSpan) {
    const newSize = parseInt(inputTaille.value, 10);
    tailleValueSpan.textContent = newSize;

    // Appliquer le changement de taille et de couleur au mot sélectionné
    if (selectedMot && p5Instance) {
      selectedMot.taille = newSize;
      selectedMot.couleur = inputCouleur.value; // MAJ de la couleur aussi
      selectedMot.updateWidth(p5Instance);
    }
  }
}

function changerTypo() {
  const inputTypo = document.getElementById('input-typo');
  const newFont = inputTypo.value;

  // Si un mot est sélectionné, on change sa typo
  if (selectedMot && p5Instance) {
    selectedMot.font = newFont;
    selectedMot.updateWidth(p5Instance); // Recalculer la largeur
  } else {
    // Sinon, on met à jour la police par défaut pour les futurs mots
    currentFont = newFont;
  }
}

function handleInputRangeChange() {
  updateRangeValue();
}

// MAJ Couleur du mot sélectionné
function handleColorChange() {
  updateRangeValue();
}

function ajouterMot() {
  if (!p5Instance) return;

  const inputTexte = document.getElementById('input-texte');
  const inputTaille = document.getElementById('input-taille');
  const inputCouleur = document.getElementById('input-couleur');
  const inputTypo = document.getElementById('input-typo');

  const texte = inputTexte.value.toUpperCase().trim();
  const taille = parseInt(inputTaille.value, 10);
  const couleur = inputCouleur.value;
  // Utiliser la police actuellement sélectionnée dans la liste déroulante comme défaut
  const font = inputTypo.value;

  if (texte && taille > 0) {
    const nouveauMot = new Mot(p5Instance, texte, taille, couleur, font);
    mots.push(nouveauMot);

    // Sélectionner immédiatement le nouveau mot pour l'édition
    selectedMot = nouveauMot;

    // Réinitialiser le champ texte
    inputTexte.value = '';

    // Mettre à jour le panneau de contrôle avec les propriétés du nouveau mot
    document.getElementById('input-taille').value = nouveauMot.taille;
    document.getElementById('input-couleur').value = nouveauMot.couleur;
    document.getElementById('input-typo').value = nouveauMot.font;
    updateRangeValue();
  }
}

// Fonctions pour le contrôle des flèches
function moveStart(direction) {
  manualSpeed = direction * 5;
}

function moveStop() {
  manualSpeed = 0;
}

// Ajout des écouteurs pour les boutons fléchés
document.addEventListener('DOMContentLoaded', () => {
  const btnLeft = document.getElementById('btn-left');
  const btnRight = document.getElementById('btn-right');

  // Événements pour Gauche
  btnLeft.addEventListener('mousedown', () => moveStart(1));
  btnLeft.addEventListener('mouseup', moveStop);
  btnLeft.addEventListener('mouseleave', moveStop);
  btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); moveStart(1); });
  btnLeft.addEventListener('touchend', moveStop);

  // Événements pour Droite
  btnRight.addEventListener('mousedown', () => moveStart(-1));
  btnRight.addEventListener('mouseup', moveStop);
  btnRight.addEventListener('mouseleave', moveStop);
  btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); moveStart(-1); });
  btnRight.addEventListener('touchend', moveStop);

  // Connexion des autres événements DOM
  document.getElementById('btn-ajouter').addEventListener('click', ajouterMot);
  document.getElementById('input-taille').addEventListener('input', handleInputRangeChange);
  document.getElementById('input-couleur').addEventListener('input', handleColorChange); // NOUVEAU
  document.getElementById('input-typo').addEventListener('change', changerTypo);
  updateRangeValue();
});


// --- GESTION DES INTERACTIONS P5.JS (Clic/Sélection) ---

/**
* Gère la sélection d'un mot au clic.
*/
function handleWordClick(p) {
  selectedMot = null;
  let clickX = p.mouseX;
  let clickY = p.mouseY;

  let globalOffsetX = angle;
  const totalWidth = mots.length * espacementHorizontal;
  const offsets = [0, totalWidth];

  for (const offsetX of offsets) {
    for (let i = 0; i < mots.length; i++) {
      const mot = mots[i];

      const motX = i * espacementHorizontal + offsetX;
      const motY = p.height / 2;

      const screenX = motX + globalOffsetX;
      const screenY = motY;

      // Marge de clic
      const halfWidth = mot.widthEstimate / 2;
      const halfHeight = mot.taille / 2 + 10;

      if (clickX >= screenX - halfWidth &&
        clickX <= screenX + halfWidth &&
        clickY >= screenY - halfHeight &&
        clickY <= screenY + halfHeight) {

        selectedMot = mot;

        // Mettre à jour les inputs DOM avec les propriétés du mot sélectionné
        // L'input texte (pour le nouveau mot) n'est PAS mis à jour
        document.getElementById('input-taille').value = mot.taille;
        document.getElementById('input-couleur').value = mot.couleur;
        document.getElementById('input-typo').value = mot.font;
        updateRangeValue();
        return; // Arrêter après la première sélection
      }
    }
  }
}


// --- DÉFINITION DU SKETCH P5.JS (Rendu 2D) ---

const sketch = function (p) {

  p.setup = function () {
    const canvas = p.createCanvas(800, 600);
    canvas.parent('p5-canvas');
    p5Instance = p;

    p.angleMode(p.RADIANS);

    // Définition de la police globale (pour initialiser textWidth)
    p.textFont(currentFont);
    p.textSize(12);

    // Initialisation de la base de mots unique avec des polices variées
    mots.push(new Mot(p, "MONTSERRAT", 45, "#1E90FF", "Montserrat"));
    mots.push(new Mot(p, "ROBOTO", 55, "#FFD700", "Roboto"));
    mots.push(new Mot(p, "INTER", 48, "#3CB371", "Inter"));
    mots.push(new Mot(p, "STYLES", 35, "#FF6347", "Montserrat"));
    mots.push(new Mot(p, "MIX", 60, "#8A2BE2", "Roboto"));

    // Mettre à jour le panneau de contrôle avec les valeurs par défaut du premier mot sélectionné
    if (mots.length > 0) {
      selectedMot = mots[0];
      document.getElementById('input-taille').value = selectedMot.taille;
      document.getElementById('input-couleur').value = selectedMot.couleur;
      document.getElementById('input-typo').value = selectedMot.font;
      document.getElementById('input-texte').value = "NOUVEAU"; // Laisser le champ texte pour l'ajout
      updateRangeValue();
    }
  };

  p.mouseClicked = function () {
    handleWordClick(p);
  }

  p.draw = function () {
    p.background(20, 20, 30);

    const totalWidth = mots.length * espacementHorizontal;

    p.push();

    // Appliquer la translation globale pour le défilement
    p.translate(angle, 0);

    // Défilement automatique + manuel
    angle -= vitesseRotation;
    angle += manualSpeed; // Ajout du décalage manuel

    // Boucle infinie : Afficher le carrousel principal (offsetX = 0)
    for (let i = 0; i < mots.length; i++) {
      mots[i].afficher(p, i, 0);
    }

    // Boucle infinie : Afficher la copie juste après (offsetX = totalWidth)
    for (let i = 0; i < mots.length; i++) {
      mots[i].afficher(p, i, totalWidth);
    }

    p.pop();

    // Gestion de la boucle : Réinitialiser l'angle
    if (angle < -totalWidth) {
      angle += totalWidth;
    } else if (angle > 0) {
      // Empêcher de défiler trop loin à droite lors du contrôle manuel
      angle -= totalWidth;
    }
  };
};

// Lancement du sketch P5.js
new p5(sketch);