import { useState } from 'react';
import { T } from '../styles/tokens';

// Comptes demo (mot de passe par défaut : "vicas2025")
const DEMO_ACCOUNTS = [
  { email: "c.ndiaye@vicas.sn",  password: "vicas2025", nom: "Cheikh Tidiane Ndiaye", role: "Direction"        },
  { email: "i.diallo@vicas.sn",  password: "vicas2025", nom: "Ibrahima Diallo",       role: "Chef de chantier" },
  { email: "m.sow@vicas.sn",     password: "vicas2025", nom: "Mariama Sow",           role: "Chef de chantier" },
  { email: "o.faye@vicas.sn",    password: "vicas2025", nom: "Ousmane Faye",          role: "Chef de chantier" },
  { email: "a.diop@vicas.sn",    password: "vicas2025", nom: "Aminata Diop",          role: "Commercial"       },
  { email: "p.sarr@vicas.sn",    password: "vicas2025", nom: "Pape Sarr",             role: "Chef de chantier" },
];

// ─── Shared UI ──────────────────────────────────────────────────────────────

function PanneauGauche() {
  return (
    <div style={{
      width: '46%', minWidth: 340,
      background: `linear-gradient(160deg, ${T.navy} 0%, ${T.navyMid} 55%, #0D2348 100%)`,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: '3rem', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position:'absolute', top:-100, right:-100, width:380, height:380, borderRadius:'50%', background:'rgba(30,91,184,0.18)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-80, left:-60, width:280, height:280, borderRadius:'50%', background:'rgba(232,101,10,0.12)', pointerEvents:'none' }} />

      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:14, position:'relative' }}>
        <div style={{ width:46, height:46, borderRadius:12, background:'linear-gradient(135deg, #E8650A 0%, #F89B52 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:800, color:'#fff', boxShadow:'0 4px 16px rgba(232,101,10,0.45)', flexShrink:0 }}>V</div>
        <div>
          <div style={{ fontWeight:800, fontSize:20, color:'#fff', letterSpacing:'-0.02em', lineHeight:1 }}>VICAS</div>
          <div style={{ fontSize:11, color:T.orangeMid, fontWeight:500, letterSpacing:'0.14em', marginTop:3 }}>CRM</div>
        </div>
      </div>

      {/* Slogan */}
      <div style={{ position:'relative' }}>
        <div style={{ display:'inline-block', background:'rgba(232,101,10,0.18)', color:T.orangeMid, fontSize:11, fontWeight:600, letterSpacing:'0.12em', padding:'4px 12px', borderRadius:20, marginBottom:20, border:'1px solid rgba(232,101,10,0.25)', textTransform:'uppercase' }}>
          Gestion de chantiers
        </div>
        <h1 style={{ fontSize:38, fontWeight:800, color:'#fff', lineHeight:1.15, margin:'0 0 18px', letterSpacing:'-0.03em' }}>
          Pilotez vos<br />
          <span style={{ background:`linear-gradient(90deg, ${T.orange}, ${T.orangeMid})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>projets terrain</span>
          <br />en toute clarté.
        </h1>
        <p style={{ fontSize:14, color:T.sidebarText, lineHeight:1.65, margin:0, maxWidth:340 }}>
          Suivez vos chantiers, gérez vos équipes et gardez le contrôle sur chaque étape — depuis un seul tableau de bord.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', gap:32, position:'relative' }}>
        {[{ val:'47', lbl:'Chantiers actifs' }, { val:'12', lbl:'Équipes terrain' }, { val:'98%', lbl:'Taux de livraison' }].map((s,i) => (
          <div key={i}>
            <div style={{ fontSize:24, fontWeight:800, color:'#fff', letterSpacing:'-0.03em' }}>{s.val}</div>
            <div style={{ fontSize:11, color:T.sidebarText, marginTop:2 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, type="text", value, onChange, onFocus, onBlur, focused, name, placeholder, icon, extra }) {
  return (
    <div style={{ marginBottom:18 }}>
      <label style={{ display:'block', fontSize:12, fontWeight:600, color:T.textPrimary, marginBottom:6 }}>{label}</label>
      <div style={{ position:'relative' }}>
        <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:15, pointerEvents:'none', opacity:0.45 }}>{icon}</span>
        <input
          type={type} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={onFocus} onBlur={onBlur}
          style={{
            width:'100%', padding:'11px 12px 11px 36px',
            fontSize:14, borderRadius:9,
            border:`1.5px solid ${focused===name ? T.blue : T.border}`,
            background: focused===name ? T.bluePale : T.white,
            color:T.textPrimary, outline:'none', boxSizing:'border-box',
            transition:'border-color 0.15s, background 0.15s',
            boxShadow: focused===name ? '0 0 0 3px rgba(30,91,184,0.12)' : 'none',
            paddingRight: extra ? 42 : 12,
          }}
        />
        {extra}
      </div>
    </div>
  );
}

function Btn({ children, onClick, type="button", disabled, variant="primary", full }) {
  const isPrimary = variant === "primary";
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      width: full ? '100%' : 'auto',
      padding:'13px 20px', borderRadius:9, border: isPrimary ? 'none' : `1.5px solid ${T.border}`,
      background: disabled ? T.grayMid : isPrimary ? `linear-gradient(90deg, ${T.orange} 0%, #F27C2A 100%)` : T.white,
      color: isPrimary ? '#fff' : T.textPrimary,
      fontSize:14, fontWeight:700, cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: disabled || !isPrimary ? 'none' : '0 4px 16px rgba(232,101,10,0.35)',
      transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
    }}>
      {children}
    </button>
  );
}

function Alert({ type, children }) {
  const styles = {
    error:   { bg:'#FCEAEA', border:'#F5C0C0', color:T.red,   icon:'⚠️' },
    success: { bg:'#E4F5EA', border:'#B0DDB8', color:T.green, icon:'✅' },
    info:    { bg:T.blueLight, border:T.grayMid, color:T.navy, icon:'ℹ️' },
  };
  const s = styles[type] || styles.info;
  return (
    <div style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:8, padding:'9px 12px', marginBottom:16, fontSize:13, color:s.color, display:'flex', alignItems:'center', gap:7 }}>
      <span>{s.icon}</span> {children}
    </div>
  );
}

function Spinner() {
  return (
    <span style={{ display:'inline-block', width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.7s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </span>
  );
}

function BackLink({ onClick, label="← Retour à la connexion" }) {
  return (
    <button onClick={onClick} style={{ background:'none', border:'none', color:T.blue, fontSize:13, cursor:'pointer', padding:0, marginBottom:24, display:'flex', alignItems:'center', gap:4 }}>
      {label}
    </button>
  );
}

// ─── VUE : CONNEXION ────────────────────────────────────────────────────────

function VueConnexion({ onLogin, onForgot, onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState('');

  const handle = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Veuillez remplir tous les champs.'); return; }
    const account = DEMO_ACCOUNTS.find(a => a.email === email && a.password === password);
    if (!account) { setError('Email ou mot de passe incorrect.'); return; }
    setError(''); setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(account); }, 900);
  };

  const eyeBtn = (
    <button type="button" onClick={() => setShowPwd(v => !v)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:14, opacity:0.5, padding:2 }}>
      {showPwd ? '🙈' : '👁'}
    </button>
  );

  return (
    <>
      <div style={{ marginBottom:32 }}>
        <h2 style={{ fontSize:26, fontWeight:700, color:T.navy, margin:'0 0 8px', letterSpacing:'-0.02em' }}>Connexion</h2>
        <p style={{ fontSize:14, color:T.textMuted, margin:0 }}>Accédez à votre espace de gestion.</p>
      </div>

      <form onSubmit={handle} noValidate>
        <Field label="Adresse e-mail" name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="prenom.nom@vicas.sn" icon="✉" focused={focused} onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')} />
        <Field label="Mot de passe" name="pwd" type={showPwd?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" icon="🔒" focused={focused} onFocus={()=>setFocused('pwd')} onBlur={()=>setFocused('')} extra={eyeBtn} />

        <div style={{ textAlign:'right', marginBottom:18, marginTop:-10 }}>
          <button type="button" onClick={onForgot} style={{ background:'none', border:'none', color:T.blue, fontSize:12, fontWeight:500, cursor:'pointer', padding:0 }}>
            Mot de passe oublié ?
          </button>
        </div>

        {error && <Alert type="error">{error}</Alert>}

        <Btn type="submit" disabled={loading} full>
          {loading ? <><Spinner /> Connexion en cours…</> : 'Se connecter →'}
        </Btn>
      </form>

      <div style={{ display:'flex', alignItems:'center', gap:12, margin:'22px 0' }}>
        <div style={{ flex:1, height:1, background:T.border }} />
        <span style={{ fontSize:12, color:T.textMuted }}>ou</span>
        <div style={{ flex:1, height:1, background:T.border }} />
      </div>

      <Btn variant="secondary" full onClick={onRegister}>
        <span style={{ fontSize:15 }}>➕</span> Créer un compte
      </Btn>

      {/* Comptes demo */}
      <div style={{ marginTop:24, padding:'12px 14px', background:T.bluePale, borderRadius:9, border:`1px solid ${T.blueLight}` }}>
        <div style={{ fontSize:11, fontWeight:600, color:T.navy, marginBottom:8, letterSpacing:'0.04em', textTransform:'uppercase' }}>Comptes de démo</div>
        {DEMO_ACCOUNTS.slice(0,3).map(a => (
          <div key={a.email} onClick={() => { setEmail(a.email); setPassword(a.password); }} style={{ fontSize:12, color:T.blue, cursor:'pointer', padding:'3px 0', display:'flex', justifyContent:'space-between' }}>
            <span>{a.nom}</span>
            <span style={{ color:T.textMuted }}>{a.role}</span>
          </div>
        ))}
        <div style={{ fontSize:11, color:T.textMuted, marginTop:6 }}>Cliquez sur un compte pour préremplir · Mot de passe : <b>vicas2025</b></div>
      </div>
    </>
  );
}

// ─── VUE : MOT DE PASSE OUBLIÉ ──────────────────────────────────────────────

function VueForgot({ onBack }) {
  const [step, setStep] = useState(1); // 1=email, 2=code, 3=nouveau mdp, 4=succès
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState('');

  const sendCode = () => {
    if (!email) { setError('Veuillez saisir votre adresse e-mail.'); return; }
    const exists = DEMO_ACCOUNTS.find(a => a.email === email);
    if (!exists) { setError('Aucun compte trouvé avec cet e-mail.'); return; }
    setError(''); setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1000);
  };

  const verifyCode = () => {
    if (!code) { setError('Veuillez saisir le code.'); return; }
    if (code !== '123456') { setError('Code incorrect. (Demo : 123456)'); return; }
    setError(''); setStep(3);
  };

  const resetPwd = () => {
    if (!pwd || !confirm) { setError('Veuillez remplir tous les champs.'); return; }
    if (pwd.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    if (pwd !== confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
    setError(''); setLoading(true);
    setTimeout(() => { setLoading(false); setStep(4); }, 1000);
  };

  const eyeBtn = (
    <button type="button" onClick={() => setShowPwd(v => !v)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:14, opacity:0.5, padding:2 }}>
      {showPwd ? '🙈' : '👁'}
    </button>
  );

  return (
    <>
      <BackLink onClick={onBack} />

      {/* Étape 1 — saisir e-mail */}
      {step === 1 && <>
        <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:32, marginBottom:12 }}>🔑</div>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy, margin:'0 0 8px', letterSpacing:'-0.02em' }}>Mot de passe oublié</h2>
          <p style={{ fontSize:14, color:T.textMuted, margin:0, lineHeight:1.6 }}>
            Saisissez votre adresse e-mail. Nous vous enverrons un code de vérification.
          </p>
        </div>
        <Field label="Adresse e-mail" name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="prenom.nom@vicas.sn" icon="✉" focused={focused} onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')} />
        {error && <Alert type="error">{error}</Alert>}
        <Btn full onClick={sendCode} disabled={loading}>
          {loading ? <><Spinner /> Envoi en cours…</> : 'Envoyer le code →'}
        </Btn>
      </>}

      {/* Étape 2 — saisir code */}
      {step === 2 && <>
        <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:32, marginBottom:12 }}>📩</div>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy, margin:'0 0 8px', letterSpacing:'-0.02em' }}>Vérification</h2>
          <p style={{ fontSize:14, color:T.textMuted, margin:0, lineHeight:1.6 }}>
            Un code à 6 chiffres a été envoyé à <b>{email}</b>.
          </p>
        </div>
        <Alert type="info">Code de démo : <b>123456</b></Alert>

        {/* Inputs code 6 chiffres */}
        <div style={{ marginBottom:20 }}>
          <label style={{ display:'block', fontSize:12, fontWeight:600, color:T.textPrimary, marginBottom:8 }}>Code de vérification</label>
          <div style={{ display:'flex', gap:8 }}>
            {[0,1,2,3,4,5].map(i => (
              <input key={i}
                type="text" maxLength={1}
                value={code[i] || ''}
                onChange={e => {
                  const val = e.target.value.replace(/\D/,'');
                  const arr = code.split('');
                  arr[i] = val;
                  setCode(arr.join(''));
                  if (val && e.target.nextSibling) e.target.nextSibling.focus();
                }}
                onKeyDown={e => {
                  if (e.key === 'Backspace' && !code[i] && e.target.previousSibling) e.target.previousSibling.focus();
                }}
                style={{
                  width:44, height:52, textAlign:'center', fontSize:20, fontWeight:700,
                  borderRadius:9, border:`1.5px solid ${T.border}`, outline:'none',
                  color:T.navy, background:T.white,
                  transition:'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = T.orange}
                onBlur={e => e.target.style.borderColor = T.border}
              />
            ))}
          </div>
        </div>

        {error && <Alert type="error">{error}</Alert>}
        <Btn full onClick={verifyCode}>Vérifier le code →</Btn>
        <div style={{ textAlign:'center', marginTop:14 }}>
          <button onClick={() => setStep(1)} style={{ background:'none', border:'none', color:T.textMuted, fontSize:12, cursor:'pointer' }}>
            Renvoyer le code
          </button>
        </div>
      </>}

      {/* Étape 3 — nouveau mot de passe */}
      {step === 3 && <>
        <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:32, marginBottom:12 }}>🛡️</div>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy, margin:'0 0 8px', letterSpacing:'-0.02em' }}>Nouveau mot de passe</h2>
          <p style={{ fontSize:14, color:T.textMuted, margin:0 }}>Choisissez un mot de passe sécurisé (min. 8 caractères).</p>
        </div>

        <Field label="Nouveau mot de passe" name="pwd" type={showPwd?'text':'password'} value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="••••••••" icon="🔒" focused={focused} onFocus={()=>setFocused('pwd')} onBlur={()=>setFocused('')} extra={eyeBtn} />

        {/* Force du mot de passe */}
        {pwd && (
          <div style={{ marginTop:-10, marginBottom:16 }}>
            <div style={{ display:'flex', gap:4, marginBottom:4 }}>
              {[
                { ok: pwd.length >= 8,                     lbl:'8 car.'     },
                { ok: /[A-Z]/.test(pwd),                   lbl:'Majuscule'  },
                { ok: /[0-9]/.test(pwd),                   lbl:'Chiffre'    },
                { ok: /[^A-Za-z0-9]/.test(pwd),            lbl:'Symbole'    },
              ].map((r,i) => (
                <div key={i} style={{ flex:1, height:4, borderRadius:2, background: r.ok ? T.green : T.grayMid, transition:'background 0.3s' }} />
              ))}
            </div>
            <div style={{ fontSize:11, color:T.textMuted }}>
              {[pwd.length>=8, /[A-Z]/.test(pwd), /[0-9]/.test(pwd), /[^A-Za-z0-9]/.test(pwd)].filter(Boolean).length < 2 ? 'Faible' : pwd.length < 10 ? 'Moyen' : 'Fort'}
            </div>
          </div>
        )}

        <Field label="Confirmer le mot de passe" name="confirm" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="••••••••" icon="🔒" focused={focused} onFocus={()=>setFocused('confirm')} onBlur={()=>setFocused('')} />

        {error && <Alert type="error">{error}</Alert>}
        <Btn full onClick={resetPwd} disabled={loading}>
          {loading ? <><Spinner /> Enregistrement…</> : 'Réinitialiser →'}
        </Btn>
      </>}

      {/* Étape 4 — succès */}
      {step === 4 && <>
        <div style={{ textAlign:'center', padding:'32px 0' }}>
          <div style={{ fontSize:52, marginBottom:16 }}>🎉</div>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy, marginBottom:10 }}>Mot de passe mis à jour !</h2>
          <p style={{ fontSize:14, color:T.textMuted, lineHeight:1.65, marginBottom:28 }}>
            Votre mot de passe a bien été réinitialisé. Vous pouvez maintenant vous connecter.
          </p>
          <Btn full onClick={onBack}>← Retour à la connexion</Btn>
        </div>
      </>}
    </>
  );
}

// ─── VUE : CRÉER UN COMPTE ──────────────────────────────────────────────────

function VueRegister({ onBack }) {
  const [step, setStep] = useState(1); // 1=infos, 2=mdp, 3=succès
  const [form, setForm] = useState({ prenom:'', nom:'', email:'', role:'Chef de chantier', tel:'' });
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState('');

  const set = (k,v) => setForm(f => ({ ...f, [k]:v }));

  const nextStep = () => {
    if (!form.prenom || !form.nom || !form.email) { setError('Veuillez remplir les champs obligatoires.'); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setError("Format d'email invalide."); return; }
    setError(''); setStep(2);
  };

  const submit = () => {
    if (!pwd || !confirm) { setError('Veuillez remplir tous les champs.'); return; }
    if (pwd.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    if (pwd !== confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
    setError(''); setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 1100);
  };

  const eyeBtn = (
    <button type="button" onClick={() => setShowPwd(v => !v)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:14, opacity:0.5, padding:2 }}>
      {showPwd ? '🙈' : '👁'}
    </button>
  );

  const inputStyle = (name) => ({
    width:'100%', padding:'11px 12px', fontSize:14, borderRadius:9,
    border:`1.5px solid ${focused===name ? T.blue : T.border}`,
    background: focused===name ? T.bluePale : T.white,
    color:T.textPrimary, outline:'none', boxSizing:'border-box',
    transition:'border-color 0.15s, background 0.15s',
    boxShadow: focused===name ? '0 0 0 3px rgba(30,91,184,0.12)' : 'none',
  });

  const lbl = (txt, req) => (
    <label style={{ display:'block', fontSize:12, fontWeight:600, color:T.textPrimary, marginBottom:6 }}>
      {txt}{req && <span style={{ color:T.orange }}> *</span>}
    </label>
  );

  return (
    <>
      <BackLink onClick={onBack} />

      {/* Étapes indicator */}
      {step < 3 && (
        <div style={{ display:'flex', alignItems:'center', marginBottom:28, gap:0 }}>
          {['Informations', 'Mot de passe'].map((label, i) => {
            const active = step === i+1;
            const done = step > i+1;
            return (
              <div key={i} style={{ display:'flex', alignItems:'center', flex:1 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <div style={{
                    width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700,
                    background: done ? T.green : active ? T.orange : T.grayMid,
                    color:'#fff', flexShrink:0,
                  }}>{done ? '✓' : i+1}</div>
                  <div style={{ fontSize:10, color: active ? T.navy : T.textMuted, fontWeight: active ? 600 : 400, whiteSpace:'nowrap' }}>{label}</div>
                </div>
                {i < 1 && <div style={{ flex:1, height:2, background: done ? T.green : T.grayMid, margin:'0 8px', marginBottom:16 }} />}
              </div>
            );
          })}
        </div>
      )}

      {/* Étape 1 — Informations */}
      {step === 1 && <>
        <div style={{ marginBottom:22 }}>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy, margin:'0 0 6px', letterSpacing:'-0.02em' }}>Créer un compte</h2>
          <p style={{ fontSize:13, color:T.textMuted, margin:0 }}>Renseignez vos informations personnelles.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
          <div>
            {lbl('Prénom', true)}
            <input value={form.prenom} onChange={e=>set('prenom',e.target.value)} placeholder="Cheikh" style={inputStyle('prenom')} onFocus={()=>setFocused('prenom')} onBlur={()=>setFocused('')} />
          </div>
          <div>
            {lbl('Nom', true)}
            <input value={form.nom} onChange={e=>set('nom',e.target.value)} placeholder="Ndiaye" style={inputStyle('nom')} onFocus={()=>setFocused('nom')} onBlur={()=>setFocused('')} />
          </div>
        </div>

        <div style={{ marginBottom:14 }}>
          {lbl('Adresse e-mail', true)}
          <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="prenom.nom@vicas.sn" style={inputStyle('email')} onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')} />
        </div>

        <div style={{ marginBottom:14 }}>
          {lbl('Téléphone')}
          <input type="tel" value={form.tel} onChange={e=>set('tel',e.target.value)} placeholder="+221 77 000 00 00" style={inputStyle('tel')} onFocus={()=>setFocused('tel')} onBlur={()=>setFocused('')} />
        </div>

        <div style={{ marginBottom:20 }}>
          {lbl('Rôle', true)}
          <select value={form.role} onChange={e=>set('role',e.target.value)} style={{ ...inputStyle('role'), padding:'11px 12px', appearance:'none', cursor:'pointer' }} onFocus={()=>setFocused('role')} onBlur={()=>setFocused('')}>
            <option>Direction</option>
            <option>Chef de chantier</option>
            <option>Commercial</option>
          </select>
        </div>

        {error && <Alert type="error">{error}</Alert>}

        <div style={{ background:T.orangeLight, border:`1px solid rgba(232,101,10,0.2)`, borderRadius:8, padding:'9px 12px', marginBottom:16, fontSize:12, color:'#8B3A06', lineHeight:1.5 }}>
          ℹ️ La création de compte est soumise à validation par la Direction.
        </div>

        <Btn full onClick={nextStep}>Continuer →</Btn>
      </>}

      {/* Étape 2 — Mot de passe */}
      {step === 2 && <>
        <div style={{ marginBottom:22 }}>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy, margin:'0 0 6px', letterSpacing:'-0.02em' }}>Créer un mot de passe</h2>
          <p style={{ fontSize:13, color:T.textMuted, margin:0 }}>Choisissez un mot de passe sécurisé.</p>
        </div>

        <Field label="Mot de passe" name="pwd" type={showPwd?'text':'password'} value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="••••••••" icon="🔒" focused={focused} onFocus={()=>setFocused('pwd')} onBlur={()=>setFocused('')} extra={eyeBtn} />

        {/* Indicateurs de force */}
        {pwd && (
          <div style={{ marginTop:-10, marginBottom:16 }}>
            <div style={{ display:'flex', gap:4, marginBottom:6 }}>
              {[pwd.length>=8, /[A-Z]/.test(pwd), /[0-9]/.test(pwd), /[^A-Za-z0-9]/.test(pwd)].map((ok,i) => (
                <div key={i} style={{ flex:1, height:4, borderRadius:2, background:ok?T.green:T.grayMid, transition:'background 0.3s' }} />
              ))}
            </div>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              {[
                { ok:pwd.length>=8,             lbl:'8 caractères min.' },
                { ok:/[A-Z]/.test(pwd),         lbl:'Majuscule'         },
                { ok:/[0-9]/.test(pwd),         lbl:'Chiffre'           },
                { ok:/[^A-Za-z0-9]/.test(pwd),  lbl:'Symbole spécial'   },
              ].map((r,i) => (
                <span key={i} style={{ fontSize:11, color:r.ok ? T.green : T.textMuted, display:'flex', alignItems:'center', gap:3 }}>
                  {r.ok ? '✅' : '○'} {r.lbl}
                </span>
              ))}
            </div>
          </div>
        )}

        <Field label="Confirmer le mot de passe" name="confirm" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="••••••••" icon="🔒" focused={focused} onFocus={()=>setFocused('confirm')} onBlur={()=>setFocused('')} />

        {confirm && pwd !== confirm && (
          <div style={{ fontSize:12, color:T.red, marginTop:-12, marginBottom:12 }}>⚠ Les mots de passe ne correspondent pas.</div>
        )}
        {confirm && pwd === confirm && (
          <div style={{ fontSize:12, color:T.green, marginTop:-12, marginBottom:12 }}>✅ Les mots de passe correspondent.</div>
        )}

        {error && <Alert type="error">{error}</Alert>}

        <div style={{ display:'flex', gap:10 }}>
          <Btn variant="secondary" onClick={() => setStep(1)}>← Retour</Btn>
          <Btn full onClick={submit} disabled={loading}>
            {loading ? <><Spinner /> Création…</> : 'Créer mon compte →'}
          </Btn>
        </div>
      </>}

      {/* Étape 3 — Succès */}
      {step === 3 && (
        <div style={{ textAlign:'center', padding:'24px 0' }}>
          <div style={{ fontSize:52, marginBottom:16 }}>✅</div>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy, marginBottom:10 }}>Compte créé !</h2>
          <p style={{ fontSize:14, color:T.textMuted, lineHeight:1.7, marginBottom:8 }}>
            Votre demande pour <b>{form.prenom} {form.nom}</b> a bien été soumise.
          </p>
          <div style={{ background:T.orangeLight, border:`1px solid rgba(232,101,10,0.2)`, borderRadius:8, padding:'10px 14px', fontSize:13, color:'#8B3A06', marginBottom:28, lineHeight:1.55 }}>
            ⏳ Un administrateur doit valider votre compte avant que vous puissiez vous connecter. Vous recevrez un e-mail de confirmation.
          </div>
          <Btn full onClick={onBack}>← Retour à la connexion</Btn>
        </div>
      )}
    </>
  );
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────────────────

export default function Login({ onLogin }) {
  const [vue, setVue] = useState('login'); // login | forgot | register

  return (
    <div style={{ minHeight:'100vh', display:'flex', fontFamily:"'Inter', system-ui, sans-serif", background:T.bg }}>
      <PanneauGauche />

      {/* Panneau droit */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', overflowY:'auto' }}>
        <div style={{ width:'100%', maxWidth:400, padding:'8px 0' }}>
          {vue === 'login'    && <VueConnexion onLogin={onLogin} onForgot={() => setVue('forgot')} onRegister={() => setVue('register')} />}
          {vue === 'forgot'   && <VueForgot    onBack={() => setVue('login')} />}
          {vue === 'register' && <VueRegister  onBack={() => setVue('login')} />}

          <p style={{ fontSize:11, color:T.textMuted, textAlign:'center', marginTop:28, lineHeight:1.6 }}>
            Accès réservé aux membres du Groupe VICAS.<br />
            <a href="#" style={{ color:T.blue, textDecoration:'none' }}>Support</a>
            {' · '}
            <a href="#" style={{ color:T.blue, textDecoration:'none' }}>Confidentialité</a>
          </p>
        </div>
      </div>
    </div>
  );
}
