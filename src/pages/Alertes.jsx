import { useState } from 'react';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { NiveauBadge } from '../components/UI';
import { ALERTES as ALERTES_INIT } from '../data/mockData';
import { useAuth, ROLE } from '../context/AuthContext';

export default function Alertes() {
  const { user } = useAuth();
  const sourceAlertes = user?.role === ROLE.DIRECTION
    ? ALERTES_INIT
    : ALERTES_INIT.filter(a => a.chefId === user?.userId);
  const [alertes, setAlertes] = useState(sourceAlertes);
  const marquerLue = (id) => setAlertes(prev => prev.map(a => a.id === id ? { ...a, lue: true } : a));

  return (
    <div>
      <div style={S.sectionHeader}>
        <div>
          <div style={S.pageTitle}>Alertes & notifications</div>
          <div style={S.pageSub}>{alertes.filter(a => !a.lue).length} alertes non lues</div>
        </div>
        <button style={S.btn("outline")} onClick={() => setAlertes(prev => prev.map(a => ({ ...a, lue: true })))}>
          Tout marquer lu
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {alertes.map(a => (
          <div key={a.id} style={{
            ...S.card,
            background: a.lue ? T.white : a.niveau === "Urgent" ? "#FFF9F9" : T.amberLight + "33",
            borderLeft: `3px solid ${a.lue ? T.border : a.niveau === "Urgent" ? T.red : a.niveau === "Attention" ? T.amber : T.blue}`,
            display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px"
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 16,
              background: a.niveau === "Urgent" ? T.redLight : a.niveau === "Attention" ? T.amberLight : T.blueLight
            }}>
              {a.niveau === "Urgent" ? "🚨" : a.niveau === "Attention" ? "⚠️" : "ℹ️"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: a.lue ? 400 : 600 }}>{a.titre}</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginTop: 3 }}>{a.chantier} · {a.resp}</div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{a.date}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <NiveauBadge niveau={a.niveau} />
              {!a.lue && (
                <button style={S.btn("outline")} onClick={() => marquerLue(a.id)} title="Marquer comme lue">✓</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
