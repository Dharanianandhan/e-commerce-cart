import React from "react";

export default function StatsCard({ title, value, subtitle, bg = "#fa9c23" }) {
  return (
    <div className="stats-card" style={{ background: bg }}>
      <div className="stats-body">
        <div className="stats-title">{title}</div>
        <div className="stats-value">{value}</div>
        {subtitle && <div className="stats-sub">{subtitle}</div>}
      </div>
    </div>
  );
}
