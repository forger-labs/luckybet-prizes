---
name: Midnight Harbor
description: Design System for LuckyBet Premios
colors:
  abismo-profundo: '#0b1326'
  abismo-dim: '#0b1326'
  superficie-bright: '#31394d'
  superficie-container-lowest: '#060e20'
  superficie-container-low: '#131b2e'
  superficie-container: '#171f33'
  superficie-container-high: '#222a3d'
  superficie-container-highest: '#2d3449'
  superficie-variant: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bdc8d1'
  on-background: '#dae2fd'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  neon-artico: '#8ed5ff'
  on-neon-artico: '#00354a'
  neon-artico-container: '#38bdf8'
  on-neon-artico-container: '#004965'
  neon-artico-fixed: '#c4e7ff'
  neon-artico-fixed-dim: '#7bd0ff'
  on-neon-artico-fixed: '#001e2c'
  on-neon-artico-fixed-variant: '#004c69'
  inverse-neon-artico: '#00668a'
  oro-vespertino: '#ffc640'
  on-oro-vespertino: '#402d00'
  oro-vespertino-container: '#e3aa00'
  on-oro-vespertino-container: '#5a4100'
  oro-vespertino-fixed: '#ffdf9f'
  oro-vespertino-fixed-dim: '#f9bd22'
  on-oro-vespertino-fixed: '#261a00'
  on-oro-vespertino-fixed-variant: '#5c4300'
  luz-de-luna: '#c5c9ff'
  on-luz-de-luna: '#131e8c'
  luz-de-luna-container: '#a3abff'
  on-luz-de-luna-container: '#2c37a0'
  luz-de-luna-fixed: '#e0e0ff'
  luz-de-luna-fixed-dim: '#bdc2ff'
  on-luz-de-luna-fixed: '#000767'
  on-luz-de-luna-fixed-variant: '#2f3aa3'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
typography:
  display:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 48px
    fontWeight: 800
    lineHeight: 56px
    letterSpacing: -0.02em
  headline:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 32px
    fontWeight: 700
    lineHeight: 40px
    letterSpacing: -0.01em
    fontSizeMobile: 24px
    lineHeightMobile: 32px
  title:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 20px
    fontWeight: 600
    lineHeight: 28px
  body:
    fontFamily: Be Vietnam Pro, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  bodyLarge:
    fontFamily: Be Vietnam Pro, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
  label:
    fontFamily: Be Vietnam Pro, sans-serif
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0.01em
  labelSmall:
    fontFamily: Be Vietnam Pro, sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 4px
  default: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  base: 8px
  containerPaddingMobile: 16px
  containerPaddingDesktop: 32px
  gutter: 16px
  stackSm: 12px
  stackMd: 24px
  stackLg: 48px
components:
  button-primary:
    backgroundColor: '{colors.neon-artico}'
    textColor: '{colors.on-neon-artico}'
    rounded: '{rounded.default}'
    padding: 16px 24px
    typography: '{typography.label}'
  button-primary-hover:
    backgroundColor: '{colors.neon-artico-fixed-dim}'
    textColor: '{colors.on-neon-artico}'
    rounded: '{rounded.default}'
    padding: 16px 24px
  button-secondary:
    backgroundColor: '{colors.oro-vespertino}'
    textColor: '{colors.on-oro-vespertino}'
    rounded: '{rounded.default}'
    padding: 16px 24px
  button-ghost:
    backgroundColor: transparent
    textColor: '{colors.neon-artico}'
    rounded: '{rounded.default}'
    padding: 16px 24px
  input-default:
    backgroundColor: '{colors.superficie-container-lowest}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.default}'
    padding: 14px 16px
  input-focus:
    backgroundColor: '{colors.superficie-container-lowest}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.default}'
    padding: 14px 16px
---

# Design System: Midnight Harbor

## 1. Overview

**Creative North Star: "La Bóveda del Jugador"**

Midnight Harbor es un sistema de diseño oscuro y sofisticado que evoca la atmósfera de un lounge nocturno de alto nivel. Cada pantalla se siente como entrar a una bóveda exclusiva: el fondo es profundo y contenido (Abismo Profundo), mientras las recompensas y el progreso brillan con luz propia (Neón Ártico, Oro Vespertino). La interfaz nunca compite con el contenido — lo contiene, lo realza y lo celebra.

El sistema rechaza explícitamente la estética de casinos online baratos: sin fondos degradados chillones, sin parpadeos excesivos, sin tipografía genérica que inspire desconfianza. La energía está en los acentos, no en el fondo. La accesibilidad es parte del lujo: tipografía generosa, contraste alto, espacios amplios.

**Key Characteristics:**

- **Oscuro pero no frío:** el navy profundo es el ancla visual, pero los acentos de neón y oro dan calidez y energía
- **Glassmorphism como herramienta de jerarquía:** el blur y la translucencia diferencian niveles (cards, modales, popovers) sin recurrir a sombras pesadas
- **Premio visual en los acentos:** el oro es reservado para recompensas y acciones de alto valor; el azul neón para progreso y estados activos
- **Geometría amigable:** bordes redondeados generosos (8px–24px) para mantener la accesibilidad visual
- **Consistente sobre sorpresivo:** el usuario navega entre módulos que se sienten del mismo lugar

## 2. Colors

La paleta se divide en cuatro roles cromáticos, todos sobre un fondo nocturno ancla. Los acentos son escasos por diseño: su rareza es lo que los hace valiosos.

### Primary

- **Neón Ártico** (#8ed5ff): El color de la acción y el progreso. Se usa en botones primarios, barras de progreso, estados activos y bordes de foco. Su variante más vibrante (Neón Ártico Container, #38bdf8) funciona como glow de hover y en containers de información.
- **On Neón Ártico** (#00354a): Texto sobre fondos de primary. Navy muy oscuro con alto contraste.

### Secondary

- **Oro Vespertino** (#ffc640): Reservado exclusivamente para momentos de alto valor: recompensas, claims, "Misión Completada", CTAs de fichas. Nunca se usa decorativamente. Su glow es sutil (#ffc640 con 0.2 de opacidad en sombra).
- **On Oro Vespertino** (#402d00): Texto sobre oro.

### Tertiary

- **Luz de Luna** (#c5c9ff): Acento secundario para variación en badges, tags y elementos informativos que no compiten con primary/secondary.
- **On Luz de Luna** (#131e8c): Texto sobre tertiary.

### Neutral

- **Abismo Profundo** (#0b1326): Fondo de toda la interfaz. Es el lienzo nocturno del que todo emerge.
- **Superficie Container** (#171f33): Fondo de cards, sidebars y paneles. Un escalón más claro que el fondo base para establecer jerarquía tonal sin sombras.
- **On Surface** (#dae2fd): Texto primario. Un blanco azulado suave que evita el haloing del blanco puro en dark mode.
- **On Surface Variant** (#bdc8d1): Texto secundario, metadatos, labels.
- **Outline** (#87929a): Bordes, dividers, iconos decorativos.
- **Outline Variant** (#3e484f): Bordes secundarios, variante de outline más sutil.

### Error

- **Error** (#ffb4ab): Señalización de error, mensajes de validación, acciones destructivas. Siempre acompañado de texto descriptivo.

### Named Rule

**La Regla de Rareza.** El Oro Vespertino aparece en menos del 10% de cualquier pantalla. Su presencia indica una acción o estado de alto valor. Si el oro está en más de un lugar, pierde su peso semántico.

## 3. Typography

**Display Font:** Plus Jakarta Sans (con fallback a sans-serif)
**Body Font:** Be Vietnam Pro (con fallback a sans-serif)

El sistema utiliza un solo pairing de dos familias: Plus Jakarta Sans para titulares (moderna, ligeramente redondeada, amigable pero con peso) y Be Vietnam Pro para cuerpo (excelente legibilidad en dark mode, warm contemporary tone). Las dos familias conviven en un contraste de peso y propósito, no de forma.

### Hierarchy

- **Display** (800, 48px, 56px, -0.02em letter-spacing): Hero de página, títulos de sección principales. Solo en pantallas grandes. En mobile desciende a headline.
- **Headline** (700, 32px, 40px, -0.01em): Títulos de sección. Mobile: 24px/32px.
- **Title** (600, 20px, 28px): Títulos de cards, modales, paneles laterales.
- **Body Large** (400, 18px, 28px): Párrafos destacados, descripciones largas.
- **Body** (400, 16px, 24px): Texto corrido, contenido de cards, tablas. Línea máxima: 75 caracteres en prosa; datos pueden ser más densos.
- **Label** (600, 14px, 20px, +0.01em): Botones, labels de formulario, tabs activos.
- **Label Small** (500, 12px, 16px, +0.05em): Badges de estado, metadatos, timestamps. Tracking extra para claridad en cuerpo pequeño.

### Named Rule

**La Regla de la Jerarquía Silenciosa.** Nunca uses Display para un título de card ni Headline para un botón. Cada nivel tipográfico tiene su contexto; romper la escala erosiona la jerarquía visual y confunde al usuario sobre qué es importante.

## 4. Elevation

El sistema no utiliza sombras tradicionales para establecer jerarquía. En su lugar, usa **Tonal Layering** combinado con **Glassmorphism**: cada nivel de elevación se expresa como un color de superficie diferente, no como una sombra. Esto mantiene la estética limpia, oscura y cohesiva.

### Tonal Scale (de más profundo a más elevado)

1. **Abismo Profundo** (#0b1326) — Background general, nivel 0
2. **Superficie Container Low** (#131b2e) — Backdrop de áreas secundarias
3. **Superficie Container** (#171f33) — Cards, sidebars, paneles base (nivel 1)
4. **Superficie Container High** (#222a3d) — Hover de cards, listas con interacción (nivel 1.5)
5. **Superficie Container Highest** (#2d3449) — Hover intenso, elementos seleccionados (nivel 1.8)

### Glassmorphism (nivel 2: modales, popovers, drawers)

Los elementos flotantes usan `background: rgba(23, 31, 51, 0.85)` con `backdrop-filter: blur(16px)` y un borde de 1px con opacidad 12% blanca. Esto crea un vidrio esmerilado oscuro que se siente elevado sin recurrir a sombras.

### Glows (en lugar de sombras)

Los glows reemplazan a las sombras para elementos que necesitan atención:

- **Glow Primario:** `0 0 20px rgba(56, 189, 248, 0.15)` — botón primary hover, badge active
- **Glow Gold:** `0 0 20px rgba(255, 198, 64, 0.25)` — recompensas, claims
- **Glow Small:** versiones reducidas (12px blur) para paginación activa y badges

### Named Rule

**La Regla de la Sombra Cero.** No uses sombras reales (`box-shadow` con negro) para establecer elevación. Usa tonos de superficie. Los únicos `box-shadow` permitidos son los glows de acento (primary y oro).

## 5. Components

### Buttons

- **Shape:** Bordes redondeados de 8px. Sin sombra. Altura: 56px (con padding vertical de 16px). Sin uppercase forzado.
- **Primary** (Neón Ártico #8ed5ff + texto #00354a): Principal. Un solo botón primary por vista. Hover: se oscurece ligeramente hacia primary-fixed-dim (#7bd0ff) con glow primario suave. Active: escala a 0.98.
- **Secondary / CTA** (Oro Vespertino #ffc640 + texto #402d00): Exclusivo para acciones de recompensa y alto valor. Incluye glow gold. Mismas dimensiones que primary.
- **Ghost** (transparente + borde primary 1px + texto primary): Acciones secundarias. Hover: fondo primary al 10%. Active: escala.
- **Disabled:** 50% de opacidad, sin hover, cursor not-allowed. Sin escala.

### Inputs / Fields

- **Style:** Fondo superficie-container-lowest, borde outline-variant al 30% de opacidad, 8px de radio.
- **Focus:** El borde cambia a Neón Ártico con un glow primario sutil (`input-glow`). Transición de 300ms.
- **Icon:** Material Symbols a la izquierda (o derecha según contexto), en color outline.
- **Placeholder:** color outline. **No usar gris rebajado** — el contraste 4.5:1 se mantiene.
- **Error:** Borde cambia a error (#ffb4ab), texto de error en label-sm abajo.
- **Disabled:** Misma opacidad 50%.

### Chips & Badges

- **Shape:** Pill completo (border-radius: 9999px). Padding horizontal de 10px, vertical de 2px.
- **Typography:** label-sm (12px, 500 weight, +0.05em tracking), uppercase.
- **Variants:**
  - **Inactive:** bg outline-variant al 30%, texto on-surface-variant
  - **Active:** bg primary al 15%, texto primary
  - **Completed:** bg verde [#22c55e] al 15%, texto verde [#4ade80]
  - **Cancelled:** bg error-container al 30%, texto error

### Cards / Containers

- **Corner Style:** 16px de radio (rounded-lg) para mission cards y contenedores principales. 8px para contenedores secundarios.
- **Background:** Superficie Container (#171f33) con borde interior de 1px opacidad 10% blanca.
- **Shadow Strategy:** Sin sombra. La jerarquía viene del tono de superficie.
- **Padding Interno:** 16px (gutter) en mobile, 24px (stack-md) en desktop.

### Modals / Dialogs

- **Backdrop:** Negro al 60% con backdrop-filter blur. Cierra al hacer clic fuera o Escape.
- **Panel:** Fondo superficie-container al 80% con backdrop-filter blur-xl (16px). Borde 1px opacidad 12% blanca. Radio 12px (rounded-md → xl en algunos casos).
- **Animación:** Scale (95% → 100%) + fade, 200ms ease-out. Solo en entrada.
- **Header:** Separado por borde inferior de opacidad 10% blanca. Título en title-md.
- **Body:** Max-height 70vh con overflow-y auto.

### Pagination

- **Shape:** Botones cuadrados de 36×36px con radio 8px.
- **Active:** Fondo primary al 15%, texto primary, glow primario pequeño.
- **Inactive:** Texto on-surface, hover con fondo blanco al 5%.
- **Disabled:** 40% de opacidad.
- **Ellipsis:** Texto outline, sin interacción.

### Navigation (Sidebar)

- **Style:** Colapsable, fixed a la izquierda. Fondo superficie-container.
- **Ítems activos:** Fondo primary al 10%, borde derecho de 4px en primary. Icono y texto en primary.
- **Ítems inactivos:** Texto on-surface-variant, hover con superficie-container-high.
- **Transición:** 300ms en ancho y opacidad al colapsar.

## 6. Do's and Don'ts

### Do:

- **Usá** glows (primary u oro) para indicar elementos activos y recompensas en lugar de sombras.
- **Usá** fondo oscuro (Abismo Profundo) como lienzo base. Los elementos emergen por luminosidad, no por profundidad.
- **Mantené** un máximo de un botón Oro Vespertino por pantalla. Su rareza es su valor semántico.
- **Priorizá** tipografía Be Vietnam Pro para cuerpo en todos los textos funcionales (labels, tablas, descripciones).
- **Usá** Plus Jakarta Sans bold (700–800) solo para titulares y displays. Nunca en botones o labels.
- **Asegurate** contraste 4.5:1 en body text (#dae2fd sobre #0b1326 pasa, #bdc8d1 sobre #171f33 también).
- **Usá** el modal como último recurso — explorá alternativas inline o progressive disclosure primero.

### Don't:

- **No diseñes** con estética de casino online barato: fondos degradados chillones, botones que parecen de 2005, tipografía sin personalidad que inspira desconfianza.
- **No uses** sombras negras para elevación. La jerarquía se construye con tonos de superficie, no con box-shadow.
- **No pongas** Oro Vespertino en más de un lugar por pantalla a menos que sea estrictamente necesario. Si el oro está en todos lados, no significa nada.
- **No mezcles** familias tipográficas similares. Plus Jakarta Sans y Be Vietnam Pro fueron elegidas por su contraste controlado; no agregues una tercera sans-serif.
- **No uses** Display o Headline para labels de formulario, botones o metadatos. Cada nivel tiene su contexto.
- **No anides** cards. Una card dentro de otra rompe el sistema de tonal layering.
- **No uses** modales por defecto. Son la respuesta lazy. Agotá alternativas inline/progressive disclosure primero.
- **No uses** estilos de "app financiera" fría y transaccional. Midnight Harbor es un lounge, no un panel de inversiones.
