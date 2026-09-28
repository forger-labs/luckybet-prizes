# 📋 Backend TODO: Módulo de Estadísticas y Métricas Globales

## 🎯 Objetivo
Crear un módulo/endpoint dedicado de estadísticas globales administrativas en el backend para evitar que el frontend tenga que calcular métricas parciales sobre las páginas actuales (`take`/`skip`) o realizar queries adicionales innecesarias.

---

## 📌 Endpoints a Diseñar

### 1. Métricas Globales de Cofres y Premios (`GET /api/v1.0/player-chests/admin/stats`)
- **Autenticación**: Admin JWT (`SUPER_ADMIN` o `REVIEWER`).
- **Respuesta esperada (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Estadísticas de cofres y premios obtenidas",
    "data": {
      "chests": {
        "total": 12,
        "active": 8,
        "weekly": 6,
        "monthly": 6
      },
      "prizes": {
        "total": 350,
        "claimed": 310,
        "timeoutUncertain": 4,  // Crítico para badges de alerta global
        "processing": 2,
        "pending": 34
      }
    }
  }
  ```

### 2. Métricas Globales de Misiones (`GET /api/v1.0/missions/admin/stats`)
- **Autenticación**: Admin JWT.
- **Respuesta esperada (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Estadísticas de misiones obtenidas",
    "data": {
      "total": 45,
      "active": 18,
      "daily": 20,
      "weekly": 15,
      "fixed": 10
    }
  }
  ```

### 3. Métricas Globales de Jugadores (`GET /api/v1.0/players/admin/stats`)
- **Autenticación**: Admin JWT.
- **Respuesta esperada (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Estadísticas de jugadores obtenidas",
    "data": {
      "total": 1240,
      "active": 1180,
      "suspended": 60,
      "totalExperience": 458900
    }
  }
  ```

---

## 💡 Beneficios de Arquitectura
1. **Zero Sesgo en Frontend**: El frontend muestra métricas 100% reales independientemente de la página (`page`), tamaño (`take`) o filtros aplicados.
2. **Alertas Globales Precisas**: Los badges de alerta (como los reclamos en `TIMEOUT_UNCERTAIN`) alertan al administrador de inmediato aunque el registro esté en la última página.
3. **Eficiencia en BD**: Se ejecutan consultas optimizadas `COUNT(*)` agrupadas por estado/tipo con índices sin transferir arreglos de registros.
