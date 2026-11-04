import * as S from "../scenes/cpl.mjs";

export default {
  key: "cpl",
  titre: "CPL",
  sousTitre: "Le réseau par les prises électriques : pratique, mais pas magique",
  topics: ["infra_cpl"],
  theme: { primary: "#4D7C0F", dark: "#1F3305", tint: "#F7FEE7", soft: "#D9F99D" },
  slides: [
    { t: "cover", photo: "pexels-4049990.jpg" },
    {
      t: "explainer", titre: "Le principe : passer par les fils électriques",
      texte: "Deux adaptateurs branchés sur des prises transforment le circuit électrique en câble réseau. Aucun câble à tirer, aucun trou à percer.",
      scene: S.principe,
      tech: ["CPL (courant porteur en ligne)", "Technique qui superpose un signal de données haute fréquence au courant électrique du bâtiment."],
      vanne: "Oui, Internet passe dans la prise. Non, ça ne marche pas en branchant directement le PC sur la multiprise.",
    },
    {
      t: "explainer", titre: "Débit annoncé, débit réel",
      texte: "Le débit dépend de la longueur du circuit, des appareils branchés et du tableau électrique. Entre deux tableaux distincts, le signal ne passe généralement pas.",
      scene: S.debit,
      tech: ["Mb/s", "Mégabits par seconde : la vitesse de transfert. 100 Mb/s suffisent pour la bureautique, la visio et le Cloud courant."],
    },
    {
      t: "cards", titre: "Quand le CPL est une bonne idée",
      items: [
        ["Printer", "Un poste isolé", "Relier une imprimante ou un PC dans une pièce sans prise réseau.", "pexels-4974915.jpg"],
        ["Clock", "Le provisoire", "Dépanner en attendant un câblage propre, ou dans un local loué.", "pexels-4049990.jpg"],
        ["Wifi", "Prolonger le Wi-Fi", "Alimenter une borne Wi-Fi dans une zone mal couverte.", "pexels-1181244.jpg"],
      ],
      vanne: "Le CPL, c'est la roue de secours du réseau : très utile ce jour-là, mais on ne fait pas Paris-Marseille avec.",
    },
    {
      t: "levels", titre: "CPL, Wi-Fi ou câble ?",
      niveaux: [
        { nom: "CPL", sous: "Dépannage pratique", icone: "PlugZap",
          items: ["Aucun travaux", "Débit variable", "Sensible aux perturbations", "Même tableau électrique"] },
        { nom: "Wi-Fi", sous: "Mobilité", icone: "Wifi",
          items: ["Portables et téléphones", "Débit partagé", "Murs et distance pénalisants", "Bornes pro recommandées"] },
        { nom: "Câble RJ45", sous: "La référence", icone: "Cable", plus: "Le plus fiable :",
          items: ["Débit garanti jusqu'à 10 Gb/s", "Latence minimale", "Aucune interférence", "Postes fixes et serveurs"] },
      ],
      note: "Règle simple : câble pour les postes fixes, Wi-Fi pour la mobilité, CPL en appoint.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Matériel", "PlugZap", "Deux adaptateurs CPL", "Même norme, même marque, même circuit", "pexels-4974915.jpg"],
        ["Branchement", "Plug", "Prise murale directe", "Jamais sur une multiprise ou un parasurtenseur", "pexels-1181675.jpg"],
        ["Sécurité", "Lock", "Appairage chiffré", "Pour que le voisin ne rejoigne pas le réseau", "pexels-2881232.jpg"],
        ["Absolute Micro", "Wrench", "Mesure et conseil", "Test de débit, alternative si insuffisant", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "CPL subi… ou CPL maîtrisé", labSans: "CPL au hasard", labAvec: "CPL bien posé",
      sans: ["Branché sur une multiprise", "Débit qui s'effondre sans raison", "Réseau ouvert au voisinage"],
      avec: ["Prises murales du même circuit", "Débit mesuré et suffisant", "Appairage chiffré"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Gauge", "Mesure du débit réel"], ["PlugZap", "Pose et appairage chiffré"], ["Cable", "Alternative câblée si besoin"]],
    },
  ],
};
