import * as S from "../scenes/parefeu.mjs";

export default {
  key: "parefeu_vpn",
  titre: "Pare-feu & VPN",
  sousTitre: "Le poste de contrôle à l'entrée de votre réseau",
  topics: ["cyber_parefeu"],
  theme: { primary: "#C5161D", dark: "#0B1530", tint: "#FFF1F2", soft: "#FECACA" },
  slides: [
    { t: "cover", scene: S.cover, photo: "pexels-1148820.jpg" },
    {
      t: "story", titre: "Votre box laisse presque tout passer",
      texte: "La box fait du routage : elle relie votre réseau local à Internet. Son métier, c'est d'acheminer le trafic, pas de l'inspecter.",
      points: [
        ["Radar", "Des robots scannent en permanence les adresses IP publiques, à la recherche d'un port ouvert"],
        ["Fish", "Un lien piégé ouvert depuis un poste établit une connexion vers l'extérieur"],
        ["BellOff", "Aucune journalisation exploitable : l'attaque passe inaperçue"],
      ],
      tech: ["Port", "Une « porte » numérotée par laquelle un service reçoit des connexions : 443 pour le web sécurisé, 3389 pour le bureau à distance…"],
      vanne: "Une box qui protège votre réseau, c'est un portail sans serrure : c'est joli, ça ferme, mais ça n'arrête personne.",
      scene: S.boxSeule,
    },
    {
      t: "explainer", titre: "Le pare-feu : un poste de contrôle",
      texte: "Placé entre la box et le réseau, il confronte chaque paquet à une table de règles : qui parle à qui, sur quel port, avec quel contenu.",
      scene: S.controle,
      tech: ["Règle par défaut", "Tout ce qui n'est pas explicitement autorisé est bloqué. C'est le principe du « moindre privilège »."],
    },
    {
      t: "cards", titre: "Ce qu'il arrête chaque jour",
      items: [
        ["ScanSearch", "Les intrusions", "La prévention d'intrusion (IPS) reconnaît les techniques d'attaque connues et coupe la connexion.", "pexels-6963944.jpg"],
        ["Ban", "Les sites piégés", "Le filtrage web bloque les domaines malveillants ou frauduleux, même si quelqu'un clique.", "pexels-1181244.jpg"],
        ["RadioTower", "Les appels sortants", "Un poste infecté qui tente de joindre le serveur du pirate est bloqué et signalé.", "pexels-5380589.jpg"],
      ],
      vanne: "Le pirate ne frappe pas à la porte. Il essaie toutes les fenêtres, toutes les nuits, sans jamais se lasser.",
    },
    {
      t: "explainer", titre: "Le VPN : un tunnel chiffré jusqu'au bureau",
      texte: "Le VPN chiffre tout le trafic entre l'ordinateur distant et le pare-feu du bureau. Même sur un réseau douteux, les données restent illisibles.",
      scene: S.vpn,
      tech: ["Chiffrement", "Les données sont brouillées avec une clé : sans elle, ce n'est qu'une suite de caractères sans aucun sens."],
      vanne: "Le Wi-Fi gratuit de l'hôtel est très généreux : il partage vos données avec tout le monde.",
    },
    {
      t: "explainer", titre: "Pourquoi une licence en plus du boîtier ?",
      texte: "Chaque jour apparaissent des centaines de nouvelles menaces. La licence alimente le boîtier en signatures, en listes de sites dangereux et en correctifs.",
      scene: S.licence,
      vanne: "Un boîtier sans licence, c'est un vigile qui n'a pas lu le journal depuis deux ans : il reconnaît encore les voleurs de 2024.",
    },
    {
      t: "levels", titre: "Deux niveaux de licence",
      niveaux: [
        { nom: "Sécurité essentielle", sous: "Le socle indispensable", icone: "ShieldHalf",
          items: ["Filtrage du trafic et accès VPN", "Mises à jour, correctifs et assistance", "Antivirus sur le trafic Internet", "Prévention d'intrusion (IPS)", "Filtrage des sites web", "Contrôle des applications"] },
        { nom: "Sécurité complète", sous: "Contre les attaques récentes et ciblées", icone: "ShieldCheck", plus: "Tout l'essentiel, et en plus :",
          items: ["Analyse des fichiers suspects en bac à sable", "Filtrage DNS, même hors du bureau", "Détection des menaces par IA", "Réponse automatique aux attaques", "Rapports détaillés de l'activité"] },
      ],
      note: "Bac à sable : le fichier suspect est ouvert dans une machine isolée, pour voir s'il mord avant de le laisser entrer.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Matériel", "Router", "Un boîtier pare-feu", "Dimensionné selon le débit et le nombre de postes", "pexels-2881232.jpg"],
        ["Abonnement", "KeyRound", "Sa licence de sécurité", "Essentielle ou complète, renouvelée chaque année", "pexels-5380642.jpg"],
        ["Télétravail", "Laptop", "Un accès VPN par personne", "Compte nominatif et double authentification", "pexels-4974915.jpg"],
        ["Absolute Micro", "Wrench", "Réglage et surveillance", "Règles adaptées, alertes suivies, mises à jour", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Sans pare-feu… avec pare-feu",
      sans: ["Ports exposés aux scans automatiques", "Télétravail bricolé ou impossible", "Aucune trace en cas d'incident"],
      avec: ["Tout le réseau filtré en un point", "Télétravail par tunnel chiffré", "Journaux et alertes suivis par notre équipe"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Wrench", "Installation et règles sur mesure"], ["RefreshCw", "Mises à jour suivies"], ["BellRing", "Alertes surveillées"]],
    },
  ],
};
