export interface SearchSelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

export interface SearchSelectProps {
  id?: string;
  name?: string;
  icon?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  /** Búsqueda asíncrona remota */
  onSearch?: (query: string) => Promise<SearchSelectOption[]>;
  /** Opciones en memoria síncronas */
  options?: SearchSelectOption[];
  initialOptions?: SearchSelectOption[];
  className?: string;
  disabled?: boolean;
  error?: string;
  maxItems?: number;
}
