import * as S from "../scenes/procedures.mjs";

export default {
  key: "procedures",
  titre: "Procédures internes",
  sousTitre: "Savoir qui fait quoi, et quoi faire quand ça arrive",
  topics: ["infra_process"],
  theme: { primary: "#3F6212", dark: "#1A2E05", tint: "#F7FEE7", soft: "#D9F99D" },
  slides: [
    { t: "cover", photo: "pexels-1181396.jpg" },
    {
      t: "cards", titre: "Sans procédure, on improvise",
      items: [
        ["UserX", "Le départ oublié", "Un ancien salarié garde l'accès à la messagerie et aux dossiers pendant des mois.", "pexels-5668858.jpg"],
        ["Siren", "La panique", "Un message de rançon s'affiche : personne ne sait qui appeler, ni quoi toucher.", "pexels-4458420.jpg"],
        ["FileQuestion", "Un seul détenteur", "Le seul qui connaît le mot de passe de la box est en vacances.", "pexels-3184360.jpg"],
      ],
      vanne: "La procédure « on verra bien » a un taux d'échec remarquablement stable : 100 %.",
    },
    {
      t: "explainer", titre: "Arrivées et départs : une liste, pas un souvenir",
      texte: "Chaque arrivée et chaque départ suit la même liste de contrôle. Rien n'est oublié, et les accès suivent exactement la présence dans l'entreprise.",
      scene: S.arriveeDepart,
      tech: ["Charte informatique", "Le document qui fixe les règles d'usage des outils de l'entreprise, signé par chaque salarié à son arrivée."],
    },
    {
      t: "explainer", titre: "Incident : les quatre réflexes",
      texte: "Un comportement étrange, un message de rançon, un clic regretté ? Ces quatre gestes, dans cet ordre, limitent les dégâts.",
      scene: S.incident,
      tech: ["Confinement", "Isoler la machine du réseau pour empêcher la propagation, sans détruire les traces utiles à l'analyse."],
      vanne: "Le réflexe « j'éteins, je rallume et je n'en parle à personne » est très humain. Il est aussi très efficace… pour le pirate.",
    },
    {
      t: "cards", titre: "Documenter, pour ne dépendre de personne",
      items: [
        ["BookOpen", "L'inventaire", "Postes, logiciels, licences, abonnements : tout est listé et à jour.", "pexels-6801648.jpg"],
        ["KeyRound", "Les accès", "Les comptes d'administration sont conservés dans un coffre-fort de mots de passe.", "pexels-4065891.jpg"],
        ["PhoneCall", "Les contacts", "Qui appeler pour la box, l'imprimante, le logiciel métier, l'informatique.", "pexels-8867482.jpg"],
      ],
      tech: ["Coffre-fort de mots de passe", "Un logiciel chiffré qui stocke les identifiants et les partage seulement avec les personnes autorisées."],
    },
    {
      t: "kit", titre: "Le minimum à mettre en place",
      items: [
        ["Liste", "ClipboardList", "Arrivées et départs", "Une liste de contrôle signée à chaque fois", "pexels-3756679.jpg"],
        ["Affichage", "Siren", "Fiche incident", "Les quatre réflexes affichés près des postes", "pexels-4458420.jpg"],
        ["Documentation", "BookOpen", "Inventaire et accès", "Tenus à jour, rangés en lieu sûr", "pexels-6476260.jpg"],
        ["Absolute Micro", "Wrench", "Rédaction et suivi", "Procédures écrites avec vous, mises à jour", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Improvisation… ou procédures", labSans: "Improvisation", labAvec: "Procédures",
      sans: ["Accès oubliés après un départ", "Panique et mauvais gestes en cas d'incident", "Tout dépend d'une seule personne"],
      avec: ["Accès créés et retirés au bon moment", "Les bons réflexes, connus de tous", "Une documentation qui survit aux vacances"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["ClipboardList", "Rédaction des procédures avec vous"], ["BookOpen", "Inventaire et documentation à jour"], ["Phone", "Un numéro à appeler en cas d'incident"]],
    },
  ],
};
