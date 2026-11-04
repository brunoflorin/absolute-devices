import * as S from "../scenes/switchs.mjs";

export default {
  key: "switchs",
  titre: "Switchs",
  sousTitre: "L'aiguilleur du réseau : chaque information au bon endroit",
  topics: ["infra_switchs"],
  theme: { primary: "#155E75", dark: "#082F3B", tint: "#ECFEFF", soft: "#A5F3FC" },
  slides: [
    { t: "cover", photo: "pexels-2881227.jpg" },
    {
      t: "explainer", titre: "Hub ou switch : crier ou chuchoter",
      texte: "Le vieux hub répète chaque message sur tous ses ports. Le switch apprend où se trouve chaque appareil et n'envoie l'information qu'au bon destinataire.",
      scene: S.hubSwitch,
      tech: ["Adresse MAC", "L'identifiant unique de la carte réseau de chaque appareil, gravé en usine. Le switch s'en sert pour aiguiller."],
      vanne: "Le hub, c'est le collègue qui répond à tous pour dire « merci ». Le switch, c'est celui qui envoie un message privé.",
    },
    {
      t: "explainer", titre: "Table MAC et réseaux virtuels (VLAN)",
      texte: "Le switch mémorise quel appareil est branché sur quel port. Un switch administrable peut aussi découper le réseau en VLAN étanches.",
      scene: S.vlan,
      tech: ["VLAN", "Réseau local virtuel : des appareils branchés sur le même switch, mais séparés comme s'ils étaient sur des réseaux différents."],
    },
    {
      t: "levels", titre: "Trois niveaux de switch",
      niveaux: [
        { nom: "Non administrable", sous: "Niveau 2 simple", icone: "Plug",
          items: ["Branché, ça marche", "Aiguillage par adresse MAC", "Aucun réglage possible", "Petits réseaux sans enjeu"] },
        { nom: "Administrable", sous: "Niveau 2 manageable", icone: "SlidersHorizontal",
          items: ["VLAN et priorités (QoS)", "Supervision des ports", "PoE pour téléphones et bornes", "Le standard en entreprise"] },
        { nom: "Niveau 3", sous: "Switch routeur", icone: "Route", plus: "Tout le niveau 2, et en plus :",
          items: ["Routage entre VLAN", "Règles d'accès entre réseaux", "Grandes installations", "Cœur de réseau"] },
      ],
      note: "Pour une TPE, un switch administrable avec PoE couvre l'essentiel des besoins.",
    },
    {
      t: "cards", titre: "Ce qu'un bon switch apporte",
      items: [
        ["Zap", "Le PoE", "Un seul câble apporte réseau et électricité : téléphones, caméras, bornes Wi-Fi.", "pexels-2881232.jpg"],
        ["Gauge", "La priorité", "La qualité de service (QoS) fait passer la téléphonie avant le téléchargement.", "pexels-5380589.jpg"],
        ["ShieldCheck", "La séparation", "Les invités, les caméras et les postes de travail restent chacun chez soi.", "pexels-4508748.jpg"],
      ],
      vanne: "Le switch premier prix du supermarché fonctionne très bien. Jusqu'au jour où il faut savoir pourquoi plus rien ne fonctionne.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Matériel", "Network", "Un switch administrable", "Avec PoE selon les équipements", "pexels-2881227.jpg"],
        ["Câblage", "Cable", "Une baie de brassage", "Câbles repérés et rangés", "pexels-17489160.jpg"],
        ["Réglages", "SlidersHorizontal", "VLAN et priorités", "Bureaux, téléphonie, invités séparés", "pexels-1181675.jpg"],
        ["Absolute Micro", "Wrench", "Installation et suivi", "Configuration, supervision, dépannage", "pexels-1148820.jpg"],
      ],
    },
    {
      t: "duel", titre: "Switch basique… ou switch administrable", labSans: "Switch basique", labAvec: "Switch administrable",
      sans: ["Tout le monde sur le même réseau", "Pas de priorité pour la téléphonie", "Panne difficile à localiser"],
      avec: ["Réseaux séparés par usage (VLAN)", "Appels fluides grâce à la QoS", "Ports supervisés, panne repérée"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Network", "Choix et pose du switch"], ["SlidersHorizontal", "VLAN et priorités configurés"], ["Activity", "Supervision des ports"]],
    },
  ],
};
