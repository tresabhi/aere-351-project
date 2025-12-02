import { Controls } from "../Controls";
import { MartianSystem } from "../MartianSystem";
import { SolarSystem } from "../SolarSystem";
import "./index.css";

export function App() {
  return (
    <div className="app">
      <div className="systems">
        <SolarSystem />
        <MartianSystem />
      </div>

      <Controls />
    </div>
  );
}
