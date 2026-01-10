let mots = [];
let espacement = 500;
let vitesseAuto = 2;
let angle = 0;
let p5Ref;
let motSelectionne = null;
let vitesseManuelle = 0;

class Mot {
  constructor(p, texte, taille, couleur, font) {
    this.texte = texte;
    this.taille = taille;
    this.couleur = couleur;
    this.font = font;
    this.largeur = 0;
    this.updateDimensions(p);
  }

  updateDimensions(p) {
    p.textFont(this.font);
    p.textSize(this.taille);
    this.largeur = p.textWidth(this.texte) + 40;
  }

  afficher(p, index, offset) {
    const total = mots.length * espacement;
    this.render(p, index * espacement + offset);
    this.render(p, index * espacement + offset + total);
    this.render(p, index * espacement + offset - total);
  }

  render(p, x) {
    if (x < -this.largeur || x > p.width + this.largeur) return;
    const y = p.height / 2;

    p.push();
    p.translate(x, y);

    if (motSelectionne === this) {
      p.fill(255, 0, 0, 80);
      p.rectMode(p.CENTER);
      p.rect(0, 0, this.largeur, this.taille * 1.5, 10);
    }

    p.fill(this.couleur);
    p.textFont(this.font);
    p.textSize(this.taille);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(this.texte, 0, 0);
    p.pop();
  }
}

function rafraichirValeurs() {
  const taille = document.getElementById('input-taille').value;
  document.getElementById('taille-value').textContent = taille;

  if (motSelectionne && p5Ref) {
    motSelectionne.taille = +taille;
    motSelectionne.couleur = document.getElementById('input-couleur').value;
    motSelectionne.font = document.getElementById('input-typo').value;
    motSelectionne.updateDimensions(p5Ref);
  }
}

function ajouterOuModifier() {
  const texte = document.getElementById('input-texte').value.toUpperCase();
  if (!texte) return;

  const mot = new Mot(
    p5Ref,
    texte,
    +document.getElementById('input-taille').value,
    document.getElementById('input-couleur').value,
    document.getElementById('input-typo').value
  );

  mots.push(mot);
  motSelectionne = mot;
}

new p5(p => {
  p.setup = () => {
    const c = p.createCanvas(800, 600);
    c.parent('p5-canvas');
    p5Ref = p;

    mots.push(new Mot(p, "INTER", 60, "#fff", "Inter"));
    mots.push(new Mot(p, "WARP", 70, "#00d2ff", "Tilt Warp"));
    mots.push(new Mot(p, "DOTS", 50, "#fbbf24", "Raleway Dots"));
    mots.push(new Mot(p, "FUTURE", 80, "#10b981", "Tourney"));

    motSelectionne = mots[0];
  };

  p.draw = () => {
    p.background(15, 23, 42);
    angle -= vitesseAuto;
    angle += vitesseManuelle;

    const total = mots.length * espacement;
    if (angle < -total) angle += total;
    if (angle > total) angle -= total;

    mots.forEach((m, i) => m.afficher(p, i, angle));
  };
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-left').onmousedown = () => vitesseManuelle = 12;
  document.getElementById('btn-right').onmousedown = () => vitesseManuelle = -12;
  document.onmouseup = () => vitesseManuelle = 0;

  document.getElementById('btn-ajouter').onclick = ajouterOuModifier;
  document.getElementById('input-taille').oninput = rafraichirValeurs;
  document.getElementById('input-couleur').oninput = rafraichirValeurs;
  document.getElementById('input-typo').onchange = rafraichirValeurs;
});

function ajouterOuModifier() {
  if (!p5Ref) return;

  const inputTexte = document.getElementById('input-texte');
  const texte = inputTexte.value.toUpperCase().trim();
  if (!texte) return;

  const mot = new Mot(
    p5Ref,
    texte,
    +document.getElementById('input-taille').value,
    document.getElementById('input-couleur').value,
    document.getElementById('input-typo').value
  );

  mots.push(mot);
  motSelectionne = mot;
  inputTexte.value = ""; // ✅ reset
}

const btnAjouter = document.getElementById('btn-ajouter');

btnAjouter.addEventListener('click', () => {
  // Couleur flash
  const originalColor = btnAjouter.style.backgroundColor;
  btnAjouter.style.backgroundColor = "#90AB8B"; // couleur au clic, par ex. vert
  setTimeout(() => {
    btnAjouter.style.backgroundColor = originalColor; // retour à la couleur normale
  }, 150);
});

