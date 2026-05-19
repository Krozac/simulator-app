# Simulator App

A modular web-based simulation platform designed to host and run interactive simulations directly in the browser.

The goal of this project is to provide a reusable simulation framework where each simulation can expose:
- configurable options,
- ECS (Entity Component System) architecture data,
- rendering systems,
- reusable UI integration,
- performance-oriented experimentation tools.

---

# Overview

- Live Demo: https://theoguenezan.fr/simulator-app/

`simulator-app` acts as the central hub for simulations.

Each simulation is:
- isolated,
- dynamically loadable,
- configurable through metadata,
- and rendered inside a shared application shell.

The platform is built for experimentation, visualization, and reusable simulation tooling.

---

# Available Simulations

## 🐦 Boids

A real-time flocking simulation inspired by Craig Reynolds' Boids algorithm.

Features:
- separation / alignment / cohesion behaviors,
- obstacle avoidance,
- ECS architecture,
- spatial grid optimization,
- runtime controls and debugging tools.

### Links

- Repository: https://github.com/Krozac/simulator-boids
- Detailed README: https://github.com/Krozac/simulator-boids#readme

---

# Goals

This project aims to:
- explore emergent systems,
- experiment with ECS architectures,
- benchmark browser simulation performance,
- provide reusable simulation infrastructure,
- simplify integration of future simulations.

---

# Tech Stack

- JavaScript / TypeScript
- ECS Architecture
- HTML5 Canvas
- Browser-based rendering

---

# Future Simulations

Potential future additions:
- particle systems,
- cellular automata,
- fluid simulation,
- gravity/orbital systems,
- pathfinding visualizers,
- ecosystem simulations.

---

# License

MIT
