import type { option } from "../types/sim.tsx"
import { useState } from "react";


export default function SimOptions({ options, values, simLoaded, onChange }: { options : option[] | undefined, values: Record<string, any>, simLoaded:Boolean, onChange:(id: string, value: any) => void}) {

  return (
    <table className="sim-details-table">
      <thead>
        <tr>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {options?.map((opt) => (
          <tr key={opt.id}>
            <td>{opt.label}</td>
            <td> <OptionControl option={opt} simLoaded={simLoaded} value={values?.[opt.id] ?? getSafeDefault(opt)} onChange={(v) => onChange(opt.id, v)}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function getSafeDefault(option: option) {
  if (option.type === "checkbox") return false;
  return option.min ?? 0;
}

function OptionControl({ option, value, simLoaded, onChange, }: { option: option, simLoaded:Boolean, value: any,  onChange: (v: any) => void }) {
  if (option.type === "range") {

    return (
      <div className="range-control">
        <p className="range-value">{value}</p>
        <input
          type="range"
          min={option.min}
          max={option.max}
          step={option.step}
          value={value}
          disabled={simLoaded && option.locked}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    );
  }

  if (option.type === "checkbox") {
    return (
      <input
        type="checkbox"
        defaultChecked={Boolean(option.default)}
        disabled={simLoaded && option.locked}
        onChange={(e)=> onChange(e.target.checked)}
      />
    );
  }

  return null;
}