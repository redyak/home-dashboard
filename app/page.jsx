'use client';

import { useEffect } from 'react';
import { initializeDashboard } from './dashboard';

export default function DashboardPage() {
  useEffect(() => initializeDashboard(), []);

  return (
    <main>
      <header>
        <h1 id="date"></h1>
        <div className="clk">
          <time id="clock"></time>
          <button id="refresh" type="button" aria-label="Refresh all" title="Refresh all">↻</button>
        </div>
      </header>
      <section id="wxp" className="p wx">
        <h2>Weather <small id="wx-t"></small></h2>
        <div id="wx" className="scroll">Loading…</div>
      </section>
      <section className="p tr">
        <h2>Public transport <small id="tr-t"></small></h2>
        <div id="tr" className="scroll">Loading…</div>
      </section>
      <section className="p n ap">
        <h2>Oslo news <small id="ap-t"></small></h2>
        <div id="ap" className="scroll">Loading…</div>
      </section>
    </main>
  );
}
