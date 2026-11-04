import * as S from "../scenes/sharepoint.mjs";

export default {
  key: "sharepoint",
  titre: "SharePoint & OneDrive",
  sousTitre: "Des fichiers rangés, partagés selon les droits et accessibles partout",
  topics: ["collab_sharepoint", "collab_onedrive"],
  theme: { primary: "#0D9488", dark: "#062A27", tint: "#F0FDFA", soft: "#99F6E4" },
  slides: [
    { t: "cover", photo: "pexels-6476260.jpg" },
    {
      t: "cards", titre: "Le problème : des fichiers partout, la bonne version nulle part",
      items: [
        ["Usb", "Les copies multiples", "Le même fichier existe en cinq exemplaires, tous légèrement différents.", "pexels-7688336.jpg"],
        ["HardDrive", "Un seul PC", "Le dossier client est sur l'ordinateur de quelqu'un qui est en congés.", "pexels-4348401.jpg"],
        ["House", "Travail à distance", "Impossible d'accéder au serveur depuis la maison ou un chantier.", "pexels-4049990.jpg"],
      ],
      vanne: "Devis_final_v3_VRAIMENT-FINAL_corrigé(2).xlsx : on a tous connu ce fichier. Il est temps de lui dire adieu.",
    },
    {
      t: "explainer", titre: "Qui range quoi, qui voit quoi",
      texte: "OneDrive accueille les documents de chacun. SharePoint accueille les dossiers communs, organisés par service avec des droits précis.",
      scene: S.droits,
      tech: ["Permissions", "Les droits d'accès sont attribués par groupe : la comptabilité voit la comptabilité, la direction voit tout."],
    },
    {
      t: "explainer", titre: "Travailler à plusieurs, revenir en arrière",
      texte: "Plusieurs personnes ouvrent le même fichier en même temps. Chaque enregistrement crée une version : une erreur se rattrape en deux clics.",
      scene: S.versions,
      tech: ["Historique des versions", "SharePoint conserve les versions successives d'un document : on peut consulter ou restaurer n'importe laquelle."],
      vanne: "Marc a supprimé la colonne des prix ? Personne ne sera licencié aujourd'hui.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Prérequis", "LayoutGrid", "Microsoft 365", "OneDrive et SharePoint sont inclus", "pexels-3183150.jpg"],
        ["Organisation", "FolderTree", "Une arborescence", "Dossiers par service, définis avec vous", "pexels-6476260.jpg"],
        ["Migration", "ArrowRightLeft", "Le transfert de l'existant", "Depuis le serveur, le NAS ou les PC", "pexels-1181675.jpg"],
        ["Absolute Micro", "Wrench", "Droits et suivi", "Accès par groupe, arrivées et départs", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Fichiers éparpillés… ou SharePoint", labSans: "Fichiers éparpillés", labAvec: "SharePoint",
      sans: ["La bonne version introuvable", "Données perdues avec le PC", "Accès impossible hors du bureau"],
      avec: ["Une seule version, toujours à jour", "Historique et restauration en deux clics", "Accès partout, selon les droits de chacun"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["FolderTree", "Organisation et droits définis avec vous"], ["ArrowRightLeft", "Migration de tous vos fichiers"], ["DatabaseBackup", "Sauvegarde indépendante en complément"]],
    },
  ],
};
