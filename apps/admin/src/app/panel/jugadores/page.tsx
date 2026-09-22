import { PlayersList } from "@/components/admin/players/PlayersList";

/**
 * JugadoresPage — página de jugadores de la plataforma.
 *
 * Renderiza el orquestador PlayersList con búsqueda, filtros,
 * tabla y paginación. La capa "use client" está dentro de
 * PlayersList — esta página se mantiene como server component.
 */
export default function JugadoresPage() {
  return <PlayersList />;
}
