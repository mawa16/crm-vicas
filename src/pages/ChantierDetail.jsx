import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { StatutBadge } from '../components/UI';
import { CHANTIERS } from '../data/mockData';

export default function ChantierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("resume");

  const chantier = CHANTIERS.find(c => String(c.id) === id);

  if (!chantier) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: T.textMuted }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏗️</div>
        <div>Chantier introuvable</div>
        <button style={{ ...S.btn("primary"), marginTop: 12 }} onClick={() => navigate("/chantiers")}>Voir les chantiers</button>
      </div>
    );
  }

  const tabs = [
    { id: "resume",     label: "Résumé" },
    { id: "avancement", label: "Avancement" },
    { id: "equipe",     label: "Équipe" },
    { id: "docs",       label: "Documents" },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem", flexWrap: "wrap" }}>
        <button style={S.btn("outline")} onClick={() => navigate("/chantiers")}>← Retour</button>
        <div style={{ flex: 1 }}>
          <div style={S.pageTitle}>{chantier.nom}</div>
          <div style={{ fontSize: 12, color: T.textMuted }}>{chantier.type} · {chantier.localisation} · Client : {chantier.client}</div>
        </div>
        <StatutBadge statut={chantier.statut} />
        <button style={S.btn("primary")}>Modifier</button>
      </div>

      <div style={{ display: "flex", gap: 2, borderBottom: `1px solid ${T.border}`, marginBottom: "1.25rem", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} style={{
            padding: "8px 16px", fontSize: 13, fontWeight: tab === t.id ? 500 : 400,
            color: tab === t.id ? T.blue : T.textMuted, background: "none", border: "none",
            borderBottom: tab === t.id ? `2px solid ${T.blue}` : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap"
          }} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {tab === "resume" && (
        <div style={S.grid2} className="grid-2">
          <div style={S.card}>
            <div style={S.cardTitle}>📋 Informations générales</div>
            {[
              ["Référence", `VIC-2025-00${chantier.id}`],
              ["Client", chantier.client],
              ["Localisation", chantier.localisation],
              ["Type de travaux", chantier.type],
              ["Chef de chantier", chantier.chef],
              ["Date de début", chantier.debut],
              ["Date de fin prévue", chantier.fin],
              ["Montant du marché", `${chantier.montant} FCFA`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13 }}>
                <div style={{ color: T.textMuted, minWidth: 140 }}>{k}</div>
                <div style={{ fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={S.card}>
              <div style={S.cardTitle}>📈 Avancement</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13 }}>Taux de réalisation</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: chantier.statut === "retard" ? T.red : T.blue }}>{chantier.pct}%</span>
                </div>
                <div style={{ height: 10, background: T.grayLight, borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ height: 10, width: `${chantier.pct}%`, background: chantier.statut === "retard" ? T.red : T.blue, borderRadius: 5 }} />
                </div>
              </div>
              <div style={{ fontSize: 13, color: T.textMuted }}>Phase actuelle : <span style={{ color: T.textPrimary, fontWeight: 500 }}>{chantier.phase}</span></div>
            </div>
            <div style={S.card}>
              <div style={S.cardTitle}>🖼️ Galerie photos</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {["Avant", "En cours 1", "+"].map((l, i) => (
                  <div key={i} style={{
                    aspectRatio: "4/3", borderRadius: 7, border: `1px dashed ${T.border}`,
                    background: i < 2 ? T.blueLight : T.grayLight,
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: 4, fontSize: 11, color: T.textMuted, cursor: "pointer"
                  }}>
                    <span style={{ fontSize: 20 }}>{i < 2 ? "📷" : "+"}</span>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "avancement" && (
        <div style={S.card}>
          <div style={S.cardTitle}>📅 Historique d'avancement</div>
          {[
            { date: "08/03/2025", action: `Avancement mis à jour : ${chantier.pct}%`, auteur: chantier.chef },
            { date: "12/01/2025", action: "Terrassement terminé — 30%",               auteur: chantier.chef },
            { date: "01/11/2024", action: "Démarrage du chantier",                    auteur: "Direction" },
          ].map((e, i) => (
            <div key={i} style={{ display: "flex", gap: 12, paddingBottom: 16, borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.blue }} />
                {i < 2 && <div style={{ width: 1, flex: 1, background: T.border, margin: "4px 0" }} />}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{e.action}</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{e.date} · {e.auteur}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "equipe" && (
        <div style={S.card}>
          <div style={S.cardTitle}>👥 Intervenants</div>
          {[
            { nom: chantier.chef, role: "Chef de chantier", email: `${chantier.chef.split(" ")[0].toLowerCase()}@vicas.sn`, bg: T.blueLight, color: T.navy },
            { nom: "Contrôleur ONAS", role: "Contrôle externe", email: "controle@onas.sn", bg: T.blueLight, color: T.blue },
          ].map((u, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={S.avatar(u.bg, u.color)}>{u.nom.slice(0, 2).toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{u.nom}</div>
                <div style={{ fontSize: 11, color: T.textMuted }}>{u.email}</div>
              </div>
              <span style={S.badge(u.color, u.bg)}>{u.role}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "docs" && (
        <div style={S.card}>
          <div style={S.cardTitle}>📂 Documents joints</div>
          {["Plan_exécution_v2.pdf", "Bordereau_prix.xlsx", "Rapport_visite_S11.docx"].map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 20 }}>{d.endsWith(".pdf") ? "📄" : d.endsWith(".xlsx") ? "📊" : "📝"}</span>
              <div style={{ flex: 1, fontSize: 13 }}>{d}</div>
              <button style={S.btn("outline")}>↓ Télécharger</button>
            </div>
          ))}
          <button style={{ ...S.btn("outline"), marginTop: 12 }}>+ Joindre un fichier</button>
        </div>
      )}
    </div>
  );
}
