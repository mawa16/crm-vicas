import { useState } from 'react';
import { T } from '../styles/tokens';
import { S } from '../styles/shared';
import { Toggle } from '../components/UI';

export default function Parametres() {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [seuilRetard, setSeuilRetard] = useState(7);

  return (
    <div>
      <div style={S.pageTitle}>Paramètres</div>
      <div style={S.pageSub}>Configuration du CRM VICAS</div>

      <div style={S.grid2} className="grid-2">
        <div>
          <div style={S.card}>
            <div style={S.cardTitle}>👤 Profil organisation</div>
            {[["Nom organisation", "Groupe VICAS"], ["Secteur", "Assainissement & Génie Civil"], ["Email contact", "contact@vicas.sn"], ["Téléphone", "+221 33 XXX XX XX"]].map(([l, v]) => (
              <div key={l} style={S.formGroup}>
                <label style={S.label}>{l}</label>
                <input style={S.input} defaultValue={v} />
              </div>
            ))}
            <button style={S.btn("primary")}>Sauvegarder</button>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>🔔 Notifications</div>
            {[
              ["Alertes par email", notifEmail, setNotifEmail, "Envoyer un email en cas de retard ou blocage"],
              ["Notifications push", notifPush, setNotifPush, "Notifications dans l'application"],
            ].map(([l, v, fn, desc]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <Toggle value={v} onChange={fn} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{l}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>{desc}</div>
                </div>
              </div>
            ))}
            <div style={S.formGroup}>
              <label style={S.label}>Seuil d'alerte retard (jours) : <strong>{seuilRetard}j</strong></label>
              <input type="range" min="1" max="30" value={seuilRetard} onChange={e => setSeuilRetard(+e.target.value)} style={{ width: "100%" }} />
            </div>
          </div>
        </div>

        <div>
          <div style={S.card}>
            <div style={S.cardTitle}>🔧 Types de travaux configurés</div>
            {["Construction", "Curage", "Pose de réseaux", "Évacuation", "Entretien", "Réhabilitation", "Ouvrage d'art"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.blue }} />
                <span style={{ flex: 1, fontSize: 13 }}>{t}</span>
                <button style={{ ...S.btn("outline"), padding: "3px 8px", fontSize: 11 }}>✎</button>
              </div>
            ))}
            <button style={{ ...S.btn("outline"), marginTop: 10, fontSize: 12 }}>+ Ajouter un type</button>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>🔒 Sécurité</div>
            <div style={S.formGroup}>
              <label style={S.label}>Mot de passe actuel</label>
              <input type="password" style={S.input} placeholder="••••••••" />
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Nouveau mot de passe</label>
              <input type="password" style={S.input} placeholder="••••••••" />
            </div>
            <button style={S.btn("primary")}>Changer le mot de passe</button>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>ℹ️ À propos</div>
            <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.8 }}>
              <div>CRM VICAS — v1.0.0</div>
              <div>Développé par : Mame Awa Bakhoum SARR & Ndeye Maty NIANG</div>
              <div>Cycle Licence L3GLSIb</div>
              <div style={{ marginTop: 8, color: T.blue }}>contact@vicas.sn</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
