import { useRef, forwardRef, useImperativeHandle, useState} from "react";
import type {Sim} from "../types/sim.tsx";

export interface SimCanvasHandle {
  startSimulation: (options?: Record<string, any>) => void;
  stopSimulation: () => void;
}

interface SimCanvasProps {
  sim: Sim | null;
  setSimLoaded :any;
  simLoaded: Boolean;
}

const SimCanvas = forwardRef<SimCanvasHandle, SimCanvasProps>(({ sim, setSimLoaded, simLoaded }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [simInstance, setsimInstance] = useState<any | null>(null);

  const startSimulation = async (options?: Record<string, any>) => {
    if (!sim || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // stop previous loop FIRST
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const existing = document.getElementById("sim-engine");
    if (existing) existing.remove();

    const mod = await import(sim.link);
    
    const simI = mod.createSim(ctx, options);
    simI.init()
    simI.start()

    simI.onerror = console.error;

    setsimInstance(simI);
    setSimLoaded(true)
  };

  const stopSimulation = () => {
    simInstance.stop();

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const existing = document.getElementById("sim-engine");
    if (existing) existing.remove();

    setSimLoaded(false);
  };

  // Expose startSimulation to parent via ref
  useImperativeHandle(ref, () => ({
    startSimulation,
    stopSimulation,
  }));

  return (
    <div id="sim-canvas" style={{ visibility: simLoaded ? "visible" : "hidden" }}>
      <canvas ref={canvasRef} id="simCanvas" />
      <div className="sim-container-back"></div>
      <div className="sim-container-back-small"></div>
    </div>
  );
});

export default SimCanvas;