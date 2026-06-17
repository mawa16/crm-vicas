import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { StatutBadge, ProgressBar } from '../components/UI';
import { CHANTIERS } from '../data/mockData';

export default function Chantiers() {
  const [filtre, setFiltre] = useState("Tous");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtres = ["Tous", "Construction", "Curage", "Pose réseaux", "Génie civil", "Réhabilitation"];
  const data = CHANTIERS.filter(c =>
    (filtre === "Tous" || c.type === filtre) &&
    (c.nom.toLowerCase().includes(search.toLowerCase()) || c.localisation.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={S.sectionHeader}>
        <div>
          <div style={S.pageTitle}>Chantiers</div>
          <div style={S.pageSub}>{CHANTIERS.length} chantiers actifs</div>
        </div>
        <Link to="/fiche" style={S.btn("primary")}>+ Nouveau chantier</Link>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        {filtres.map(f => (
          <button key={f} style={S.filterBtn(filtre === f)} onClick={() => setFiltre(f)}>{f}</button>
        ))}
        <input
          style={{ ...S.input, width: 220, marginLeft: "auto" }}
          placeholder="🔍 Rechercher…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead>
              <tr>
                {["Chantier", "Type", "Localisation", "Chef", "Client", "Délai", "Avancement", "Statut", ""].map(h => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(c => (
                <tr key={c.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/chantiers/${c.id}`)}>
                  <td style={{ ...S.td, fontWeight: 500 }}>{c.nom}</td>
                  <td style={S.td}><span style={S.badge(T.purple, T.purpleLight)}>{c.type}</span></td>
                  <td style={S.td}>{c.localisation}</td>
                  <td style={S.td}>{c.chef}</td>
                  <td style={S.td}>{c.client}</td>
                  <td style={{ ...S.td, color: c.statut === "retard" ? T.red : T.textPrimary, fontWeight: c.statut === "retard" ? 600 : 400 }}>{c.fin}</td>
                  <td style={S.td}><ProgressBar pct={c.pct} statut={c.statut} /></td>
                  <td style={S.td}><StatutBadge statut={c.statut} /></td>
                  <td style={S.td}>
                    <button style={S.btn("outline")} onClick={e => { e.stopPropagation(); navigate(`/chantiers/${c.id}`); }}>Voir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem", color: T.textMuted, fontSize: 13 }}>Aucun chantier trouvé</div>
        )}
      </div>
    </div>
  );
}
