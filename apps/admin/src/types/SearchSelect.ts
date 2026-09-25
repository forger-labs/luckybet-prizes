export interface SearchSelectOption {
  value: string;
  label: string;
}

export interface SearchSelectProps {
  id?: string;
  name?: string;
  icon?: string;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch: (query: string) => Promise<SearchSelectOption[]>;
  initialOptions?: SearchSelectOption[];
  className?: string;
  disabled?: boolean;
  error?: string;
}
