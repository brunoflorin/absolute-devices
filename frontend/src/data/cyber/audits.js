// /src/data/cyber/audits.js

export default {
  id: "audits",
  label: "Audit de sécurité",

  short: {
    vulgarise: `
Un audit de sécurité sert à faire un état des lieux complet :
sauvegardes, protections, accès, mises à jour, réseau et postes.
On identifie les faiblesses et on définit un plan d’action simple et priorisé.
    `,
    technique: `
Analyse du SI : firewall/UTM, postes, serveurs, accès, routage,
patching, antivirus/EDR, sauvegardes, M365, AD, réseau interne.
Contrôle de l’exposition Internet, cohérence et conformité des configurations.
    `
  },

  extended: {
    vulgarise: `
On passe tout en revue : serveurs, réseau, firewall, sauvegardes,
mots de passe, box opérateur, accès distants, sécurité mail,
Microsoft 365, utilisateurs, droits, procédures internes.
On fournit un rapport clair avec un plan d’action priorisé.
    `,
    technique: `
Analyse approfondie : VLAN/segmentation, AD, DHCP/DNS, UTM, inspection TLS,
politiques M365, journaux de sécurité, stratégie de sauvegarde, exposition WAN,
scans externes & internes, GPO, configuration multi-sites.
Plan d’action technique avec priorités.
    `
  },

  pricing: {
    default: {
      jour: 720,      // prix par jour
      minJours: 1,
      maxJours: 2
    },

    text: `
Tarifs (novembre 2025 – prix par jour) :
• 720 € HT / jour
• Durée habituelle : 1 à 2 jours selon complexité
Options possibles : RGPD, AD avancé, multi-sites, VLAN.
    `
  }
};
