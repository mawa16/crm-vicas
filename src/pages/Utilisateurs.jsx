import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { USERS } from '../data/mockData';

export default function Utilisateurs() {
  return (
    <div>
      <div style={S.sectionHeader}>
        <div>
          <div style={S.pageTitle}>Utilisateurs</div>
          <div style={S.pageSub}>Gestion des accès et profils</div>
        </div>
        <button style={S.btn("primary")}>+ Nouvel utilisateur</button>
      </div>

      <div style={S.grid3} className="grid-3">
        {[
          { role: "Direction",        count: 1, desc: "Accès complet — tableau de bord et configuration",  color: T.navy, bg: T.blueLight  },
          { role: "Chef de chantier", count: 4, desc: "Saisie avancement, photos, rapports hebdomadaires",  color: T.blue,     bg: T.blueLight  },
          { role: "Commercial",       count: 1, desc: "Gestion clients, contrats et opportunités",          color: "#854F0B",  bg: T.amberLight },
        ].map((r, i) => (
          <div key={i} style={{ ...S.card, borderTop: `3px solid ${r.color}` }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: r.color }}>{r.count}</div>
            <div style={{ fontSize: 13, fontWeight: 600, margin: "4px 0" }}>{r.role}</div>
            <div style={{ fontSize: 12, color: T.textMuted }}>{r.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead>
              <tr>
                {["Utilisateur", "Rôle", "Email", "Statut", ""].map(h => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USERS.map(u => (
                <tr key={u.id}>
                  <td style={S.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={S.avatar(u.bg, u.color)}>{u.initiales}</div>
                      <span style={{ fontWeight: 500 }}>{u.nom}</span>
                    </div>
                  </td>
                  <td style={S.td}><span style={S.badge(u.color, u.bg)}>{u.role}</span></td>
                  <td style={{ ...S.td, color: T.textMuted }}>{u.email}</td>
                  <td style={S.td}>
                    <span style={S.badge(u.actif ? T.blue : T.gray, u.actif ? T.blueLight : T.grayLight)}>
                      {u.actif ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td style={S.td}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={S.btn("outline")}>Modifier</button>
                      <button style={{ ...S.btn("outline"), color: T.red }}>
                        {u.actif ? "Désactiver" : "Activer"}
                      </button>
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
