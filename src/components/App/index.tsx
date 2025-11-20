import { MartianSystem } from "../MartianSystem";
import { SolarSystem } from "../SolarSystem";
import "./index.css";

export function App() {
  return (
    <div className="app">
      <SolarSystem />

      <div className="app-vertical">
        <MartianSystem />
      </div>
    </div>
  );
}
