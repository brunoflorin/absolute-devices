// Diaporamas commerciaux / pédagogiques — un diaporama par sujet.
// Source unique : utilisée par le lecteur du site (Diaporama.jsx)
// ET par le générateur PowerPoint (scripts/build-diaporamas.mjs).
//
// Chaque diapositive :
//   titre      : titre de la page
//   accroche   : phrase simple, compréhensible par tous
//   points     : 2 à 4 arguments courts
//   image      : visuel BD existant (chemin depuis /public), affiché à droite
//   icone      : emoji d'illustration si pas d'image
//   analogie   : comparaison de la vie courante (encadré)

const V = (couleur, fichier) => `/visuels/${couleur}-BD/${fichier}`;

export const DIAPORAMAS = {
  // ---------------------------------------------------------------- PARE-FEU / VPN
  parefeu_vpn: {
    titre: "Pare-feu & VPN",
    sousTitre: "Le gardien de l'entrée de votre réseau",
    couleur: "#C5161D",
    topics: ["cyber_parefeu"],
    slides: [
      {
        titre: "Votre box Internet ne vous protège pas vraiment",
        accroche: "La box relie l'entreprise à Internet. Elle n'a pas été conçue pour trier ce qui entre et ce qui sort.",
        points: [
          "Elle laisse passer presque tout le trafic",
          "Elle ne détecte ni virus, ni sites piégés, ni intrusions",
          "Personne n'est prévenu en cas de tentative d'attaque",
        ],
        icone: "📡",
        analogie: "Une box seule, c'est une porte d'entrée sans serrure ni gardien.",
      },
      {
        titre: "Le pare-feu : un gardien à l'entrée",
        accroche: "Il se place entre la box et vos ordinateurs. Tout ce qui entre ou sort passe devant lui.",
        points: [
          "Il bloque les connexions non autorisées",
          "Il filtre les sites dangereux et les téléchargements piégés",
          "Il analyse le trafic avec un antivirus réseau",
        ],
        image: V("ROUGE", "Comprendre_parefeu_Materiel_BD.png"),
        analogie: "Comme un vigile qui contrôle les badges et fouille les colis.",
      },
      {
        titre: "Ce qu'il arrête au quotidien",
        accroche: "Chaque jour, des robots testent les portes de toutes les entreprises connectées, petites ou grandes.",
        points: [
          "Les tentatives d'intrusion automatiques",
          "Les liens frauduleux cliqués par erreur",
          "Les logiciels malveillants qui veulent « appeler la maison »",
        ],
        image: V("BLEU", "Pare-feu_BD.png"),
      },
      {
        titre: "Le VPN : travailler de l'extérieur en sécurité",
        accroche: "Depuis la maison, un hôtel ou un client, le VPN crée un tunnel chiffré jusqu'au bureau.",
        points: [
          "Accès aux fichiers et logiciels comme si l'on était au bureau",
          "Données illisibles pour qui voudrait les intercepter",
          "Accès réservé aux personnes autorisées (avec double authentification)",
        ],
        image: V("ROUGE", "VPN-types_BD.PNG"),
        analogie: "Un couloir privé et blindé entre votre domicile et le bureau.",
      },
      {
        titre: "Surveillé et mis à jour par Absolute Micro",
        accroche: "Un pare-feu n'est utile que s'il est bien réglé et tenu à jour. C'est notre travail, pas le vôtre.",
        points: [
          "Mises à jour de sécurité et des signatures",
          "Alertes remontées à notre équipe",
          "Règles adaptées à votre activité",
        ],
        icone: "🛡️",
      },
      {
        titre: "En résumé",
        accroche: "Un boîtier, une installation, une protection permanente de tout le réseau.",
        points: [
          "Tout le réseau protégé, pas seulement un poste",
          "Télétravail possible en toute sécurité",
          "Un interlocuteur unique qui s'en occupe",
        ],
        icone: "✅",
      },
    ],
  },

  // ---------------------------------------------------------------- EDR
  edr: {
    titre: "EDR",
    sousTitre: "Bien plus qu'un antivirus",
    couleur: "#C5161D",
    topics: ["cyber_edr"],
    slides: [
      {
        titre: "L'antivirus classique a ses limites",
        accroche: "Il reconnaît les menaces déjà connues, comme une liste de « portraits-robots ».",
        points: [
          "Les attaques nouvelles passent entre les mailles",
          "Il ne voit pas un comportement anormal",
          "Il ne permet pas de comprendre ce qui s'est passé",
        ],
        image: V("ROUGE", "Antivirus_Gratuit_VS_Professionnel_BD.png"),
        analogie: "Un vigile qui ne reconnaît que les visages affichés au mur.",
      },
      {
        titre: "L'EDR observe les comportements",
        accroche: "Il ne cherche pas seulement « qui » est suspect, mais « ce qu'il fait ».",
        points: [
          "Un logiciel qui chiffre des centaines de fichiers ? Stoppé",
          "Une connexion inhabituelle la nuit ? Signalée",
          "Un programme qui désactive la protection ? Bloqué",
        ],
        image: V("ROUGE", "Antivirus_Pro_VS_EDR_BD.PNG"),
        analogie: "Une caméra intelligente qui repère quelqu'un qui force une porte, même inconnu.",
      },
      {
        titre: "Contre les rançongiciels",
        accroche: "Le rançongiciel bloque tous vos fichiers et réclame de l'argent. C'est la menace n°1 des TPE et PME.",
        points: [
          "Détection du chiffrement en cours",
          "Arrêt du processus et isolement du poste",
          "Restauration des fichiers touchés quand c'est possible",
        ],
        image: V("ROUGE", "Comprendre_antiransomware_BD.png"),
      },
      {
        titre: "Une réaction en quelques secondes",
        accroche: "En cas d'alerte, le poste peut être isolé du réseau à distance, avant que l'infection ne se propage.",
        points: [
          "Le poste touché est coupé du reste de l'entreprise",
          "Notre équipe est alertée et analyse",
          "On sait d'où vient l'attaque et ce qu'elle a fait",
        ],
        image: V("ROUGE", "Acronis_EDR_BD.PNG"),
      },
      {
        titre: "En résumé",
        accroche: "L'EDR protège, alerte, isole et explique. Et Absolute Micro surveille pour vous.",
        points: [
          "Protection contre les menaces nouvelles",
          "Rançongiciels stoppés au démarrage",
          "Suivi par notre équipe, sans effort de votre part",
        ],
        icone: "✅",
      },
    ],
  },

  // ---------------------------------------------------------------- ANTISPAM
  antispam: {
    titre: "Antispam & anti-hameçonnage",
    sousTitre: "Une boîte mail propre et sûre",
    couleur: "#C5161D",
    topics: ["cyber_antispam", "cyber_mfa"],
    slides: [
      {
        titre: "90 % des attaques commencent par un mail",
        accroche: "Un faux mail de livraison, de banque ou de fournisseur : un clic suffit.",
        points: [
          "Liens vers de faux sites de connexion",
          "Pièces jointes piégées",
          "Fausses demandes de virement (changement de RIB)",
        ],
        image: V("ROUGE", "Anti_phishing_BD.PNG"),
      },
      {
        titre: "Spam, publicités, virus : trois familles",
        accroche: "Tout ce qui arrive dans la boîte n'est pas dangereux, mais tout ne mérite pas votre temps.",
        points: [
          "Les spams : indésirables, à supprimer",
          "Les publicités et newsletters : rangées à part",
          "Les mails piégés : bloqués avant d'arriver",
        ],
        image: V("ROUGE", "Spams_Greymails_Virus_BD.PNG"),
      },
      {
        titre: "Le filtre trie avant vous",
        accroche: "Chaque mail est analysé avant d'arriver dans la boîte : expéditeur, liens, pièces jointes.",
        points: [
          "Les liens sont vérifiés au moment du clic",
          "Les usurpations d'identité sont détectées",
          "Vous gardez la main sur les mails mis de côté",
        ],
        image: V("ROUGE", "VADE365_BD.PNG"),
        analogie: "Un secrétariat qui ouvre le courrier et écarte les colis suspects.",
      },
      {
        titre: "Avec la double authentification",
        accroche: "Même si un mot de passe est volé, le pirate ne peut pas entrer sans votre téléphone.",
        points: [
          "Un code ou une validation sur le téléphone",
          "Bloque l'immense majorité des piratages de comptes",
          "Quelques secondes de plus à la connexion",
        ],
        image: V("ROUGE", "Comprendre_MFA_BD.png"),
        analogie: "Une clé ET un code d'alarme pour ouvrir la porte.",
      },
      {
        titre: "En résumé",
        accroche: "Moins de mails inutiles, beaucoup moins de risques.",
        points: [
          "Gain de temps au quotidien",
          "Protection contre les arnaques au virement",
          "Comptes protégés même en cas de fuite de mot de passe",
        ],
        icone: "✅",
      },
    ],
  },

  // ---------------------------------------------------------------- M365
  m365: {
    titre: "Microsoft 365",
    sousTitre: "Vos outils de travail, partout et à jour",
    couleur: "#D4A017",
    topics: ["collab_m365", "collab_m365_techno", "collab_office_suite", "collab_outlook", "collab_popimapex"],
    slides: [
      {
        titre: "Un abonnement, tous les outils",
        accroche: "Messagerie professionnelle, Word, Excel, partage de fichiers, réunions : tout est réuni.",
        points: [
          "Outlook, Word, Excel, PowerPoint toujours à jour",
          "Teams, OneDrive et SharePoint inclus",
          "Utilisable sur PC, Mac, tablette et téléphone",
        ],
        image: V("JAUNE", "Produits_Microsoft_BD.png"),
      },
      {
        titre: "Une vraie messagerie professionnelle",
        accroche: "Mails, agenda et contacts synchronisés sur tous vos appareils, à votre nom de domaine.",
        points: [
          "Adresse @votre-entreprise.fr",
          "Agendas partagés entre collègues",
          "Rien n'est perdu si un appareil casse",
        ],
        image: V("JAUNE", "Exchange365_BD.png"),
      },
      {
        titre: "Quelle formule choisir ?",
        accroche: "Il existe plusieurs niveaux. Nous vous orientons vers celui qui correspond à votre usage.",
        points: [
          "Basic : messagerie et outils en ligne",
          "Standard : en plus, les logiciels installés sur le PC",
          "Premium : en plus, la sécurité renforcée des appareils",
        ],
        image: V("JAUNE", "Versions_M365_Basic_Standrad_Premium_BD.png"),
      },
      {
        titre: "Plus de souci de version",
        accroche: "Fini le « je n'arrive pas à ouvrir ton fichier » : tout le monde a la même version.",
        points: [
          "Mises à jour automatiques",
          "Licence attachée à la personne, pas au PC",
          "Changement d'ordinateur sans racheter de logiciel",
        ],
        image: V("JAUNE", "Office_VS_Suite_Office_VS_M365_BD.png"),
      },
      {
        titre: "En résumé",
        accroche: "Un coût mensuel connu, des outils modernes, et Absolute Micro pour l'installer et l'administrer.",
        points: [
          "Migration de vos mails existants",
          "Création et gestion des comptes",
          "Assistance au quotidien",
        ],
        icone: "✅",
      },
    ],
  },

  // ---------------------------------------------------------------- TEAMS
  teams: {
    titre: "Teams",
    sousTitre: "Discuter, se réunir, travailler ensemble",
    couleur: "#D4A017",
    topics: ["collab_teams"],
    slides: [
      {
        titre: "Moins de mails, plus d'échanges",
        accroche: "Les questions rapides passent par la messagerie instantanée, pas par des chaînes de mails.",
        points: [
          "Discussions privées ou en groupe",
          "Réponse immédiate, comme un SMS professionnel",
          "Historique conservé et consultable",
        ],
        image: V("JAUNE", "Teams_BD.PNG"),
      },
      {
        titre: "Des réunions sans se déplacer",
        accroche: "Une visioconférence avec l'équipe, un client ou un fournisseur, en un clic.",
        points: [
          "Partage d'écran pendant la réunion",
          "Invités extérieurs sans compte",
          "Réunions programmées dans l'agenda Outlook",
        ],
        icone: "🎥",
        analogie: "La salle de réunion qui tient dans votre poche.",
      },
      {
        titre: "Des équipes et des canaux",
        accroche: "Chaque service ou projet a son espace : messages, fichiers et documents au même endroit.",
        points: [
          "Un canal par sujet : compta, chantiers, clients…",
          "Les fichiers partagés sont rangés automatiquement",
          "Les nouveaux arrivants retrouvent tout l'historique",
        ],
        icone: "🗂️",
      },
      {
        titre: "En résumé",
        accroche: "Une équipe mieux connectée, au bureau comme à distance.",
        points: [
          "Inclus dans Microsoft 365",
          "Mise en place et formation par Absolute Micro",
          "Accès sécurisé depuis tous les appareils",
        ],
        icone: "✅",
      },
    ],
  },

  // ---------------------------------------------------------------- SHAREPOINT / ONEDRIVE
  sharepoint: {
    titre: "SharePoint & OneDrive",
    sousTitre: "Vos fichiers, rangés, partagés et protégés",
    couleur: "#D4A017",
    topics: ["collab_sharepoint", "collab_onedrive"],
    slides: [
      {
        titre: "Fini la clé USB et les pièces jointes",
        accroche: "Les fichiers sont dans un espace en ligne sécurisé, accessibles à ceux qui en ont besoin.",
        points: [
          "Une seule version du fichier, toujours la bonne",
          "Accès depuis le bureau, la maison ou le téléphone",
          "Plus besoin d'un serveur de fichiers au bureau",
        ],
        image: V("JAUNE", "SharePoint_BD.PNG"),
      },
      {
        titre: "OneDrive : les documents de chacun",
        accroche: "Chaque collaborateur dispose de son espace personnel, synchronisé avec son ordinateur.",
        points: [
          "Le Bureau et les Documents sont protégés",
          "PC volé ou en panne : rien n'est perdu",
          "Partage d'un fichier par simple lien",
        ],
        image: V("JAUNE", "OneDrive_BD.png"),
      },
      {
        titre: "SharePoint : les documents de l'entreprise",
        accroche: "Les dossiers communs sont organisés par service, avec des droits précis.",
        points: [
          "La compta ne voit que la compta, la direction voit tout",
          "Plusieurs personnes dans le même fichier en même temps",
          "Historique des versions : retour en arrière possible",
        ],
        icone: "🏢",
        analogie: "Une armoire de bureau, avec une clé différente par tiroir.",
      },
      {
        titre: "Gratuit ou professionnel ?",
        accroche: "La version gratuite est pensée pour les particuliers. Elle ne protège pas les données de l'entreprise.",
        points: [
          "Comptes appartenant à l'entreprise, pas au salarié",
          "Données conservées en cas de départ",
          "Conformité RGPD",
        ],
        image: V("JAUNE", "OneDrive_Gratuit_VS_Pro_BD.png"),
      },
      {
        titre: "En résumé",
        accroche: "Des fichiers accessibles partout, bien rangés, et qui ne disparaissent pas.",
        points: [
          "Migration de votre serveur ou de vos dossiers",
          "Organisation et droits d'accès définis avec vous",
          "À compléter par une sauvegarde indépendante",
        ],
        icone: "✅",
      },
    ],
  },

  // ---------------------------------------------------------------- SAUVEGARDES
  sauvegardes: {
    titre: "Sauvegardes locales & Cloud",
    sousTitre: "La seule assurance qui rend vos données",
    couleur: "#2E8B57",
    topics: ["backup_acronis", "backup_nas", "backup_hybride", "backup_integrite", "backup_tests", "backup_crashdisk", "backup_pca_pra_pci"],
    slides: [
      {
        titre: "Ce qui peut arriver demain matin",
        accroche: "Un disque qui lâche, un vol, un incendie, un rançongiciel, une fausse manipulation.",
        points: [
          "Un disque dur a une durée de vie limitée",
          "Un rançongiciel chiffre aussi les disques branchés",
          "Sans sauvegarde, les données sont perdues",
        ],
        image: V("VERT", "Crashdisk_BD.png"),
      },
      {
        titre: "La sauvegarde locale",
        accroche: "Une copie sur un boîtier de stockage (NAS) au bureau : rapide à restaurer.",
        points: [
          "Restauration en quelques minutes",
          "Copies automatiques chaque jour",
          "Mais : elle disparaît avec le bureau (vol, incendie)",
        ],
        image: V("VERT", "Sauvegardes_Locales_BD.png"),
        analogie: "Un double des clés rangé dans le tiroir.",
      },
      {
        titre: "La sauvegarde Cloud",
        accroche: "Une copie chiffrée dans un centre de données en France, loin de vos locaux.",
        points: [
          "À l'abri du vol, de l'incendie et des rançongiciels",
          "Données chiffrées, illisibles pour un tiers",
          "Récupérables même si tout le bureau est perdu",
        ],
        image: V("VERT", "Sauvegardes_Cloud_BD.png"),
        analogie: "Un double des clés au coffre de la banque.",
      },
      {
        titre: "Le meilleur des deux : l'hybride",
        accroche: "Local pour la rapidité, Cloud pour la sécurité. C'est la règle recommandée.",
        points: [
          "3 copies des données",
          "Sur 2 supports différents",
          "Dont 1 hors des locaux",
        ],
        image: V("VERT", "Sauvegardes_Hybrides_BD.png"),
      },
      {
        titre: "Une sauvegarde, ça se vérifie",
        accroche: "Une sauvegarde jamais testée est une promesse. Nous vérifions qu'elle fonctionne vraiment.",
        points: [
          "Contrôle quotidien des sauvegardes",
          "Vérification de l'intégrité des copies",
          "Tests de restauration réguliers",
        ],
        image: V("VERT", "Test_de_restauration_BD.png"),
      },
      {
        titre: "En résumé",
        accroche: "Le jour où tout s'arrête, vous redémarrez. Sans sauvegarde, vous recommencez.",
        points: [
          "Automatique, sans geste de votre part",
          "Locale + Cloud pour couvrir tous les risques",
          "Surveillée et testée par Absolute Micro",
        ],
        image: V("VERT", "Sauvegardes_Locales_VS_Cloud_VS_Hybrides_BD.png"),
      },
    ],
  },
};

// Topic du site -> clé de diaporama
export function getDiaporamaForTopic(topicId) {
  for (const [key, deck] of Object.entries(DIAPORAMAS)) {
    if (deck.topics.includes(topicId)) return { key, ...deck };
  }
  return null;
}
