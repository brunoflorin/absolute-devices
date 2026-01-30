console.log("TINA BASE JS CHARGÉ");
// /src/data/tinaBase.js

export const topics = {




// -----------------------------------------------------------------------------
// FAMILLE 1 — CYBERSÉCURITÉ
// -----------------------------------------------------------------------------

// ============================================================================
// 1 — Pare-feu WatchGuard
// ============================================================================

cyber_parefeu: {
  label: "Pare-feu WatchGuard (T115 / T125, Basic / Total Security)",

  short: {
    vulgarise: 
`Un WatchGuard, c’est le gardien qui filtre tout ce qui entre et sort de votre réseau.
Sans licence, il fait seulement le travail de base : laisser passer ce qui est autorisé et bloquer ce qui ne l’est pas.

Avec une licence, il devient un vrai système de sécurité :

Basic Security  
C’est la protection “classique”.  
Il bloque ce qui est déjà connu :  
– virus connus  
– attaques réseau classiques  
– sites dangereux  
– applications indésirables  
C’est bien, mais limité face aux nouvelles attaques.

Total Security  
C’est la protection “avancée”.  
Il analyse aussi ce qui est suspect ou inédit :  
– fichiers testés dans une sandbox  
– détection par intelligence artificielle  
– blocage automatique du phishing  
– surveillance des comportements anormaux  
– détection des machines compromises  
Basic reconnaît les menaces.  
Total repère aussi les nouvelles menaces.`,

    technique:
`Le WatchGuard est le pare-feu qui filtre tout le trafic entre Internet et votre réseau : flux, VPN, VLAN, inspection HTTPS et détection d’anomalies. Le matériel seul fait du firewall pur (routage, NAT, VLAN, VPN), sans protection avancée.

Les licences activent les modules UTM : antivirus, IPS, filtrage web, réputation, protection DNS, sandbox, analyse comportementale et DLP.

Basic Security  
Protection basée sur des signatures :  
– Gateway Antivirus  
– IPS  
– WebBlocker  
– Application Control  
– Reputation Defense  
– Anti-spam SMTP  

Le Basic bloque les menaces connues mais ne traite pas les zero-day ni les comportements suspects.

Total Security  
Protection avancée avec analyse dynamique :  
– APT Blocker (sandbox cloud)  
– IntelligentAV (IA, machine learning)  
– DNSWatch (filtrage DNS, blocage C2)  
– TDR (agent endpoint + corrélation réseau)  
– Botnet Detection  
– DLP  

Le Total bloque menaces connues, inconnues, variantes zero-day et comportements anormaux.

Usage chez Absolute Micro  
Basic pour parcs simples déjà protégés par un bon EDR.  
Total pour collectivités, comptables, médical, multi-sites, télétravail, environnements critiques.

Le choix est simple :  
Basic = signatures.  
Total = signatures + IA + sandbox + analyse comportementale.`
  },

  extended: {
    vulgarise:
`Le rôle du pare-feu WatchGuard, c’est la barrière de sécurité qui protège toute l’entreprise.
Il se place entre Internet et votre réseau, et il décide quoi laisser entrer, quoi laisser sortir, et quoi bloquer.
C’est un peu le vigile numérique de votre société.

1. À quoi ça sert, concrètement ?  
Le WatchGuard sert à :  
– empêcher les connexions dangereuses d’entrer  
– empêcher vos données de sortir où elles ne devraient pas  
– contrôler le télétravail et sécuriser les accès à distance  
– séparer les réseaux (par exemple un Wi-Fi invité et le réseau de vos serveurs)  
– surveiller ce qui est normal… et ce qui ne l’est pas  
– bloquer les menaces qui se cachent dans les pages web, les téléchargements et les pièces jointes  
Même le trafic chiffré (HTTPS) peut être contrôlé pour détecter ce qui s’y cache.  

Sans licence, le WatchGuard fait déjà son travail de pare-feu simple :  
il filtre les ports, gère les VPN, les VLAN, le routage… mais il ne voit pas vraiment les menaces.

2. Avec licence : le pare-feu devient un vrai système de sécurité  
Une licence débloque un ensemble de briques de sécurité appelées “services UTM”.  
C’est comme si, au lieu d’un simple vigile, vous aviez aussi :  
– un agent anti-virus  
– un détecteur d’intrusions  
– un système de filtrage web  
– un service qui vérifie la réputation des sites  
– un outil qui surveille les comportements suspects  
– un système capable d’analyser les fichiers dans un environnement sécurisé (sandbox)

3. Basic Security – Le niveau standard  
Le Basic Security, c’est la protection “classique”.  
Il bloque :  
– les virus connus  
– les attaques réseau classiques  
– les sites dangereux  
– certaines applications  
– les adresses web à mauvaise réputation  
Le Basic protège contre les menaces connues, mais pas contre les nouvelles techniques.

4. Total Security – Le niveau avancé  
Le Total Security ajoute toute la partie “intelligente”.  
Ce qu’il ajoute :  
– sandbox (analyse dynamique)  
– antivirus basé IA  
– protection DNS anti-phishing  
– agent endpoint (TDR)  
– surveillance comportementale  
– détection machines compromise  
– DLP  
Le Total protège aussi contre l’inconnu.

5. Différence réelle  
Basic = reconnaît ce qui existe déjà.  
Total = repère aussi ce qui n’a jamais été vu.

6. Choix Absolute Micro  
– PME classiques : Basic ok avec bon EDR  
– Collectivités, comptables, médical, multi-sites : Total  
– Télétravail : Total  
– Réseaux critiques : Total obligatoire`
    ,

    technique:
`Le rôle du WatchGuard  
Il analyse, filtre et sécurise tous les flux entre Internet et votre réseau interne.

Fonctions matérielles sans licence :  
– Firewall stateful  
– NAT / routage  
– VLAN  
– VPN (IPSec, SSL, IKEv2)  
– Haute disponibilité  

Ce que débloque une licence (UTM) :  
– détection d’intrusion  
– antivirus  
– filtrage web  
– protection DNS  
– analyse comportementale  
– sandbox APT  
– DLP  
– détection anomalies réseau

Basic Security – Technique  
Basé sur signatures :  
– Gateway Antivirus  
– IPS  
– WebBlocker  
– Application Control  
– Reputation Defense  
– Anti-spam SMTP  
Protège menaces connues uniquement.

Total Security – Technique  
Ajoute l’analyse dynamique + IA :  
– APT Blocker (sandbox cloud)  
– IntelligentAV (IA/ML)  
– DNSWatch  
– TDR (corrélation réseau + endpoint)  
– Botnet Detection  
– DLP  
Protège contre variantes inconnues et comportements anormaux.

Différence réelle  
Basic = menaces connues  
Total = menaces connues + inconnues

Pratique Absolute Micro  
– PME simples : Basic  
– Exposés / sensibles : Total  
– Télétravail / RDP : Total  
– Données critiques : Total obligatoire`
  },

  pricing: {
    default: { jour: 890 },
    text:
`Tarifs matériels (hors installation) :  
• T125 — 3 ans Total Security : 2 998,38 € HT  
• T125 — 3 ans Basic Security : 2 461,32 € HT  
• T115W — 3 ans Basic Security : 1 887,01 € HT  
• T115W — 3 ans Total Security : 2 310,80 € HT  

Versions 1 an / 5 ans disponibles.

Installation : 890 € HT / jour (2 à 3 j).  
Administration contrat maintenance : 40 €/mois.  
VPN : selon nombre d’utilisateurs.`
  },

  images: []
},



  
// ============================================================================
// 2 — EDR / XDR / MDR
// ============================================================================
cyber_edr: {
  label: "EDR / XDR / MDR et antivirus classique",

  short: {
    vulgarise:
`Antivirus  
Arrête uniquement ce qu’il connaît déjà.

EDR  
Surveille le comportement de la machine et bloque ce qui paraît dangereux, même si ce n’est pas connu.

XDR  
Recoupe ce qui se passe partout dans l’entreprise (postes, emails, cloud) pour repérer les attaques plus complexes.

MDR  
Une équipe de spécialistes surveille et intervient 24h/24 à votre place.`,

    technique:
`Antivirus  
Détection par signatures. Arrête uniquement les menaces connues. Pas d’analyse comportementale. Peu efficace sur les attaques modernes.

EDR  
Analyse comportementale sur les postes. Détecte les actions suspectes, bloque automatiquement, isole le poste, remonte les incidents.

XDR  
Corrélation multi-couches (postes, réseau, cloud, identités). Détecte des attaques complexes grâce au croisement d’informations.

MDR  
Service 24/7 avec des experts humains qui surveillent, analysent et réagissent aux incidents. EDR/XDR + équipe SOC.`
  },

  extended: {
    vulgarise:
`Antivirus classique  
C’est comme une liste de criminels connus.  
S’il en reconnaît un, il bloque.  
S’il ne connaît pas, il laisse passer.  
Simple, mais dépassé seul.

EDR  
C’est un agent de sécurité sur chaque ordinateur.  
Même si l’attaquant n’est pas connu, l’EDR repère ce qu’il fait :  
– comportements étranges  
– fichiers qui se chiffrent  
– scripts suspects  
Il peut isoler la machine automatiquement.

XDR  
C’est la même chose que l’EDR, mais avec plus de visibilité.  
Il recoupe ce qui se passe :  
– sur les postes  
– dans les emails  
– dans le cloud  
– dans le réseau  
Il peut reconstruire une attaque entière et comprendre son origine.

MDR  
Là, vous avez en plus une équipe qui surveille tout ça pour vous, jour et nuit.  
Ils reçoivent les alertes, vérifient ce qui est grave ou non, et interviennent en cas de problème.  
C’est un centre de sécurité externalisé.`,

    technique:
`Antivirus classique  
Fonctionne par signatures. Compare les fichiers à une base de virus connus.  
Arrête : virus connus, trojans basiques, vers classiques.  
Limites : aucune analyse comportementale, aucune détection avancée, pas de réaction automatisée, inefficace sur les zero-day, dépend entièrement des mises à jour.

EDR (Endpoint Detection & Response)  
Agent installé sur chaque poste. Analyse comportementale + visibilité en temps réel.  
Fonctions techniques :  
– détection d’exécutions anormales  
– analyse des processus et services  
– surveillance PowerShell, scripts, mouvements latéraux  
– isolement réseau automatique  
– arrêt de processus suspects  
– remontées d’alertes centralisées  
Arrête les attaques modernes (ransomware comportemental, exploitation de vulnérabilité, scripts, living-off-the-land).

XDR (Extended Detection & Response)  
Même logique que l’EDR mais corrèle les données avec d’autres couches : réseau, cloud, identités, messagerie, logs.  
Fonctions techniques :  
– corrélation multi-sources  
– vision complète attaque / propagation  
– détection de chaînes d’attaque complexes  
– réponse automatisée sur plusieurs surfaces (postes, comptes, cloud)  
– investigation centralisée  
Très efficace pour repérer les attaques distribuées ou furtives.

MDR (Managed Detection & Response)  
Service externalisé où une équipe de cybersécurité surveille les alertes à ta place.  
Fonctions :  
– supervision humaine 24/7  
– tri des alertes, qualification  
– réponse active en cas d’incident  
– isolation poste  
– assistance et remédiation  
Le MDR exploite l’EDR/XDR, mais ajoute l’humain pour analyser, décider, intervenir.`
  },

  // Tu pourras adapter ces tarifs ensuite, je laisse le tarif actuel intact
  pricing: {
    default: { mois: 8.42 },
    text:
`Tarifs Acronis EDR :  
• 8,42 € HT / mois / poste  
• 101,04 € HT / an / poste  

Antivirus Trend Micro : 54,95 € HT / an / poste  

Options :  
• XDR : sur devis  
• MDR SOC 24/7 : sur devis  

Installation incluse : agents + politiques + anti-ransomware.`
  },

  images: []
},



// ============================================================================
// 3 — Antispam Vade 365
// ============================================================================
cyber_antispam: {
  label: "Antispam Vade 365 (spam / graymail / virus)",

  short: {
    vulgarise:
`Vade 365 sert à filtrer ce qui arrive dans la boîte mail avant que l’utilisateur ne le voie.
Il bloque :
– les spams (publicités indésirables)
– les graymails (newsletters, notifications)
– les mails infectés
– les tentatives de phishing

Le spam est mis en quarantaine.
Le graymail est rangé automatiquement.
Les virus et phishing sont bloqués.`,

    technique:
`Vade 365 analyse les emails via IA et réputation :
– classification spam, graymail, clean
– détection phishing et spear-phishing
– inspection des liens et pièces jointes
– sandbox pour fichiers suspects
– réputation domaine et IP
– filtrage des malwares connus et variants

Les spams sont isolés, les graymails classés, les attaques bloquées avant livraison.`
  },

  extended: {
    vulgarise:
`Vade 365 agit comme un filtre avancé placé avant la boîte mail.
Il analyse chaque message avant qu’il n’arrive chez vous.

Voici ce qu’il trie :

1. Spam  
Ce sont les mails publicitaires non demandés : promotions, fausses offres, contacts douteux.  
Vade les met en quarantaine automatiquement.

2. Graymail  
Ce sont les newsletters, notifications diverses, résumés de réseaux sociaux ou d’achats en ligne.  
Ce n’est pas dangereux, mais c’est envahissant.  
Vade les classe automatiquement dans un dossier dédié pour ne pas encombrer la boîte principale.

3. Virus et malwares  
Vade ouvre les pièces jointes dans un environnement sécurisé pour vérifier si elles sont dangereuses.  
Si une pièce jointe tente d’exécuter un script ou un code suspect, elle est bloquée immédiatement.

4. Phishing  
C’est la menace numéro un.  
Vade détecte :
– les faux mails de livraison
– les fausses factures
– les pages login imitées
– les usurpations d'identité interne  
Le lien est bloqué avant même que l’utilisateur ne clique.`,

    technique:
`Vade 365 utilise un moteur IA basé sur du machine learning et sur la réputation globale de l’expéditeur.

Classification multi-couches :
– analyse de structure MIME
– scoring bayésien
– modèle d’apprentissage sur graphes de communication
– reconnaissance de patrons comportementaux
– vérification SPF/DKIM/DMARC  
Les résultats sont classés en spam, graymail, clean.

Détection phishing :
– analyse heuristique des URLs
– détection de pages de connexion falsifiées
– scoring de similarité (look-alike domains)
– sandbox URL
– blocage des messages usurpant des noms internes
– détection spear-phishing ciblé

Anti-malware :
– signature antivirus
– analyse comportementale
– sandboxing pour pièces jointes
– détection de scripts malveillants (VBA, JS, PowerShell encapsulé)

Graymail management :
– détection newsletters
– workflow automatisé
– classement auto, pas de quarantaine
– apprentissage selon préférences utilisateurs  
Réduit le bruit sans bloquer la communication.

Protection temps réel  
Les liens sont ré-analysés au moment où l'utilisateur clique (time-of-click protection).  
Les menaces découvertes après livraison sont annulées en temps réel.`
  },

  pricing: {
    default: {},
    text:
`Tarifs Vade 365 :
• 38,50 € HT / an / adresse
• 99 € HT / 3 ans / adresse

Installation : sur devis (selon domaine/MX).`
  },

  images: []
},

// ============================================================================
// 4 — MFA + Keeper (coffre-fort mots de passe)
// ============================================================================
cyber_mfa: {
  label: "MFA, anti-phishing, anti-ransomware",

  short: {
    vulgarise:
`MFA  
C’est une double vérification pour se connecter. Même si un mot de passe est volé, l’accès reste bloqué.

Anti-phishing  
Ça filtre les mails piégés et empêche les utilisateurs de cliquer sur de faux liens ou de remplir de fausses pages de connexion.

Anti-ransomware  
Ça surveille ce qui se passe sur la machine. Si un fichier commence à chiffrer tout le disque, le système bloque immédiatement.`,

    technique:
`MFA  
Authentification à deux facteurs.  
Empêche l’accès même en cas de compromission du mot de passe. Vérification via TOTP, push ou clé physique.

Anti-phishing  
Analyse des URL, vérification de domaine, détection de spoofing, protection DNS, filtration avant clic.  
Blocage des pages frauduleuses.

Anti-ransomware  
Détection comportementale, surveillance des processus, blocage du chiffrement massif, isolement du poste, restauration rapide.`
  },

  extended: {
    vulgarise:
`MFA  
Le MFA ajoute une seconde étape pour se connecter.  
Même si quelqu’un vole votre mot de passe, il ne pourra pas entrer sans votre téléphone, votre code ou votre validation.  
C’est comme avoir une clé + un badge.  
Un pirate peut deviner un mot de passe, mais il ne peut pas être physiquement à votre place.

Anti-phishing  
Le phishing est aujourd’hui le principal moyen pour attaquer une entreprise.  
Les solutions anti-phishing vérifient :  
– l’expéditeur réel,  
– les liens cachés dans les mails,  
– les pages de connexion frauduleuses,  
– les domaines qui tentent d’usurper une entreprise ou un service.  
Quand vous cliquez, le système analyse immédiatement si le site est dangereux.  
S’il y a le moindre doute, la page est bloquée avant qu’un mot de passe ne soit volé.

Anti-ransomware  
Un ransomware essaie de chiffrer vos fichiers pour réclamer une rançon.  
L’anti-ransomware regarde ce que fait l’ordinateur en temps réel :  
– un programme qui chiffre des fichiers trop vite  
– un script suspect  
– une action anormale  
À la première anomalie, la machine est bloquée, le processus stoppé, et les fichiers restaurés s’il y a eu un début de chiffrement.`,

    technique:
`MFA  
Utilisation de facteurs multiples :  
– quelque chose que l’utilisateur sait (mot de passe)  
– quelque chose qu’il possède (smartphone, clé FIDO2, token)  
– quelque chose qu’il est (biométrie)  
Réduit drastiquement :  
– les attaques par force brute  
– les compromissions via phishing simple  
– les connexions non autorisées sur M365, VPN, serveurs, CRM  
Protocoles : TOTP, HOTP, push notification, WebAuthn.  
Intégration : Azure AD, VPN, accès cloud, accès locaux.

Anti-phishing  
Technique basée sur :  
– analyse syntaxique des URL  
– inspection des liens derrière les redirections  
– détection visuelle de pages de connexion falsifiées  
– analyse du domaine (WHOIS, âge du domaine, réputation)  
– protection DNS (bloque C2, serveurs frauduleux)  
– détection d’usurpation (SPF, DKIM, DMARC)  
Actions :  
– blocage avant clic  
– blocage au moment du clic  
– mise en quarantaine des emails suspects  
– alertes administrateur  
– détection comportementale sur les réponses de l’utilisateur

Anti-ransomware  
Techniques utilisées :  
– surveillance comportementale temps réel  
– détection de chiffrement anormal  
– analyse bas-niveau des appels systèmes  
– détection PowerShell malveillant  
– blocage des variations de ransomwares (zero-day)  
– isolement réseau du poste atteint  
– rollback via snapshots ou journaling  
Indispensable face aux ransomwares sans signature, aux attaques “living off the land” et aux exécutables polymorphes.`
  },

  pricing: {
    default: {},
    text:
`MFA / anti-phishing / anti-ransomware :  
Tarification selon solutions (Microsoft, Keeper, Acronis, Vade...).  
Installation sur devis.`
  },

  images: []
},




// ============================================================================
// 5 — Audits de sécurité
// ============================================================================
cyber_audits: {
  label: "Audits de sécurité",

  short: {
    vulgarise:
`Un audit de sécurité, c’est un état des lieux complet de votre informatique.
On regarde où ça tient, où ça casse, et ce qui doit être corrigé pour éviter une attaque.
On vérifie :
– les mots de passe
– les accès
– les PC, les serveurs, le réseau
– les sauvegardes
– la protection contre phishing et ransomware
– les failles possibles

À la fin, vous avez une liste claire de ce qu’il faut corriger, classée par priorité.`,

    technique:
`Analyse complète de l’infrastructure.

Points contrôlés :
– configurations AD/M365
– MFA, politiques d’accès
– failles réseau (scan, ports, VLAN, firewall)
– durcissement Windows
– sauvegardes, PRA
– vulnérabilités systèmes
– protection mail et endpoints
– exposition externe (DNS, IP publiques)

Livrable : Rapport avec risques, criticité et plan d’actions.`
  },

  extended: {
    vulgarise:
`Un audit de sécurité consiste à examiner votre informatique comme le ferait un pirate, mais de manière encadrée et constructive.
On analyse tout ce qui pourrait permettre une intrusion ou une panne critique :

– mots de passe trop simples
– absence de double authentification
– PC non mis à jour
– routes ouvertes vers Internet
– mauvaises configurations du cloud
– sauvegardes insuffisantes
– messagerie vulnérable au phishing
– logiciels obsolètes
– pare-feu mal configuré
– droits d’accès trop larges

L’objectif est de comprendre les risques réels et d’éviter l’effet “fausse sécurité”.

À la fin, vous recevez un rapport clair :
– les points sensibles
– la probabilité d’attaque
– l’impact possible
– ce qu’il faut corriger
– l’ordre de priorité
– un plan d’action

Ça montre exactement où renforcer l’entreprise.`,

    technique:
`Audit complet de cybersécurité couvrant :

1. Analyse des accès et identités
– MFA
– durcissement Azure AD / AD local
– comptes dormants
– délégations
– droits excessifs
– politiques de mots de passe

2. Protection endpoint
– état des patchs
– analyse EDR/AV
– durcissement Windows (CIS baseline)
– périphériques USB
– Safe Links / Safe Attachments

3. Réseau / firewall
– mapping réseau
– segmentation VLAN
– inspections IDS/IPS
– règles firewall
– ports ouverts
– tests d’exposition externe
– vérification VPN, RDP

4. Cloud / M365
– configuration Exchange Online
– politiques anti-phishing
– journaux de connexion
– partage externe
– configuration OneDrive/SharePoint

5. Sauvegardes / PRA
– vérification intégrité
– versioning
– restauration testée
– protection contre ransomware
– isolation de la sauvegarde
– hygiène 3-2-1

6. Messagerie
– DMARC/SPF/DKIM
– configuration antispam
– défenses anti-usurpation
– gestion des graymails
– sandbox pièces jointes

7. Système et serveurs
– versions OS
– analyse vulnérabilités
– protocoles obsolètes
– chiffrement disque
– GPO et durcissement

Rapport final : classification risque (CVSS), criticité, recommandations priorisées, plan d’actions.`
  },

  pricing: {
    default: { jour: 890 },
    text: "Audit : 890 €/jour — 1 à 3 jours selon taille."
  },

  images: []
},





// ============================================================================
// 6 — Pentests
// ============================================================================
cyber_pentests: {
  label: "Pentests (tests d’intrusion)",

  short: {
    vulgarise:
`Un pentest, c’est un test d’intrusion.
On simule une attaque réelle pour voir si quelqu’un pourrait rentrer dans votre système ou accéder à vos données.
On regarde :
– ce qui est accessible depuis Internet
– ce qui peut être exploité sur le réseau interne
– si un pirate peut prendre le contrôle d’une machine
– si une faille permet d’atteindre des données sensibles

À la fin, vous savez exactement si c’est “piratable” ou non, et comment corriger.`,

    technique:
`Un pentest consiste à évaluer la sécurité via une simulation d’attaque contrôlée.

Techniquement :
– reconnaissance (OSINT, scan, fingerprinting)
– exploitation de vulnérabilités
– élévation de privilèges
– mouvements latéraux
– exfiltration testée
– rapport CVSS + plan de remédiation

Pentest internes, externes, applicatifs, Wi-Fi, AD, M365 selon périmètre.`
  },

  extended: {
    vulgarise:
`Un pentest, c’est un comportement de “cambrioleur professionnel”, à la demande du dirigeant, pour tester la résistance de son entreprise.

On ne regarde plus “si c’est bien configuré”.
On regarde “est-ce qu’on peut entrer, et jusqu’où ?”.

L’équipe qui fait le pentest :
– cherche vos failles visibles sur Internet
– analyse vos applications, vos accès, vos serveurs
– tente d'exploiter les mauvaises configurations
– essaie de contourner vos protections
– essaye de devenir administrateur à partir d’un simple point faible

Le but n’est pas de casser, mais de montrer ce qu’un vrai attaquant ferait.

Types de tests :
– depuis Internet (pentest externe)
– depuis votre réseau interne (posture interne)
– sur une application web
– sur votre Wi-Fi
– sur Active Directory ou M365
– sur vos API ou portails clients

À la fin, vous recevez un rapport clair :
– failles trouvées
– comment elles ont été exploitées
– ce à quoi un pirate aurait eu accès
– la gravité réelle
– les corrections à faire en priorité

C’est la manière la plus fiable de savoir si l’entreprise peut être attaquée.`,

    technique:
`Pentest réalisé selon les méthodes :

– MITRE ATT&CK
– OWASP (top 10 applicatif)
– PTES
– OSSTMM
– NIST SP 800-115

Étapes techniques :
1. Reconnaissance
– OSINT
– collecte d’informations
– scan de ports (Nmap)
– fingerprinting services et OS
– cartographie applicative

2. Analyse de vulnérabilités
– scan vulnérabilités (Nessus, OpenVAS)
– recherche failles réseau, web, cloud
– analyse config (GPO, AD, M365)

3. Exploitation
– exploitation CVE
– bypass authentification
– injection SQL / XSS / LFI / RCE
– attaques Kerberoasting / Pass-the-Hash
– élévation de privilèges (local & domain)

4. Mouvements latéraux
– propagation réseau
– pivoting
– credential harvesting
– enumeration AD

5. Exfiltration simulée
– extraction contrôlée de données
– validation du filtrage sortant

6. Rapport détaillé
– criticité CVSS
– preuves d’exploitation
– impacts business
– remédiations techniques classées par priorité`
  },

  pricing: {
    default: { jour: 890 },
    text: "1 à 5 jours selon périmètre — 890 €/jour."
  },

  images: []
},





// ============================================================================
// 7 — Monitoring Absolute Micro
// ============================================================================
cyber_monitoring: {
  label: "Monitoring (Atera, Acronis, Trend Micro)",

  short: {
    vulgarise:
`Le monitoring, c’est un système qui surveille vos ordinateurs, vos serveurs et vos sauvegardes en continu.

- Atera surveille l’état des machines (pannes, mises à jour, alertes).
- Acronis surveille l’antivirus, l’EDR et les sauvegardes.
- Trend Micro surveille les menaces et les comportements suspects.

Si quelque chose ne va pas, on est alerté automatiquement.
Ça évite les pannes surprises et les attaques qui passent inaperçues.`,

    technique:
`Monitoring 24/7 via trois couches :

- Atera : RMM (inventaire, patching, scripts, alertes hardware/software).
- Acronis : télémétrie EDR, état des agents, détection menaces, statut des sauvegardes cloud.
- Trend Micro : détection en temps réel, surveillance comportementale, alertes de sécurité.

Corrélation des alertes et intervention dès anomalie.`
  },

  extended: {
    vulgarise:
`Le monitoring informatique sert à repérer les problèmes avant qu’ils deviennent des pannes ou des attaques.
Voici ce que surveillent les outils :

Atera
– état des PC et serveurs
– température, disques, mémoire
– mises à jour manquantes
– logiciels installés
– services arrêtés
– matériel en panne

En cas d’anomalie, une alerte remonte immédiatement.

Acronis (Backup + EDR)
– sauvegardes réussies ou échouées
– menaces détectées par l’EDR
– comportements suspects bloqués
– modifications anormales sur les postes
– état de l’agent sur chaque machine

Trend Micro
– virus détectés
– ransomwares bloqués
– sites malveillants
– scripts ou programmes suspects
– communication vers serveurs criminels

Grâce au monitoring, on évite :
– les pannes surprises
– les sauvegardes silencieusement cassées
– les attaques qui passent sans bruit
– les machines non mises à jour
– la dégradation progressive des systèmes

C’est ce qui permet d’agir avant que ça casse.`,

    technique:
`Surveillance en continu à trois niveaux :

1. Atera – RMM (Remote Monitoring & Management)
– inventaire matériel/logiciel
– collecteurs SNMP
– patch management Windows et logiciels tiers
– scripts automatisés (remédiation)
– alertes : CPU, RAM, disque, services, événements, réseau
– audit de configuration
– supervision agents en temps réel
– journalisation centralisée

2. Acronis – EDR + Backup

EDR :
– détection comportementale
– télémétrie processus
– surveillance scripts (PowerShell, WMI)
– isolement automatique
– modules anti-ransomware
– analyse cloud

Backup :
– statut des sauvegardes (succès/échec)
– intégrité blocs sauvegardés
– versioning
– alertes latence / corruption
– vérification PRA automatisée

3. Trend Micro
– moteur antimalware multi-couches
– surveillance comportementale runtime
– machine learning
– filtrage URL malveillantes
– détection exploit kits
– alerte en cas de communication C2
– intégration logs SIEM ou console centrale

L’ensemble permet :
– une corrélation multi-sources (RMM + EDR + AV)
– un suivi post-exploitation
– une remédiation proactive
– une capacité de réponse accélérée (isolations, rollback, patching automatique)`
  },

  pricing: {
    default: {},
    text: "Inclus dans le contrat de maintenance Absolute Micro."
  },

  images: []
},




// ============================================================================
// 8 — Sensibilisation utilisateurs
// ============================================================================
cyber_sensibilisation: {
  label: "Sensibilisation des utilisateurs",

  short: {
    vulgarise:
`La sensibilisation, c’est apprendre aux utilisateurs à éviter les pièges :

– reconnaître un mail suspect  
– ne pas cliquer partout  
– utiliser des mots de passe solides  
– activer le MFA  
– ne pas désactiver l’antivirus  
– faire attention aux téléchargements et aux clés USB  

C’est du bon sens encadré.
Si les utilisateurs sont formés, une grande partie des cyberattaques échoue.`,

    technique:
`Sensibilisation axée sur :

– détection phishing et spear-phishing  
– gestion des mots de passe (MFA, vault)  
– hygiène numérique (mise à jour, sauvegarde locale, verrouillage session)  
– sécurité cloud M365  
– bonnes pratiques réseau et mobilité  
– politiques internes (accès, privilèges, confidentialité)  

Objectif : diminuer les risques liés au facteur humain.`
  },

  extended: {
    vulgarise:
`La majorité des cyberattaques réussissent non pas parce que les systèmes sont vulnérables, mais parce que quelqu’un a cliqué au mauvais endroit ou répondu au mauvais message.

La sensibilisation sert à donner aux utilisateurs les bons réflexes :

1. Phishing  
Savoir reconnaître un faux mail :  
– fausse facture  
– fausse livraison  
– faux message interne  
– fausse page de connexion  

2. Mots de passe  
– ne pas réutiliser les mêmes codes  
– utiliser un gestionnaire  
– activer le MFA  

3. Hygiène quotidienne  
– verrouiller son poste  
– ne pas installer n’importe quoi  
– refuser les clés USB inconnues  
– ne pas transmettre ses codes  

4. Cloud et mobilité  
– vérifier les accès M365  
– éviter les Wi-Fi gratuits  
– ne pas transférer au personnel  

5. Bon sens  
Si quelque chose paraît bizarre : on ne clique pas, on demande.

À chaque formation, on réduit les risques.
Un utilisateur éduqué devient un vrai rempart pour l’entreprise.`,

    technique:
`Programme complet de sensibilisation :

1. Phishing / Ingénierie sociale  
– analyse headers  
– détection domaines usurpés  
– reconnaissance phishing ciblé  
– exercices de phishing simulé  
– gestion erreurs + alertes  

2. Mots de passe / MFA  
– politiques NIST / ANSSI  
– MFA obligatoire  
– gestionnaires de mots de passe  
– verrouillage sessions  

3. Hygiène système  
– mise à jour  
– règles installation logicielle  
– avertissement apps non signées  
– macros non approuvées interdites  
– gestion stockage local/cloud  

4. Utilisation sécurisée d’Internet  
– analyse URL  
– détection pages frauduleuses  
– interdiction téléchargement non vérifié  
– repérage scripts malveillants  

5. Sécurité des données  
– règles de confidentialité  
– classification interne  
– RGPD  
– gestion partages externes  

6. Mobilité / télétravail  
– VPN obligatoire  
– réseau personnel sécurisé  
– interdiction Wi-Fi publics  
– gestion sécurité smartphone  

7. Procédures internes  
– remontée incidents  
– application policies IT  
– réaction en cas de suspicion (débrancher, isoler, alerter)

Chaque session réduit le risque humain, première cause de compromission.`
  },

  pricing: {
    default: {},
    text: "Sur devis — dépend du nombre d’utilisateurs et du format choisi (ateliers, e-learning, phishing simulé)."
  },

  images: []
},





// ============================================================================
// 9 — Comprendre les cyberattaques
// ============================================================================
cyber_attaques: {
  label: "Cyberattaques : pourquoi, comment, qui ?",

  short: {
    vulgarise:
`Les cyberattaques existent pour trois raisons :
– voler de l’argent  
– voler des données  
– bloquer une activité  

Elles utilisent principalement :
– mails piégés  
– failles dans les systèmes  
– mots de passe piratés  
– logiciels non mis à jour  

Les attaquants peuvent être :
– cybercriminels  
– groupes organisés  
– personnes mal intentionnées  
– erreurs internes  

Personne n’est trop petit pour être ciblé.`,

    technique:
`Objectifs : gain financier, espionnage, sabotage, collecte données.  
Méthodes : phishing, ransomware, vulnérabilités, credential stuffing, exploitation services exposés, mouvements latéraux.  
Acteurs : cybercriminels, APT, hacktivistes, script kiddies, menaces internes, prestataires compromis.  
Propagation : mail, RDP, VPN mal configuré, accès cloud exposé, zero-day.`
  },

  extended: {
    vulgarise:
`Pourquoi il y a des cyberattaques ?
Pour l’argent, d’abord. Les pirates veulent soit vous bloquer pour demander une rançon, soit voler des données revendables (contacts, identités, documents, accès).  
Certaines attaques servent aussi à nuire, espionner ou faire pression.

Comment attaquent-ils ?
La majorité des attaques commencent par :
– un mail piégé  
– un lien qui semble normal  
– une pièce jointe infectée  
– un mot de passe trop simple  
– un logiciel non mis à jour  
– un accès mal protégé (VPN, RDP, Wi-Fi)  

Une fois dans la machine, l’attaquant tente de se déplacer dans l’entreprise, d’accéder aux serveurs, puis aux sauvegardes.

Qui attaque ?
– groupes organisés (ransomware)  
– hackers isolés cherchant des cibles faciles  
– personnes souhaitant nuire  
– groupes politiques / activistes  
– salariés négligents qui ouvrent la porte sans le vouloir  

Peu importe la taille : les petites entreprises sont ciblées car plus faciles à atteindre.`,

    technique:
`Motivations :
– financières (extorsion, fraude, revente données)  
– renseignement (espionnage industriel / APT)  
– sabotage (politique / concurrentiel)  
– compromission chaîne d’approvisionnement  
– prise de contrôle infrastructures critiques  

Technique d’entrée :
– phishing ciblé (BEC, spear-phishing)  
– exploitation vulnérabilités connues (CVE)  
– brute-force / credential stuffing  
– exploitation RDP exposés  
– backdoors cloud / API mal configurées  
– zero-day  
– chaînes d’attaque multi-étapes (MITRE ATT&CK)  

Post-exploitation :
– mouvements latéraux (SMB, WMI, PSRemoting)  
– élévation privilèges (Kerberoasting, Pass-the-Hash)  
– effacement traces (log tampering)  
– exfiltration (DNS tunneling, HTTP POST, C2)  
– chiffrement (ransomware)  
– destruction systèmes ou backup wiping  

Typologie des attaquants :
– APT étatiques  
– cybercriminels organisés (RaaS)  
– hacktivistes (DDoS, defacement)  
– insiders malveillants  
– prestataires compromis  
– bots et scans automatisés`
  },

  pricing: {
    default: {},
    text: "Bloc informatif — pas de tarification."
  },

  images: []
},

// -----------------------------------------------------------------------------
// FAMILLE 2 — SAUVEGARDE, RESTAURATION & CONTINUITÉ
// -----------------------------------------------------------------------------

// ============================================================================
// 1 — Acronis Backup (Cloud / Image disque / Anti-ransomware)
// ============================================================================
backup_acronis: {
  label: "Acronis Backup — Sauvegarde Cloud / Image disque",

  short: {
    vulgarise:
      "Acronis protège vos fichiers, vos PC et vos serveurs dans un espace sécurisé.\n\n" +
      "• Sauvegarde automatique\n" +
      "• Protection anti-ransomware\n" +
      "• Restauration rapide",
    technique:
      "Acronis Cyber Protect : sauvegardes cloud + image disque.\n\n" +
      "• Backups complets + incrémentaux\n" +
      "• Restauration granulaire / bare metal\n" +
      "• Anti-ransomware (rollback)\n" +
      "• Stockage France/Europe"
  },

  extended: {
    vulgarise:
      "Acronis protège contre les pannes, erreurs humaines et ransomwares. Même si un PC est perdu, volé ou crypté, tout peut être restauré.\n\n" +
      "• Sauvegarde continue PC/serveurs\n" +
      "• Versions précédentes disponibles\n" +
      "• Coffre-fort cloud sécurisé\n" +
      "• Restoration complète en quelques minutes",
    technique:
      "Plateforme complète de sauvegardes professionnelles.\n\n" +
      "• Incrémental éternel + compression + déduplication\n" +
      "• Protection active contre ransomware (analyse comportementale)\n" +
      "• Restauration bare-metal (image disque)\n" +
      "• Support Windows, Linux, ESXi, Hyper-V\n" +
      "• Monitoring automatisé + alertes"
  },

  pricing: {
    default: { mois: 8.42 },
    text:
      "Tarifs Acronis Backup :\n" +
      "• 8,42 € HT / mois / poste\n" +
      "• 101,04 € HT / an / poste\n\n" +
      "Serveur Windows : sur devis (selon volume disque)\n" +
      "Stockage cloud facturé selon volume utilisé.\n\n" +
      "Prestation Absolute Micro incluse :\n" +
      "• installation agent\n" +
      "• stratégie de sauvegarde\n" +
      "• test de restauration\n"
  },

  images: [
    "/assets/schemas/acronis-backup-flow.png",
    "/assets/schemas/acronis-architecture.png"
  ]
},

// ============================================================================
// 2 — NAS (Sauvegardes locales + réplication + snapshots immuables)
// ============================================================================
backup_nas: {
  label: "NAS — Sauvegardes locales + Cloud + Hybride",

  short: {
    vulgarise:
      "Un NAS est un coffre-fort dans l’entreprise qui sauvegarde automatiquement tous vos fichiers.\n\n" +
      "• Sauvegarde rapide\n" +
      "• Versions précédentes\n" +
      "• Copie externe (cloud / 2e NAS)",
    technique:
      "NAS dédié à la sauvegarde avec protection anti-ransomware.\n\n" +
      "• RAID (1/5/6/10)\n" +
      "• Snapshots immuables Btrfs/ZFS\n" +
      "• Réplication NAS-to-NAS chiffrée\n" +
      "• Sauvegarde PC/serveurs/VM"
  },

  extended: {
    vulgarise:
      "Même en cas de crash disque, vol, incendie ou ransomware, vos fichiers restent protégés.\n\n" +
      "• Sauvegarde continue\n" +
      "• Restauration ultra rapide\n" +
      "• Copie externe automatique\n" +
      "• Protection contre ransomware",
    technique:
      "Architecture de sauvegarde hybride.\n\n" +
      "• HyperBackup / ActiveBackup\n" +
      "• Snapshots immuables (anti-ransomware)\n" +
      "• Réplication incrémentale NAS-to-NAS\n" +
      "• Monitoring Acronis/Synology\n" +
      "• Journaux et alertes automatiques"
  },

  pricing: {
    default: { jour: 450 },
    text:
      "Tarification :\n" +
      "• Dépend du modèle NAS\n" +
      "• Nombre de postes/serveurs sauvegardés\n" +
      "• Volume cloud ou NAS secondaire\n\n" +
      "Prestation Absolute Micro (450 €/jour) :\n" +
      "• stratégie de sauvegarde\n" +
      "• configuration complète\n" +
      "• test de restauration\n" +
      "• documentation"
  },

  images: [
    "/assets/schemas/nas-hybride.png",
    "/assets/schemas/nas-backup-cycle.png"
  ]
},

// ============================================================================
// 3 — Sauvegarde Hybride (NAS + Cloud simultané)
// ============================================================================
backup_hybride: {
  label: "Sauvegardes hybrides (NAS + Cloud)",

  short: {
    vulgarise:
      "Le système hybride combine vitesse du local + sécurité du cloud.\n\n" +
      "• Double protection\n" +
      "• Anti-ransomware\n" +
      "• Idéal PME",
    technique:
      "Double-flux de sauvegarde :\n\n" +
      "• Sauvegarde locale NAS\n" +
      "• Réplication cloud chiffrée\n" +
      "• Rétention multi-niveaux"
  },

  extended: {
    vulgarise:
      "Même si le NAS brûle ou est volé, vos données restent dans le cloud.\n\n" +
      "• Restauration locale ultra rapide\n" +
      "• Copie cloud pour catastrophe majeure\n" +
      "• Automatique et supervisé",
    technique:
      "Architecture avancée :\n\n" +
      "• Snapshots immuables + versioning\n" +
      "• Réplication NAS-to-cloud\n" +
      "• Encryption AES-256\n" +
      "• Monitoring centralisé"
  },

  pricing: {
    default: {},
    text:
      "Tarifs selon volume cloud + capacité NAS.\n" +
      "Installation : sur devis (topologie + volumes)."
  },

  images: [
    "/assets/schemas/hybride-schema.png"
  ]
},

// ============================================================================
// 4 — Vérification d’intégrité des sauvegardes
// ============================================================================
backup_integrite: {
  label: "Vérification d’intégrité des sauvegardes",

  short: {
    vulgarise:
      "On vérifie régulièrement que les sauvegardes fonctionnent vraiment.\n\n" +
      "• Contrôle automatique\n" +
      "• Alertes en cas de problème\n" +
      "• Sécurise l’entreprise",
    technique:
      "Tests d’intégrité :\n\n" +
      "• Hash SHA256\n" +
      "• Test montage image\n" +
      "• Analyse logs"
  },

  extended: {
    vulgarise:
      "Beaucoup croient être sauvés… jusqu’au jour où ils doivent restaurer. L’intégrité garantit que tout est restaurable.\n\n" +
      "• Tests automatiques\n" +
      "• Vérification Absolute Micro\n" +
      "• Rapport clair",
    technique:
      "Contrôles avancés :\n\n" +
      "• Checksum SHA256\n" +
      "• Test VM / montage image\n" +
      "• Analyse journaux Acronis/Synology\n"
  },

  pricing: {
    default: {},
    text: "Inclus dans les contrats de maintenance Absolute Micro."
  },

  images: [
    "/assets/schemas/integrite.png"
  ]
},

// ============================================================================
// 5 — Tests de restauration (réels)
// ============================================================================
backup_tests: {
  label: "Tests de restauration — Vrais tests",

  short: {
    vulgarise:
      "On vérifie si vos sauvegardes fonctionnent vraiment.\n\n" +
      "• Test fichier\n" +
      "• Test PC complet",
    technique:
      "Tests PRA :\n\n" +
      "• Bare Metal Recovery\n" +
      "• VM temporaire\n" +
      "• Validation cohérence OS"
  },

  extended: {
    vulgarise:
      "Nous effectuons des tests réels, pas juste théoriques.\n\n" +
      "• Machine virtuelle ‘bac à sable’\n" +
      "• Tests Windows / Serveur\n" +
      "• Rapport détaillé",
    technique:
      "Méthodes avancées :\n\n" +
      "• Sandbox VM\n" +
      "• ISO Recovery Acronis\n" +
      "• Journalisation des étapes\n"
  },

  pricing: {
    default: { jour: 450 },
    text:
      "Tarifs tests :\n" +
      "• Poste : 180 € HT\n" +
      "• Serveur : 350 € HT\n" +
      "• Test complet PRA : 450 €/jour\n"
  },

  images: [
    "/assets/schemas/restauration.png"
  ]
},

// ============================================================================
// 6 — CrashDisk / Cryptolocker — Récupération
// ============================================================================
backup_crashdisk: {
  label: "CrashDisk / Cryptolocker — Récupération",

  short: {
    vulgarise:
      "Tentative de récupération après panne grave ou ransomware.\n\n" +
      "• Diagnostic\n" +
      "• Récupération possible",
    technique:
      "Techniques de récupération :\n\n" +
      "• Analyse RAW\n" +
      "• Reconstruction MFT\n" +
      "• Extraction fichiers"
  },

  extended: {
    vulgarise:
      "Après un crash disque, un cryptolocker ou une suppression accidentelle, nous tentons de récupérer un maximum de données.\n\n" +
      "• Diagnostic rapide\n" +
      "• Tentative de récupération\n" +
      "• Rapport clair",
    technique:
      "Techniques avancées :\n\n" +
      "• Reconstruction partitions\n" +
      "• Analyse profonde secteur par secteur\n" +
      "• Récupération fichiers fragmentés\n"
  },

  pricing: {
    default: {},
    text:
      "Tarifs :\n" +
      "• Diagnostic : 70 € HT\n" +
      "• Récupération logique : 160 € HT\n" +
      "• Récupération avancée / salle blanche : sur devis\n"
  },

  images: [
    "/assets/schemas/data-recovery.png"
  ]
},

// ============================================================================
// 7 — PCA / PRA / PCI — Continuité et reprise d’activité
// ============================================================================
backup_pca_pra_pci: {
  label: "PCA / PRA / PCI — Continuité d’activité",

  short: {
    vulgarise:
      "Comment continuer à travailler après un incident majeur.\n\n" +
      "• Scénarios de reprise\n" +
      "• Organisation claire",
    technique:
      "Documentation + procédures.\n\n" +
      "• Analyse risques\n" +
      "• Définition RTO/RPO\n" +
      "• Processus critiques"
  },

  extended: {
    vulgarise:
      "Un PCA/PRA permet de continuer l’activité même après une panne grave.\n\n" +
      "• Plans détaillés\n" +
      "• Rôles définis\n" +
      "• Procédures en cas de crise",
    technique:
      "Méthodes pro :\n\n" +
      "• Analyse risques + impacts\n" +
      "• Scénarios sinistres\n" +
      "• Processus alternatifs\n" +
      "• Tests annuels\n"
  },

  pricing: {
    default: { jour: 890 },
    text:
      "PCA/PRA PME : 1 500 € HT\n" +
      "PCA/PRA avancé : 2 800 € HT\n" +
      "Test annuel : 430 € HT\n"
  },

  images: [
    "/assets/schemas/pra.png"
  ]
},



// -----------------------------------------------------------------------------
// FAMILLE 3 — COLLABORATION, MESSAGERIE & CLOUD
// -----------------------------------------------------------------------------

// ============================================================================
// 1 — Microsoft Teams (réunions, travail d’équipe, télétravail)
// ============================================================================
collab_teams: {
  label: "Microsoft Teams — Collaboration & Télétravail",

  short: {
    vulgarise:
      "Teams permet de discuter, partager des fichiers et organiser des réunions en un seul endroit.\n\n" +
      "• Réunions simples\n" +
      "• Partage d’écran\n" +
      "• Fichiers communs\n" +
      "• Chat d’équipe",
    technique:
      "Plateforme collaborative Microsoft 365.\n\n" +
      "• Teams VoIP + meetings\n" +
      "• Gestion des canaux & permissions\n" +
      "• Backend SharePoint / OneDrive\n" +
      "• Connecteurs externes"
  },

  extended: {
    vulgarise:
      "Teams facilite le travail en équipe : tout est centralisé.\n\n" +
      "• Réunions en visioconférence + enregistrement\n" +
      "• Groupes thématiques par service\n" +
      "• Documents toujours à jour (plus de doublons)\n" +
      "• Fonctionne PC, Mac, mobile\n" +
      "• Parfait pour le télétravail et les multi-sites\n" +
      "• Intégré au calendrier Outlook",
    technique:
      "Suite collaborative Microsoft 365 complète.\n\n" +
      "• Backend SharePoint pour la structure documentaire\n" +
      "• OneDrive Files On-Demand (ODFB)\n" +
      "• Teams Phone (option PSTN)\n" +
      "• Politiques : DLP, MFA, Conditional Access\n" +
      "• Groupes Microsoft 365 (naming policy, lifecycle)\n" +
      "• Connecteurs API Graph, Webhooks\n" +
      "• Gouvernance complète (archivage, rétention)"
  },

  pricing: {
    default: { jour: 380 },
    text:
      "Tarifs selon :\n" +
      "• nombre d'utilisateurs\n" +
      "• type de licence (Basic / Standard / Premium)\n" +
      "• structure Teams + permissions\n\n" +
      "Prestation Absolute Micro (installation incluse) :\n" +
      "• création Teams + canaux\n" +
      "• paramétrage SharePoint\n" +
      "• organisation permissions\n" +
      "• formation utilisateurs"
  },

  images: [
    "/assets/schemas/teams-arch.png",
    "/assets/schemas/sharepoint-teams.png"
  ]
},

// ============================================================================
// 2 — OneDrive (stockage personnel + synchronisation continue)
// ============================================================================
collab_onedrive: {
  label: "OneDrive — Stockage personnel & synchronisation",

  short: {
    vulgarise:
      "OneDrive garde vos fichiers synchronisés entre votre PC et le cloud.\n\n" +
      "• Sauvegarde automatique\n" +
      "• Historique des versions\n" +
      "• Accès PC / mobile / web",
    technique:
      "Stockage personnel Microsoft 365 (1 To).\n\n" +
      "• ODFB : Files On-Demand\n" +
      "• Versioning 500 versions\n" +
      "• Chiffrement au repos/en transit\n" +
      "• Synchronisation bloc par bloc"
  },

  extended: {
    vulgarise:
      "OneDrive protège vos documents personnels et les rend disponibles partout.\n\n" +
      "• Anti-ransomware (rollback automatique)\n" +
      "• Partage sécurisé\n" +
      "• Synchronisation multi-appareils\n" +
      "• Historique complet des versions",
    technique:
      "Backend de stockage personnel Microsoft 365.\n\n" +
      "• Versioning massif (jusqu'à 500 révisions)\n" +
      "• Détection ransomware + restauration automatique\n" +
      "• Gestion avancée des permissions\n" +
      "• Liens protégés + expiration\n" +
      "• Intégration native Office (Word/Excel/Outlook)"
  },

  pricing: {
    default: { jour: 260 },
    text:
      "Inclus dans Microsoft 365 Basic / Standard / Premium.\n\n" +
      "Prestation Absolute Micro :\n" +
      "• configuration OneDrive\n" +
      "• migration des fichiers\n" +
      "• politique de synchronisation\n"
  },

  images: [
    "/assets/schemas/onedrive.png"
  ]
},

// ============================================================================
// 3 — SharePoint (arborescences, documents d’entreprise, permissions)
// ============================================================================
collab_sharepoint: {
  label: "SharePoint — Bibliothèques & fichiers d’entreprise",

  short: {
    vulgarise:
      "SharePoint remplace les anciens serveurs de fichiers. Tout est centralisé et sécurisé.\n\n" +
      "• Documents d’entreprise\n" +
      "• Accès par service\n" +
      "• Historique",
    technique:
      "Plateforme documentaire Microsoft 365.\n\n" +
      "• Libraries + permissions NTFS/M365\n" +
      "• Versioning + métadonnées\n" +
      "• Synchronisation via OneDrive\n" +
      "• Architecture sites/hubs"
  },

  extended: {
    vulgarise:
      "SharePoint organise vos fichiers par service : RH, Direction, Comptabilité, etc.\n\n" +
      "• Documents centralisés + versions\n" +
      "• Accès depuis n’importe où\n" +
      "• Partages sécurisés\n" +
      "• Plus de conflits de versions",
    technique:
      "Architecture documentaire complète.\n\n" +
      "• Permissions avancées (Groupes M365, ACL)\n" +
      "• Métadonnées + étiquettes de rétention\n" +
      "• Coédition en temps réel\n" +
      "• Migration depuis serveurs/NAS\n" +
      "• Gouvernance : hubs, policies, lifecycle"
  },

  pricing: {
    default: { jour: 480 },
    text:
      "Varie selon :\n" +
      "• nombre de services\n" +
      "• structure documentaire\n" +
      "• migration de données\n\n" +
      "Prestation Absolute Micro :\n" +
      "• création sites/libraries\n" +
      "• permissions\n" +
      "• migration\n" +
      "• formation"
  },

  images: [
    "/assets/schemas/sharepoint-structure.png"
  ]
},

// ============================================================================
// 4 — Licences Microsoft 365 (Basic / Standard / Premium)
// ============================================================================
collab_m365: {
  label: "Microsoft 365 — Basic / Standard / Premium",

  short: {
    vulgarise:
      "Trois niveaux de licences pour s’adapter à chaque besoin.\n\n" +
      "• Basic : messagerie + Office Web\n" +
      "• Standard : Office installé\n" +
      "• Premium : sécurité renforcée",
    technique:
      "Comparatif licences M365.\n\n" +
      "• Basic : Exchange + Office Web\n" +
      "• Standard : + Office Desktop + Teams\n" +
      "• Premium : + Intune + Azure AD P1 + DLP"
  },

  extended: {
    vulgarise:
      "Votre licence détermine vos outils : Word, Excel, Outlook, Teams, sécurité…\n\n" +
      "• Basic : pour messagerie + stockage\n" +
      "• Standard : pack bureautique complet\n" +
      "• Premium : sécurité professionnelle",
    technique:
      "Comparatif technique détaillé :\n\n" +
      "• Basic : Exchange 50Go + OneDrive 1To\n" +
      "• Standard : + Office Desktop\n" +
      "• Premium : + MFA + Intune + Conditional Access\n"
  },

  pricing: {
    default: {},
    text:
      "Tarifs revendeur Microsoft :\n" +
      "• Basic : 6,70 € HT / mois\n" +
      "• Standard : 14,50 € HT / mois\n" +
      "• Premium : 25,30 € HT / mois\n"
  },

  images: [
    "/assets/schemas/m365-licences.png"
  ]
},

// ============================================================================
// 5 — Office Web vs Office installé (Desktop)
// ============================================================================
collab_office_suite: {
  label: "Office.com vs Suite Office installée",

  short: {
    vulgarise:
      "Office Web fonctionne dans votre navigateur. La suite installée fonctionne même sans Internet.\n\n" +
      "• Office Web pour les besoins simples\n" +
      "• Office installé = complet",
    technique:
      "Comparatif technique.\n\n" +
      "• Office Web = allégé\n" +
      "• Desktop = macros + intégration locale\n" +
      "• Compatibilité étendue"
  },

  extended: {
    vulgarise:
      "Office Web dépanne. La suite installée est faite pour travailler tous les jours.\n\n" +
      "• Word/Excel complets\n" +
      "• Mode hors-ligne\n" +
      "• Fonctionnalités avancées",
    technique:
      "Suite installée complète.\n\n" +
      "• Macros VBA\n" +
      "• Add-ins\n" +
      "• Liens OneDrive/SharePoint\n"
  },

  pricing: {
    default: {},
    text: "Inclus dans Microsoft 365 Standard & Premium."
  },

  images: [
    "/assets/schemas/office-web-vs-desktop.png"
  ]
},

// ============================================================================
// 6 — Outlook logiciel VS Outlook.com (Webmail grand public)
// ============================================================================
collab_outlook: {
  label: "Outlook (logiciel) vs Outlook.com (webmail)",

  short: {
    vulgarise:
      "Outlook logiciel est un outil professionnel. Outlook.com est un webmail grand public.\n\n" +
      "• Outlook logiciel = professionnel\n" +
      "• Outlook.com = limité",
    technique:
      "Comparatif technique.\n\n" +
      "• Outlook Desktop : Exchange ActiveSync, MAPI, OST\n" +
      "• Outlook.com : IMAP/POP, fonctionnalités réduites"
  },

  extended: {
    vulgarise:
      "Pour une entreprise, Outlook logiciel est indispensable : mieux organisé, plus performant, plus sécurisé.\n\n" +
      "• Calendriers partagés\n" +
      "• Carnet d’adresses d’entreprise\n" +
      "• Liens directs avec Teams",
    technique:
      "Fonctionnalités professionnelles complètes.\n\n" +
      "• MAPI/HTTP\n" +
      "• Permissions avancées (FullAccess, SendAs)\n" +
      "• Synchronisation rapide OST\n"
  },

  pricing: {
    default: {},
    text: "Inclus dans M365 Standard / Premium."
  },

  images: [
    "/assets/schemas/outlook-vs-outlookdotcom.png"
  ]
},

// ============================================================================
// 7 — Technologies mail POP / IMAP / Exchange
// ============================================================================
collab_popimapex: {
  label: "POP / IMAP / Exchange — Différences & usages",

  short: {
    vulgarise:
      "POP est ancien, IMAP est standard, Exchange est professionnel.\n\n" +
      "• POP : obsolète\n" +
      "• IMAP : synchronisé\n" +
      "• Exchange : complet",
    technique:
      "Comparatif :\n\n" +
      "• POP3 : local only\n" +
      "• IMAP : synchronisation multi-dossiers\n" +
      "• Exchange : push + contacts + calendriers"
  },

  extended: {
    vulgarise:
      "En entreprise, la solution adaptée est Exchange : tout est synchronisé (mails, contacts, calendrier, tâches).\n\n" +
      "• Mobile + PC\n" +
      "• Collaboration\n" +
      "• Sécurité avancée",
    technique:
      "Technologie mail moderne :\n\n" +
      "• Exchange Online\n" +
      "• ActiveSync\n" +
      "• MAPI/HTTP\n" +
      "• Permissions avancées\n"
  },

  pricing: {
    default: {},
    text: "Exchange inclus dans M365 Basic / Standard / Premium."
  },

  images: [
    "/assets/schemas/pop-imap-ex.png"
  ]
},

// ============================================================================
// 8 — Technologie M365 vs « Suite Office »
// ============================================================================
collab_m365_techno: {
  label: "Technologie Microsoft 365 vs Suite Office",

  short: {
    vulgarise:
      "Microsoft 365 = services cloud. Office = logiciels seuls.\n\n" +
      "• M365 : messagerie, stockage, Teams\n" +
      "• Office : Word/Excel/PowerPoint uniquement",
    technique:
      "M365 = Azure AD, Exchange Online, SharePoint, Teams.\n\n" +
      "Office = applications locales sans cloud."
  },

  extended: {
    vulgarise:
      "Microsoft 365 offre un environnement complet sécurisé : stockage, messagerie, sécurité renforcée.\n\n" +
      "• Identités centralisées\n" +
      "• MFA\n" +
      "• Stockage cloud intégré\n" +
      "• Collaboration en temps réel",
    technique:
      "Plateforme cloud complète :\n\n" +
      "• Azure AD P1\n" +
      "• Conditional Access\n" +
      "• DLP / Intune\n" +
      "• Exchange Online / SharePoint / Teams\n"
  },

  pricing: {
    default: {},
    text: "Inclus selon licence Microsoft 365 choisie."
  },

  images: [
    "/assets/schemas/m365-techno.png"
  ]
},




// -----------------------------------------------------------------------------
// FAMILLE 4 — INFRASTRUCTURE & GOUVERNANCE IT
// -----------------------------------------------------------------------------

// ============================================================================
// 1 — Switchs N1 / N2 / N3
// ============================================================================
infra_switchs: {
  label: "Switchs réseau — N1 / N2 / N3",

  short: {
    vulgarise:
      "Les switchs relient tous les appareils du réseau. Plus le niveau est élevé, plus ils offrent des fonctions avancées.\n\n" +
      "• N1 : simple, pour petits bureaux\n" +
      "• N2 : séparation des réseaux (VLAN)\n" +
      "• N3 : routage interne (entre services)",
    technique:
      "Switchs administrables.\n\n" +
      "• N1 : unmanaged, pas de configuration\n" +
      "• N2 : VLAN 802.1Q, QoS, LACP\n" +
      "• N3 : routage L3, ACL, OSPF"
  },

  extended: {
    vulgarise:
      "Un switch réseau distribue Internet dans l’entreprise. Selon le niveau, il peut séparer les services, sécuriser le trafic et garantir les performances.\n\n" +
      "• N1 : plug & play\n" +
      "• N2 : isolation par service (compta, RH…)\n" +
      "• N3 : communication sécurisée entre réseaux\n" +
      "• Adapté aux structures multi-services",
    technique:
      "Switchs administrables professionnels.\n\n" +
      "• N2 : VLAN, trunk, QoS, PoE, spanning-tree (STP/RSTP)\n" +
      "• N3 : routage inter-VLAN, VRRP, OSPF, ACL\n" +
      "• Monitoring SNMP (PRTG / Centreon / Atera)\n" +
      "• LACP : agrégation de liens pour la haute disponibilité"
  },

  pricing: {
    default: { jour: 420 },
    text:
      "Coûts selon :\n" +
      "• nombre de ports\n" +
      "• PoE ou non\n" +
      "• niveau (1/2/3)\n\n" +
      "Installation Absolute Micro :\n" +
      "• configuration VLAN\n" +
      "• routage inter-réseaux\n" +
      "• tests de performance\n" +
      "• documentation complète"
  },

  images: [
    "/assets/schemas/switch-layers.png",
    "/assets/schemas/switch-vlan.png"
  ]
},

// ============================================================================
// 2 — LAN / WAN / Routeurs & mode bridge
// ============================================================================
infra_reseau: {
  label: "Réseau LAN / WAN / Routeurs & mode bridge",

  short: {
    vulgarise:
      "Le réseau interne (LAN) relie les PC. Le WAN relie plusieurs sites. Le routeur contrôle l’accès à Internet.\n\n" +
      "• LAN : réseau interne\n" +
      "• WAN : liaisons entre sites\n" +
      "• Routeur : sécurité + Internet",
    technique:
      "Infrastructure complète.\n\n" +
      "• LAN : VLAN, DHCP, switching\n" +
      "• WAN : VPN IPsec / SSL\n" +
      "• Routeur : NAT, firewall basique, QoS"
  },

  extended: {
    vulgarise:
      "Le réseau est la colonne vertébrale de l’entreprise. Le mode bridge transforme la box en simple modem pour laisser un vrai pare-feu pro gérer la sécurité.\n\n" +
      "• LAN = ordinateurs + serveurs\n" +
      "• WAN = communication entre sites\n" +
      "• Routeur = portail Internet\n" +
      "• Mode bridge = indispensable avec WatchGuard",
    technique:
      "Architecture réseau professionnelle.\n\n" +
      "• LAN : segmentation par VLAN, DHCP relay\n" +
      "• WAN : tunnels IPsec/SSL, multi-liens, failover\n" +
      "• Routeur : NAT, PAT, gestion bande passante\n" +
      "• Mode bridge : transparence L2 pour firewall pro"
  },

  pricing: {
    default: { jour: 380 },
    text:
      "Tarifs selon :\n" +
      "• topologie réseau\n" +
      "• nombre de VLAN\n" +
      "• VPN inter-sites\n" +
      "• multi-WAN / failover\n"
  },

  images: [
    "/assets/schemas/lan-wan.png"
  ]
},

// ============================================================================
// 3 — CPL (réseau via courant électrique)
// ============================================================================
infra_cpl: {
  label: "CPL — Réseau via courant électrique",

  short: {
    vulgarise:
      "Les CPL utilisent les prises électriques pour transporter Internet. Pratique, mais instable.\n\n" +
      "• Installation rapide\n" +
      "• Débit variable",
    technique:
      "Technologie HomePlug AV/AV2.\n\n" +
      "• Débits 500 Mb à 2 Gb théoriques\n" +
      "• Sensible à la qualité électrique\n" +
      "• Latence instable"
  },

  extended: {
    vulgarise:
      "Les CPL dépannent mais ne remplacent jamais un réseau pro.\n\n" +
      "• Très sensibles aux perturbations\n" +
      "• Mauvais pour les visioconférences\n" +
      "• Déconseillé pour les entreprises",
    technique:
      "Limitations techniques.\n\n" +
      "• Dépendance multiprises / différentiels\n" +
      "• Jitter important\n" +
      "• Sécurité limitée vs RJ45"
  },

  pricing: {
    default: { jour: 120 },
    text: "Installation simple + tests de stabilité."
  },

  images: ["/assets/schemas/cpl.png"]
},

// ============================================================================
// 4 — RJ45 (catégories & débits)
// ============================================================================
infra_rj45: {
  label: "Câbles RJ45 — Catégories & débits",

  short: {
    vulgarise:
      "Le câble RJ45 transporte Internet dans tout le bâtiment.\n\n" +
      "• Cat5e : 1 Gbps\n" +
      "• Cat6a : 10 Gbps recommandé",
    technique:
      "Normes Ethernet.\n\n" +
      "• Cat5e : 1 Gbps\n" +
      "• Cat6 : 10 Gbps 55 m\n" +
      "• Cat6a : 10 Gbps 100 m\n" +
      "• Cat7 : blindage renforcé"
  },

  extended: {
    vulgarise:
      "Pour un réseau professionnel fiable, Cat6a est la norme.\n\n" +
      "• Débit élevé\n" +
      "• Compatibilité longue durée\n" +
      "• Blindage anti-interférences",
    technique:
      "Caractéristiques avancées.\n\n" +
      "• Norme ISO/IEC 11801\n" +
      "• Blindage UTP/FTP/SFTP\n" +
      "• Certification Fluke"
  },

  pricing: {
    default: { jour: 320 },
    text:
      "Installation :\n" +
      "• tirage câbles\n" +
      "• baies + panneaux de brassage\n" +
      "• tests & certification Fluke"
  },

  images: ["/assets/schemas/rj45.png"]
},

// ============================================================================
// 5 — Serveurs Windows / Active Directory
// ============================================================================
infra_serveurs: {
  label: "Serveurs Windows — Active Directory & permissions",

  short: {
    vulgarise:
      "Le serveur centralise les comptes et les droits d’accès.\n\n" +
      "• Connexion automatique\n" +
      "• Dossiers partagés",
    technique:
      "Active Directory.\n\n" +
      "• Domain Controller\n" +
      "• GPO\n" +
      "• NTFS permissions"
  },

  extended: {
    vulgarise:
      "Active Directory organise les utilisateurs et leurs droits comme un tableau de bord central.\n\n" +
      "• Comptes salariés\n" +
      "• Droits par service\n" +
      "• Accès automatiques aux dossiers",
    technique:
      "Architecture AD complète.\n\n" +
      "• GPO (drives, restrictions, stratégies PW)\n" +
      "• DNS + DHCP intégrés\n" +
      "• Permissions NTFS avancées\n" +
      "• Sauvegarde AD + restauration autoritative"
  },

  pricing: {
    default: { jour: 580 },
    text:
      "Installation Absolute Micro :\n" +
      "• configuration serveur\n" +
      "• OU + GPO\n" +
      "• permissions NTFS\n" +
      "• documentation AD"
  },

  images: ["/assets/schemas/active-directory.png"]
},

// ============================================================================
// 6 — RGPD
// ============================================================================
infra_rgpd: {
  label: "RGPD — Données & conformité",

  short: {
    vulgarise:
      "Le RGPD protège les données personnelles.\n\n" +
      "• confidentialité\n" +
      "• transparence",
    technique:
      "Réglementation européenne.\n\n" +
      "• registre des traitements\n" +
      "• AIPD\n" +
      "• notions de minimisation"
  },

  extended: {
    vulgarise:
      "Le RGPD impose aux entreprises de sécuriser correctement les données.\n\n" +
      "• politiques internes\n" +
      "• plan d’actions\n" +
      "• documentation",
    technique:
      "Conformité RGPD.\n\n" +
      "• registre DPO\n" +
      "• analyse risques + AIPD\n" +
      "• intégration DLP/MFA/CA"
  },

  pricing: {
    default: { jour: 500 },
    text:
      "Inclut :\n" +
      "• audit des traitements\n" +
      "• rédaction registre\n" +
      "• plan conformité"
  },

  images: ["/assets/schemas/rgpd.png"]
},

// ============================================================================
// 7 — Antifraude (IBAN / paiements)
// ============================================================================
infra_antifraude: {
  label: "Antifraude — paiements & IBAN",

  short: {
    vulgarise:
      "L’antifraude protège contre les arnaques bancaires.\n\n" +
      "• double vérification IBAN\n" +
      "• procédures simples",
    technique:
      "Sécurisation financière.\n\n" +
      "• validation multi-niveaux\n" +
      "• journalisation"
  },

  extended: {
    vulgarise:
      "Une erreur d’IBAN peut coûter très cher. L’antifraude met en place des contrôles systématiques.\n\n" +
      "• double validation\n" +
      "• archive des validations",
    technique:
      "Processus internes.\n\n" +
      "• contrôle récurrent IBAN\n" +
      "• archivage horodaté\n" +
      "• traçabilité complète"
  },

  pricing: {
    default: { jour: 320 },
    text: "Mise en place des procédures + documentation."
  },

  images: ["/assets/schemas/antifraude.png"]
},

// ============================================================================
// 8 — Politique de mots de passe
// ============================================================================
infra_passwords: {
  label: "Politique de mots de passe — Sécurité des comptes",

  short: {
    vulgarise:
      "Un mot de passe faible met en danger toute l’entreprise.\n\n" +
      "• longueur\n" +
      "• complexité",
    technique:
      "AD + AzureAD.\n\n" +
      "• history\n" +
      "• lockout\n" +
      "• password protection"
  },

  extended: {
    vulgarise:
      "Une bonne politique de mots de passe réduit fortement les risques.\n\n" +
      "• MFA recommandé\n" +
      "• règles claires\n" +
      "• gestion centralisée",
    technique:
      "Politiques avancées.\n\n" +
      "• Azure Password Protection\n" +
      "• Conditional Access\n" +
      "• Hybrid AD"
  },

  pricing: {
    default: { jour: 210 },
    text: "Déploiement GPO + Azure Password Protection."
  },

  images: ["/assets/schemas/password-policy.png"]
},

// ============================================================================
// 9 — Procédures internes (arrivées, départs, accès)
// ============================================================================
infra_process: {
  label: "Procédures internes — sécurité & organisation",

  short: {
    vulgarise:
      "Les procédures rendent l’entreprise plus fiable et plus claire.\n\n" +
      "• arrivées\n" +
      "• départs\n" +
      "• droits d’accès",
    technique:
      "Processus IT.\n\n" +
      "• workflow d’accès\n" +
      "• sécurité identité"
  },

  extended: {
    vulgarise:
      "Des procédures simples évitent les oublis et les erreurs.\n\n" +
      "• gestion arrivées/départs\n" +
      "• droits sur les dossiers\n" +
      "• cyber-hygiène",
    technique:
      "Procédures avancées.\n\n" +
      "• audit access-rights\n" +
      "• validation manager\n" +
      "• traçabilité"
  },

  pricing: {
    default: { jour: 300 },
    text: "Création et documentation de procédures internes personnalisées."
  },

  images: ["/assets/schemas/process.png"]
},

// ============================================================================
// 10 — Contrat de maintenance Absolute Micro (VERSION INTERACTIVE)
// ============================================================================
infra_contrat: {
  label: "Contrat de maintenance Absolute Micro",

  short: {
    vulgarise:
      "Le contrat de maintenance garantit un suivi régulier, une supervision et des interventions rapides.\n\n" +
      "• surveillance 24/7\n" +
      "• support\n" +
      "• conseils",
    technique:
      "Maintenance IT.\n\n" +
      "• RMM Atera\n" +
      "• patch management\n" +
      "• monitoring services"
  },

  extended: {
    vulgarise:
      "Un contrat évite les mauvaises surprises. Absolute Micro surveille, maintient et optimise votre système en continu.\n\n" +
      "• Maintenance proactive\n" +
      "• Support prioritaire\n" +
      "• Rapports mensuels",
    technique:
      "Contrat professionnel.\n\n" +
      "• monitoring 24/7\n" +
      "• MCO complet\n" +
      "• patchs automatisés\n" +
      "• reporting mensuel\n" +
      "• tickets illimités selon formule"
  },

  pricing: {
    items: [
      { label: "Poste Windows", price: 40, unit: "poste / mois", qty: 0 },
      { label: "NAS", price: 40, unit: "NAS / mois", qty: 0 },
      { label: "Serveur Windows", price: 60, unit: "serveur / mois", qty: 0 },
      { label: "Machine virtuelle (VM)", price: 60, unit: "VM / mois", qty: 0 },
      { label: "Pare-feu / Firewall", price: 60, unit: "équipement / mois", qty: 0 },
      { label: "Frais de déplacement", price: 6, unit: "par tranche de 5 km (aller)", qty: 0 }
    ],

    text:
      "Tarifs mensuels modulables :\n" +
      "• Quantités ajustables selon votre parc\n" +
      "• Possibilité d’inclure ou exclure des éléments (NAS, VM, firewall…)\n" +
      "• Facturation mensuelle ou annuelle\n" +
      "• Ajout / suppression de postes à la carte\n"
  },

  images: ["/assets/schemas/maintenance.png"]
},
}
