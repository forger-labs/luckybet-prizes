"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type {
  SearchSelectOption,
  SearchSelectProps,
} from "@/types/SearchSelect";

export function SearchSelect({
  id,
  name,
  icon,
  placeholder = "Seleccionar...",
  searchPlaceholder = "Buscar...",
  value = "",
  onChange,
  onSearch,
  initialOptions = [],
  className = "",
  disabled = false,
  error,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<SearchSelectOption[]>(initialOptions);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const selectedOption = options.find((o) => o.value === value);

  const fetchOptions = useCallback(
    async (searchTerm: string) => {
      setLoading(true);
      try {
        const results = await onSearch(searchTerm);
        setOptions(results);
      } catch {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [onSearch],
  );

  useEffect(() => {
    if (open) {
      fetchOptions(query);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [open, fetchOptions, query]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setOpen(false);
    setQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.("");
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center ${className}`}
    >
      <button
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`w-full flex items-center gap-2 relative bg-surface-container-lowest border rounded-lg py-3.5 px-4 text-left transition-all duration-300 font-body-md cursor-pointer ${
          error
            ? "border-error text-error"
            : "border-outline-variant/30 text-on-surface"
        } ${open ? "border-primary input-glow" : "hover:border-outline-variant/60"} ${
          icon ? "pl-12" : ""
        } ${value ? "pr-16" : "pr-10"} disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
            {icon}
          </span>
        )}
        <span
          className={`flex-1 truncate ${!selectedOption?.label ? "text-outline" : ""}`}
        >
          {selectedOption?.label || placeholder}
        </span>
        <span className="material-symbols-outlined text-outline transition-transform duration-200 text-sm absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-9 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center text-outline hover:text-on-surface transition-colors cursor-pointer z-10"
          title="Limpiar selección"
          aria-label="Limpiar selección"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      ) : null}

      {error && <p className="mt-1 text-label-sm text-error">{error}</p>}

      {open && (
        <div
          className="absolute top-full left-0 z-50 mt-1 w-full bg-surface-container/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-72 animate-in fade-in zoom-in-95 duration-150"
          role="listbox"
        >
          <div className="p-2 border-b border-outline-variant/20 bg-surface-container-high/40">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm pointer-events-none">
                search
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg py-2 pl-9 pr-3 text-label-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-white/5">
            {loading ? (
              <div className="flex items-center justify-center py-6 gap-2 text-outline text-label-md">
                <span className="material-symbols-outlined text-lg animate-spin">
                  sync
                </span>
                <span>Buscando...</span>
              </div>
            ) : options.length === 0 ? (
              <div className="py-6 px-4 text-center text-outline text-label-md">
                No se encontraron resultados
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-2.5 text-label-md transition-colors flex items-center justify-between cursor-pointer ${
                    option.value === value
                      ? "bg-primary/15 text-primary font-semibold"
                      : "text-on-surface hover:bg-white/5"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {option.value === value && (
                    <span className="material-symbols-outlined text-sm text-primary">
                      check
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

SearchSelect.displayName = "SearchSelect";
