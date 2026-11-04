// Contenu des diaporamas « installation minimum ».
// Aucune BD de devices : les illustrations sont des schémas générés (schemas.mjs).
// carte.on = éléments du schéma général mis en lumière ; carte.liens = liaisons mises en lumière.

export const DECKS = [
  {
    key: "parefeu_vpn",
    titre: "Pare-feu & VPN",
    sousTitre: "Le gardien de l'entrée de votre réseau",
    couleur: "#C5161D",
    icone: "BrickWall",
    topics: ["cyber_parefeu"],
    probleme: {
      titre: "Aujourd'hui, la porte d'entrée est grande ouverte",
      texte: "La box de l'opérateur relie le bureau à Internet. Elle n'a pas été conçue pour trier ce qui entre et ce qui sort.",
      risques: [
        ["Bug", "Des robots testent en permanence les accès de toutes les entreprises"],
        ["MailWarning", "Un clic sur un lien piégé ouvre la porte au pirate"],
        ["EyeOff", "Personne n'est prévenu quand une attaque est en cours"],
      ],
    },
    carte: {
      on: ["internet", "box", "parefeu", "switch", "pc1", "pc2", "nas", "teletravail"],
      liens: ["internet-box", "box-parefeu", "parefeu-switch", "teletravail-parefeu"],
      focus: ["parefeu"],
      legende: "Le pare-feu se place juste après la box : tout le trafic du bureau passe devant lui.",
    },
    flux: {
      titre: "Comment ça marche",
      etapes: [
        ["Globe", "Une connexion arrive d'Internet"],
        ["BrickWall", "Le pare-feu la contrôle"],
        ["Ban", "Danger : elle est bloquée"],
        ["Monitor", "Sain : elle arrive au poste"],
      ],
      texte: "Il fonctionne dans les deux sens : il bloque aussi un poste infecté qui voudrait « appeler » un pirate.",
    },
    minimum: [
      ["BrickWall", "Matériel", "Un boîtier pare-feu professionnel", "Installé entre la box et le reste du réseau"],
      ["KeyRound", "Abonnement", "La licence de sécurité", "Mises à jour, filtrage web, antivirus réseau"],
      ["Laptop", "Télétravail", "Un accès VPN par personne", "Avec double authentification sur le téléphone"],
      ["Wrench", "Absolute Micro", "Réglage et surveillance", "Règles adaptées à votre activité, alertes suivies"],
    ],
    licence: {
      titre: "Pourquoi une licence en plus du boîtier ?",
      texte: "Le boîtier, c'est le matériel. La licence, c'est le service qui le rend intelligent : chaque jour, il reçoit la description des nouvelles menaces.",
      analogie: "Le boîtier, c'est la porte blindée. La licence, c'est le gardien, informé chaque matin des nouveaux cambrioleurs.",
      niveaux: {
        essentielle: ["Sécurité essentielle", "Le socle indispensable"],
        complete: ["Sécurité complète", "Contre les attaques récentes et ciblées"],
        lignes: [
          ["Filtrage du trafic et accès VPN", true, true],
          ["Mises à jour du boîtier et assistance", true, true],
          ["Antivirus sur le trafic Internet", true, true],
          ["Détection et blocage des intrusions", true, true],
          ["Blocage des sites web dangereux", true, true],
          ["Contrôle des applications", true, true],
          ["Analyse des fichiers inconnus en zone isolée", false, true],
          ["Protection des connexions, même hors du bureau", false, true],
          ["Détection des menaces par intelligence artificielle", false, true],
          ["Réponse automatique aux attaques détectées", false, true],
          ["Rapports détaillés de l'activité", false, true],
        ],
        note: "Sans licence, le boîtier fait encore passer le trafic, mais il ne reconnaît plus les nouvelles menaces. Nous vous aidons à choisir le niveau adapté à votre activité.",
      },
    },
    sansAvec: {
      sans: ["Accès au réseau ouvert aux robots", "Télétravail risqué ou impossible", "Aucune alerte en cas d'intrusion"],
      avec: ["Tout le réseau protégé d'un coup", "Télétravail sécurisé par tunnel chiffré", "Alertes suivies par notre équipe"],
    },
    nous: [
      ["Wrench", "Installation", "Pose et paramétrage sur place"],
      ["RefreshCw", "Mises à jour", "Le boîtier reste à jour, sans vous"],
      ["Siren", "Surveillance", "Les alertes arrivent chez nous"],
    ],
  },

  {
    key: "edr",
    titre: "EDR",
    sousTitre: "La protection intelligente de chaque poste",
    couleur: "#C5161D",
    icone: "ShieldCheck",
    topics: ["cyber_edr"],
    probleme: {
      titre: "L'antivirus classique ne suffit plus",
      texte: "Il reconnaît les menaces déjà connues. Les attaques récentes, et surtout les rançongiciels, passent à travers.",
      risques: [
        ["Lock", "Un rançongiciel chiffre tous les fichiers et réclame de l'argent"],
        ["Bug", "Les nouvelles attaques ne sont pas encore dans la liste de l'antivirus"],
        ["EyeOff", "Après une attaque, impossible de savoir ce qui s'est passé"],
      ],
    },
    carte: {
      on: ["pc1", "pc2", "teletravail", "switch"],
      liens: ["switch-pc1", "switch-pc2"],
      focus: ["pc1", "pc2", "teletravail"],
      badge: ["pc1", "pc2", "teletravail"],
      legende: "L'EDR est un logiciel installé sur chaque ordinateur, au bureau comme en télétravail.",
    },
    flux: {
      titre: "Comment ça marche",
      etapes: [
        ["Eye", "Il observe ce que font les programmes"],
        ["Siren", "Un comportement anormal est repéré"],
        ["Unplug", "Le poste est isolé du réseau"],
        ["Headset", "Notre équipe analyse et répare"],
      ],
      texte: "Exemple : un programme qui chiffre des centaines de fichiers d'un coup est stoppé, même s'il est inconnu.",
    },
    minimum: [
      ["Monitor", "Abonnement", "Une licence EDR par ordinateur", "Postes fixes, portables et serveurs"],
      ["Cloud", "Console", "La console de supervision", "Gérée par Absolute Micro, rien à installer chez vous"],
      ["Wrench", "Absolute Micro", "Déploiement à distance", "Remplacement de l'ancien antivirus, sans déplacement"],
    ],
    sansAvec: {
      sans: ["Rançongiciel : activité arrêtée plusieurs jours", "Infection qui se propage à tous les postes", "Aucune trace pour comprendre"],
      avec: ["Attaque stoppée dès les premières secondes", "Poste touché isolé du reste", "Rapport clair de ce qui s'est passé"],
    },
    nous: [
      ["Download", "Déploiement", "Installation à distance sur chaque poste"],
      ["Siren", "Alertes", "Reçues et traitées par notre équipe"],
      ["FileText", "Compte rendu", "Explication claire en cas d'incident"],
    ],
  },

  {
    key: "antispam",
    titre: "Antispam & double authentification",
    sousTitre: "Une messagerie propre et des comptes protégés",
    couleur: "#C5161D",
    icone: "MailCheck",
    topics: ["cyber_antispam", "cyber_mfa"],
    probleme: {
      titre: "La plupart des attaques commencent par un mail",
      texte: "Faux transporteur, fausse banque, faux fournisseur : un seul clic suffit pour qu'un pirate entre.",
      risques: [
        ["MailWarning", "Liens vers de faux sites qui volent les mots de passe"],
        ["Paperclip", "Pièces jointes piégées"],
        ["Banknote", "Fausses demandes de virement ou de changement de RIB"],
      ],
    },
    carte: {
      on: ["internet", "filtre", "m365", "pc1", "pc2"],
      liens: ["internet-filtre", "filtre-m365", "m365-pc1", "m365-pc2"],
      focus: ["filtre"],
      legende: "Le filtre se place dans le Cloud, avant votre messagerie : les mails sont triés avant d'arriver.",
    },
    flux: {
      titre: "Comment ça marche",
      etapes: [
        ["Mail", "Un mail est envoyé à l'entreprise"],
        ["Filter", "Le filtre l'analyse"],
        ["Trash2", "Spam ou piège : écarté"],
        ["Inbox", "Mail sain : livré dans la boîte"],
      ],
      texte: "En complément, la double authentification demande une validation sur le téléphone : un mot de passe volé ne suffit plus.",
    },
    minimum: [
      ["Filter", "Abonnement", "Un filtre antispam par boîte mail", "Branché sur la messagerie existante"],
      ["Smartphone", "Téléphone", "Une application d'authentification", "Gratuite, sur le téléphone de chaque utilisateur"],
      ["Wrench", "Absolute Micro", "Mise en service", "Branchement du filtre et activation de la double authentification"],
    ],
    sansAvec: {
      sans: ["Boîtes encombrées de spams", "Un clic peut suffire à se faire pirater", "Compte volé = mails frauduleux envoyés en votre nom"],
      avec: ["Boîte propre, gain de temps chaque jour", "Liens et pièces jointes vérifiés", "Mot de passe volé inutilisable sans le téléphone"],
    },
    nous: [
      ["Plug", "Branchement", "Sans changer de messagerie"],
      ["Smartphone", "Accompagnement", "Activation avec chaque utilisateur"],
      ["Inbox", "Suivi", "Récupération d'un mail bloqué à tort"],
    ],
  },

  {
    key: "m365",
    titre: "Microsoft 365",
    sousTitre: "Messagerie et outils de bureau, partout et à jour",
    couleur: "#C99A0E",
    icone: "LayoutGrid",
    topics: ["collab_m365", "collab_m365_techno", "collab_office_suite", "collab_outlook", "collab_popimapex"],
    probleme: {
      titre: "Des outils dispersés et vieillissants",
      texte: "Messagerie de l'opérateur, logiciels de versions différentes, fichiers sur un seul PC : tout dépend d'une machine.",
      risques: [
        ["Mail", "Mails stockés sur un seul ordinateur : perdus s'il tombe en panne"],
        ["FileWarning", "Versions d'Office différentes, fichiers qui ne s'ouvrent pas"],
        ["Smartphone", "Mails et agenda pas synchronisés sur le téléphone"],
      ],
    },
    carte: {
      on: ["internet", "m365", "pc1", "pc2", "teletravail", "telephone"],
      liens: ["m365-pc1", "m365-pc2", "m365-teletravail", "m365-telephone"],
      focus: ["m365"],
      legende: "Microsoft 365 est dans le Cloud : chaque appareil s'y connecte et retrouve les mêmes données.",
    },
    flux: {
      titre: "Ce que contient l'abonnement",
      etapes: [
        ["Mail", "Messagerie à votre nom"],
        ["FileText", "Word, Excel, PowerPoint"],
        ["MessagesSquare", "Teams pour échanger"],
        ["FolderOpen", "OneDrive et SharePoint"],
      ],
      texte: "Un compte par personne, utilisable sur PC, Mac, tablette et téléphone, toujours à jour.",
    },
    minimum: [
      ["Globe", "Prérequis", "Votre nom de domaine", "Pour des adresses @votre-entreprise.fr"],
      ["User", "Abonnement", "Une licence par utilisateur", "Le niveau est choisi selon l'usage"],
      ["Wrench", "Absolute Micro", "Mise en place et migration", "Création des comptes, transfert des mails existants"],
    ],
    sansAvec: {
      sans: ["Mails perdus si le PC casse", "Logiciels à racheter à chaque nouvel ordinateur", "Agenda et contacts non partagés"],
      avec: ["Tout est dans le Cloud, rien ne se perd", "Licence liée à la personne, pas au PC", "Agendas et contacts partagés sur tous les appareils"],
    },
    nous: [
      ["ArrowRightLeft", "Migration", "Transfert de vos mails existants"],
      ["Users", "Comptes", "Création, départs et arrivées"],
      ["Headset", "Assistance", "Aide au quotidien"],
    ],
  },

  {
    key: "teams",
    titre: "Teams",
    sousTitre: "Discuter, se réunir, travailler ensemble",
    couleur: "#C99A0E",
    icone: "MessagesSquare",
    topics: ["collab_teams"],
    probleme: {
      titre: "Trop de mails, pas assez d'échanges",
      texte: "Les questions rapides se perdent dans des chaînes de mails, les réunions imposent des déplacements.",
      risques: [
        ["Mails", "Des dizaines de mails internes pour une simple question"],
        ["Car", "Déplacements pour une réunion d'une heure"],
        ["FolderSearch", "Documents d'un projet éparpillés"],
      ],
    },
    carte: {
      on: ["m365", "pc1", "pc2", "teletravail", "telephone"],
      liens: ["m365-pc1", "m365-pc2", "m365-teletravail", "m365-telephone"],
      focus: ["m365"],
      legende: "Teams fait partie de Microsoft 365 : bureau, domicile ou chantier, tout le monde est relié.",
    },
    flux: {
      titre: "Comment on l'utilise",
      etapes: [
        ["MessageCircle", "Messages instantanés"],
        ["Video", "Réunions en visio"],
        ["Users", "Une équipe par service"],
        ["FolderOpen", "Fichiers partagés au même endroit"],
      ],
      texte: "Les clients et fournisseurs peuvent être invités à une réunion sans avoir de compte.",
    },
    minimum: [
      ["LayoutGrid", "Prérequis", "Un abonnement Microsoft 365", "Teams est inclus"],
      ["Headphones", "Matériel", "Un micro-casque ou une webcam", "Pour des réunions confortables"],
      ["Wrench", "Absolute Micro", "Organisation et prise en main", "Équipes, canaux et formation des utilisateurs"],
    ],
    sansAvec: {
      sans: ["Chaînes de mails interminables", "Déplacements pour chaque réunion", "Nouveaux arrivants sans historique"],
      avec: ["Réponses rapides par messagerie", "Réunions en un clic", "Tout l'historique d'un projet au même endroit"],
    },
    nous: [
      ["Settings", "Paramétrage", "Équipes et droits définis avec vous"],
      ["GraduationCap", "Formation", "Prise en main par les utilisateurs"],
      ["Headset", "Assistance", "Aide au quotidien"],
    ],
  },

  {
    key: "sharepoint",
    titre: "SharePoint & OneDrive",
    sousTitre: "Vos fichiers rangés, partagés et accessibles partout",
    couleur: "#C99A0E",
    icone: "FolderOpen",
    topics: ["collab_sharepoint", "collab_onedrive"],
    probleme: {
      titre: "Des fichiers éparpillés et fragiles",
      texte: "Clés USB, pièces jointes, dossiers sur un seul PC : on ne sait plus quelle est la bonne version.",
      risques: [
        ["Usb", "Fichiers copiés partout, versions contradictoires"],
        ["HardDrive", "Un PC volé ou en panne : documents perdus"],
        ["House", "Impossible de travailler depuis chez soi"],
      ],
    },
    carte: {
      on: ["m365", "pc1", "pc2", "teletravail", "telephone"],
      liens: ["m365-pc1", "m365-pc2", "m365-teletravail", "m365-telephone"],
      focus: ["m365"],
      legende: "Les fichiers sont dans le Cloud Microsoft et synchronisés sur chaque appareil autorisé.",
    },
    flux: {
      titre: "Qui range quoi",
      etapes: [
        ["User", "OneDrive : les documents de chacun"],
        ["Building2", "SharePoint : les dossiers de l'entreprise"],
        ["Lock", "Des droits par service"],
        ["History", "Retour à une version précédente"],
      ],
      texte: "Plusieurs personnes peuvent travailler dans le même fichier en même temps, sans copie.",
    },
    minimum: [
      ["LayoutGrid", "Prérequis", "Un abonnement Microsoft 365", "OneDrive et SharePoint sont inclus"],
      ["FolderTree", "Organisation", "Une arborescence définie avec vous", "Dossiers par service et droits d'accès"],
      ["Wrench", "Absolute Micro", "Migration des fichiers", "Depuis le serveur, le NAS ou les PC"],
    ],
    sansAvec: {
      sans: ["La bonne version introuvable", "Données perdues avec le PC", "Accès impossible hors du bureau"],
      avec: ["Une seule version, toujours à jour", "Fichiers protégés dans le Cloud", "Accès partout, selon les droits"],
    },
    nous: [
      ["FolderTree", "Organisation", "Arborescence et droits définis avec vous"],
      ["ArrowRightLeft", "Migration", "Transfert de tous vos fichiers"],
      ["DatabaseBackup", "Sauvegarde", "À compléter par une copie indépendante"],
    ],
  },

  {
    key: "sauvegardes",
    titre: "Sauvegardes locales & Cloud",
    sousTitre: "La seule assurance qui rend vos données",
    couleur: "#2E8B57",
    icone: "DatabaseBackup",
    topics: ["backup_acronis", "backup_nas", "backup_hybride", "backup_integrite", "backup_tests", "backup_crashdisk", "backup_pca_pra_pci"],
    probleme: {
      titre: "Un jour, un disque lâchera",
      texte: "Panne, vol, incendie, rançongiciel, fausse manipulation : la question n'est pas « si », mais « quand ».",
      risques: [
        ["HardDrive", "Un disque dur a une durée de vie limitée"],
        ["Lock", "Un rançongiciel chiffre aussi les disques branchés"],
        ["Flame", "Vol ou incendie : tout ce qui est au bureau disparaît"],
      ],
    },
    carte: {
      on: ["pc1", "pc2", "switch", "nas", "cloudsave", "internet"],
      liens: ["switch-pc1", "switch-pc2", "switch-nas", "nas-cloudsave"],
      focus: ["nas", "cloudsave"],
      legende: "Une copie au bureau sur le NAS (rapide), une copie à l'extérieur dans le Cloud (sûre).",
    },
    flux: {
      titre: "La règle 3-2-1",
      etapes: [
        ["Copy", "3 copies des données"],
        ["HardDrive", "Sur 2 supports différents"],
        ["CloudUpload", "Dont 1 hors des locaux"],
        ["CircleCheck", "Testées régulièrement"],
      ],
      texte: "Les copies sont automatiques chaque jour, et chiffrées avant de partir dans le Cloud.",
    },
    minimum: [
      ["HardDrive", "Matériel", "Un NAS au bureau", "Boîtier de stockage pour la copie locale"],
      ["CloudUpload", "Abonnement", "Un espace de sauvegarde Cloud", "Dimensionné selon le volume de données"],
      ["Wrench", "Absolute Micro", "Contrôle et tests", "Vérification quotidienne et tests de restauration"],
    ],
    sansAvec: {
      sans: ["Données perdues définitivement", "Activité arrêtée des jours ou des semaines", "Pression pour payer une rançon"],
      avec: ["Restauration rapide depuis le NAS", "Copie à l'abri même si le bureau est perdu", "Redémarrage sans payer de rançon"],
    },
    nous: [
      ["Settings", "Mise en place", "NAS et Cloud configurés"],
      ["Eye", "Contrôle quotidien", "Chaque sauvegarde est vérifiée"],
      ["RotateCcw", "Tests", "Restaurations d'essai régulières"],
    ],
  },
];
