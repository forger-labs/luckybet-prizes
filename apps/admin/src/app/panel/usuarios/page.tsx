import { UsersList } from "@/components/admin/users/UsersList";

/**
 * UsuariosPage — página de gestión de usuarios administrativos.
 *
 * Renderiza el orquestador UsersList con búsqueda, filtros,
 * tabla y paginación. La capa "use client" está dentro de
 * UsersList — esta página se mantiene como server component.
 */
export default function UsuariosPage() {
  return <UsersList />;
}
