export interface ButtonProps {
  onAction: () => void;
  label: string;
  disabled?: boolean;
  theme?: "primary" | "secondary" | "tertiary";
  small?: boolean;
}
