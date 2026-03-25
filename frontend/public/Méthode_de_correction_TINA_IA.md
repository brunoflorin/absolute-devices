# 🧭 Méthode de Correction TINA IA  
## Gestion rigoureuse des modifications de code

---

### 🎯 Objectif  
Garantir que toute correction, amélioration ou évolution du projet **TINA IA** soit réalisée **sans altérer le fonctionnement existant**.  
Chaque intervention doit préserver la stabilité, la lisibilité et la cohérence du projet.

---

## 🧩 1. Principe de base

Avant toute modification, **le code d’origine doit toujours être fourni dans son intégralité**.  
Aucune ligne ne doit être remplacée sans disposer du contexte complet du fichier concerné.

> ⚠️ Aucune modification partielle ou hors contexte ne doit être effectuée.

---

## 🔍 2. Procédure standard

### Étape 1 — Identification  
Lorsqu’une demande de correction est formulée, l’IA :
- identifie **tous les fichiers impliqués** (ex. `App.jsx`, `AuthPage.jsx`, `TinaDialogue.jsx`, etc.) ;
- **énumère clairement** les fichiers nécessaires avant de commencer la révision.

### Étape 2 — Collecte du code existant  
Avant de proposer la moindre correction :
- Bruno fournit **le contenu complet** des fichiers concernés ;
- l’IA analyse les dépendances (`imports`, `exports`, hooks, routes, etc.) ;
- l’IA confirme la **cohérence du contexte** avant d’agir.

### Étape 3 — Génération contrôlée  
- L’IA ne modifie **que les parties nécessaires** ;
- Les parties déjà fonctionnelles ne sont **jamais altérées sans justification** ;
- Chaque proposition doit être :
  - **autonome** (aucune ligne manquante),
  - **compatible** avec la version courante du projet,
  - **clairement documentée** (changements identifiés).

### Étape 4 — Validation  
- Bruno relit le rendu et valide avant intégration.  
- Une fois validé, l’IA fournit **le bloc complet final prêt à coller**.  
- L’intégration se fait **sans perte de fonctionnalité** ni de design.

---

## 🧱 3. Règles spécifiques

1. **Demande systématique des fichiers concernés**  
   → L’IA doit toujours demander à Bruno de fournir chaque fichier nécessaire avant modification.

2. **Préservation du fonctionnel existant**  
   → Aucun élément stable (visuel, navigation, effet, logique) ne doit être altéré sans raison claire.

3. **Gestion des dépendances**  
   → Tout nouvel import, hook, ou service ajouté doit être précisé explicitement.

4. **Aucune suppression implicite**  
   → Toute ligne ou bloc retiré doit être justifié et validé.

5. **Vérification post-intégration**  
   → Après chaque mise à jour, l’IA confirme avec Bruno que :
   - la page corrigée fonctionne correctement ;
   - aucune autre page n’a été impactée.

---

## 🧠 4. Objectif final

Cette méthode vise à :
- garantir la **stabilité globale** du projet TINA IA,
- éviter toute **régression fonctionnelle**,
- maintenir une **traçabilité claire** des modifications,
- permettre à Bruno et à l’IA d’évoluer efficacement **sans jamais casser ce qui fonctionne déjà**.

---

### 📄 Format et emplacement

- **Nom du fichier :** `Méthode_de_correction_TINA_IA.md`  
- **Emplacement :** `/frontend/docs/`  
- **Format :** Markdown compatible VS Code (titres, puces, sections claires)

---

> 🔒 **Version validée** : Cette méthode doit être respectée avant toute nouvelle correction, ajout de fonctionnalité ou modification du design dans TINA IA.
