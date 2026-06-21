import { useState } from 'react';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { Toggle } from '../components/UI';
import { useAuth, can } from '../context/AuthContext';

export default function Parametres() {
  const { user } = useAuth();
  const peutModifierTypes = can(user, 'modifier_types');
  const peutModifierParametres = can(user, 'modifier_parametres');
  const [activeTab, setActiveTab] = useState('organisation');
  const [saved, setSaved]   = useState(false);

  const [org, setOrg] = useState({
    nom: 'Groupe VICAS SARL',
    secteur: 'Assainissement & Génie Civil',
    email: 'contact@vicas.sn',
    tel: '+221 33 XXX XX XX',
    adresse: 'Dakar, Sénégal',
    siret: 'SN-DKR-2010-B-12345',
    devise: 'XOF',
    langue: 'fr',
    timezone: 'Africa/Dakar',
  });

  const [types, setTypes] = useState([
    'Construction', 'Curage', 'Pose de réseaux',
    'Évacuation', 'Entretien', 'Réhabilitation', 'Ouvrage d\'art',
  ]);
  const [newType, setNewType] = useState('');

  const [syst, setSyst] = useState({
    maintenance: false,
    logs: true,
    backup_auto: true,
    session_timeout: 30,
  });

  const [appearance, setAppearance] = useState({
    theme: 'light',
    density: 'normal',
    sidebar_collapsed: false,
  });

  const setO = (k, v) => setOrg(o => ({ ...o, [k]: v }));
  const setSy = (k, v) => setSyst(s => ({ ...s, [k]: v }));
  const setAp = (k, v) => setAppearance(a => ({ ...a, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addType = () => {
    if (newType.trim() && !types.includes(newType.trim())) {
      setTypes(t => [...t, newType.trim()]);
      setNewType('');
    }
  };

  const removeType = (t) => setTypes(ts => ts.filter(x => x !== t));

  const TABS = [
    { id: 'organisation', label: 'Organisation',   icon: '🏢' },
    { id: 'chantiers',    label: 'Chantiers',       icon: '🏗️' },
    { id: 'apparence',    label: 'Apparence',       icon: '🎨' },
    { id: 'systeme',      label: 'Système',         icon: '⚙️' },
  ];

  const inputStyle = {
    width: '100%', padding: '10px 12px', fontSize: 13,
    borderRadius: 8, border: `1.5px solid ${T.border}`,
    background: T.white, color: T.textPrimary, outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div>
      <div style={S.pageTitle}>Paramètres</div>
      <div style={S.pageSub}>Configuration globale du CRM VICAS</div>

      {saved && (
        <div style={{ background: T.greenLight, border: `1px solid #B0DDB8`, borderRadius: 9, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: T.green, display: 'flex', alignItems: 'center', gap: 8 }}>
          ✅ Paramètres enregistrés avec succès.
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: '1.25rem', background: T.white, padding: 4, borderRadius: 10, border: `1px solid ${T.border}`, width: 'fit-content', flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: '7px 16px', borderRadius: 7, border: 'none',
            background: activeTab === t.id ? T.navy : 'transparent',
            color: activeTab === t.id ? '#fff' : T.textMuted,
            fontSize: 13, fontWeight: activeTab === t.id ? 600 : 400,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.15s',
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ORGANISATION */}
      {activeTab === 'organisation' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
          <div style={S.card}>
            <div style={S.cardTitle}>🏢 Informations de l'entreprise</div>
            {[
              { label: 'Nom de l\'organisation', key: 'nom'    },
              { label: 'Secteur d\'activité',    key: 'secteur'},
              { label: 'Email de contact',        key: 'email'  },
              { label: 'Téléphone',               key: 'tel'    },
              { label: 'Adresse',                 key: 'adresse'},
              { label: 'N° NINEA / SIRET',        key: 'siret'  },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 12 }}>
                <label style={S.label}>{f.label}</label>
                <input value={org[f.key]} onChange={e => setO(f.key, e.target.value)} style={inputStyle} />
              </div>
            ))}
            <button onClick={handleSave} style={S.btn('primary')}>💾 Enregistrer</button>
          </div>

          <div>
            <div style={S.card}>
              <div style={S.cardTitle}>🌍 Localisation & Format</div>
              <div style={{ marginBottom: 12 }}>
                <label style={S.label}>Devise</label>
                <select value={org.devise} onChange={e => setO('devise', e.target.value)} style={{ ...inputStyle, padding: '9px 12px' }}>
                  <option value="XOF">Franc CFA (XOF)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="USD">Dollar US (USD)</option>
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={S.label}>Langue</label>
                <select value={org.langue} onChange={e => setO('langue', e.target.value)} style={{ ...inputStyle, padding: '9px 12px' }}>
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="wo">Wolof</option>
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={S.label}>Fuseau horaire</label>
                <select value={org.timezone} onChange={e => setO('timezone', e.target.value)} style={{ ...inputStyle, padding: '9px 12px' }}>
                  <option value="Africa/Dakar">Africa/Dakar (GMT+0)</option>
                  <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                </select>
              </div>
              <button onClick={handleSave} style={S.btn('primary')}>💾 Enregistrer</button>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>ℹ️ À propos</div>
              <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 2 }}>
                <div>CRM VICAS — <strong>v1.0.0</strong></div>
                <div>Développé par Mame Awa Bakhoum SARR & Ndeye Maty NIANG</div>
                <div>Cycle Licence L3GLSIb</div>
                <div style={{ marginTop: 6 }}>
                  <a href="mailto:contact@vicas.sn" style={{ color: T.blue }}>contact@vicas.sn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHANTIERS */}
      {activeTab === 'chantiers' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
          <div style={S.card}>
            <div style={S.cardTitle}>🔧 Types de travaux</div>
            {!peutModifierTypes && (
              <div style={{ background:T.orangeLight, border:`1px solid rgba(232,101,10,0.2)`, borderRadius:8, padding:'8px 12px', marginBottom:12, fontSize:12, color:'#8B3A06' }}>
                🔒 Seule la Direction peut modifier les types de travaux.
              </div>
            )}
            {types.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.orange, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 13 }}>{t}</span>
                {peutModifierTypes && (
                  <button onClick={() => removeType(t)} style={{ background: T.redLight, border: 'none', borderRadius: 5, padding: '3px 7px', cursor: 'pointer', fontSize: 12, color: T.red }}>✕</button>
                )}
              </div>
            ))}
            {peutModifierTypes && (
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <input value={newType} onChange={e => setNewType(e.target.value)} placeholder="Nouveau type…" style={{ ...inputStyle, flex: 1 }}
                  onKeyDown={e => e.key === 'Enter' && addType()} />
                <button onClick={addType} style={S.btn('primary')}>+ Ajouter</button>
              </div>
            )}
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>📊 Règles de suivi</div>
            {[
              { label: 'Seuil d\'alerte retard (jours)', key: 'seuil', type: 'range', min:1, max:30, val:7 },
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <label style={S.label}>{r.label} : <strong>{r.val}j</strong></label>
                <input type="range" min={r.min} max={r.max} defaultValue={r.val} style={{ width: '100%', accentColor: T.orange }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.textMuted, marginTop: 2 }}>
                  <span>1j</span><span>30j</span>
                </div>
              </div>
            ))}

            {[
              { key: 'validationRapports', label: 'Validation obligatoire des rapports', desc: 'Les rapports doivent être validés par la Direction', val: true  },
              { key: 'photosObligatoires', label: 'Photos obligatoires',                 desc: 'Exiger des photos à chaque rapport',                val: false },
              { key: 'signatureElec',      label: 'Signature électronique',              desc: 'Activer la signature des PV de réception',         val: false },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
                <Toggle value={regles[item.key]} onChange={v => setRegles(r => ({ ...r, [item.key]: v }))} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>{item.desc}</div>
                </div>
              </div>
            ))}
            <button onClick={handleSave} style={{ ...S.btn('primary'), marginTop: 14 }}>💾 Enregistrer</button>
          </div>
        </div>
      )}

      {/* APPARENCE */}
      {activeTab === 'apparence' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
          <div style={S.card}>
            <div style={S.cardTitle}>🎨 Thème</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              {[
                { id: 'light', label: 'Clair',   icon: '☀️', preview: '#F4F6FB' },
                { id: 'dark',  label: 'Sombre',  icon: '🌙', preview: '#1A1D2E' },
                { id: 'auto',  label: 'Auto',    icon: '💻', preview: 'linear-gradient(135deg, #F4F6FB 50%, #1A1D2E 50%)' },
              ].map(t => (
                <div key={t.id}
                  onClick={() => setAp('theme', t.id)}
                  style={{
                    flex: 1, borderRadius: 10, border: `2px solid ${appearance.theme===t.id ? T.orange : T.border}`,
                    padding: '12px', cursor: 'pointer', textAlign: 'center',
                    background: appearance.theme===t.id ? T.orangeLight : T.white,
                    transition: 'all 0.15s',
                  }}>
                  <div style={{ width: '100%', height: 40, borderRadius: 6, background: t.preview, marginBottom: 8, border: `1px solid ${T.border}` }} />
                  <div style={{ fontSize: 13, fontWeight: appearance.theme===t.id ? 600 : 400 }}>{t.icon} {t.label}</div>
                </div>
              ))}
            </div>

            <div style={S.cardTitle}>📐 Densité d'affichage</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { id: 'compact', label: 'Compact' },
                { id: 'normal',  label: 'Normal'  },
                { id: 'spacious',label: 'Spacieux' },
              ].map(d => (
                <button key={d.id}
                  onClick={() => setAp('density', d.id)}
                  style={{
                    flex: 1, padding: '9px', borderRadius: 8,
                    border: `1.5px solid ${appearance.density===d.id ? T.blue : T.border}`,
                    background: appearance.density===d.id ? T.blueLight : T.white,
                    color: appearance.density===d.id ? T.navy : T.textMuted,
                    fontSize: 13, fontWeight: appearance.density===d.id ? 600 : 400,
                    cursor: 'pointer',
                  }}>{d.label}</button>
              ))}
            </div>

            <button onClick={handleSave} style={{ ...S.btn('primary'), marginTop: 16 }}>💾 Appliquer</button>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>🖥️ Préférences d'interface</div>
            {[
              { label: 'Sidebar réduite par défaut', key: 'sidebar_collapsed', desc: 'Démarrer avec le menu réduit' },
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
                <Toggle value={appearance[item.key]} onChange={v => setAp(item.key, v)} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>{item.desc}</div>
                </div>
              </div>
            ))}

            {/* Couleur accentuation */}
            <div style={{ marginTop: 16 }}>
              <div style={S.cardTitle}>🎨 Couleur d'accentuation</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                {[
                  { color: T.orange, label: 'Orange' },
                  { color: T.blue,   label: 'Bleu'   },
                  { color: T.green,  label: 'Vert'   },
                  { color: '#8B5CF6',label: 'Violet' },
                ].map((c, i) => (
                  <div key={i} title={c.label} style={{
                    width: 30, height: 30, borderRadius: '50%', background: c.color,
                    border: i === 0 ? `3px solid ${T.navy}` : '3px solid transparent',
                    cursor: 'pointer', flexShrink: 0,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SYSTÈME */}
      {activeTab === 'systeme' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
          <div style={S.card}>
            <div style={S.cardTitle}>⚙️ Options système</div>
            {[
              { key: 'maintenance', label: 'Mode maintenance',    desc: 'Bloquer l\'accès aux utilisateurs non-administrateurs' },
              { key: 'logs',        label: 'Journalisation',      desc: 'Enregistrer les actions des utilisateurs'              },
              { key: 'backup_auto', label: 'Sauvegarde auto',     desc: 'Sauvegarde quotidienne des données'                    },
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${T.border}` }}>
                <Toggle value={syst[item.key]} onChange={v => setSy(item.key, v)} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>{item.desc}</div>
                </div>
                {item.key === 'maintenance' && syst.maintenance && (
                  <span style={{ fontSize: 10, background: T.redLight, color: T.red, padding: '2px 6px', borderRadius: 8, fontWeight: 700, flexShrink: 0 }}>ACTIF</span>
                )}
              </div>
            ))}

            <div style={{ marginTop: 14 }}>
              <label style={S.label}>Expiration de session (minutes) : <strong>{syst.session_timeout}min</strong></label>
              <input type="range" min={5} max={120} step={5} value={syst.session_timeout}
                onChange={e => setSy('session_timeout', +e.target.value)}
                style={{ width: '100%', accentColor: T.orange }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.textMuted, marginTop: 2 }}>
                <span>5min</span><span>120min</span>
              </div>
            </div>

            <button onClick={handleSave} style={{ ...S.btn('primary'), marginTop: 14 }}>💾 Enregistrer</button>
          </div>

          <div>
            <div style={S.card}>
              <div style={S.cardTitle}>💾 Sauvegarde & Restauration</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 14, lineHeight: 1.7 }}>
                Dernière sauvegarde : <strong>Aujourd'hui à 03:00</strong><br />
                Taille : <strong>4.2 MB</strong>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button style={S.btn('primary')}>⬇️ Exporter les données</button>
                <button style={S.btn('outline')}>⬆️ Importer</button>
              </div>
            </div>

            {user?.role === 'Administrateur' && (
            <div style={{ ...S.card, border: `1.5px solid ${T.redLight}` }}>
              <div style={{ ...S.cardTitle, color: T.red }}>⚠️ Zone dangereuse</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 14, lineHeight: 1.6 }}>
                Ces actions sont irréversibles. Procédez avec précaution.
              </div>
              {[
                { label: '🗑️ Vider les logs système',    desc: 'Supprimer tous les journaux d\'activité' },
                { label: '♻️ Réinitialiser les données', desc: 'Remettre à zéro les données de démo'    },
              ].map((a, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <button style={{
                    width: '100%', padding: '9px 14px', borderRadius: 8,
                    border: `1px solid ${T.redLight}`, background: T.white,
                    color: T.red, fontSize: 13, cursor: 'pointer', textAlign: 'left', fontWeight: 500,
                  }}>{a.label}</button>
                  <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2, paddingLeft: 4 }}>{a.desc}</div>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
