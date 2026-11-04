import * as S from "../scenes/antispam.mjs";

export default {
  key: "antispam",
  titre: "Antispam & double authentification",
  sousTitre: "Trier le courrier avant qu'il n'arrive, et verrouiller les comptes",
  topics: ["cyber_antispam", "cyber_mfa"],
  theme: { primary: "#EA580C", dark: "#2A1305", tint: "#FFF7ED", soft: "#FED7AA" },
  slides: [
    { t: "cover", photo: "pexels-4065876.jpg" },
    {
      t: "explainer", titre: "La plupart des attaques commencent par un mail",
      texte: "Le pirate n'a pas besoin de forcer la porte si quelqu'un la lui ouvre. Voici les quatre indices d'un mail piégé.",
      tech: ["Hameçonnage (phishing)", "Un faux message qui imite un service connu pour voler des identifiants ou faire payer une fausse facture."],
      vanne: "Non, le prince nigérian n'a toujours pas d'héritage pour vous. Et votre banque ne vous demande jamais votre mot de passe par mail.",
      scene: S.phishing,
    },
    {
      t: "explainer", titre: "Le filtre trie le courrier avant vous",
      texte: "Chaque message est analysé dans le Cloud avant d'atteindre la boîte : expéditeur, domaine, liens et pièces jointes.",
      scene: S.tri,
      tech: ["SPF / DKIM / DMARC", "Trois contrôles qui vérifient qu'un mail vient bien du domaine qu'il prétend représenter."],
    },
    {
      t: "cards", titre: "Ce que le filtre change au quotidien",
      items: [
        ["Inbox", "Une boîte propre", "Spams et publicités sont écartés : chacun gagne plusieurs minutes par jour.", "pexels-5198239.jpg"],
        ["Link", "Des liens vérifiés", "Un lien est contrôlé au moment du clic, même s'il est devenu dangereux après la réception.", "pexels-5926389.jpg"],
        ["Banknote", "Moins d'arnaques", "Les usurpations de dirigeants et de fournisseurs sont repérées.", "pexels-4492126.jpg"],
      ],
      vanne: "Le spam, c'est comme les prospectus dans la boîte aux lettres. Sauf que certains prospectus peuvent vider votre compte.",
    },
    {
      t: "explainer", titre: "La double authentification : une deuxième serrure",
      texte: "Après le mot de passe, une validation est demandée sur le téléphone. Un mot de passe volé ne suffit plus pour entrer.",
      scene: S.mfa,
      tech: ["MFA (authentification multifacteur)", "Prouver son identité avec deux éléments : ce que l'on sait (mot de passe) et ce que l'on possède (téléphone)."],
      vanne: "Votre mot de passe « Soleil2024! » a été deviné ? Pas grave : le pirate n'a pas votre téléphone dans sa poche.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Abonnement", "Filter", "Un filtre par boîte mail", "Branché sur la messagerie existante", "pexels-4065876.jpg"],
        ["Téléphone", "Smartphone", "Une application d'authentification", "Gratuite, sur le téléphone de chaque utilisateur", "pexels-4065891.jpg"],
        ["Réglages", "Globe", "Votre domaine configuré", "Enregistrements SPF, DKIM et DMARC", "pexels-1181675.jpg"],
        ["Absolute Micro", "Wrench", "Mise en service", "Activation et accompagnement de chacun", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Sans protection… avec protection", labSans: "Messagerie nue", labAvec: "Filtre + MFA",
      sans: ["Boîtes encombrées, temps perdu", "Un clic peut suffire à se faire pirater", "Compte volé : des mails frauduleux partent en votre nom"],
      avec: ["Boîte propre, liens et pièces jointes vérifiés", "Arnaques repérées avant d'arriver", "Mot de passe volé inutilisable sans le téléphone"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Plug", "Branchement sans changer de messagerie"], ["Smartphone", "Activation avec chaque utilisateur"], ["Inbox", "Récupération d'un mail bloqué à tort"]],
    },
  ],
};
