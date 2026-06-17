import { T } from '../styles/tokens';
import { S } from '../styles/shared';

export function StatutBadge({ statut }) {
  const map = {
    retard:  [T.red,   T.redLight,   "● En retard"],
    risque:  [T.amber, T.amberLight, "● Risque"],
    encours: [T.blue,  T.blueLight,  "● En cours"],
    termine: [T.green, T.greenLight, "● Terminé"],
  };
  const [c, bg, label] = map[statut] || [T.gray, T.grayLight, statut];
  return <span style={S.badge(c, bg)}>{label}</span>;
}

export function NiveauBadge({ niveau }) {
  const map = {
    Urgent:    [T.red,   T.redLight,   "Urgent"],
    Attention: [T.amber, T.amberLight, "Attention"],
    Info:      [T.blue,  T.blueLight,  "Info"],
  };
  const [c, bg, label] = map[niveau] || [T.gray, T.grayLight, niveau];
  return <span style={S.badge(c, bg)}>{label}</span>;
}

export function ProgressBar({ pct, statut }) {
  const color = statut === "retard" ? T.red : statut === "risque" ? T.amber : T.blue;
  return (
    <div style={S.progressWrap}>
      <div style={S.progressBg}>
        <div style={{ height: 6, width: `${pct}%`, background: color, borderRadius: 3, transition: "width .4s" }} />
      </div>
      <div style={{ fontSize: 11, color: T.textMuted, textAlign: "right", marginTop: 2 }}>{pct}%</div>
    </div>
  );
}

export function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      role="switch"
      aria-checked={value}
      tabIndex={0}
      style={{
        width: 40, height: 22, borderRadius: 11, cursor: "pointer", position: "relative", flexShrink: 0,
        background: value ? T.blue : T.grayMid, transition: "background .2s"
      }}
    >
      <div style={{
        position: "absolute", top: 3, left: value ? 21 : 3, width: 16, height: 16,
        borderRadius: "50%", background: "white", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)"
      }} />
    </div>
  );
}
