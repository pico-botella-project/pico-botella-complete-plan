# Jira CSV Export Specification — Contexto para Copilot

## Objetivo

Implementar un botón:

```text
Exportar a Jira
```

capaz de transformar automáticamente el backlog visual del sistema web en un archivo `.csv` compatible con el importador oficial de Jira Cloud.

La exportación debe preservar:

* jerarquía
* relaciones padre-hijo
* responsables
* prioridades
* épicas
* historias
* subtareas
* criterios de aceptación
* definición de hecho
* estimaciones

---

# 1. Cómo funciona Jira CSV Import

Jira NO importa estructuras jerárquicas JSON directamente.

El CSV debe representar la jerarquía mediante:

* filas ordenadas
* IDs temporales
* referencias `Parent`

---

# 2. Jerarquía oficial esperada

```text
Epic
 ├── Story
 │     ├── Sub-task
 │     ├── Sub-task
 │
 ├── Story
 │     ├── Sub-task
 │
 ├── Task
```

---

# 3. Regla crítica

## Los padres SIEMPRE deben exportarse antes que los hijos

Correcto:

```text
Epic
Story
Sub-task
```

Incorrecto:

```text
Sub-task
Story
Epic
```

---

# 4. Tipos de issue Jira

| Frontend                    | Jira Issue Type |
| --------------------------- | --------------- |
| Épica                       | `Epic`          |
| Historia de Usuario         | `Story`         |
| Tarea técnica independiente | `Task`          |
| Tarea técnica hija          | `Sub-task`      |
| Error                       | `Bug`           |

---

# 5. Regla Task vs Sub-task

## `Task`

Issue independiente.

NO tiene `Parent`.

Ejemplo:

```csv
Issue Type,Issue ID,Summary
Task,300,Actualizar documentación
```

---

## `Sub-task`

Issue hijo.

REQUIERE `Parent`.

Ejemplo:

```csv
Issue Type,Issue ID,Parent,Summary
Story,100,,Login usuario
Sub-task,101,100,Crear componente LoginForm
```

---

# 6. Columnas oficiales recomendadas

| Columna               | Obligatoria | Explicación                                       |
| --------------------- | ----------- | ------------------------------------------------- |
| `Issue Type`          | Sí          | Tipo (`Epic`, `Story`, `Task`, `Sub-task`, `Bug`) |
| `Issue ID`            | Recomendado | ID temporal interno                               |
| `Parent`              | Para hijos  | Relación jerárquica                               |
| `Summary`             | Sí          | Título                                            |
| `Description`         | Recomendado | Descripción                                       |
| `Assignee`            | No          | Responsable                                       |
| `Priority`            | No          | Prioridad                                         |
| `Labels`              | No          | Etiquetas                                         |
| `Story Points`        | No          | Estimación                                        |
| `Status`              | No          | Estado inicial                                    |
| `Acceptance Criteria` | No          | Campo custom                                      |
| `Definition of Done`  | No          | Campo custom                                      |

---

# 7. Recomendación de compatibilidad Jira Cloud

Usar:

```csv
Parent
```

NO usar:

```csv
Epic Link
```

`Epic Link` está siendo deprecated por Atlassian.

---

# 8. Formato recomendado del CSV

## Orden obligatorio

```text
Epic
 → Stories
    → Subtasks
```

---

# 9. Ejemplo real completo

```csv
Issue Type,Issue ID,Parent,Summary,Description,Assignee,Priority,Labels,Story Points,Acceptance Criteria,Definition of Done

Epic,100,,Sistema de autenticación,"Gestión de login y sesiones",andrey,High,"auth,security",,,

Story,101,100,"Como usuario quiero iniciar sesión","Formulario login JWT",juan,High,"frontend,auth",5,"Debe validar credenciales;Debe mostrar errores","Tests aprobados;Deploy aprobado"

Sub-task,102,101,"Crear componente LoginForm","Implementar componente React",ana,Medium,"frontend",2,,

Sub-task,103,101,"Consumir endpoint JWT","Integrar backend auth",carlos,High,"backend",3,,
```

---

# 10. Cómo Jira interpreta el Parent

```csv
Epic,100
Story,101,100
Sub-task,102,101
```

Se convierte en:

```text
Epic(100)
 └── Story(101)
      └── Sub-task(102)
```

---

# 11. Reglas para IDs temporales

NO usar IDs reales de base de datos.

Generar IDs internos exportables.

Ejemplos válidos:

```text
100
101
102
```

o

```text
tmp-epic-auth
tmp-story-login
```

---

# 12. Modelo esperado del backlog frontend

```ts
type Epic = {
  id: string
  title: string
  description?: string
  assignee?: string
  priority?: string
  labels?: string[]
  stories: Story[]
}

type Story = {
  id: string
  title: string
  description?: string
  assignee?: string
  priority?: string
  labels?: string[]
  storyPoints?: number
  acceptanceCriteria?: string[]
  definitionOfDone?: string[]
  tasks: Task[]
}

type Task = {
  id: string
  title: string
  description?: string
  assignee?: string
  priority?: string
  labels?: string[]
  standalone?: boolean
}
```

---

# 13. Lógica de exportación esperada

## Algoritmo obligatorio

```ts
for epic in backlog:
    export(epic)

    for story in epic.stories:
        export(story, parent=epic.id)

        for task in story.tasks:
            export(task, parent=story.id)
```

---

# 14. Conversión esperada

## Épicas

```csv
Issue Type = Epic
```

---

## Historias

```csv
Issue Type = Story
Parent = Epic ID
```

---

## Tareas internas

```csv
Issue Type = Sub-task
Parent = Story ID
```

---

## Tareas independientes

```csv
Issue Type = Task
```

sin `Parent`.

---

# 15. Manejo de campos complejos

## Acceptance Criteria

Puede:

### Opción A — Campo custom Jira

Exportar como columna:

```csv
Acceptance Criteria
```

---

### Opción B — Concatenar en Description

Recomendado para máxima compatibilidad.

Ejemplo:

```text
Descripción:
Formulario login JWT

Acceptance Criteria:
- Debe validar usuario
- Debe mostrar errores

Definition of Done:
- Tests aprobados
- Deploy realizado
```

---

# 16. Formato de arrays

## Labels

Separadas por coma:

```csv
frontend,auth,security
```

---

## Acceptance Criteria

Separados por `;`

```csv
Debe validar usuario;Debe mostrar errores
```

---

# 17. Reglas CSV

## Encoding

Usar:

```text
UTF-8
```

---

## Delimitador

Usar:

```text
,
```

---

## Escaping obligatorio

Si un texto contiene:

* comas
* saltos de línea
* comillas

encapsular:

```csv
"Texto con, comas"
```

---

# 18. Validaciones obligatorias

Antes de exportar validar:

## IDs únicos

No duplicados.

---

## Parent válido

Todo `Parent` debe existir.

---

## Orden jerárquico correcto

Padres antes que hijos.

---

## Issue Types válidos

Solo:

```text
Epic
Story
Task
Sub-task
Bug
```

---

# 19. Estrategia recomendada para el proyecto

Dado que el frontend ya contiene:

* épicas
* historias
* tareas técnicas
* responsables
* criterios de aceptación
* definición de hecho

el exportador debe:

1. recorrer el árbol jerárquico
2. generar IDs temporales
3. flattenizar la estructura
4. exportar CSV ordenado
5. preservar relaciones `Parent`

---

# 20. Flujo técnico esperado

```text
Backlog UI
   ↓
Normalización interna
   ↓
Generación IDs temporales
   ↓
Flatten jerárquico
   ↓
Mapeo Jira CSV
   ↓
Escaping CSV
   ↓
Download .csv
```

---

# 21. Recomendación técnica

## NO construir CSV manualmente con strings

Usar librería CSV real.

Ejemplos:

### Node.js

* `csv-writer`
* `papaparse`
* `fast-csv`

### Python

* `csv`
* `pandas`

---

# 22. Compatibilidad Jira Cloud

La implementación debe alinearse con:

* Jira Cloud moderno
* Parent-based hierarchy
* CSV Importer oficial Atlassian

Evitar features legacy como:

```text
Epic Link
```

---

# 23. Resultado esperado

El archivo generado debe poder:

* descargarse desde frontend
* abrirse en Excel
* importarse directamente en Jira
* preservar relaciones jerárquicas
* crear automáticamente:

  * épicas
  * historias
  * subtareas
  * tareas
  * bugs

sin edición manual posterior.
