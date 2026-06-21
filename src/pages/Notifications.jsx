import { useState } from 'react';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { Toggle } from '../components/UI';

const NOTIFS_DATA = [
  { id:1,  type:'alerte',   titre:'Dépassement délai — Réseau EU Pikine',      detail:'Le chantier accuse 12 jours de retard. Action requise.',    date:"Aujourd'hui, 09:02", lue:false, icon:'🚨', color:T.red    },
  { id:2,  type:'alerte',   titre:'Blocage technique — Ouvrage Guédiawaye',    detail:'Problème géotechnique signalé par Mariama Sow.',            date:"Aujourd'hui, 08:45", lue:false, icon:'⚠️', color:T.amber  },
  { id:3,  type:'rapport',  titre:'Rapport S11 soumis — Curage Plateau',       detail:'Ousmane Faye a soumis le rapport hebdomadaire.',            date:"Aujourd'hui, 07:30", lue:false, icon:'📄', color:T.blue   },
  { id:4,  type:'systeme',  titre:'Nouveau compte en attente de validation',   detail:'Pape Sarr a créé un compte — validation requise.',          date:'Hier, 17:20',         lue:false, icon:'👥', color:T.purple },
  { id:5,  type:'chantier', titre:'Avancement mis à jour — Chambre Rufisque',  detail:'Aminata Diop a mis à jour l\'avancement à 92%.',            date:'Hier, 15:10',         lue:true,  icon:'🏗️', color:T.navy   },
  { id:6,  type:'rapport',  titre:'Rapport S11 soumis — Extension Mbao',       detail:'Pape Sarr a soumis le rapport hebdomadaire.',              date:'Hier, 14:00',         lue:true,  icon:'📄', color:T.blue   },
  { id:7,  type:'alerte',   titre:'Livraison à risque — Curage Dakar-Plateau', detail:'La date de fin est dans 5 jours avec 78% d\'avancement.',   date:'25 mars, 16:30',      lue:true,  icon:'🔔', color:T.orange },
  { id:8,  type:'systeme',  titre:'Sauvegarde automatique effectuée',          detail:'Données sauvegardées avec succès — 4.2 MB.',               date:'25 mars, 03:00',      lue:true,  icon:'💾', color:T.green  },
  { id:9,  type:'chantier', titre:'Photos ajoutées — Chambre Rufisque',        detail:'7 nouvelles photos uploadées par Aminata Diop.',           date:'24 mars, 11:20',      lue:true,  icon:'🖼️', color:T.navy   },
  { id:10, type:'systeme',  titre:'Connexion depuis un nouvel appareil',       detail:'Firefox · Android — Dakar, SN. Si ce n\'est pas vous, changez votre mot de passe.', date:'22 mars, 20:11', lue:true, icon:'📱', color:T.amber },
];

const PREFS = [
  {
    groupe: 'Chantiers',
    icon: '🏗️',
    items: [
      { key: 'ch_retard',    label: 'Dépassement de délai',       desc: 'Notifier quand un chantier dépasse la date prévue',     email: true,  push: true,  app: true  },
      { key: 'ch_avancement',label: 'Mise à jour d\'avancement',  desc: 'Quand un chef de chantier met à jour la progression',   email: false, push: false, app: true  },
      { key: 'ch_photo',     label: 'Nouvelles photos',           desc: 'Quand des photos sont ajoutées à un chantier',          email: false, push: false, app: true  },
    ],
  },
  {
    groupe: 'Rapports',
    icon: '📄',
    items: [
      { key: 'rp_soumis',    label: 'Rapport soumis',             desc: 'Quand un rapport hebdomadaire est soumis',              email: true,  push: true,  app: true  },
      { key: 'rp_attente',   label: 'Rapport en attente',         desc: 'Rappel si un rapport n\'est pas soumis à temps',        email: true,  push: false, app: true  },
    ],
  },
  {
    groupe: 'Alertes',
    icon: '🚨',
    items: [
      { key: 'al_urgent',    label: 'Alertes urgentes',           desc: 'Toujours notifier pour les alertes de niveau Urgent',   email: true,  push: true,  app: true  },
      { key: 'al_attention', label: 'Alertes attention',          desc: 'Notifier pour les alertes de niveau Attention',         email: false, push: true,  app: true  },
    ],
  },
  {
    groupe: 'Système',
    icon: '⚙️',
    items: [
      { key: 'sy_compte',    label: 'Nouveaux comptes',           desc: 'Quand un utilisateur crée un compte (Direction seul.)', email: true,  push: true,  app: true  },
      { key: 'sy_securite',  label: 'Alertes de sécurité',        desc: 'Connexion depuis un nouvel appareil ou pays',           email: true,  push: true,  app: true  },
      { key: 'sy_backup',    label: 'Sauvegardes',                desc: 'Confirmer les sauvegardes automatiques quotidiennes',   email: false, push: false, app: false },
    ],
  },
];

export default function Notifications() {
  const [tab, setTab] = useState('centre');
  const [notifs, setNotifs] = useState(NOTIFS_DATA);
  const [filter, setFilter] = useState('toutes');
  const [prefs, setPrefs] = useState(() => {
    const init = {};
    PREFS.forEach(g => g.items.forEach(item => {
      init[item.key] = { email: item.email, push: item.push, app: item.app };
    }));
    return init;
  });

  const nonLues = notifs.filter(n => !n.lue).length;

  const marquerLue = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, lue: true } : n));
  const marquerToutes = () => setNotifs(ns => ns.map(n => ({ ...n, lue: true })));
  const supprimer = (id) => setNotifs(ns => ns.filter(n => n.id !== id));

  const TYPES = [
    { id: 'toutes',   label: 'Toutes'    },
    { id: 'alerte',   label: 'Alertes'   },
    { id: 'rapport',  label: 'Rapports'  },
    { id: 'chantier', label: 'Chantiers' },
    { id: 'systeme',  label: 'Système'   },
  ];

  const filtered = filter === 'toutes' ? notifs : notifs.filter(n => n.type === filter);

  const setPref = (key, canal, val) => setPrefs(p => ({ ...p, [key]: { ...p[key], [canal]: val } }));

  const TABS = [
    { id: 'centre',  label: 'Centre de notifications', icon: '🔔' },
    { id: 'prefs',   label: 'Préférences',             icon: '⚙️' },
  ];

  return (
    <div>
      <div style={S.pageTitle}>Notifications</div>
      <div style={S.pageSub}>
        {nonLues > 0
          ? `${nonLues} notification${nonLues > 1 ? 's' : ''} non lue${nonLues > 1 ? 's' : ''}`
          : 'Tout est à jour'}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: '1.25rem', background: T.white, padding: 4, borderRadius: 10, border: `1px solid ${T.border}`, width: 'fit-content' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '7px 16px', borderRadius: 7, border: 'none',
            background: tab === t.id ? T.navy : 'transparent',
            color: tab === t.id ? '#fff' : T.textMuted,
            fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.15s', position: 'relative',
          }}>
            {t.icon} {t.label}
            {t.id === 'centre' && nonLues > 0 && (
              <span style={{ background: T.orange, color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 10 }}>{nonLues}</span>
            )}
          </button>
        ))}
      </div>

      {/* CENTRE */}
      {tab === 'centre' && (
        <div style={S.card}>
          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 6, flex: 1, flexWrap: 'wrap' }}>
              {TYPES.map(t => (
                <button key={t.id} onClick={() => setFilter(t.id)} style={S.filterBtn(filter === t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
            {nonLues > 0 && (
              <button onClick={marquerToutes} style={{ fontSize: 12, color: T.blue, background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 500 }}>
                ✓ Tout marquer comme lu
              </button>
            )}
          </div>

          {/* Liste */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: T.textMuted }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Aucune notification</div>
            </div>
          ) : (
            filtered.map((n, i) => (
              <div key={n.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '14px 12px', borderRadius: 10, marginBottom: 4,
                background: n.lue ? 'transparent' : `${n.color}08`,
                border: `1px solid ${n.lue ? 'transparent' : `${n.color}20`}`,
                transition: 'background 0.2s',
              }}>
                {/* Point non lu */}
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.lue ? 'transparent' : n.color, marginTop: 6, flexShrink: 0 }} />

                {/* Icône */}
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${n.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {n.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: n.lue ? 400 : 600, color: T.textPrimary }}>{n.titre}</div>
                  <div style={{ fontSize: 12, color: T.textMuted, marginTop: 3, lineHeight: 1.5 }}>{n.detail}</div>
                  <div style={{ fontSize: 11, color: T.textMuted, marginTop: 6 }}>{n.date}</div>
                </div>

                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {!n.lue && (
                    <button onClick={() => marquerLue(n.id)} title="Marquer comme lu" style={{ background: T.blueLight, border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 11, color: T.blue, fontWeight: 500 }}>
                      ✓ Lu
                    </button>
                  )}
                  <button onClick={() => supprimer(n.id)} title="Supprimer" style={{ background: T.redLight, border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 11, color: T.red }}>
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* PRÉFÉRENCES */}
      {tab === 'prefs' && (
        <div>
          {/* Canaux globaux */}
          <div style={{ ...S.card, marginBottom: '1rem' }}>
            <div style={S.cardTitle}>📡 Canaux de notification</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { icon: '📧', label: 'Email',        desc: 'c.ndiaye@vicas.sn',          val: true  },
                { icon: '📲', label: 'Push mobile',  desc: 'Application mobile VICAS',    val: true  },
                { icon: '🔔', label: 'In-app',       desc: 'Notifications dans le CRM',   val: true  },
              ].map((c, i) => {
                const [v, setV] = useState(c.val);
                return (
                  <div key={i} style={{ background: T.bg, borderRadius: 10, padding: '14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 22 }}>{c.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</div>
                      <div style={{ fontSize: 11, color: T.textMuted }}>{c.desc}</div>
                    </div>
                    <Toggle value={v} onChange={setV} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Préférences par type */}
          {PREFS.map((groupe, gi) => (
            <div key={gi} style={{ ...S.card, marginBottom: '1rem' }}>
              <div style={S.cardTitle}>{groupe.icon} {groupe.groupe}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '0 16px', alignItems: 'center' }}>
                {/* Header */}
                <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', paddingBottom: 8, borderBottom: `1px solid ${T.border}` }} />
                {['Email', 'Push', 'App'].map(c => (
                  <div key={c} style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center', paddingBottom: 8, borderBottom: `1px solid ${T.border}` }}>{c}</div>
                ))}

                {/* Rows */}
                {groupe.items.map((item, ii) => (
                  <>
                    <div key={`lbl-${ii}`} style={{ padding: '12px 0', borderBottom: ii < groupe.items.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{item.desc}</div>
                    </div>
                    {['email', 'push', 'app'].map(canal => (
                      <div key={`${item.key}-${canal}`} style={{ display: 'flex', justifyContent: 'center', borderBottom: ii < groupe.items.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                        <Toggle value={prefs[item.key]?.[canal] ?? false} onChange={v => setPref(item.key, canal, v)} />
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </div>
          ))}

          {/* Horaires silencieux */}
          <div style={S.card}>
            <div style={S.cardTitle}>🌙 Mode silencieux</div>
            <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 14 }}>
              Désactiver toutes les notifications push pendant ces horaires.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <label style={S.label}>De</label>
                <input type="time" defaultValue="22:00" style={{ padding: '8px 12px', fontSize: 13, borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.white, color: T.textPrimary, outline: 'none' }} />
              </div>
              <div>
                <label style={S.label}>À</label>
                <input type="time" defaultValue="07:00" style={{ padding: '8px 12px', fontSize: 13, borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.white, color: T.textPrimary, outline: 'none' }} />
              </div>
              <div>
                <label style={S.label}>Jours</label>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['L','M','Me','J','V','S','D'].map((j, i) => {
                    const [active, setActive] = useState(i >= 5);
                    return (
                      <button key={j} onClick={() => setActive(a => !a)} style={{
                        width: 30, height: 30, borderRadius: '50%', border: 'none',
                        background: active ? T.navy : T.grayLight,
                        color: active ? '#fff' : T.textMuted,
                        fontSize: 11, fontWeight: 600, cursor: 'pointer',
                      }}>{j}</button>
                    );
                  })}
                </div>
              </div>
            </div>
            <button style={{ ...S.btn('primary'), marginTop: 16 }}>💾 Enregistrer</button>
          </div>
        </div>
      )}
    </div>
  );
}
