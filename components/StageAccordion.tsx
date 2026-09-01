"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function StageAccordion({
  stages,
}: {
  stages: { stage: string; items: string[] }[];
}) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line border border-line bg-card">
      {stages.map((s, i) => (
        <div key={s.stage}>
          <button
            type="button"
            onClick={() => setOpen((o) => (o === i ? -1 : i))}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-porcelain"
          >
            <span className="flex items-baseline gap-4">
              <span className="tabular font-display text-lg text-brass-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl font-light text-ink">
                {s.stage}
              </span>
            </span>
            <span
              aria-hidden="true"
              className={`text-sm text-brass transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              ＋
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="space-y-2.5 px-6 pb-6 pl-[4.4rem] text-[14px] leading-relaxed text-stone">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-0.5 text-brass">
                        ◆
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
