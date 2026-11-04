import * as S from "../scenes/sensibilisation.mjs";

export default {
  key: "sensibilisation",
  titre: "Sensibilisation des utilisateurs",
  sousTitre: "Le meilleur pare-feu se trouve entre la chaise et le clavier",
  topics: ["cyber_sensibilisation"],
  theme: { primary: "#CA8A04", dark: "#2B1D02", tint: "#FEFCE8", soft: "#FDE68A" },
  slides: [
    { t: "cover", photo: "pexels-3184291.jpg" },
    {
      t: "cards", titre: "La technique ne suffit pas",
      items: [
        ["MousePointerClick", "Un clic suffit", "Le pirate cible les personnes, pas les machines : c'est souvent plus simple.", "pexels-1181244.jpg"],
        ["Phone", "Le faux support", "Un appel « du service informatique » demande d'installer un outil de prise en main.", "pexels-4492126.jpg"],
        ["Banknote", "Le faux virement", "Un mail du « dirigeant » réclame un virement urgent et confidentiel.", "pexels-4458420.jpg"],
      ],
      vanne: "Le pirate n'a pas besoin de casser le coffre si quelqu'un lui donne la combinaison avec le sourire.",
    },
    {
      t: "explainer", titre: "Une campagne de faux hameçonnage",
      texte: "Nous envoyons de faux mails piégés, réalistes et sans danger. Ceux qui cliquent reçoivent aussitôt une courte formation : on apprend en se trompant, sans conséquence.",
      scene: S.campagne,
      tech: ["Simulation d'hameçonnage", "Un exercice contrôlé qui reproduit une vraie attaque pour mesurer et entraîner les réflexes de l'équipe."],
      vanne: "Mieux vaut cliquer sur notre faux mail un mardi que sur le vrai un vendredi soir.",
    },
    {
      t: "explainer", titre: "Les réflexes progressent, campagne après campagne",
      texte: "À chaque campagne, moins de personnes tombent dans le piège et davantage le signalent. Les résultats sont suivis et partagés avec vous.",
      scene: S.progression,
      tech: ["Taux de clic", "La part des destinataires qui cliquent sur le lien piégé : l'indicateur principal suivi d'une campagne à l'autre."],
    },
    {
      t: "cards", titre: "Trois réflexes à retenir",
      items: [
        ["AtSign", "Vérifier l'expéditeur", "Survoler l'adresse : un domaine imité trahit souvent l'arnaque."],
        ["Timer", "Douter de l'urgence", "Une demande pressante et inhabituelle mérite toujours un appel de vérification."],
        ["Flag", "Signaler le mail", "Un mail suspect signalé protège aussi les collègues."],
      ],
      vanne: "Le réflexe ultime : en cas de doute, on appelle Absolute Micro. C'est gratuit et ça ne vexe personne.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Plateforme", "Send", "Des campagnes de test", "Plusieurs par an, scénarios variés", "pexels-5380642.jpg"],
        ["Formation", "GraduationCap", "Des modules courts", "Quelques minutes, au bon moment", "pexels-4065891.jpg"],
        ["Suivi", "ChartColumn", "Des résultats mesurés", "Tableau de bord partagé avec vous", "pexels-6476589.jpg"],
        ["Absolute Micro", "Wrench", "Pilotage", "Scénarios, analyse, conseils", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Équipe non formée… ou équipe entraînée", labSans: "Non formée", labAvec: "Entraînée",
      sans: ["Les arnaques passent par les personnes", "Personne n'ose signaler une erreur", "Aucune mesure du risque réel"],
      avec: ["Réflexes acquis par l'entraînement", "Signalements rapides, sans culpabilité", "Progression mesurée et suivie"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Send", "Campagnes de test réalistes"], ["GraduationCap", "Formations courtes et ciblées"], ["ChartColumn", "Résultats suivis avec vous"]],
    },
  ],
};
