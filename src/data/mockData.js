import { T } from '../styles/tokens';

export const USERS = [
  { id:1, nom:"Cheikh Tidiane Ndiaye", role:"Direction",        email:"c.ndiaye@vicas.sn",  initiales:"CN", bg:T.blueLight,   color:T.navy,     actif:true  },
  { id:2, nom:"Ibrahima Diallo",       role:"Chef de chantier", email:"i.diallo@vicas.sn",  initiales:"ID", bg:T.blueLight,   color:T.blue,     actif:true  },
  { id:3, nom:"Mariama Sow",           role:"Chef de chantier", email:"m.sow@vicas.sn",     initiales:"MS", bg:T.orangeLight, color:"#854F0B",  actif:true  },
  { id:4, nom:"Ousmane Faye",          role:"Chef de chantier", email:"o.faye@vicas.sn",    initiales:"OF", bg:T.purpleLight, color:"#3C3489",  actif:true  },
  { id:5, nom:"Aminata Diop",          role:"Commercial",       email:"a.diop@vicas.sn",    initiales:"AD", bg:T.orangeLight, color:"#993C1D",  actif:true  },
  { id:6, nom:"Pape Sarr",             role:"Chef de chantier", email:"p.sarr@vicas.sn",    initiales:"PS", bg:T.greenLight,  color:"#27500A",  actif:false },
  { id:7, nom:"Adama Cissé",           role:"Administrateur",   email:"a.cisse@vicas.sn",   initiales:"AC", bg:T.blueLight,   color:T.navy,     actif:true  },
];

export const DEMO_ACCOUNTS = [];

export const CHANTIERS = [
  { id:1, nom:"Réseau EU Pikine",             type:"Pose réseaux",   localisation:"Pikine",        chefId:2, chef:"Ibrahima Diallo", debut:"01/11/2024", fin:"15/03/2025", pct:45, statut:"retard",  client:"ONAS",           clientId:1, montant:"45 000 000", phase:"Pose canalisations" },
  { id:2, nom:"Ouvrage évacuation Guédiawaye", type:"Génie civil",   localisation:"Guédiawaye",   chefId:3, chef:"Mariama Sow",     debut:"15/12/2024", fin:"28/04/2025", pct:60, statut:"risque",  client:"ONAS",           clientId:1, montant:"62 000 000", phase:"Gros œuvre" },
  { id:3, nom:"Curage collecteur Plateau",    type:"Curage",         localisation:"Dakar-Plateau", chefId:4, chef:"Ousmane Faye",    debut:"01/02/2025", fin:"10/06/2025", pct:78, statut:"encours", client:"Ville de Dakar", clientId:2, montant:"18 500 000", phase:"Finitions" },
  { id:4, nom:"Chambre de visite Rufisque",   type:"Construction",   localisation:"Rufisque",      chefId:6, chef:"Pape Sarr",       debut:"10/01/2025", fin:"20/05/2025", pct:92, statut:"encours", client:"ADM",            clientId:3, montant:"9 200 000",  phase:"Réception" },
  { id:5, nom:"Extension réseau Mbao",        type:"Pose réseaux",   localisation:"Mbao",          chefId:6, chef:"Pape Sarr",       debut:"05/03/2025", fin:"30/07/2025", pct:33, statut:"retard",  client:"SONES",          clientId:4, montant:"38 000 000", phase:"Terrassement" },
  { id:6, nom:"Réhabilitation ouvrage Thiès", type:"Réhabilitation", localisation:"Thiès",         chefId:2, chef:"Ibrahima Diallo", debut:"20/02/2025", fin:"15/08/2025", pct:55, statut:"encours", client:"Conseil Thiès",  clientId:5, montant:"27 000 000", phase:"Gros œuvre" },
];

export const CLIENTS = [
  { id:1, nom:"ONAS",               type:"Organisme national",  commercialId:5, chantiers:4, contrats:3, statut:"Actif",    contact:"onas@senegal.sn",      initiales:"ON", bg:T.blueLight,   color:T.navy    },
  { id:2, nom:"Ville de Dakar",     type:"Collectivité locale", commercialId:5, chantiers:2, contrats:2, statut:"Actif",    contact:"contact@dakar.sn",     initiales:"VD", bg:T.orangeLight, color:"#854F0B" },
  { id:3, nom:"ADM",                type:"Agence nationale",    commercialId:5, chantiers:1, contrats:1, statut:"Actif",    contact:"adm@adm.sn",           initiales:"AD", bg:T.purpleLight, color:"#3C3489" },
  { id:4, nom:"SONES",              type:"Organisme national",  commercialId:5, chantiers:3, contrats:2, statut:"Actif",    contact:"contact@sones.sn",     initiales:"SO", bg:T.greenLight,  color:"#27500A" },
  { id:5, nom:"Conseil Rég. Thiès", type:"Collectivité locale", commercialId:5, chantiers:1, contrats:1, statut:"Inactif",  contact:"thiescr@senegal.sn",   initiales:"CT", bg:T.blueLight,   color:T.blue    },
];

export const RAPPORTS = [
  { id:1, chantier:"Réseau EU Pikine",              chantierI:1, chefId:2, semaine:"S11 — 10 au 14 mars", chef:"Ibrahima Diallo", avancement:45, statut:"Soumis"     },
  { id:2, chantier:"Ouvrage évacuation Guédiawaye", chantierI:2, chefId:3, semaine:"S11 — 10 au 14 mars", chef:"Mariama Sow",     avancement:60, statut:"Soumis"     },
  { id:3, chantier:"Curage collecteur Plateau",     chantierI:3, chefId:4, semaine:"S11 — 10 au 14 mars", chef:"Ousmane Faye",    avancement:78, statut:"Soumis"     },
  { id:4, chantier:"Extension réseau Mbao",         chantierI:5, chefId:6, semaine:"S12 — 17 au 21 mars", chef:"Pape Sarr",       avancement:33, statut:"En attente" },
  { id:5, chantier:"Chambre de visite Rufisque",    chantierI:4, chefId:6, semaine:"S12 — 17 au 21 mars", chef:"Pape Sarr",       avancement:92, statut:"Soumis"     },
];

export const PHOTOS = [
  { id:1, chantier:"Réseau EU Pikine",              chantierI:1, chefId:2, tag:"Avant",    date:"12/11/2024", emoji:"🏗️" },
  { id:2, chantier:"Réseau EU Pikine",              chantierI:1, chefId:2, tag:"En cours", date:"15/01/2025", emoji:"🔧" },
  { id:3, chantier:"Ouvrage Guédiawaye",            chantierI:2, chefId:3, tag:"Avant",    date:"20/12/2024", emoji:"🏗️" },
  { id:4, chantier:"Ouvrage Guédiawaye",            chantierI:2, chefId:3, tag:"En cours", date:"10/01/2025", emoji:"🔧" },
  { id:5, chantier:"Curage collecteur Plateau",     chantierI:3, chefId:4, tag:"En cours", date:"05/02/2025", emoji:"🚧" },
  { id:6, chantier:"Chambre de visite Rufisque",    chantierI:4, chefId:6, tag:"Après",    date:"28/03/2025", emoji:"✅" },
  { id:7, chantier:"Extension réseau Mbao",         chantierI:5, chefId:6, tag:"En cours", date:"12/03/2025", emoji:"🔧" },
  { id:8, chantier:"Réhabilitation Thiès",          chantierI:6, chefId:2, tag:"Avant",    date:"22/02/2025", emoji:"🏗️" },
];

export const ALERTES = [
  { id:1, chantierI:1, chefId:2, niveau:"Urgent",    message:"Réseau EU Pikine — 12 jours de retard",           date:"Aujourd'hui",  lue:false },
  { id:2, chantierI:2, chefId:3, niveau:"Attention",  message:"Guédiawaye — Blocage géotechnique signalé",       date:"Aujourd'hui",  lue:false },
  { id:3, chantierI:5, chefId:6, niveau:"Urgent",    message:"Extension Mbao — Retard matériaux 3 semaines",     date:"Hier",         lue:false },
  { id:4, chantierI:3, chefId:4, niveau:"Info",       message:"Curage Plateau — Avancement 78%, dans les temps", date:"Hier",         lue:true  },
  { id:5, chantierI:4, chefId:6, niveau:"Info",       message:"Chambre Rufisque — Livraison prévue dans 5 jours",date:"25 mars",      lue:true  },
];
