import * as S from "../scenes/reseau_lan_wan.mjs";

export default {
  key: "reseau_lan_wan",
  titre: "LAN, WAN & mode bridge",
  sousTitre: "Comprendre ce qui se passe entre vos ordinateurs et Internet",
  topics: ["infra_reseau"],
  theme: { primary: "#92400E", dark: "#3B1A06", tint: "#FFFBEB", soft: "#FDE68A" },
  slides: [
    { t: "cover", photo: "pexels-2881229.jpg" },
    {
      t: "explainer", titre: "Votre réseau privé, Internet public",
      texte: "Au bureau, chaque appareil a une adresse privée. Vers Internet, la box traduit toutes ces adresses en une seule adresse publique : c'est le NAT.",
      scene: S.nat,
      tech: ["Adresse IP", "Le « numéro de téléphone » d'un appareil sur un réseau. 192.168.x.x est réservé aux réseaux privés."],
      vanne: "Le NAT, c'est le standard de l'entreprise : un seul numéro public, et une standardiste qui transfère au bon bureau.",
    },
    {
      t: "cards", titre: "Les mots à connaître",
      items: [
        ["House", "LAN", "Le réseau local : les PC, imprimantes et serveurs du bureau, reliés entre eux.", "pexels-4508748.jpg"],
        ["Globe", "WAN", "Le réseau étendu : Internet, auquel on accède par la box de l'opérateur.", "pexels-1148820.jpg"],
        ["ArrowLeftRight", "NAT", "La traduction entre adresses privées et adresse publique, faite par la box ou le pare-feu.", "pexels-2881232.jpg"],
      ],
      vanne: "Si quelqu'un vous dit qu'il a un problème de « WAN », ne paniquez pas : il veut juste dire qu'Internet ne marche pas.",
    },
    {
      t: "explainer", titre: "Le piège du double NAT et le mode bridge",
      texte: "Quand un pare-feu est ajouté derrière la box, les adresses sont traduites deux fois. En passant la box en mode bridge, le pare-feu reprend seul la main.",
      scene: S.bridge,
      tech: ["Mode bridge", "La box ne fait plus que le lien physique avec l'opérateur ; c'est le pare-feu qui reçoit l'adresse publique et gère le réseau."],
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Opérateur", "Router", "Une box en mode bridge", "Ou adresse publique transmise au pare-feu", "pexels-2881229.jpg"],
        ["Sécurité", "BrickWall", "Un pare-feu", "Seul responsable du NAT et des règles", "pexels-2881232.jpg"],
        ["Plan", "Network", "Un plan d'adressage", "Plages d'adresses par usage, documentées", "pexels-1181675.jpg"],
        ["Absolute Micro", "Wrench", "Paramétrage et suivi", "Démarches auprès de l'opérateur incluses", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Double NAT… ou mode bridge", labSans: "Double NAT", labAvec: "Mode bridge",
      sans: ["VPN instable, coupures inexpliquées", "Ports à ouvrir deux fois", "Diagnostic compliqué"],
      avec: ["Un seul équipement gère Internet", "VPN et accès distants fiables", "Réseau clair et documenté"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Router", "Box configurée avec l'opérateur"], ["Network", "Plan d'adressage documenté"], ["Activity", "Connexion surveillée"]],
    },
  ],
};
