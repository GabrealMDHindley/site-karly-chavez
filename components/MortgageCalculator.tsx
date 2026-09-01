"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const TERMS = [10, 15, 20, 25, 30];

function money(n: number) {
  return (
    "$" +
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  );
}

function parseNum(v: string) {
  const n = Number.parseFloat(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/**
 * Mortgage calculator mirroring the current site's widget: principal &
 * interest, property taxes, insurance, and HOA with a live breakdown.
 * Text inputs keep raw strings in state so decimals type naturally.
 */
export default function MortgageCalculator({
  initialPrice = 750000,
}: {
  initialPrice?: number;
}) {
  const [priceStr, setPriceStr] = useState(initialPrice.toLocaleString("en-US"));
  const [downPct, setDownPct] = useState(20);
  const [term, setTerm] = useState(30);
  const [rateStr, setRateStr] = useState("6.5");
  const [taxRateStr, setTaxRateStr] = useState("1.1");
  const [insuranceStr, setInsuranceStr] = useState("150");
  const [hoaStr, setHoaStr] = useState("0");

  const price = parseNum(priceStr);
  const rate = parseNum(rateStr);
  const taxRate = parseNum(taxRateStr);
  const insurance = parseNum(insuranceStr);
  const hoa = parseNum(hoaStr);

  const r = useMemo(() => {
    const principal = price * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;
    const pi =
      n === 0
        ? 0
        : monthlyRate > 0
          ? (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n))
          : principal / n;
    const tax = (price * (taxRate / 100)) / 12;
    const total = pi + tax + insurance + hoa;
    return { principal, pi, tax, total };
  }, [price, downPct, term, rate, taxRate, insurance, hoa]);

  const rows = [
    { label: "Principal & Interest", value: r.pi, color: "#9a7b3f" },
    { label: "Property Taxes", value: r.tax, color: "#c9ad72" },
    { label: "Homeowner's Insurance", value: insurance, color: "#8f8a7e" },
    { label: "HOA Dues", value: hoa, color: "#efe9dd" },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="border border-line bg-card p-6 md:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="mc-price" className="field-label">
              Home Price
            </label>
            <input
              id="mc-price"
              inputMode="numeric"
              value={priceStr}
              onChange={(e) => setPriceStr(e.target.value)}
              onBlur={() => setPriceStr(price.toLocaleString("en-US"))}
              className="field tabular"
            />
            <input
              type="range"
              min={100000}
              max={6000000}
              step={25000}
              value={Math.min(Math.max(price, 100000), 6000000)}
              onChange={(e) =>
                setPriceStr(Number(e.target.value).toLocaleString("en-US"))
              }
              className="mt-3 w-full accent-brass"
              aria-label="Home price slider"
            />
          </div>
          <div>
            <label htmlFor="mc-down" className="field-label">
              Down Payment ({downPct}% · {money((price * downPct) / 100)})
            </label>
            <input
              id="mc-down"
              type="range"
              min={0}
              max={60}
              step={1}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="mt-3 w-full accent-brass"
            />
          </div>
          <div>
            <label htmlFor="mc-term" className="field-label">
              Term
            </label>
            <select
              id="mc-term"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="field appearance-none"
            >
              {TERMS.map((t) => (
                <option key={t} value={t}>
                  {t}-year fixed
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="mc-rate" className="field-label">
              Interest Rate (%)
            </label>
            <input
              id="mc-rate"
              inputMode="decimal"
              value={rateStr}
              onChange={(e) => setRateStr(e.target.value)}
              className="field tabular"
            />
          </div>
          <div>
            <label htmlFor="mc-tax" className="field-label">
              Property Tax (%/yr)
            </label>
            <input
              id="mc-tax"
              inputMode="decimal"
              value={taxRateStr}
              onChange={(e) => setTaxRateStr(e.target.value)}
              className="field tabular"
            />
          </div>
          <div>
            <label htmlFor="mc-ins" className="field-label">
              Insurance ($/mo)
            </label>
            <input
              id="mc-ins"
              inputMode="numeric"
              value={insuranceStr}
              onChange={(e) => setInsuranceStr(e.target.value)}
              className="field tabular"
            />
          </div>
          <div>
            <label htmlFor="mc-hoa" className="field-label">
              HOA Dues ($/mo)
            </label>
            <input
              id="mc-hoa"
              inputMode="numeric"
              value={hoaStr}
              onChange={(e) => setHoaStr(e.target.value)}
              className="field tabular"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between bg-night p-6 text-white md:p-8">
        <div>
          <p className="eyebrow-light">Your Estimated Payment</p>
          <p className="tabular mt-4 font-display text-5xl font-light text-brass-pale">
            {money(r.total)}
            <span className="text-lg text-white/60"> /mo</span>
          </p>
          <div
            className="mt-8 flex h-2.5 w-full overflow-hidden rounded-full bg-white/10"
            aria-hidden="true"
          >
            {rows.map(
              (row) =>
                row.value > 0 &&
                r.total > 0 && (
                  <motion.div
                    key={row.label}
                    initial={false}
                    animate={{ width: `${(row.value / r.total) * 100}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ backgroundColor: row.color }}
                  />
                )
            )}
          </div>
          <ul className="mt-6 space-y-3">
            {rows.map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between text-sm text-white/80"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: row.color }}
                    aria-hidden="true"
                  />
                  {row.label}
                </span>
                <span className="tabular">
                  {money(row.value)}{" "}
                  <span className="text-white/60">
                    ({r.total ? Math.round((row.value / r.total) * 100) : 0}%)
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="tabular mt-6 border-t border-white/10 pt-4 text-xs text-white/55">
            Loan amount {money(r.principal)} · Estimates are for informational
            purposes only. Actual amounts may vary.
          </p>
        </div>
        <Link href="/contact?intent=buy" className="btn-gold mt-8 w-full">
          Get Pre-Approved
        </Link>
      </div>
    </div>
  );
}
