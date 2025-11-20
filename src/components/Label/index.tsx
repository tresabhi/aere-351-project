import "./index.css";

interface LabelProps {
  children: string;
}

export function Label({ children }: LabelProps) {
  return <div className="label">{children}</div>;
}
