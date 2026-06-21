import { useAuth, can } from '../context/AuthContext';
import { T } from '../styles/tokens';

export default function ProtectedRoute({ action, children }) {
  const { user } = useAuth();

  if (!can(user, action)) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '2rem',
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔒</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: T.navy, marginBottom: 8 }}>
          Accès refusé
        </div>
        <div style={{ fontSize: 14, color: T.textMuted, maxWidth: 360, lineHeight: 1.7 }}>
          Vous n'avez pas les droits nécessaires pour accéder à cette page.
          <br />Contactez votre administrateur si vous pensez que c'est une erreur.
        </div>
        <div style={{
          marginTop: 20, padding: '8px 16px', borderRadius: 8,
          background: T.orangeLight, border: `1px solid rgba(232,101,10,0.2)`,
          fontSize: 13, color: '#8B3A06', fontWeight: 500,
        }}>
          Rôle actuel : {user?.role}
        </div>
      </div>
    );
  }

  return children;
}
