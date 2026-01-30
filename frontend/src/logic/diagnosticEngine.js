// /frontend/src/logic/diagnosticEngine.js
export class DiagnosticEngine {
  constructor(domain = "ordinateur") {
    this.domain = domain;
    this.hypotheses = [
      { id: "alim", label: "Alimentation défectueuse", weight: 0.2 },
      { id: "gpu", label: "Carte graphique", weight: 0.2 },
      { id: "screen", label: "Écran / câble vidéo", weight: 0.2 },
      { id: "ram", label: "Mémoire RAM", weight: 0.2 },
      { id: "mobo", label: "Carte mère", weight: 0.2 },
    ];
    this.threshold = 0.75;
  }

  applyEffects(effects) {
    for (const [id, delta] of Object.entries(effects)) {
      const h = this.hypotheses.find((x) => x.id === id);
      if (h) h.weight = Math.min(1, Math.max(0, h.weight + delta));
    }
  }

  getTopHypothesis() {
    return this.hypotheses.sort((a, b) => b.weight - a.weight)[0];
  }

  isConfident() {
    return this.getTopHypothesis().weight >= this.threshold;
  }
}
