import { useState } from 'react';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { Toggle } from '../components/UI';

export default function MonProfil() {
  const [tab, setTab] = useState('infos');
  const [saved, setSaved] = useState(false);
  const [showPwd, setShowPwd] = useState({ old: false, new: false, confirm: false });

  const [form, setForm] = useState({
    prenom: 'Cheikh Tidiane', nom: 'Ndiaye', email: 'c.ndiaye@vicas.sn',
    tel: '+221 77 123 45 67', poste: 'Directeur Général', departement: 'Direction',
    adresse: 'Dakar, Sénégal', bio: 'Directeur Général du Groupe VICAS SARL, spécialiste en gestion de projets d\'assainissement.',
  });
  const [pwd, setPwd] = useState({ old: '', new: '', confirm: '' });
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setPw = (k, v) => setPwd(p => ({ ...p, [k]: v }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const handlePwd = () => {
    if (!pwd.old) { setPwdError('Saisissez votre mot de passe actuel.'); return; }
    if (pwd.new.length < 8) { setPwdError('Le nouveau mot de passe doit faire au moins 8 caractères.'); return; }
    if (pwd.new !== pwd.confirm) { setPwdError('Les mots de passe ne correspondent pas.'); return; }
    setPwdError(''); setPwdSuccess(true);
    setPwd({ old: '', new: '', confirm: '' });
    setTimeout(() => setPwdSuccess(false), 3000);
  };

  const initiales = `${form.prenom[0]}${form.nom[0]}`;

  const inp = (key, type = 'text', placeholder = '') => (
    <input
      type={type} value={form[key]} placeholder={placeholder}
      onChange={e => set(key, e.target.value)}
      style={{ width: '100%', padding: '10px 12px', fontSize: 13, borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.white, color: T.textPrimary, outline: 'none', boxSizing: 'border-box' }}
    />
  );

  const pwdInp = (key, label) => (
    <div style={{ marginBottom: 14 }}>
      <label style={S.label}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={showPwd[key] ? 'text' : 'password'} value={pwd[key]}
          onChange={e => setPw(key, e.target.value)}
          style={{ width: '100%', padding: '10px 40px 10px 12px', fontSize: 13, borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.white, color: T.textPrimary, outline: 'none', boxSizing: 'border-box' }}
        />
        <button type="button" onClick={() => setShowPwd(s => ({ ...s, [key]: !s[key] }))}
          style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, fontSize: 14 }}>
          {showPwd[key] ? '🙈' : '👁'}
        </button>
      </div>
    </div>
  );

  const TABS = [
    { id: 'infos',    label: 'Informations',    icon: '👤' },
    { id: 'securite', label: 'Sécurité',        icon: '🔒' },
    { id: 'activite', label: 'Activité récente', icon: '📋' },
  ];

  const ACTIVITES = [
    { action: 'Connexion réussie',          detail: 'Depuis Chrome · Windows',        date: "Aujourd'hui, 08:32", icon: '🔑', color: T.green   },
    { action: 'Rapport validé',             detail: 'Réseau EU Pikine — S11',         date: "Aujourd'hui, 09:15", icon: '✅', color: T.blue    },
    { action: 'Alerte créée',               detail: 'Dépassement délai Guédiawaye',   date: 'Hier, 16:44',        icon: '🔔', color: T.orange  },
    { action: 'Chantier mis à jour',        detail: 'Chambre de visite Rufisque',     date: 'Hier, 14:20',        icon: '🏗️', color: T.navy    },
    { action: 'Utilisateur créé',           detail: 'Pape Sarr — Chef de chantier',  date: '25 mars, 11:00',     icon: '👥', color: T.purple  },
    { action: 'Paramètres modifiés',        detail: 'Fuseau horaire Africa/Dakar',    date: '24 mars, 09:30',     icon: '⚙️', color: T.textMuted },
    { action: 'Connexion depuis un nouvel appareil', detail: 'Firefox · Android',     date: '22 mars, 20:11',     icon: '⚠️', color: T.amber   },
  ];

  return (
    <div>
      <div style={S.pageTitle}>Mon profil</div>
      <div style={S.pageSub}>Gérez vos informations personnelles et votre sécurité</div>

      {saved && (
        <div style={{ background: T.greenLight, border: `1px solid #B0DDB8`, borderRadius: 9, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: T.green, display: 'flex', alignItems: 'center', gap: 8 }}>
          ✅ Profil mis à jour avec succès.
        </div>
      )}

      {/* Carte identité */}
      <div style={{ ...S.card, display: 'flex', alignItems: 'center', gap: 20, marginBottom: '1.25rem', padding: '1.5rem' }}>
        {/* Avatar */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: `linear-gradient(135deg, ${T.navy}, ${T.blue})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 800, color: '#fff',
            border: `3px solid rgba(232,101,10,0.5)`,
            boxShadow: '0 4px 16px rgba(15,43,91,0.2)',
          }}>{initiales}</div>
          <button style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 26, height: 26, borderRadius: '50%',
            background: T.orange, border: `2px solid ${T.white}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 12,
          }}>✏️</button>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: T.navy }}>{form.prenom} {form.nom}</div>
          <div style={{ fontSize: 13, color: T.textMuted, marginTop: 2 }}>{form.poste} · {form.departement}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <span style={S.badge(T.navy, T.blueLight)}>👑 Direction</span>
            <span style={S.badge(T.green, T.greenLight)}>● Actif</span>
            <span style={S.badge(T.textMuted, T.grayLight)}>Membre depuis 2024</span>
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: 12, color: T.textMuted }}>
          <div>✉ {form.email}</div>
          <div style={{ marginTop: 4 }}>📞 {form.tel}</div>
          <div style={{ marginTop: 4 }}>📍 {form.adresse}</div>
        </div>
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
            transition: 'all 0.15s',
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      {/* INFOS */}
      {tab === 'infos' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={S.card}>
            <div style={S.cardTitle}>👤 Informations personnelles</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div><label style={S.label}>Prénom</label>{inp('prenom')}</div>
              <div><label style={S.label}>Nom</label>{inp('nom')}</div>
            </div>
            <div style={{ marginBottom: 12 }}><label style={S.label}>Email professionnel</label>{inp('email', 'email')}</div>
            <div style={{ marginBottom: 12 }}><label style={S.label}>Téléphone</label>{inp('tel', 'tel')}</div>
            <div style={{ marginBottom: 12 }}><label style={S.label}>Adresse</label>{inp('adresse')}</div>
            <div style={{ marginBottom: 16 }}>
              <label style={S.label}>Biographie</label>
              <textarea value={form.bio} onChange={e => set('bio', e.target.value)} rows={3}
                style={{ width: '100%', padding: '10px 12px', fontSize: 13, borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.white, color: T.textPrimary, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
            <button onClick={handleSave} style={S.btn('primary')}>💾 Enregistrer</button>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>🏢 Informations professionnelles</div>
            <div style={{ marginBottom: 12 }}><label style={S.label}>Poste</label>{inp('poste')}</div>
            <div style={{ marginBottom: 12 }}>
              <label style={S.label}>Département / Rôle</label>
              <select value={form.departement} onChange={e => set('departement', e.target.value)}
                style={{ width: '100%', padding: '10px 12px', fontSize: 13, borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.white, color: T.textPrimary, outline: 'none' }}>
                <option>Direction</option>
                <option>Chef de chantier</option>
                <option>Commercial</option>
              </select>
            </div>

            {/* Statistiques */}
            <div style={{ marginTop: 20 }}>
              <div style={S.cardTitle}>📊 Activité</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { val: '47', lbl: 'Chantiers suivis', color: T.navy    },
                  { val: '12', lbl: 'Rapports validés', color: T.blue    },
                  { val: '5',  lbl: 'Alertes traitées', color: T.orange  },
                  { val: '98%',lbl: 'Taux ponctualité', color: T.green   },
                ].map((s, i) => (
                  <div key={i} style={{ background: T.bg, borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SÉCURITÉ */}
      {tab === 'securite' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={S.card}>
            <div style={S.cardTitle}>🔒 Changer le mot de passe</div>

            {pwdError && (
              <div style={{ background: T.redLight, border: `1px solid #F5C0C0`, borderRadius: 8, padding: '9px 12px', marginBottom: 14, fontSize: 13, color: T.red, display: 'flex', alignItems: 'center', gap: 7 }}>
                ⚠️ {pwdError}
              </div>
            )}
            {pwdSuccess && (
              <div style={{ background: T.greenLight, border: `1px solid #B0DDB8`, borderRadius: 8, padding: '9px 12px', marginBottom: 14, fontSize: 13, color: T.green, display: 'flex', alignItems: 'center', gap: 7 }}>
                ✅ Mot de passe modifié avec succès.
              </div>
            )}

            {pwdInp('old', 'Mot de passe actuel')}
            {pwdInp('new', 'Nouveau mot de passe')}

            {/* Force */}
            {pwd.new && (
              <div style={{ marginTop: -8, marginBottom: 14 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                  {[pwd.new.length >= 8, /[A-Z]/.test(pwd.new), /[0-9]/.test(pwd.new), /[^A-Za-z0-9]/.test(pwd.new)].map((ok, i) => (
                    <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: ok ? T.green : T.grayMid, transition: 'background 0.3s' }} />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {[
                    { ok: pwd.new.length >= 8, lbl: '8 car.' },
                    { ok: /[A-Z]/.test(pwd.new), lbl: 'Majuscule' },
                    { ok: /[0-9]/.test(pwd.new), lbl: 'Chiffre' },
                    { ok: /[^A-Za-z0-9]/.test(pwd.new), lbl: 'Symbole' },
                  ].map((r, i) => (
                    <span key={i} style={{ fontSize: 11, color: r.ok ? T.green : T.textMuted }}>
                      {r.ok ? '✅' : '○'} {r.lbl}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {pwdInp('confirm', 'Confirmer le nouveau mot de passe')}
            {pwd.confirm && pwd.new !== pwd.confirm && <div style={{ fontSize: 12, color: T.red, marginTop: -10, marginBottom: 10 }}>⚠ Les mots de passe ne correspondent pas.</div>}
            {pwd.confirm && pwd.new === pwd.confirm && pwd.new && <div style={{ fontSize: 12, color: T.green, marginTop: -10, marginBottom: 10 }}>✅ Les mots de passe correspondent.</div>}

            <button onClick={handlePwd} style={S.btn('primary')}>🔒 Mettre à jour</button>
          </div>

          <div>
            <div style={S.card}>
              <div style={S.cardTitle}>🛡️ Sécurité du compte</div>
              {[
                { label: 'Double authentification (2FA)', desc: 'Recevoir un code par SMS à chaque connexion', val: false },
                { label: 'Alertes de connexion',          desc: 'Notifier en cas de connexion depuis un nouvel appareil', val: true },
                { label: 'Sessions multiples',            desc: 'Autoriser plusieurs connexions simultanées', val: true },
              ].map((item, i) => {
                const [v, setV] = useState(item.val);
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${T.border}` }}>
                    <Toggle value={v} onChange={setV} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: T.textMuted }}>{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>📱 Sessions actives</div>
              {[
                { device: 'Chrome · Windows 11',  lieu: 'Dakar, SN',  date: "Maintenant",         actif: true  },
                { device: 'Firefox · Android 13', lieu: 'Dakar, SN',  date: 'Il y a 2 jours',     actif: false },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 24 }}>{s.device.includes('Android') ? '📱' : '💻'}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{s.device}</div>
                    <div style={{ fontSize: 11, color: T.textMuted }}>{s.lieu} · {s.date}</div>
                  </div>
                  {s.actif
                    ? <span style={S.badge(T.green, T.greenLight)}>● Actif</span>
                    : <button style={{ fontSize: 11, color: T.red, background: T.redLight, border: 'none', borderRadius: 6, padding: '3px 8px', cursor: 'pointer' }}>Révoquer</button>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ACTIVITÉ */}
      {tab === 'activite' && (
        <div style={S.card}>
          <div style={{ ...S.sectionHeader, marginBottom: '1rem' }}>
            <div style={S.cardTitle}>📋 Historique d'activité</div>
            <button style={S.btn('outline')}>⬇️ Exporter</button>
          </div>
          <div>
            {ACTIVITES.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 0', borderBottom: i < ACTIVITES.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.textPrimary }}>{a.action}</div>
                  <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>{a.detail}</div>
                </div>
                <div style={{ fontSize: 11, color: T.textMuted, whiteSpace: 'nowrap', flexShrink: 0 }}>{a.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
