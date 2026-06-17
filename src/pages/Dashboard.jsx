import { Link } from 'react-router-dom';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { StatutBadge, ProgressBar } from '../components/UI';
import { CHANTIERS, CLIENTS, ALERTES } from '../data/mockData';

export default function Dashboard() {
  const avgPct = Math.round(CHANTIERS.reduce((a, c) => a + c.pct, 0) / CHANTIERS.length);

  const repartition = [
    { label: "Pose de réseaux", count: 2, color: T.blue   },
    { label: "Génie civil",     count: 1, color: T.purple },
    { label: "Curage",          count: 1, color: T.amber  },
    { label: "Construction",    count: 1, color: T.green  },
    { label: "Réhabilitation",  count: 1, color: T.coral  },
  ];

  return (
    <div>
      <div style={S.pageTitle}>Tableau de bord</div>
      <div style={S.pageSub}>Vue d'ensemble — Groupe VICAS</div>

      <div style={S.grid4} className="grid-4">
        {[
          { label: "Chantiers actifs",    value: CHANTIERS.length, sub: "6 en cours",                                   color: T.navy },
          { label: "Taux de réalisation", value: `${avgPct}%`,     sub: "Moyenne globale",                              color: T.blue     },
          { label: "Clients suivis",      value: CLIENTS.filter(c => c.statut === "Actif").length, sub: "Collectivités & entreprises", color: T.blue },
          { label: "Alertes actives",     value: ALERTES.filter(a => !a.lue).length, sub: "Non résolues",               color: T.red      },
        ].map((m, i) => (
          <div key={i} style={S.metric}>
            <div style={S.metricLabel}>{m.label}</div>
            <div style={{ ...S.metricValue, color: m.color }}>{m.value}</div>
            <div style={S.metricSub}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={S.grid2} className="grid-2">
        <div style={S.card}>
          <div style={S.cardTitle}>🏗️ Chantiers — suivi avancement</div>
          {CHANTIERS.map(c => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.nom}</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 1 }}>{c.type} · {c.localisation}</div>
              </div>
              <StatutBadge statut={c.statut} />
              <ProgressBar pct={c.pct} statut={c.statut} />
            </div>
          ))}
          <Link to="/chantiers" style={S.btn("outline")}>Voir tous →</Link>
        </div>

        <div>
          <div style={S.card}>
            <div style={S.cardTitle}>🔔 Alertes récentes</div>
            {ALERTES.filter(a => !a.lue).map(a => (
              <div key={a.id} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.niveau === "Urgent" ? T.red : T.amber, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, color: T.textPrimary }}>{a.titre}</div>
                  <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{a.resp} · {a.date}</div>
                </div>
              </div>
            ))}
            <Link to="/alertes" style={{ ...S.btn("outline"), marginTop: 10 }}>Toutes les alertes →</Link>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>📈 Répartition par type</div>
            {repartition.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: r.color, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 12 }}>{r.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{r.count}</div>
                <div style={{ width: 80 }}>
                  <div style={{ height: 5, background: T.grayLight, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: 5, width: `${r.count / CHANTIERS.length * 100}%`, background: r.color, borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
