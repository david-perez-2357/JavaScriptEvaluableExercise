# UT2: Ejercicios Entregables Evaluables

Este proyecto contiene una serie de ejercicios JavaScript desarrollados para ser entregados como parte del módulo de programación. Los ejercicios están diseñados para ser ejecutados desde un único fichero HTML, con un botón asociado a cada uno de los ejercicios y un archivo JavaScript externo con las funciones necesarias. A continuación, se describen todos los ejercicios incluidos:

## Información General
- Autor: David Pérez Fernández
- Ciclo: Superior
- Curso: 2º
- Módulo: DAW

## Ejercicios

### Ejercicio 1: Análisis de Frase del Usuario
Se solicita al usuario una frase de al menos cinco palabras mediante un `prompt`. Si no cumple esta condición, se volverá a pedir la frase. Una vez introducida correctamente, se mostrarán por consola los siguientes resultados:
1. **Número de caracteres (sin contar espacios)**.
2. **Frase con todas las vocales sustituidas por asteriscos**.
3. **Frase con cada segundo carácter (ignorando espacios) sustituido por un guion bajo**.

### Ejercicio 2: Ordenación de Palabras del Usuario
Se solicita al usuario 7 palabras, algunas con mayúsculas y otras no. Posteriormente:
1. Se mostrarán las palabras ordenadas alfabéticamente, sin distinción entre mayúsculas y minúsculas, excluyendo las de 4 letras o menos.
2. El usuario podrá introducir una palabra para verificar si está en la lista. Si lo está, se mostrará un mensaje tipo "INFO" en la consola. Si no está, se añadirá a la lista y se volverá a mostrar la lista ordenada.

### Ejercicio 3: Gestión de Notas de Alumnos
Se guarda la información de 4 alumnos con sus respectivas notas (entre 0 y 10). El programa permite:
1. Solicitar al usuario el nombre de un estudiante para mostrar su nota si está registrado.
2. Si el estudiante no está registrado, se pedirá al usuario que lo dé de alta con una nota. Esta nota debe ser válida entre 0 y 10.
3. Al final, se muestra la media de las notas de la clase y la lista de estudiantes, ordenados alfabéticamente.

### Ejercicio 4: Operaciones con Conjuntos Numéricos
Se dispone de dos conjuntos de números: los múltiplos de 2 y los múltiplos de 3, ambos desde 0 hasta 30. Se mostrarán por consola los siguientes resultados:
1. **Unión** de ambos conjuntos.
2. **Intersección** de ambos conjuntos.
3. **Diferencia** entre el primer conjunto y el segundo.
4. **Diferencia** entre el segundo conjunto y el primero.
5. **Exclusión** de los elementos comunes a ambos conjuntos.

### Ejercicio 5: Valores Únicos y Cálculo de Media
El usuario debe introducir una serie de números separados por comas. Si alguno de los valores no es numérico, se volverá a solicitar la entrada. Tras introducir todos los números correctamente:
1. Se mostrarán los números que solo aparecen una vez.
2. Se calculará y mostrará la media de dichos valores.

### Ejercicio 6: Verificación de Palíndromos
El programa permite al usuario introducir una frase o palabra para verificar si es un **palíndromo** (se lee igual de izquierda a derecha y viceversa). Se ignorarán mayúsculas, minúsculas y acentos, pero "n" y "ñ" se considerarán distintos. Se mostrará si la palabra o frase es un palíndromo o no.

### Ejercicio 7: Gestión de Lista de Tareas
Este ejercicio implementa un programa de gestión de tareas con las siguientes funcionalidades:
1. **Agregar tarea**: Añadir una nueva tarea a la lista.
2. **Completar tarea**: Marcar una tarea como completada.
3. **Eliminar tarea**: Quitar una tarea de la lista.
4. **Mostrar lista de tareas**: Mostrar todas las tareas junto con su estado (pendiente o completada).
5. **Mostrar tareas pendientes**: Mostrar solo aquellas tareas que aún no se hayan completado.

> **Nota:** No puede haber dos tareas iguales en la lista.

## Uso del Programa
Para facilitar la entrega y la ejecución de los ejercicios, todos están contenidos en un único fichero HTML con botones para cada funcionalidad. El código JavaScript se encuentra en un archivo aparte que se integra en el HTML.

## Recomendaciones
- Se recomienda utilizar funciones separadas para cada ejercicio.
- Utilizar mensajes por consola con estilo personalizado para facilitar la visualización de resultados.
