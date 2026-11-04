import * as S from "../scenes/serveurs_ad.mjs";

export default {
  key: "serveurs_ad",
  titre: "Serveur Windows & Active Directory",
  sousTitre: "Un annuaire central pour les comptes, les droits et les règles du réseau",
  topics: ["infra_serveurs"],
  theme: { primary: "#0F4C5C", dark: "#06232B", tint: "#ECF6F8", soft: "#A5D8E0" },
  slides: [
    { t: "cover", photo: "pexels-4508751.jpg" },
    {
      t: "explainer", titre: "Un compte unique, reconnu partout",
      texte: "L'Active Directory est l'annuaire de l'entreprise : chaque utilisateur a un seul identifiant, valable sur tous les postes, les dossiers partagés et les imprimantes.",
      scene: S.annuaire,
      tech: ["Contrôleur de domaine", "Le serveur qui héberge l'annuaire et vérifie chaque connexion au réseau de l'entreprise."],
      vanne: "Le post-it collé sous le clavier avec les trois mots de passe de Julie part enfin à la retraite.",
    },
    {
      t: "explainer", titre: "Des groupes, des droits, des règles",
      texte: "On ne donne pas les droits personne par personne, mais par groupe. Les règles du réseau s'appliquent ensuite automatiquement à tous les postes.",
      scene: S.gpo,
      tech: ["GPO (stratégie de groupe)", "Un réglage défini une fois sur le serveur et appliqué automatiquement à tous les ordinateurs concernés."],
    },
    {
      t: "cards", titre: "Ce que ça change au quotidien",
      items: [
        ["UserPlus", "Arrivée express", "Le compte est créé, ajouté aux bons groupes : il retrouve ses dossiers sur n'importe quel poste.", "pexels-3756679.jpg"],
        ["UserMinus", "Un départ maîtrisé", "Un seul compte à désactiver : plus aucun accès, nulle part, immédiatement.", "pexels-5668858.jpg"],
        ["FolderLock", "Dossiers cloisonnés", "Chacun voit ce qui le concerne, et seulement ce qui le concerne.", "pexels-6476260.jpg"],
      ],
      vanne: "L'ancien stagiaire de 2019 a toujours accès au dossier « Salaires » ? Plus maintenant.",
    },
    {
      t: "cards", titre: "Un serveur, ça se protège",
      items: [
        ["DatabaseBackup", "Sauvegardé", "Le serveur concentre les données : sa sauvegarde est vérifiée et testée.", "pexels-1054397.jpg"],
        ["RefreshCw", "Mis à jour", "Les correctifs de sécurité sont appliqués régulièrement, en dehors des heures de travail.", "pexels-5380642.jpg"],
        ["Activity", "Surveillé", "Disques, mémoire, services : une anomalie déclenche une alerte chez nous.", "pexels-5380589.jpg"],
      ],
      tech: ["Onduleur", "Une batterie qui protège le serveur des coupures et des surtensions, le temps de l'arrêter proprement."],
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Matériel", "Server", "Un serveur", "Physique au bureau ou virtuel, selon le besoin", "pexels-17489160.jpg"],
        ["Licences", "KeyRound", "Windows Server", "Avec les licences d'accès utilisateurs", "pexels-1181675.jpg"],
        ["Protection", "BatteryCharging", "Onduleur et sauvegarde", "Pour ne jamais perdre l'annuaire ni les données", "pexels-2881227.jpg"],
        ["Absolute Micro", "Wrench", "Administration", "Comptes, droits, mises à jour, supervision", "pexels-8867482.jpg"],
      ],
    },
    {
      t: "duel", titre: "Réseau « chacun chez soi »… ou domaine", labSans: "Chacun chez soi", labAvec: "Active Directory",
      sans: ["Un mot de passe différent par poste", "Départ d'un salarié : accès oubliés", "Droits accordés au cas par cas"],
      avec: ["Un compte unique pour tout le réseau", "Un clic pour couper tous les accès", "Droits par groupe, règles automatiques"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Server", "Installation et migration du serveur"], ["Users", "Comptes, groupes et droits"], ["Activity", "Supervision et mises à jour"]],
    },
  ],
};
