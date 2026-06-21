import { useState } from 'react';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { CLIENTS } from '../data/mockData';
import { clients as clientsApi } from '../services/api';
import { useApi } from '../hooks/useApi';
import { Loading, ApiError } from '../components/ApiState';

export default function Clients() {
  const { data: apiClients, loading, error } = useApi(() => clientsApi.list(), CLIENTS);
  const allClients = apiClients || CLIENTS;
  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState("Tous");
  const data = allClients.filter(c =>
    (filtre === "Tous" || c.statut === filtre) &&
    c.nom.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loading message="Chargement des clients…" />;

  return (
    <div>
      <ApiError error={error} />
      <div style={S.sectionHeader}>
        <div>
          <div style={S.pageTitle}>Clients & contrats</div>
          <div style={S.pageSub}>{CLIENTS.length} clients enregistrés</div>
        </div>
        <button style={S.btn("primary")}>+ Nouveau client</button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        {["Tous", "Actif", "Négociation", "Prospect"].map(f => (
          <button key={f} style={S.filterBtn(filtre === f)} onClick={() => setFiltre(f)}>{f}</button>
        ))}
        <input style={{ ...S.input, width: 220, marginLeft: "auto" }} placeholder="🔍 Rechercher…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }} className="grid-3">
        {data.map(c => (
          <div key={c.id} style={{ ...S.card, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={S.avatar(c.bg, c.color)}>{c.initiales}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.nom}</div>
                <div style={{ fontSize: 11, color: T.textMuted }}>{c.type}</div>
              </div>
              <span style={S.badge(
                c.statut === "Actif" ? T.green : c.statut === "Négociation" ? "#854F0B" : T.blue,
                c.statut === "Actif" ? T.greenLight : c.statut === "Négociation" ? T.amberLight : T.blueLight
              )}>{c.statut}</span>
            </div>
            <div style={{ display: "flex", gap: "1rem", marginBottom: 12 }}>
              {[["Chantiers", c.chantiers], ["Contrats", c.contrats]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.navy }}>{v}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
              <span>✉️</span>{c.contact}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={S.btn("outline")}>Voir fiche</button>
              <button style={S.btn("outline")}>Chantiers →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
