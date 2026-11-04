import * as S from "../scenes/mots_de_passe.mjs";

export default {
  key: "mots_de_passe",
  titre: "Politique de mots de passe",
  sousTitre: "Longs, uniques, rangés dans un coffre, et doublés d'une deuxième clé",
  topics: ["infra_passwords"],
  theme: { primary: "#A21CAF", dark: "#2E0833", tint: "#FDF4FF", soft: "#F5D0FE" },
  slides: [
    { t: "cover", photo: "pexels-5926389.jpg" },
    {
      t: "explainer", titre: "La longueur bat la complexité",
      texte: "Un logiciel d'attaque essaie des milliards de combinaisons. Chaque caractère en plus multiplie le travail : une phrase de passe longue résiste bien mieux qu'un mot court bourré de symboles.",
      scene: S.longueur,
      tech: ["Phrase de passe", "Plusieurs mots sans lien entre eux, faciles à retenir pour vous, interminables à deviner pour une machine."],
      vanne: "« Azerty123 » n'est pas un mot de passe. C'est une invitation.",
    },
    {
      t: "explainer", titre: "Le vrai danger : la réutilisation",
      texte: "Quand un site se fait voler sa base de comptes, les pirates essaient le même couple adresse + mot de passe partout ailleurs. Un gestionnaire supprime ce risque.",
      scene: S.reutilisation,
      tech: ["Credential stuffing", "Tester automatiquement des identifiants volés sur d'autres sites, en pariant sur la réutilisation."],
      vanne: "Utiliser le même mot de passe partout, c'est avoir une seule clé pour la maison, la voiture et le coffre. Et la prêter au voisin.",
    },
    {
      t: "cards", titre: "Les règles de base",
      items: [
        ["Ruler", "Longs", "Au moins 12 à 14 caractères, idéalement une phrase de passe.", "pexels-1181675.jpg"],
        ["Fingerprint", "Uniques", "Un mot de passe différent pour chaque service, sans exception.", "pexels-5380642.jpg"],
        ["ShieldCheck", "Doublés", "La double authentification sur tout ce qui compte : mail, banque, logiciels.", "pexels-4065891.jpg"],
      ],
      tech: ["Gestionnaire de mots de passe", "Un coffre chiffré qui génère, retient et remplit les mots de passe. On ne retient plus qu'une phrase maître."],
    },
    {
      t: "cards", titre: "Ce qu'il faut arrêter",
      items: [
        ["StickyNote", "Le post-it sur l'écran", "Pratique pour vous, encore plus pour le visiteur."],
        ["RefreshCw", "Le changement forcé", "Il pousse vers « Motdepasse1 », « Motdepasse2 »… Mieux vaut long, unique et doublé."],
        ["Share2", "Le partage par mail", "Un mot de passe envoyé en clair reste dans les boîtes pour toujours."],
      ],
      vanne: "Le post-it sous le clavier : le premier endroit où l'on cherche. Juste avant le tiroir du bureau.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Outil", "Vault", "Un gestionnaire d'équipe", "Coffres personnels et partagés", "pexels-5380589.jpg"],
        ["Sécurité", "Smartphone", "La double authentification", "Activée sur les comptes sensibles", "pexels-4065891.jpg"],
        ["Règles", "FileText", "Une politique écrite", "Simple, applicable, connue de tous", "pexels-6476589.jpg"],
        ["Absolute Micro", "Wrench", "Mise en place", "Déploiement et accompagnement de chacun", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Mots de passe bricolés… ou politique claire", labSans: "Bricolés", labAvec: "Politique claire",
      sans: ["Courts, réutilisés, notés sur des post-it", "Une fuite ouvre tous les comptes", "Départ d'un salarié : accès oubliés"],
      avec: ["Longs et uniques, générés par le coffre", "Mot de passe volé inutilisable sans MFA", "Accès partagés retirés en un clic"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Vault", "Gestionnaire déployé pour l'équipe"], ["Smartphone", "Double authentification activée"], ["GraduationCap", "Bonnes pratiques expliquées"]],
    },
  ],
};
