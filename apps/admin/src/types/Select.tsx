export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  icon?: string;
  id?: string;
  name?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
  disabled?: boolean;
}
