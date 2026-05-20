import { useState, useEffect } from 'react'
import './App.css'
import SimCanvas from './components/SimCanvas';
import type { SimCanvasHandle } from './components/SimCanvas';
import SimTable from './components/SimTable';
import SimDetails from './components/SimDetails';
import SimOptions from './components/SimOptions';

import type { Sim } from './types/sim';

import { useRef } from 'react';

function App() {
  const [simData, setSimData] = useState<Sim[]>([
    {
      id: "sim_boids",
      title: "Boids",
      link: "https://theoguenezan.fr/simulator-boids/boids/main.js",
      datalink: "https://theoguenezan.fr/simulator-boids/boids/types/sim_components.json",
      ecsData: null,
      description: "Simulation de comportement de boids",
    },
    {
      id: "sim_slime",
      title: "Slime",
      link: "../dist/slime/main.js",
      datalink: "./dist/slime/types/sim_components.json",
      ecsData: null,
      description: "Simulation de comportement de slime",
    },
  ]);

  const [selectedSimId, setSelectedSimId] = useState<string | null>(null);
  const selectedSim = simData.find(s => s.id === selectedSimId) || null;
  const [simLoaded, setSimLoaded] = useState<Boolean>(false);
  const [simDesc, setSimDesc] = useState<String>("");
  const [simOptionValues, setSimOptionValues] = useState<Record<string, any>>({});
  const canvasRef = useRef<SimCanvasHandle>(null);

  // load JSON
  useEffect(() => {
    if (!selectedSimId) return;

    const sim = simData.find(s => s.id === selectedSimId);
    if (!sim) return;

    fetch(sim.datalink)
      .then(r => r.json())
      .then((data) => {
        setSimData(prev =>
          prev.map(s =>
            s.id === selectedSimId
              ? { ...s, ecsData: data }
              : s
          )
        );
      });
  }, [selectedSimId]);

  useEffect(() => {
    if (!selectedSim?.ecsData?.options) return;

    const defaults: Record<string, any> = {};

    selectedSim.ecsData.options.forEach((opt: any) => {
      defaults[opt.id] = opt.default ?? (opt.type === "checkbox" ? false : 0);
    });

    setSimOptionValues(defaults);
  }, [selectedSim?.ecsData]);

  return (
    <>
      <div className='noise overlay'></div>
      <div className='blueprintgrid overlay'></div>
      <div className='vignetting overlay'></div>
      <section className="page">
        <div id="content" className="sim-page">
          {!simLoaded && <div id="sim-container" style={{ visibility: simLoaded ? "hidden" : "visible" }}>
            <div className="sim-container-back"></div>
            <div className="sim-container-back-small"></div>
              <SimTable
                selectedSim={selectedSim}
                simData={simData}
                onSelect={setSelectedSimId}
                setSimDesc={setSimDesc}
              />

              <SimDetails sim={selectedSim} setSimDesc={setSimDesc} />
            </div>}
           {!simLoaded &&  <div id="sim-description" style={{ visibility: simLoaded ? "hidden" : "visible" }}>
                <p className="sim-description-p">{simDesc}</p>
                <div className="sim-container-back"></div>
                <div className="sim-container-back-small"></div>
            </div>}
            <SimCanvas sim={selectedSim} ref={canvasRef} setSimLoaded={setSimLoaded} simLoaded={simLoaded}  />
            
            <div id= "sim-options">
              <SimOptions options={selectedSim?.ecsData?.options} values={simOptionValues} simLoaded={simLoaded}
              onChange={(id, value) => setSimOptionValues(prev => ({ ...prev, [id]: value }))}/>
              <div className="sim-container-back"></div>
              <div className="sim-container-back-small"></div>
              <div className="button-container">
                <button id="startSimulationButton" className="sim-start-button"
                onClick={() => 
                {
                  if (!simLoaded) canvasRef.current?.startSimulation(simOptionValues);
                  else canvasRef.current?.stopSimulation();
                }}>
                    {!simLoaded ? "Start Simulation" : "Stop Simulation"}
                </button>
              </div>
            </div>
        </div>
        
      </section>
    </>
  )
}

export default App
