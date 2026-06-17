import { T } from '../styles/tokens';

export const CHANTIERS = [
  { id:1, nom:"Réseau EU Pikine",             type:"Pose réseaux",   localisation:"Pikine",        chef:"Ibrahima Diallo", debut:"01/11/2024", fin:"15/03/2025", pct:45, statut:"retard",  client:"ONAS",           montant:"45 000 000", phase:"Pose canalisations" },
  { id:2, nom:"Ouvrage évacuation Guédiawaye", type:"Génie civil",    localisation:"Guédiawaye",   chef:"Mariama Sow",     debut:"15/12/2024", fin:"28/04/2025", pct:60, statut:"risque",  client:"ONAS",           montant:"62 000 000", phase:"Gros œuvre" },
  { id:3, nom:"Curage collecteur Plateau",    type:"Curage",         localisation:"Dakar-Plateau", chef:"Ousmane Faye",    debut:"01/02/2025", fin:"10/06/2025", pct:78, statut:"encours", client:"Ville de Dakar", montant:"18 500 000", phase:"Finitions" },
  { id:4, nom:"Chambre de visite Rufisque",   type:"Construction",   localisation:"Rufisque",     chef:"Aminata Diop",    debut:"10/01/2025", fin:"20/05/2025", pct:92, statut:"encours", client:"ADM",            montant:"9 200 000",  phase:"Réception" },
  { id:5, nom:"Extension réseau Mbao",        type:"Pose réseaux",   localisation:"Mbao",          chef:"Pape Sarr",       debut:"05/03/2025", fin:"30/07/2025", pct:33, statut:"retard",  client:"SONES",          montant:"38 000 000", phase:"Terrassement" },
  { id:6, nom:"Réhabilitation ouvrage Thiès", type:"Réhabilitation", localisation:"Thiès",         chef:"Fatou Diallo",    debut:"20/02/2025", fin:"15/08/2025", pct:55, statut:"encours", client:"Conseil Thiès",  montant:"27 000 000", phase:"Gros œuvre" },
];

export const CLIENTS = [
  { id:1, nom:"ONAS",               type:"Organisme national",  chantiers:4, contrats:3, statut:"Actif",       contact:"onas@senegal.sn", initiales:"ON", bg:T.tealLight,   color:T.tealDark },
  { id:2, nom:"Ville de Dakar",     type:"Collectivité locale", chantiers:2, contrats:2, statut:"Actif",       contact:"dtu@dakar.sn",     initiales:"VD", bg:T.blueLight,   color:T.blue     },
  { id:3, nom:"ADM",                type:"Agence nationale",    chantiers:1, contrats:1, statut:"Négociation", contact:"adm@adm.sn",       initiales:"AD", bg:T.amberLight,  color:"#854F0B"  },
  { id:4, nom:"SONES",              type:"Société nationale",   chantiers:3, contrats:2, statut:"Actif",       contact:"sones@sones.sn",   initiales:"SO", bg:T.purpleLight, color:"#3C3489"  },
  { id:5, nom:"Conseil Rég. Thiès", type:"Collectivité locale", chantiers:1, contrats:1, statut:"Actif",       contact:"crt@thies.sn",     initiales:"CR", bg:T.greenLight,  color:"#27500A"  },
  { id:6, nom:"PRN Ziguinchor",     type:"Programme national",  chantiers:0, contrats:0, statut:"Prospect",    contact:"prn@ziguin.sn",    initiales:"PR", bg:T.coralLight,  color:"#993C1D"  },
];

export const ALERTES = [
  { id:1, titre:"Dépassement délai — Réseau EU Pikine",             chantier:"Réseau EU Pikine",          niveau:"Urgent",    resp:"Ibrahima Diallo", date:"27/03/2025", lue:false },
  { id:2, titre:"Blocage technique — Ouvrage Guédiawaye",           chantier:"Ouvrage Guédiawaye",        niveau:"Urgent",    resp:"Mariama Sow",     date:"27/03/2025", lue:false },
  { id:3, titre:"Livraison à risque — Curage Dakar-Plateau",        chantier:"Curage Plateau",            niveau:"Attention", resp:"Ousmane Faye",    date:"26/03/2025", lue:false },
  { id:4, titre:"Dépassement délai — Extension réseau Mbao",        chantier:"Extension réseau Mbao",     niveau:"Urgent",    resp:"Pape Sarr",       date:"25/03/2025", lue:true  },
  { id:5, titre:"Photos mises à jour — Chambre de visite Rufisque", chantier:"Chambre Rufisque",          niveau:"Info",      resp:"Aminata Diop",    date:"25/03/2025", lue:true  },
];

export const USERS = [
  { id:1, nom:"Cheikh Tidiane Ndiaye", role:"Direction",        email:"c.ndiaye@vicas.sn", initiales:"CN", bg:T.tealLight,   color:T.tealDark, actif:true  },
  { id:2, nom:"Ibrahima Diallo",       role:"Chef de chantier", email:"i.diallo@vicas.sn", initiales:"ID", bg:T.blueLight,   color:T.blue,     actif:true  },
  { id:3, nom:"Mariama Sow",           role:"Chef de chantier", email:"m.sow@vicas.sn",    initiales:"MS", bg:T.amberLight,  color:"#854F0B",  actif:true  },
  { id:4, nom:"Ousmane Faye",          role:"Chef de chantier", email:"o.faye@vicas.sn",   initiales:"OF", bg:T.purpleLight, color:"#3C3489",  actif:true  },
  { id:5, nom:"Aminata Diop",          role:"Commercial",       email:"a.diop@vicas.sn",   initiales:"AD", bg:T.coralLight,  color:"#993C1D",  actif:true  },
  { id:6, nom:"Pape Sarr",             role:"Chef de chantier", email:"p.sarr@vicas.sn",   initiales:"PS", bg:T.greenLight,  color:"#27500A",  actif:false },
];

export const RAPPORTS = [
  { id:1, chantier:"Réseau EU Pikine",             semaine:"S11 — 10 au 14 mars", chef:"Ibrahima Diallo", avancement:45, statut:"Soumis"    },
  { id:2, chantier:"Ouvrage évacuation Guédiawaye", semaine:"S11 — 10 au 14 mars", chef:"Mariama Sow",    avancement:60, statut:"Soumis"    },
  { id:3, chantier:"Curage collecteur Plateau",    semaine:"S11 — 10 au 14 mars", chef:"Ousmane Faye",    avancement:78, statut:"Soumis"    },
  { id:4, chantier:"Extension réseau Mbao",        semaine:"S12 — 17 au 21 mars", chef:"Pape Sarr",       avancement:33, statut:"En attente"},
  { id:5, chantier:"Chambre de visite Rufisque",   semaine:"S12 — 17 au 21 mars", chef:"Aminata Diop",    avancement:92, statut:"Soumis"    },
];

export const PHOTOS = [
  { id:1, chantier:"Réseau EU Pikine",   tag:"Avant",    date:"12/11/2024", emoji:"🏗️" },
  { id:2, chantier:"Réseau EU Pikine",   tag:"En cours", date:"15/01/2025", emoji:"🔧" },
  { id:3, chantier:"Ouvrage Guédiawaye", tag:"Avant",    date:"20/12/2024", emoji:"🏗️" },
  { id:4, chantier:"Ouvrage Guédiawaye", tag:"En cours", date:"02/02/2025", emoji:"🔧" },
  { id:5, chantier:"Curage Plateau",     tag:"En cours", date:"10/02/2025", emoji:"🚿" },
  { id:6, chantier:"Chambre Rufisque",   tag:"Après",    date:"18/03/2025", emoji:"✅" },
  { id:7, chantier:"Chambre Rufisque",   tag:"Après",    date:"20/03/2025", emoji:"✅" },
  { id:8, chantier:"Extension Mbao",     tag:"Avant",    date:"08/03/2025", emoji:"📍" },
];
