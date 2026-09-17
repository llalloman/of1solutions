# OF1 Solutions — web corporativa

Sitio estático en HTML, CSS y JavaScript, sin framework ni dependencias de ejecución. Se publica mediante la configuración existente de Cloudflare (`wrangler.toml`, `_headers`, `.assetsignore`).

## Desarrollo local

```powershell
python -m http.server 8097 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8097/. No requiere compilación. Comprobar JavaScript con `node --check scripts.js`.

## Rediseño de septiembre de 2026

Se auditó el repositorio y la web publicada en https://of1solutions.com/. La referencia https://krugercorp.com/ aportó criterios de organización por líneas de negocio y presencia institucional; no se reutilizaron sus imágenes, textos, colores ni componentes.

Problemas previos: cuatro CTA en el hero, servicios repetidos como tarjetas, dos formularios simultáneos, tipografías y espacios con jerarquía irregular, scripts y CSS para secciones inexistentes. El menú móvil podía conservar bloqueado el scroll tras navegar.

Estructura nueva:

1. Hero con mensaje principal y diagrama conectado del ecosistema OF1.
2. Selector accesible de software, IA, automatización e integraciones/datos.
3. Capacidades de desarrollo en composición editorial.
4. Productos: FacturaOF1 ERP, OF1 Firmador y precios de firma electrónica.
5. Flujo de IA aplicada al negocio.
6. Empresa, criterios de trabajo y liderazgo.
7. Casos preparados, ocultos mientras no haya información aprobada.
8. Un formulario empresarial, correo y WhatsApp.

Se conservaron la paleta azul `#0066CC` y turquesa `#00C9B7` del CSS existente, Montserrat/Inter, metadatos SEO, dominios de producto, precios publicados y todos los IDs anteriores. Se retiraron la cifra no respaldada de 16+ años y las cantidades ficticias del dashboard. La vista ERP está identificada como conceptual.

## Archivos y mantenimiento

- `index.html`: contenido semántico, navegación, productos, equipo y formulario.
- `styles.css`: variables visuales, componentes y responsive (1200, 960, 720 y 360 px).
- `scripts.js`: menú, tabs con flechas/Home/End, preselección de interés, revelado sutil, formulario y casos.
- `assets/`: logos y fotografía existente de Walter.

El título institucional es **Liderazgo de OF1 Solutions**. Darío aparece como **Business Development**, siguiendo la indicación de no presentarlo como fundador, que contradice el cargo Co-Founder de la lista original. Los demás nombres, cargos y especialidades proceden de la información facilitada. No se añadieron biografías. Los cuatro perfiles se presentan sin fotografías, siguiendo la indicación de retirar la foto del fundador.

Para publicar casos reales, completar `approvedCases` en `scripts.js` con `industry`, `title`, `summary` y `url`. El componente usa `textContent`, valida el protocolo del enlace y permanece oculto sin datos. No añadir clientes, resultados o cifras sin respaldo.

## Contacto y compatibilidad

Se conserva el endpoint Formspree anterior. El formulario muestra estados de envío, éxito y error, impide doble envío y conserva los datos ante fallo. Aplica un límite de espera de 20 segundos. Sin JavaScript utiliza POST nativo.

- `#form-erp` selecciona ERP Ecuador y Demostración ERP.
- `#form-software` selecciona Desarrollo de software Ecuador.
- Se conservan los enlaces a registro y acceso de OF1 Firmador, solicitud de firma, ERP, correo, LinkedIn y WhatsApp.

El menú no bloquea el scroll; cierra con Escape, al navegar, al salir el foco y al pulsar fuera. Sin JavaScript la navegación y todos los paneles de soluciones permanecen disponibles. Se respetan `prefers-reduced-motion`, foco visible, labels, estado aria del menú y paneles.

## Validación realizada

- Sintaxis JavaScript con `node --check`.
- HTML balanceado, un H1, IDs únicos, anclas locales resueltas y conservación de IDs anteriores.
- Anchos 1920, 1440, 1366, 768, 390 y 320 px: sin desbordamiento horizontal detectado en navegador.
- Revisión visual del hero y soluciones móviles, ERP y liderazgo en escritorio, y formulario móvil.
- Menú móvil, cierre al navegar, selector de soluciones, tecla End y preselección ERP comprobados.
- No se observaron errores propios de scripts.js. El navegador registró un error de canal de mensajería asíncrona ajeno a las APIs usadas por este sitio; no se considera una validación de consola completamente limpia.

Pendientes: envío real a Formspree, auditoría Lighthouse/axe, lector de pantalla y navegadores distintos a Chrome. El endpoint no recibió mensajes de prueba. Las vistas de producto son diagramas conceptuales, no capturas del sistema en producción. No se realizó despliegue.

Los enlaces de CSS y JavaScript usan versión de caché. Incrementar esa versión cuando cambien, porque `_headers` configura caché prolongada para esos recursos.

## Refinamiento visual

- Hero con fondo azul profundo, retícula, arcos turquesa y conexiones con animación inicial breve; respeta movimiento reducido.
- Composición específica del ecosistema en móvil, sin superponer nodos y textos.
- Cuatro perfiles de liderazgo con estructura común y sin fotografías: cuatro columnas en escritorio, dos en tablet y una en móvil.
- Mayor tamaño de etiquetas, especialidades y textos de producto; menos espacio entre secciones y acentos gráficos compartidos.
- Comprobación de desbordamiento en 1920, 1440, 1366, 1024, 768, 390 y 320 px; inspección visual del hero y liderazgo en escritorio y del ecosistema a 320 px.
- Las capturas reales de ERP y Firmador siguen pendientes de disponer de imágenes adecuadas; se mantienen las vistas conceptuales identificadas.
