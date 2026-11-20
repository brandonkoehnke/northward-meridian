"use client";

import { useState } from "react";

const options = [
  { value: "none", label: "No key or access code" },
  { value: "key", label: "A key was left, but it does not work" },
  { value: "code", label: "A code or electronic locker access is not working" },
  { value: "unknown", label: "I am not sure which locker system was used" },
] as const;
type Access = (typeof options)[number]["value"];

export default function ParcelLockerChecker() {
  const [access, setAccess] = useState<Access>("none");
  const [building, setBuilding] = useState("unknown");
  const [elapsed, setElapsed] = useState("unknown");
  const [copied, setCopied] = useState(false);
  const steps = [
    "Save your USPS tracking number, delivery scan date, and delivery address.",
    access === "key" ? "Check the number on the key tag and corresponding parcel locker; do not force the lock." : access === "code" ? "Check the delivery notice or locker-provider message for the exact access instructions; do not share access codes publicly." : "Check your regular mailbox for a parcel-locker key and any delivery notice; do not open a locker that is not assigned to you.",
    building === "yes" ? "Ask building management or the mailroom whether they received the package or manage this locker system." : "Check with household members and the mail area; if this is a managed building, ask management whether they control the lockers.",
    elapsed === "more" ? "USPS advises submitting a service request for an eligible item when more than one postal business day has passed since a Delivered scan and the package is still missing." : "If the delivery scan was recent, check again later and note that USPS advises waiting more than one postal business day before a missing-delivered-package service request for eligible items.",
    "If the package remains inaccessible, contact the delivering Post Office or use USPS's official Where Is My Package guidance. Describe the missing key or access issue, not merely a late delivery.",
  ];
  const summary = `Northward Meridian - USPS parcel locker access\nIssue: ${options.find((x) => x.value === access)?.label}\nManaged building: ${building}\nMore than one postal business day since Delivered: ${elapsed}\nNext steps:\n${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\nhttps://www.northwardmeridian.com/guides/usps-delivered-to-parcel-locker-no-key`;
  async function copy() {
    try { await navigator.clipboard.writeText(summary); setCopied(true); }
    catch { setCopied(false); }
  }
  return <section id="parcel-locker-checker" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-12">
    <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm md:p-9">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Delivery access checker</p>
      <h2 className="mt-3 text-2xl font-semibold">What should you do next?</h2>
      <p className="mt-3 text-[var(--muted)]">This checklist cannot locate a package or contact USPS. It helps you collect the right information and find the appropriate next step.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">What is missing or not working?
          <select className="mt-2 w-full rounded-xl border border-[var(--border)] bg-white p-3 font-normal" value={access} onChange={(e) => { setAccess(e.target.value as Access); setCopied(false); }}>{options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        </label>
        <label className="block text-sm font-semibold">Is this an apartment or managed mailroom?
          <select className="mt-2 w-full rounded-xl border border-[var(--border)] bg-white p-3 font-normal" value={building} onChange={(e) => { setBuilding(e.target.value); setCopied(false); }}><option value="unknown">Not sure</option><option value="yes">Yes</option><option value="no">No</option></select>
        </label>
        <label className="block text-sm font-semibold">Has more than one postal business day passed since the Delivered scan?
          <select className="mt-2 w-full rounded-xl border border-[var(--border)] bg-white p-3 font-normal" value={elapsed} onChange={(e) => { setElapsed(e.target.value); setCopied(false); }}><option value="unknown">Not sure</option><option value="more">Yes</option><option value="less">No</option></select>
        </label>
      </div>
      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
        <h3 className="font-semibold">Your next steps</h3><ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6">{steps.map((step) => <li key={step}>{step}</li>)}</ol>
      </div>
      <label htmlFor="parcel-summary" className="mt-7 block text-sm font-semibold">Summary to copy</label>
      <textarea id="parcel-summary" readOnly value={summary} rows={7} className="mt-2 w-full rounded-xl border border-[var(--border)] bg-white p-3 text-sm" />
      <button type="button" onClick={copy} className="mt-3 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-white hover:bg-[var(--accent-hover)]">Copy next steps</button>
      <p aria-live="polite" className="mt-2 text-sm text-[var(--muted)]">{copied ? "Copied to clipboard." : "No tracking number or personal information is collected."}</p>
    </div>
  </section>;
}
