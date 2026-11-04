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
      texte: "La box fait du routage : elle relie votre réseau local à Internet. Son métier, c'est d'acheminer le trafic, pas de l'inspecter.",
      points: [
        ["robot", "Des robots scannent en permanence les adresses IP publiques, à la recherche d'un port ouvert"],
        ["fishing-pole", "Un lien piégé ouvert depuis un poste établit une connexion vers l'extérieur"],
        ["bell-with-slash", "Aucune journalisation exploitable, aucune alerte : l'attaque passe inaperçue"],
      ],
      tech: ["Port", "Une « porte » numérotée par laquelle un service reçoit des connexions (443 pour le web sécurisé, 3389 pour le bureau à distance…)."],
      vanne: "Une box qui protège votre réseau, c'est un peu comme un portail sans serrure : c'est joli, ça ferme, mais ça n'arrête personne.",
      img: S.boxSeule, ratio: 600 / 1040, side: "right",
    },
    {
      t: "explainer", titre: "Le pare-feu : un poste de contrôle",
      texte: "Placé entre la box et le réseau, il examine chaque flux selon des règles : qui parle à qui, sur quel port, avec quel contenu.",
      img: S.controle, ratio: 660 / 1600,
      etapes: [[0.13, "Les flux arrivent d'Internet"], [0.5, "Filtrage, inspection, antivirus réseau"], [0.88, "Seul le trafic autorisé atteint les postes"]],
      tech: ["Inspection en profondeur (DPI)", "Le pare-feu ne lit pas que l'adresse sur l'enveloppe : il ouvre le colis pour vérifier son contenu."],
    },
    {
      t: "cards", titre: "Ce qu'il arrête chaque jour",
      items: [
        ["robot", "Les intrusions", "Le système de prévention d'intrusion (IPS) reconnaît les techniques d'attaque connues et coupe la connexion."],
        ["fishing-pole", "Les sites piégés", "Le filtrage web bloque les domaines malveillants ou frauduleux, même si quelqu'un clique."],
        ["satellite-antenna", "Les appels sortants", "Un poste infecté qui tente de joindre le serveur du pirate est bloqué et signalé."],
      ],
      vanne: "Spoiler : le pirate ne frappe pas à la porte. Il essaie toutes les fenêtres, toutes les nuits, sans jamais se lasser.",
    },
    {
      t: "story", titre: "Le VPN : un tunnel privé jusqu'au bureau",
      texte: "Le VPN chiffre tout le trafic entre l'ordinateur distant et le pare-feu du bureau, à travers Internet.",
      points: [
        ["locked", "Chiffrement de bout en bout : illisible même sur un Wi-Fi public"],
        ["key", "Accès par compte nominatif, révocable en un clic"],
        ["mobile-phone", "Double authentification sur le téléphone"],
      ],
      tech: ["Chiffrement", "Brouiller les données avec une clé : sans elle, ce n'est qu'une suite de caractères sans aucun sens."],
      vanne: "Le Wi-Fi gratuit de l'hôtel est très généreux : il partage vos données avec tout le monde.",
      img: S.vpn, ratio: 640 / 1600, side: "bottom",
    },
    {
      t: "explainer", titre: "Pourquoi une licence en plus du boîtier ?",
      texte: "Les menaces changent tous les jours. La licence alimente le boîtier en signatures, en listes de sites dangereux et en correctifs, et donne accès au support constructeur.",
      img: S.licence, ratio: 600 / 1600,
      etapes: [[0.25, "Sans licence : le trafic passe, mais les protections ne se mettent plus à jour"], [0.76, "Avec licence : protections à jour en continu, correctifs, assistance et garantie"]],
      analogie: "Un boîtier sans licence, c'est un vigile qui n'a pas lu le journal depuis deux ans : il reconnaît encore les voleurs de 2024.",
    },
    {
      t: "levels", titre: "Deux niveaux de licence",
      niveaux: [
        { nom: "Sécurité essentielle", sous: "Le socle indispensable", emoji: "shield",
          items: ["Filtrage du trafic et accès VPN", "Mises à jour, correctifs et assistance", "Antivirus sur le trafic Internet", "Prévention d'intrusion (IPS)", "Filtrage des sites web", "Contrôle des applications"] },
        { nom: "Sécurité complète", sous: "Contre les attaques récentes et ciblées", emoji: "trophy", plus: "Tout l'essentiel, et en plus :",
          items: ["Analyse des fichiers suspects en bac à sable", "Filtrage DNS, même hors du bureau", "Détection des menaces par IA", "Réponse automatique aux attaques", "Rapports détaillés de l'activité"] },
      ],
      note: "Bac à sable : le fichier suspect est ouvert dans une machine isolée, pour voir s'il mord avant de le laisser entrer.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Matériel", "desktop-computer", "Un boîtier pare-feu", "Dimensionné selon le débit et le nombre de postes"],
        ["Abonnement", "key", "Sa licence de sécurité", "Essentielle ou complète, renouvelée chaque année"],
        ["Télétravail", "laptop", "Un accès VPN par personne", "Compte nominatif + double authentification"],
        ["Absolute Micro", "hammer-and-wrench", "Réglage et surveillance", "Règles adaptées, alertes suivies, mises à jour"],
      ],
    },
    {
      t: "duel", titre: "Sans pare-feu… avec pare-feu",
      sans: ["Ports exposés aux scans automatiques", "Télétravail bricolé ou impossible", "Aucune trace en cas d'incident"],
      avec: ["Tout le réseau filtré en un point", "Télétravail par tunnel chiffré", "Journaux et alertes suivis par notre équipe"],
      imgSans: S.boxSeule, rSans: 600 / 1040, imgAvec: S.cover, rAvec: 760 / 1000,
    },
    {
      t: "closing", titre: "Absolute Micro s'en occupe",
      items: [["hammer-and-wrench", "Installation et règles sur mesure"], ["counterclockwise-arrows-button", "Mises à jour suivies"], ["bell", "Alertes surveillées"]],
    },
  ],
};
