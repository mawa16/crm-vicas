import { Link } from 'react-router-dom';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { StatutBadge, ProgressBar } from '../components/UI';
import { CHANTIERS, CLIENTS, ALERTES } from '../data/mockData';
import { useAuth, can, ROLE } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;

  // Filtrage données selon rôle
  const mesChantiers = can(user, 'voir_tous_chantiers')
    ? CHANTIERS
    : CHANTIERS.filter(c => c.chefId === user?.userId);

  const mesAlertes = role === ROLE.DIRECTION
    ? ALERTES
    : ALERTES.filter(a => mesChantiers.some(c => a.chantierNom?.includes(c.localisation) || a.chantier === c.nom || a.id % 3 === (user?.userId % 3)));

  const avgPct = mesChantiers.length
    ? Math.round(mesChantiers.reduce((a, c) => a + c.pct, 0) / mesChantiers.length)
    : 0;

  // ─── DASHBOARD ADMINISTRATEUR ───────────────────────────────────────────
  if (role === ROLE.ADMIN) {
    return (
      <div>
        <div style={S.pageTitle}>Tableau de bord — Administration</div>
        <div style={S.pageSub}>Gestion des accès et des comptes utilisateurs</div>
        <div style={S.grid4}>
          {[
            { label:'Utilisateurs total',  value: 7,  color: T.navy,   sub:'Tous rôles confondus' },
            { label:'Comptes actifs',       value: 6,  color: T.green,  sub:'Connectés ce mois'    },
            { label:'Comptes désactivés',   value: 1,  color: T.red,    sub:'En attente'            },
            { label:'Comptes en attente',   value: 0,  color: T.amber,  sub:'Validation requise'    },
          ].map((m,i) => (
            <div key={i} style={S.metric}>
              <div style={S.metricLabel}>{m.label}</div>
              <div style={{ ...S.metricValue, color:m.color }}>{m.value}</div>
              <div style={S.metricSub}>{m.sub}</div>
            </div>
          ))}
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}>⚡ Accès rapide</div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link to="/utilisateurs" style={{ ...S.btn('primary'), textDecoration:'none' }}>👥 Gérer les utilisateurs</Link>
            <Link to="/parametres" style={{ ...S.btn('outline'), textDecoration:'none' }}>⚙️ Paramètres système</Link>
          </div>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}>🕐 Dernières actions</div>
          {[
            { action:'Compte créé',       user:'Pape Sarr',       date:'25 mars, 11:00', icon:'➕' },
            { action:'Rôle modifié',      user:'Aminata Diop',    date:'24 mars, 09:15', icon:'🔄' },
            { action:'Compte désactivé',  user:'—',               date:'23 mars, 14:30', icon:'🔒' },
          ].map((a,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:`1px solid ${T.border}` }}>
              <div style={{ width:34, height:34, borderRadius:'50%', background:T.blueLight, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{a.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:500 }}>{a.action}</div>
                <div style={{ fontSize:11, color:T.textMuted }}>{a.user}</div>
              </div>
              <div style={{ fontSize:11, color:T.textMuted }}>{a.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── DASHBOARD CHEF DE CHANTIER ─────────────────────────────────────────
  if (role === ROLE.CHEF_CHANTIER) {
    const alertesChef = ALERTES.filter(a =>
      mesChantiers.some(c => a.chantier === c.nom || a.chantierNom === c.nom)
    ).slice(0, 3);

    return (
      <div>
        <div style={S.pageTitle}>Mes chantiers</div>
        <div style={S.pageSub}>
          Bonjour {user?.nom?.split(' ')[0]} — {mesChantiers.length} chantier{mesChantiers.length > 1 ? 's' : ''} assigné{mesChantiers.length > 1 ? 's' : ''}
        </div>

        {/* Métriques perso */}
        <div style={S.grid4}>
          {[
            { label:'Mes chantiers',     value: mesChantiers.length,                            color:T.navy,   sub:'Assignés à moi' },
            { label:'Avancement moyen',  value: `${avgPct}%`,                                   color:T.blue,   sub:'Sur mes projets' },
            { label:'En retard',         value: mesChantiers.filter(c=>c.statut==='retard').length, color:T.red,sub:'Nécessitent action' },
            { label:'Alertes actives',   value: ALERTES.filter(a=>!a.lue).length,               color:T.amber,  sub:'Non résolues' },
          ].map((m,i) => (
            <div key={i} style={S.metric}>
              <div style={S.metricLabel}>{m.label}</div>
              <div style={{ ...S.metricValue, color:m.color }}>{m.value}</div>
              <div style={S.metricSub}>{m.sub}</div>
            </div>
          ))}
        </div>

        <div style={S.grid2}>
          {/* Mes chantiers */}
          <div style={S.card}>
            <div style={S.cardTitle}>🏗️ Mes chantiers — avancement</div>
            {mesChantiers.length === 0 ? (
              <div style={{ fontSize:13, color:T.textMuted, padding:'1rem 0' }}>Aucun chantier assigné.</div>
            ) : mesChantiers.map(c => (
              <div key={c.id} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.nom}</div>
                  <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>📍 {c.localisation} · Fin : {c.fin}</div>
                </div>
                <StatutBadge statut={c.statut} />
                <ProgressBar pct={c.pct} statut={c.statut} />
              </div>
            ))}
            <Link to="/chantiers" style={{ ...S.btn('outline'), textDecoration:'none', marginTop:4 }}>Voir mes chantiers →</Link>
          </div>

          <div>
            {/* Alertes de mes chantiers */}
            <div style={S.card}>
              <div style={S.cardTitle}>🔔 Mes alertes récentes</div>
              {ALERTES.filter(a => !a.lue).slice(0,4).length === 0 ? (
                <div style={{ fontSize:13, color:T.textMuted }}>Aucune alerte active. ✅</div>
              ) : ALERTES.filter(a => !a.lue).slice(0,4).map(a => (
                <div key={a.id} style={{ display:'flex', gap:10, padding:'8px 0', borderBottom:`1px solid ${T.border}` }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:a.niveau==='Urgent'?T.red:T.amber, marginTop:5, flexShrink:0 }} />
                  <div>
                    <div style={{ fontSize:13, fontWeight:500 }}>{a.titre}</div>
                    <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>{a.chantier} · {a.date}</div>
                  </div>
                </div>
              ))}
              <Link to="/alertes" style={{ ...S.btn('outline'), textDecoration:'none', marginTop:8 }}>Voir mes alertes →</Link>
            </div>

            {/* Actions rapides */}
            <div style={S.card}>
              <div style={S.cardTitle}>⚡ Actions rapides</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                <Link to="/rapports" style={{ ...S.btn('primary'), textDecoration:'none' }}>📄 Soumettre un rapport</Link>
                <Link to="/galerie" style={{ ...S.btn('outline'), textDecoration:'none' }}>📷 Ajouter des photos</Link>
                <Link to="/alertes" style={{ ...S.btn('outline'), textDecoration:'none', color:T.red, borderColor:T.redLight }}>🚨 Signaler un blocage</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD COMMERCIAL ───────────────────────────────────────────────
  if (role === ROLE.COMMERCIAL) {
    const mesClients = CLIENTS;
    const mesProjects = CHANTIERS;

    return (
      <div>
        <div style={S.pageTitle}>Tableau de bord commercial</div>
        <div style={S.pageSub}>Bonjour {user?.nom?.split(' ')[0]} — Suivi clients & contrats</div>

        <div style={S.grid4}>
          {[
            { label:'Clients actifs',    value: CLIENTS.filter(c=>c.statut==='Actif').length, color:T.navy,  sub:'Portefeuille actif' },
            { label:'Projets vendus',    value: CHANTIERS.length,                             color:T.blue,  sub:'Chantiers en cours' },
            { label:'CA total (M XOF)',  value: '200',                                        color:T.green, sub:'Montant contractualisé' },
            { label:'En négociation',    value: 2,                                             color:T.amber, sub:'Opportunités en cours' },
          ].map((m,i) => (
            <div key={i} style={S.metric}>
              <div style={S.metricLabel}>{m.label}</div>
              <div style={{ ...S.metricValue, color:m.color }}>{m.value}</div>
              <div style={S.metricSub}>{m.sub}</div>
            </div>
          ))}
        </div>

        <div style={S.grid2}>
          <div style={S.card}>
            <div style={S.cardTitle}>🤝 Mes clients</div>
            {CLIENTS.slice(0,5).map(c => (
              <div key={c.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:`1px solid ${T.border}` }}>
                <div style={{ width:34, height:34, borderRadius:'50%', background:T.blueLight, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:T.navy }}>{c.nom?.slice(0,2).toUpperCase()}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:500 }}>{c.nom}</div>
                  <div style={{ fontSize:11, color:T.textMuted }}>{c.secteur} · {c.ville}</div>
                </div>
                <span style={S.badge(c.statut==='Actif'?T.green:T.textMuted, c.statut==='Actif'?T.greenLight:T.grayLight)}>
                  {c.statut}
                </span>
              </div>
            ))}
            <Link to="/clients" style={{ ...S.btn('outline'), textDecoration:'none', marginTop:10 }}>Gérer mes clients →</Link>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>🏗️ Projets de mes clients</div>
            {CHANTIERS.slice(0,4).map(c => (
              <div key={c.id} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.nom}</div>
                  <div style={{ fontSize:11, color:T.textMuted }}>🏢 {c.client} · {c.pct}%</div>
                </div>
                <StatutBadge statut={c.statut} />
              </div>
            ))}
            <Link to="/chantiers" style={{ ...S.btn('outline'), textDecoration:'none' }}>Voir les projets →</Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD DIRECTION ─────────────────────────────────────────────────
  const repartition = [
    { label:"Pose de réseaux", count:2, color:T.blue   },
    { label:"Génie civil",     count:1, color:T.purple },
    { label:"Curage",          count:1, color:T.amber  },
    { label:"Construction",    count:1, color:T.green  },
    { label:"Réhabilitation",  count:1, color:T.coral  },
  ];

  return (
    <div>
      <div style={S.pageTitle}>Tableau de bord</div>
      <div style={S.pageSub}>Vue d'ensemble — Groupe VICAS</div>

      <div style={S.grid4} className="grid-4">
        {[
          { label:"Chantiers actifs",    value: CHANTIERS.length,                              sub:"6 en cours",                        color:T.navy  },
          { label:"Taux de réalisation", value: `${avgPct}%`,                                  sub:"Moyenne globale",                   color:T.blue  },
          { label:"Clients suivis",      value: CLIENTS.filter(c=>c.statut==="Actif").length,  sub:"Collectivités & entreprises",       color:T.blue  },
          { label:"Alertes actives",     value: ALERTES.filter(a=>!a.lue).length,              sub:"Non résolues",                      color:T.red   },
        ].map((m,i) => (
          <div key={i} style={S.metric}>
            <div style={S.metricLabel}>{m.label}</div>
            <div style={{ ...S.metricValue, color:m.color }}>{m.value}</div>
            <div style={S.metricSub}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={S.grid2} className="grid-2">
        <div style={S.card}>
          <div style={S.cardTitle}>🏗️ Chantiers — suivi avancement</div>
          {CHANTIERS.map(c => (
            <div key={c.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.nom}</div>
                <div style={{ fontSize:11, color:T.textMuted, marginTop:1 }}>{c.type} · {c.localisation}</div>
              </div>
              <StatutBadge statut={c.statut} />
              <ProgressBar pct={c.pct} statut={c.statut} />
            </div>
          ))}
          <Link to="/chantiers" style={S.btn("outline")}>Voir tous →</Link>
        </div>

        <div>
          <div style={S.card}>
            <div style={S.cardTitle}>🔔 Alertes récentes</div>
            {ALERTES.filter(a => !a.lue).map(a => (
              <div key={a.id} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:a.niveau==="Urgent"?T.red:T.amber, marginTop:5, flexShrink:0 }} />
                <div>
                  <div style={{ fontSize:13, fontWeight:500 }}>{a.titre}</div>
                  <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>{a.chantier} · {a.date}</div>
                </div>
              </div>
            ))}
            <Link to="/alertes" style={{ ...S.btn("outline"), marginTop:8 }}>Voir toutes →</Link>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>📊 Répartition des travaux</div>
            {repartition.map((r,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                <div style={{ width:10, height:10, borderRadius:2, background:r.color, flexShrink:0 }} />
                <div style={{ flex:1, fontSize:13 }}>{r.label}</div>
                <div style={{ fontSize:12, fontWeight:600, color:T.textMuted }}>{r.count}</div>
                <div style={{ width:80, height:6, background:T.grayLight, borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(r.count/CHANTIERS.length)*100}%`, background:r.color, borderRadius:3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
