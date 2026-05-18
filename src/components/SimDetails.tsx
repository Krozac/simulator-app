import type { Sim, item } from "../types/sim.tsx"
import { useState } from "react";


export default function SimDetails({ sim, setSimDesc } : { sim: Sim | null, setSimDesc: any }) {
  const [hoveredDeps, setHoveredDeps] = useState<string[]>([]);

  if (!sim?.ecsData) return null;

  return (
    <div id="simDetails">
      <Table 
        title="Entités"
        data={sim.ecsData.entities}
        setSimDesc={setSimDesc}
        hoveredDeps={hoveredDeps}
        setHoveredDeps={setHoveredDeps}
      />
      <Table
        title="Composants"
        data={sim.ecsData.components}
        setSimDesc={setSimDesc}
        hoveredDeps={hoveredDeps}
        setHoveredDeps={setHoveredDeps}
      />
      <Table
        title="Systems"
        data={sim.ecsData.systems}
        setSimDesc={setSimDesc}
        hoveredDeps={hoveredDeps}
        setHoveredDeps={setHoveredDeps}
      />
    </div>
  );
}


function Table({ title, data, setSimDesc, hoveredDeps, setHoveredDeps} : any) {
  return (
    <table className="sim-details-table">
      <thead>
        <tr>
          <th>{title}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item : item) =>{
          const isDependency = hoveredDeps.includes(item.id);

          return (
            <tr
              key={item.id}
              className={isDependency ? "dependency-highlight" : ""}
              onMouseEnter={() => {
                setSimDesc(item.description);
                setHoveredDeps(item.dependencies ?? []);
              }}
              onMouseLeave={() => {
                setHoveredDeps([]);
              }}
            >
              <td>{item.filename}</td>
            </tr>
          );
          
        })}
        
      </tbody>
    </table>
  );
}