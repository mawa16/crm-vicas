# VICAS CRM — Suivi de chantiers

CRM de suivi de chantiers et d'avancement des travaux pour le Groupe VICAS (assainissement & génie civil).

Projet réalisé dans le cadre du cycle Licence L3GLSIb par Mame Awa Bakhoum SARR et Ndeye Maty NIANG.

## Stack technique

- React 18
- React Router DOM 6 (navigation multi-pages)
- Vite (build tool)
- CSS-in-JS (styles inline, pas de dépendance CSS externe)

## Installation

```bash
npm install
```

## Lancer en développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`.

## Build de production

```bash
npm run build
npm run preview
```

## Structure du projet

```
src/
├── main.jsx                 → point d'entrée
├── App.jsx                  → définition des routes
├── components/
│   ├── Navbar.jsx           → barre de navigation principale
│   └── UI.jsx                → composants réutilisables (badges, progress bar, toggle)
├── pages/
│   ├── Dashboard.jsx          → tableau de bord (route "/")
│   ├── Chantiers.jsx          → liste des chantiers ("/chantiers")
│   ├── ChantierDetail.jsx     → fiche détaillée d'un chantier ("/chantiers/:id")
│   ├── FicheChantier.jsx      → formulaire de création ("/fiche")
│   ├── Clients.jsx            → gestion clientèle ("/clients")
│   ├── Rapports.jsx           → rapports hebdomadaires ("/rapports")
│   ├── Alertes.jsx            → notifications ("/alertes")
│   ├── Galerie.jsx            → galerie photos avant/après ("/galerie")
│   ├── Utilisateurs.jsx       → gestion des profils ("/utilisateurs")
│   └── Parametres.jsx         → configuration ("/parametres")
├── data/
│   └── mockData.js          → données de démonstration (à remplacer par les appels API)
└── styles/
    ├── tokens.js             → palette de couleurs VICAS
    ├── shared.js             → styles UI réutilisables
    └── global.css            → styles globaux et police

```

## Données

Les données affichées (`src/data/mockData.js`) sont des données de démonstration. Pour brancher l'application sur un vrai backend, remplacer les imports de `mockData.js` par des appels `fetch`/`axios` vers l'API REST (voir le diagramme de séquence et le schéma de base de données fournis dans le cahier des charges).

## Prochaines étapes suggérées

- Connecter à une API REST (Node.js/Express ou Laravel) avec authentification par rôle
- Implémenter l'upload réel de photos (stockage S3 ou équivalent)
- Ajouter react-query ou SWR pour la gestion des données serveur
- Ajouter un contexte d'authentification (`AuthContext`) pour la gestion des profils Direction / Chef de chantier / Commercial
