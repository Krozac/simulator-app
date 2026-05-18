import type { Sim } from "../types/sim.tsx"


type SimTableProps = {
  selectedSim: Sim | null;
  simData: Sim[];
  onSelect:any;
  setSimDesc:any;
};

export default function SimTable({ selectedSim, simData, onSelect, setSimDesc }: SimTableProps) {
  return (
    <table className="sim-table">
      <thead>
        <tr>
          <th>Simulation</th>
        </tr>
      </thead>
      <tbody>
        {simData.map((sim) => (
          <tr
            key={sim.title}
            className={`sim-row ${selectedSim?.id === sim.id ? 'selected' : ''}`}
            onClick={() => {
               console.log(sim)
                if (selectedSim?.id === sim.id) onSelect(null)
                else onSelect(sim)
              }
            }
            onMouseOver={() => setSimDesc(sim.description)}
          >
            <td>{sim.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}