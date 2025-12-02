import { Quicklime } from "quicklime";

export enum Zoom {
  Zoom3 = 3,
  Zoom5 = 5,
  Zoom8 = 8,
  Zoom32 = 32,
}

export const zoomEvent = new Quicklime<Zoom>(Zoom.Zoom3);
