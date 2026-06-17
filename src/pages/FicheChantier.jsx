import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';

export default function FicheChantier() {
  const navigate = useNavigate();
  const [pct, setPct] = useState(0);
  const [typeChoisi, setTypeChoisi] = useState("Curage");
  const types = ["Construction", "Curage", "Pose réseaux", "Évacuation", "Entretien", "Réhabilitation", "Ouvrage d'art", "Autre"];

  return (
    <div>
      <div style={S.sectionHeader}>
        <div>
          <div style={S.pageTitle}>Nouvelle fiche chantier</div>
          <div style={S.pageSub}>Remplie par le chef de chantier</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={S.btn("outline")} onClick={() => navigate("/chantiers")}>Annuler</button>
          <button style={S.btn("primary")}>✓ Soumettre</button>
        </div>
      </div>

      <div style={S.grid2} className="grid-2">
        <div>
          <div style={{ ...S.card, borderLeft: `3px solid ${T.blue}` }}>
            <div style={S.cardTitle}>🔖 Identification</div>
            {[
              ["Intitulé du chantier *", "text", "Ex : Extension collecteur EU — Pikine Est"],
              ["Référence / N° de marché *", "text", "VIC-2025-001"],
            ].map(([l, t, p]) => (
              <div key={l} style={S.formGroup}>
                <label style={S.label}>{l}</label>
                <input type={t} placeholder={p} style={S.input} />
              </div>
            ))}
            <div style={S.grid2} className="grid-2">
              <div style={S.formGroup}>
                <label style={S.label}>Client / Maître d'ouvrage *</label>
                <select style={S.input}>
                  {["— Sélectionner —", "ONAS", "Ville de Dakar", "ADM", "SONES", "Conseil Rég. Thiès"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Région</label>
                <select style={S.input}>
                  {["— Sélectionner —", "Dakar", "Thiès", "Ziguinchor", "Saint-Louis"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={S.grid2} className="grid-2">
              <div style={S.formGroup}>
                <label style={S.label}>Commune / Quartier</label>
                <input type="text" placeholder="Ex : Pikine, Guédiawaye…" style={S.input} />
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Coordonnées GPS</label>
                <input type="text" placeholder="14.76° N, 17.36° O" style={S.input} />
              </div>
            </div>
          </div>

          <div style={{ ...S.card, borderLeft: `3px solid ${T.purple}` }}>
            <div style={S.cardTitle}>🔧 Type de travaux</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              {types.map(t => (
                <button key={t} onClick={() => setTypeChoisi(t)} style={{
                  padding: "8px 4px", borderRadius: 7,
                  border: `1px solid ${typeChoisi === t ? T.blue : T.border}`,
                  background: typeChoisi === t ? T.blueLight : T.white,
                  color: typeChoisi === t ? T.navy : T.textMuted,
                  fontSize: 11, cursor: "pointer", textAlign: "center"
                }}>{t}</button>
              ))}
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Description détaillée</label>
              <textarea style={{ ...S.input, minHeight: 72, resize: "vertical" }} placeholder="Décrire la nature précise des travaux…" />
            </div>
          </div>

          <div style={{ ...S.card, borderLeft: `3px solid ${T.amber}` }}>
            <div style={S.cardTitle}>📈 Avancement des travaux</div>
            <div style={S.formGroup}>
              <label style={S.label}>Taux de réalisation global *</label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input type="range" min="0" max="100" value={pct} onChange={e => setPct(+e.target.value)} style={{ flex: 1 }} />
                <span style={{ fontSize: 20, fontWeight: 700, minWidth: 48, color: pct < 30 ? T.red : pct < 60 ? T.amber : T.blue }}>{pct}%</span>
              </div>
              <div style={{ height: 8, background: T.grayLight, borderRadius: 4, overflow: "hidden", marginTop: 6 }}>
                <div style={{ height: 8, width: `${pct}%`, background: pct < 30 ? T.red : pct < 60 ? T.amber : T.blue, borderRadius: 4, transition: "width .2s" }} />
              </div>
            </div>
            <div style={S.grid2} className="grid-2">
              <div style={S.formGroup}>
                <label style={S.label}>Phase actuelle</label>
                <select style={S.input}>
                  {["Installation", "Terrassement", "Gros œuvre", "Pose réseaux", "Finitions", "Réception"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Prochaine étape</label>
                <input type="text" placeholder="Ex : Coulage dalle…" style={S.input} />
              </div>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Observations / compte-rendu</label>
              <textarea style={{ ...S.input, minHeight: 64, resize: "vertical" }} placeholder="État d'avancement, difficultés, décisions prises…" />
            </div>
          </div>
        </div>

        <div>
          <div style={{ ...S.card, borderLeft: `3px solid ${T.coral}` }}>
            <div style={S.cardTitle}>📅 Calendrier & budget</div>
            <div style={S.grid2} className="grid-2">
              {[["Date de début *", "date"], ["Date de fin prévue *", "date"]].map(([l, t]) => (
                <div key={l} style={S.formGroup}>
                  <label style={S.label}>{l}</label>
                  <input type={t} style={S.input} />
                </div>
              ))}
              <div style={S.formGroup}>
                <label style={S.label}>Durée (jours ouvrables)</label>
                <input type="number" placeholder="Ex : 90" style={S.input} />
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Mode de financement</label>
                <select style={S.input}>
                  {["Budget national", "Bailleur international", "Collectivité", "Mixte"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={S.grid2} className="grid-2">
              {[["Montant du marché (FCFA)", "Ex : 45 000 000"], ["Montant décaissé (FCFA)", "Ex : 18 000 000"]].map(([l, p]) => (
                <div key={l} style={S.formGroup}>
                  <label style={S.label}>{l}</label>
                  <input type="text" placeholder={p} style={S.input} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...S.card, borderLeft: `3px solid ${T.red}` }}>
            <div style={S.cardTitle}>⚠️ Risques & blocages</div>
            <div style={S.grid2} className="grid-2">
              <div style={S.formGroup}>
                <label style={S.label}>Niveau de risque</label>
                <select style={S.input}>
                  {["Faible", "Moyen", "Élevé", "Bloqué"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.formGroup}>
                <label style={S.label}>Type de blocage</label>
                <select style={S.input}>
                  {["Aucun", "Accès au site", "Matériaux", "Conflit foncier", "Intempéries", "Technique", "Paiement"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Description / action corrective</label>
              <textarea style={{ ...S.input, minHeight: 60, resize: "vertical" }} placeholder="Décrire le problème et les mesures prises…" />
            </div>
          </div>

          <div style={{ ...S.card, borderLeft: `3px solid ${T.purple}` }}>
            <div style={S.cardTitle}>🖼️ Galerie photos</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["Photos « Avant »", "Photos « Après » / en cours"].map((label, si) => (
                <div key={label}>
                  <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 6 }}>{label}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {[0, 1].map(i => (
                      <div key={i} style={{
                        aspectRatio: "4/3", borderRadius: 7,
                        border: `1px dashed ${T.border}`,
                        background: si === 0 && i === 0 ? T.blueLight : T.grayLight,
                        display: "flex", flexDirection: "column", alignItems: "center",
                        justifyContent: "center", gap: 4, fontSize: 10, color: T.textMuted, cursor: "pointer"
                      }}>
                        <span style={{ fontSize: 18 }}>{si === 0 && i === 0 ? "📷" : "+"}</span>
                        <span>{si === 0 && i === 0 ? "Avt-01.jpg" : "Ajouter"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>✅ Contrôle qualité</div>
            {["Plan d'exécution validé", "Réception des matériaux conforme", "Implantation vérifiée géomètre", "Essais de compactage effectués", "Rapport de visite signé"].map((item, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 13, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked={i === 0} style={{ accentColor: T.blue }} />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
