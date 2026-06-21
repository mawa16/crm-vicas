import { useState } from 'react';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { PHOTOS } from '../data/mockData';
import { useAuth, ROLE } from '../context/AuthContext';

export default function Galerie() {
  const { user } = useAuth();
  const mesPhotos = user?.role === ROLE.DIRECTION ? PHOTOS : PHOTOS.filter(p => p.chefId === user?.userId);
  const [filtre, setFiltre] = useState("Tous");
  const tags = ["Tous", "Avant", "En cours", "Après"];
  const data = mesPhotos.filter(p => filtre === "Tous" || p.tag === filtre);

  return (
    <div>
      <div style={S.sectionHeader}>
        <div>
          <div style={S.pageTitle}>Galerie photos</div>
          <div style={S.pageSub}>Suivi visuel des chantiers — {mesPhotos.length} photos</div>
        </div>
        <button style={S.btn("primary")}>+ Ajouter photos</button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem" }}>
        {tags.map(t => (
          <button key={t} style={S.filterBtn(filtre === t)} onClick={() => setFiltre(t)}>{t}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }} className="grid-4">
        {data.map(p => (
          <div key={p.id} style={{ ...S.card, padding: 0, overflow: "hidden", cursor: "pointer" }}>
            <div style={{
              aspectRatio: "4/3", background: p.tag === "Avant" ? T.coralLight : p.tag === "En cours" ? T.amberLight : T.greenLight,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40
            }}>
              {p.emoji}
            </div>
            <div style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{p.chantier}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={S.badge(
                  p.tag === "Avant" ? T.coral : p.tag === "Après" ? T.green : T.amber,
                  p.tag === "Avant" ? T.coralLight : p.tag === "Après" ? T.greenLight : T.amberLight
                )}>{p.tag}</span>
                <span style={{ fontSize: 11, color: T.textMuted }}>{p.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
