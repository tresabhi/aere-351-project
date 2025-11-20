import { createContext } from "react";

export enum Host {
  Mars,
  Sun,
}

interface Simulation {
  scale: number;
  host: Host;
  mu: number;
}

export const SimulationContext = createContext<Simulation>({
  scale: 0,
  host: Host.Mars,
  mu: 0,
});
