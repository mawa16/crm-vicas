import { T } from '../styles/tokens';

// Composant loading
export function Loading({ message = 'Chargement…' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'4rem', flexDirection:'column', gap:12 }}>
      <div style={{ width:36, height:36, border:`3px solid ${T.blueLight}`, borderTopColor:T.blue, borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ fontSize:13, color:T.textMuted }}>{message}</div>
    </div>
  );
}

// Composant erreur avec fallback
export function ApiError({ error, fallback }) {
  if (!error) return null;
  return (
    <div style={{ background:'#FFF8E6', border:'1px solid #F5E0A0', borderRadius:8, padding:'10px 14px', marginBottom:14, fontSize:12, color:'#8B6000', display:'flex', alignItems:'center', gap:8 }}>
      ⚠️ API indisponible — affichage des données de démonstration. ({error})
    </div>
  );
}
