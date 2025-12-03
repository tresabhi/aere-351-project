import { Quicklime } from "quicklime";

export enum Zoom {
  Zoom1 = 1,
  Zoom8 = 8,
  Zoom32 = 32,
  Zoom64 = 64,
}

export const zoomEvent = new Quicklime<Zoom>(Zoom.Zoom1);
