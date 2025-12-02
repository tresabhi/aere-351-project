import { createContext } from "react";

export enum Host {
  Mars,
  Sun,
}

interface Simulation {
  scale0: number;
  host: Host;
  mu: number;
}

export const SimulationContext = createContext<Simulation>({
  scale0: 0,
  host: Host.Mars,
  mu: 0,
});
