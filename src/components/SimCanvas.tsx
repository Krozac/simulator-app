import { useEffect, useRef, useState ,forwardRef, useImperativeHandle} from "react";
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

  const startSimulation = (options?: Record<string, any>) => {
    if (!sim || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Remove previous script if exists
    const existing = document.getElementById("sim-engine");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "sim-engine";
    script.type = "module";
    script.src = sim.link; // e.g., "/dist/boids/main.js"

    script.onload = () => {
      // @ts-ignore
      window.init(ctx, options ?? {});
      // @ts-ignore
      requestAnimationFrame(window.gameLoop);
      setSimLoaded(true);
    };

    script.onerror = console.error;

    document.body.appendChild(script);
  };

  const stopSimulation =() =>{
    // @ts-ignore
    window.stopSim?.();

    const existing = document.getElementById("sim-engine");
    if (existing) existing.remove();

    setSimLoaded(false);
  }

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