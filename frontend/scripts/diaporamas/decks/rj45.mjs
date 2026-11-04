import * as S from "../scenes/rj45.mjs";

export default {
  key: "rj45",
  titre: "Câblage RJ45",
  sousTitre: "Le câble, la catégorie et le brassage : les fondations du réseau",
  topics: ["infra_rj45"],
  theme: { primary: "#475569", dark: "#1E293B", tint: "#F1F5F9", soft: "#CBD5E1" },
  slides: [
    { t: "cover", photo: "pexels-2881232.jpg" },
    {
      t: "explainer", titre: "Dans un câble réseau",
      texte: "Un câble RJ45 contient 8 fils regroupés en 4 paires torsadées. Selon l'environnement, il peut être blindé pour résister aux parasites.",
      scene: S.coupe,
      tech: ["Paire torsadée", "Deux fils enroulés l'un sur l'autre : les perturbations s'annulent, le signal reste propre."],
      vanne: "On appelle ça un câble RJ45, mais RJ45 c'est le nom de la prise. Le câble, lui, s'appelle « paire torsadée ». Bonne chance pour le dîner.",
    },
    {
      t: "levels", titre: "Les catégories de câble",
      niveaux: [
        { nom: "Cat 5e", sous: "L'ancien standard", icone: "Cable",
          items: ["1 Gb/s sur 100 m", "100 MHz", "Suffisant pour l'existant", "Déconseillé en neuf"] },
        { nom: "Cat 6 / 6A", sous: "Le choix actuel", icone: "Cable",
          items: ["Cat 6 : 10 Gb/s jusqu'à 55 m", "Cat 6A : 10 Gb/s sur 100 m", "250 / 500 MHz", "Conseillé en neuf"] },
        { nom: "Cat 7 / 8", sous: "Usages spécifiques", icone: "Server", plus: "Pour aller plus loin :",
          items: ["Cat 7 : 600 MHz, blindé", "Cat 8 : 25-40 Gb/s sur 30 m", "Salles serveurs", "Inutile au poste de travail"] },
      ],
      note: "Un réseau n'est jamais plus rapide que son maillon le plus faible : câble, prise, cordon et switch.",
    },
    {
      t: "explainer", titre: "Du bureau à la baie : le brassage",
      texte: "Le câble part de la prise murale, traverse les murs jusqu'au panneau de brassage, puis un cordon court le relie au switch. Tout est repéré.",
      scene: S.brassage,
      tech: ["Brassage", "Relier les prises du bâtiment aux équipements actifs avec des cordons courts, pour pouvoir tout réorganiser sans toucher aux murs."],
    },
    {
      t: "cards", titre: "Les signes d'un câblage à revoir",
      items: [
        ["Shuffle", "Le plat de spaghettis", "Câbles emmêlés, aucun repère : chaque intervention prend trois fois plus de temps.", "pexels-1054397.jpg"],
        ["Gauge", "Le 100 Mb/s bloqué", "Un vieux câble ou une prise abîmée bride toute une partie du réseau.", "pexels-2881227.jpg"],
        ["Zap", "Les coupures", "Câble trop long, écrasé ou longeant des câbles électriques.", "pexels-2881229.jpg"],
      ],
      vanne: "Un câble réseau coincé sous le pied du bureau depuis 2014 ne s'en remettra pas. Lui non plus.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Câble", "Cable", "Du Cat 6A", "Pour toute installation neuve", "pexels-2881232.jpg"],
        ["Baie", "Server", "Une baie de brassage", "Panneau, switch, rangement des cordons", "pexels-17489160.jpg"],
        ["Repérage", "Tag", "Prises numérotées", "Même numéro au mur et au panneau", "pexels-2881227.jpg"],
        ["Absolute Micro", "Wrench", "Recette et certification", "Chaque lien testé et documenté", "pexels-4508748.jpg"],
      ],
    },
    {
      t: "duel", titre: "Câblage improvisé… ou câblage structuré", labSans: "Câblage improvisé", labAvec: "Câblage structuré",
      sans: ["Câbles au sol, rallonges, adaptateurs", "Débit bridé par le maillon faible", "Personne ne sait où va quel câble"],
      avec: ["Catégorie adaptée, longueurs respectées", "Débit garanti de bout en bout", "Tout repéré et documenté"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Ruler", "Étude et plan de câblage"], ["Server", "Baie rangée et repérée"], ["CircleCheck", "Liens testés et documentés"]],
    },
  ],
};
