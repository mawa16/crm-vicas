import { useState } from 'react';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { RAPPORTS } from '../data/mockData';

export default function Rapports() {
  const [filtre, setFiltre] = useState("Tous");
  const data = RAPPORTS.filter(r => filtre === "Tous" || r.statut === filtre);

  return (
    <div>
      <div style={S.sectionHeader}>
        <div>
          <div style={S.pageTitle}>Rapports hebdomadaires</div>
          <div style={S.pageSub}>{RAPPORTS.length} rapports enregistrés</div>
        </div>
        <button style={S.btn("primary")}>+ Nouveau rapport</button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
        {["Tous", "Soumis", "En attente", "Validé"].map(f => (
          <button key={f} style={S.filterBtn(filtre === f)} onClick={() => setFiltre(f)}>{f}</button>
        ))}
      </div>
      <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead>
              <tr>
                {["Chantier", "Semaine", "Chef", "Avancement", "Statut", ""].map(h => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.id}>
                  <td style={{ ...S.td, fontWeight: 500 }}>{r.chantier}</td>
                  <td style={S.td}>{r.semaine}</td>
                  <td style={S.td}>{r.chef}</td>
                  <td style={S.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ ...S.progressBg, width: 80 }}>
                        <div style={{ height: 6, width: `${r.avancement}%`, background: T.blue, borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12 }}>{r.avancement}%</span>
                    </div>
                  </td>
                  <td style={S.td}>
                    <span style={S.badge(r.statut === "Soumis" ? T.blue : T.amber, r.statut === "Soumis" ? T.blueLight : T.amberLight)}>
                      {r.statut}
                    </span>
                  </td>
                  <td style={S.td}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={S.btn("outline")}>Voir</button>
                      <button style={S.btn("outline")}>↓ PDF</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
