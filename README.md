<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
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
