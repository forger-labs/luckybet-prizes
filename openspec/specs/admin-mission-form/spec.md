# Admin Mission Form Specification

## Purpose

Modal-based form for creating and editing missions. Includes step builder and content lock on activation.

## Requirements

### REQ-FORM-001: Modal Dialog

| Property | Value |
|----------|-------|
| Trigger | "Crear misión" button / Edit row action |
| Dismiss | Click outside (if no unsaved changes) / X button |

The form MUST render as a modal overlay. On creation intent, the modal opens empty. On edit intent, the modal opens pre-filled with the mission data.

#### Scenario: Create new mission

- GIVEN the admin clicks "Crear misión"
- WHEN the modal opens
- THEN all fields are empty
- AND the title reads "Nueva Misión"

#### Scenario: Edit existing mission

- GIVEN the admin clicks Edit on an Inactive mission
- WHEN the modal opens
- THEN all fields are pre-filled with the mission data
- AND the title reads "Editar Misión"

#### Scenario: Unsaved changes warning

- GIVEN the modal has unsaved changes
- WHEN the admin clicks outside or presses Escape
- THEN a confirmation dialog appears: "¿Descartar cambios?"

### REQ-FORM-002: Mission Fields

The form MUST include these fields:

| Field | Type | Required | Default |
|-------|------|----------|---------|
| Title | Text input | Yes | — |
| Description | Textarea | Yes | — |
| Token reward | Number input | Yes | — |
| Bonus % | Number input | No | 0 |
| XP reward | Number input | Yes | — |
| Cover image | File upload | No | — |
| Category | Select | Yes | daily |

#### Scenario: Required field validation

- GIVEN the form is submitted with empty required fields
- WHEN the admin clicks "Guardar"
- THEN inline validation errors appear under each empty required field
- AND the form is NOT submitted

### REQ-FORM-003: Step Builder

| Property | Value |
|----------|-------|
| Min steps | 1 |
| Verification types | `IMAGE`, `TEXT` |

Each step MUST have: title (required), verification type (required, select), optional description. Steps MUST be reorderable (drag or up/down buttons).

#### Scenario: Add step

- GIVEN the form is in create mode
- WHEN the admin clicks "Agregar paso"
- THEN a new step row appears with empty title and default verification type

#### Scenario: Remove step (last step guard)

- GIVEN the form has exactly 1 step
- WHEN the admin attempts to remove it
- THEN the remove button is disabled
- AND a tooltip explains: "La misión debe tener al menos un paso"

### REQ-FORM-004: Content Lock

When editing a mission that is already Active, ALL form fields MUST be read-only and the Save button MUST be hidden. A banner message MUST explain the lock.

#### Scenario: Active mission opened for view

- GIVEN an Active mission
- WHEN the admin opens it via View or Edit
- THEN all input fields display as read-only text
- AND a banner reads: "Misión activa — contenido bloqueado"
- AND the Guardar button is hidden
