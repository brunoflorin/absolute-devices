import * as S from "../scenes/parefeu.mjs";

export default {
  key: "parefeu_vpn",
  titre: "Pare-feu & VPN",
  sousTitre: "Le poste de contrôle à l'entrée de votre réseau",
  topics: ["cyber_parefeu"],
  theme: { primary: "#C5161D", dark: "#0B1530", tint: "#FFF1F2", soft: "#FECACA" },
  slides: [
    { t: "cover", img: S.cover, ratio: 760 / 1000 },
    {
      t: "story", titre: "Votre box laisse presque tout passer",
      texte: "La box de l'opérateur relie le bureau à Internet. Elle n'a jamais été conçue pour trier ce qui entre.",
      points: [
        ["robot", "Des robots testent les accès de toutes les entreprises, jour et nuit"],
        ["fishing-pole", "Un clic sur un lien piégé suffit à ouvrir la porte"],
        ["bell-with-slash", "Personne n'est averti quand une attaque est en cours"],
      ],
      img: S.boxSeule, ratio: 600 / 1040, side: "right",
    },
    {
      t: "explainer", titre: "Le pare-feu : un poste de contrôle",
      texte: "Il se place juste après la box. Tout ce qui entre ou sort du bureau passe devant lui.",
      img: S.controle, ratio: 660 / 1600,
      etapes: [[0.13, "Tout arrive d'Internet"], [0.5, "Il contrôle chaque élément"], [0.88, "Seul le trafic sain arrive aux postes"]],
    },
    {
      t: "cards", titre: "Ce qu'il arrête chaque jour",
      items: [
        ["robot", "Les intrusions", "Les tentatives d'entrée automatiques sont bloquées avant d'atteindre un poste."],
        ["fishing-pole", "Les sites piégés", "Un lien frauduleux cliqué par erreur ne s'ouvre pas."],
        ["satellite-antenna", "Les fuites", "Un logiciel malveillant ne peut pas « appeler » son pirate."],
      ],
    },
    {
      t: "story", titre: "Le VPN : un tunnel privé jusqu'au bureau",
      texte: "Depuis la maison, un hôtel ou un client, on travaille comme au bureau, en toute sécurité.",
      points: [
        ["locked", "Les échanges sont chiffrés, illisibles pour un curieux"],
        ["key", "Accès réservé aux personnes autorisées"],
        ["mobile-phone", "Validation sur le téléphone à la connexion"],
      ],
      img: S.vpn, ratio: 640 / 1600, side: "bottom",
    },
    {
      t: "explainer", titre: "Pourquoi une licence en plus du boîtier ?",
      texte: "Le boîtier est le matériel. La licence est le service qui le rend intelligent : chaque jour, il apprend à reconnaître les nouvelles menaces.",
      img: S.licence, ratio: 600 / 1600,
      etapes: [[0.25, "Le boîtier seul : il fait passer le trafic, sans mises à jour ni assistance"], [0.76, "Avec la licence : mises à jour quotidiennes, protections actives, assistance"]],
      analogie: "Le boîtier, c'est la porte blindée. La licence, c'est le gardien, informé chaque matin des nouveaux cambrioleurs.",
    },
    {
      t: "levels", titre: "Deux niveaux de licence",
      niveaux: [
        { nom: "Sécurité essentielle", sous: "Le socle indispensable", emoji: "shield",
          items: ["Filtrage du trafic et accès VPN", "Mises à jour et assistance", "Antivirus sur le trafic Internet", "Blocage des intrusions", "Blocage des sites dangereux", "Contrôle des applications"] },
        { nom: "Sécurité complète", sous: "Contre les attaques récentes et ciblées", emoji: "trophy", plus: "Tout l'essentiel, et en plus :",
          items: ["Analyse des fichiers suspects à l'écart", "Protection des connexions hors du bureau", "Détection des menaces par IA", "Réponse automatique aux attaques", "Rapports détaillés de l'activité"] },
      ],
      note: "Nous vous aidons à choisir le niveau adapté à votre activité.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Matériel", "desktop-computer", "Un boîtier pare-feu", "Posé entre la box et le réseau du bureau"],
        ["Abonnement", "key", "Sa licence de sécurité", "Renouvelée chaque année"],
        ["Télétravail", "laptop", "Un accès VPN par personne", "Avec validation sur le téléphone"],
        ["Absolute Micro", "hammer-and-wrench", "Réglage et surveillance", "Règles adaptées, alertes suivies"],
      ],
    },
    {
      t: "duel", titre: "Sans pare-feu… avec pare-feu",
      sans: ["Accès au réseau ouvert aux robots", "Télétravail risqué ou impossible", "Aucune alerte en cas d'intrusion"],
      avec: ["Tout le réseau protégé d'un coup", "Télétravail par tunnel chiffré", "Alertes suivies par notre équipe"],
      imgSans: S.boxSeule, rSans: 600 / 1040, imgAvec: S.cover, rAvec: 760 / 1000,
    },
    {
      t: "closing", titre: "Absolute Micro s'en occupe",
      items: [["hammer-and-wrench", "Installation sur place"], ["counterclockwise-arrows-button", "Mises à jour suivies"], ["bell", "Alertes surveillées"]],
    },
  ],
};
