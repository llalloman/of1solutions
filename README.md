# OF1 SOLUTIONS - Corporate Website

![OF1 SOLUTIONS](assets/logo.png)

**Sitio web corporativo moderno para OF1 SOLUTIONS** - Soluciones TI inteligentes para empresas que buscan innovación, optimización y crecimiento.

## 🚀 Características

- ✨ Diseño moderno, limpio y profesional
- 📱 Totalmente responsivo (móvil, tablet, desktop)
- 🎨 Paleta de colores corporativa (Azul #0078D4, Turquesa #2DCCD3)
- ⚡ Optimizado para rendimiento y SEO
- 🎭 Animaciones suaves al hacer scroll
- 📧 Formulario de contacto funcional
- 🔒 Configuración de seguridad para Cloudflare Pages
- 🌐 Sin dependencias de frameworks (HTML, CSS, JS puro)

## 📋 Estructura del Proyecto

```
of1solutions/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── scripts.js              # JavaScript
├── assets/                 # Recursos multimedia
│   ├── logo.png
│   ├── logo-light.png
│   ├── favicon.png
│   ├── walter-molina.jpg
│   ├── case-1.jpg
│   ├── case-2.jpg
│   └── case-3.jpg
├── _headers                # Configuración de headers para Cloudflare
├── _redirects              # Configuración de redirects
├── wrangler.toml           # Configuración de Cloudflare Pages
├── .github/
│   └── copilot-instructions.md
└── README.md               # Este archivo
```

## 🎨 Secciones del Sitio

1. **Header Fijo** - Navegación con logo y menú
2. **Hero Section** - Presentación principal con CTA
3. **Servicios** - 4 servicios principales con íconos
4. **Metodología** - Proceso de trabajo en 4 pasos
5. **Casos de Éxito** - Portafolio de proyectos
6. **Equipo** - Sobre nosotros, misión, visión y valores
7. **Contacto** - Formulario y datos de contacto
8. **Footer** - Enlaces y redes sociales

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño y animaciones
  - Variables CSS
  - Flexbox y Grid
  - Media Queries
  - Animaciones y transiciones
- **JavaScript (Vanilla)** - Interactividad
  - Scroll suave
  - Navegación activa
  - Menú móvil
  - Animaciones con Intersection Observer
  - Validación de formularios

## 🚀 Despliegue en Cloudflare Pages

### Opción 1: Despliegue desde Git (Recomendado)

1. **Crea un repositorio en GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tu-usuario/of1solutions.git
   git push -u origin main
   ```

2. **Conecta con Cloudflare Pages**
   - Inicia sesión en [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Ve a **Pages** > **Create a project**
   - Selecciona **Connect to Git**
   - Autoriza GitHub y selecciona tu repositorio
   - Configura el build:
     - **Build command:** (dejar vacío - es un sitio estático)
     - **Build output directory:** `/`
     - **Root directory:** `/`
   - Haz clic en **Save and Deploy**

3. **Configurar dominio personalizado** (Opcional)
   - Ve a tu proyecto en Cloudflare Pages
   - **Custom domains** > **Set up a custom domain**
   - Sigue las instrucciones para configurar tu dominio

### Opción 2: Despliegue Directo (Wrangler CLI)

1. **Instala Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Inicia sesión en Cloudflare**
   ```bash
   wrangler login
   ```

3. **Despliega el proyecto**
   ```bash
   wrangler pages publish . --project-name=of1solutions
   ```

### Opción 3: Despliegue Manual (Drag & Drop)

1. Ve a [Cloudflare Pages](https://pages.cloudflare.com)
2. Crea un nuevo proyecto
3. Selecciona **Upload assets**
4. Arrastra toda la carpeta del proyecto
5. Haz clic en **Deploy site**

## 🖼️ Assets Necesarios

Antes de desplegar, asegúrate de tener estas imágenes en la carpeta `assets/`:

- `logo.png` - Logo principal (fondo transparente)
- `logo-light.png` - Logo en blanco para footer
- `favicon.png` - Favicon del sitio (32x32px o 64x64px)
- `walter-molina.jpg` - Foto del fundador
- `case-1.jpg`, `case-2.jpg`, `case-3.jpg` - Imágenes de casos de estudio

### Crear placeholders temporales

Si no tienes las imágenes, puedes usar [placeholder.com](https://placeholder.com) temporalmente:

```bash
# En la carpeta assets/, puedes descargar placeholders:
# Logo: 200x50px
# Foto perfil: 400x400px
# Casos: 800x600px
```

## 🔧 Configuración Local

Para probar el sitio localmente:

1. **Servidor HTTP simple con Python:**
   ```bash
   python3 -m http.server 8000
   ```
   Luego abre: `http://localhost:8000`

2. **Con Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

3. **Con PHP:**
   ```bash
   php -S localhost:8000
   ```

4. **Con VS Code Live Server:**
   - Instala la extensión "Live Server"
   - Clic derecho en `index.html` > "Open with Live Server"

## 📝 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --color-primary: #0078D4;      /* Azul principal */
    --color-secondary: #2DCCD3;    /* Turquesa */
    --color-white: #FFFFFF;
    --color-gray-light: #E6E6E6;
}
```

### Modificar Contenido

- **Textos:** Edita directamente en `index.html`
- **Servicios:** Busca la sección `.services__grid`
- **Casos de éxito:** Busca `.cases__grid`
- **Información de contacto:** Actualiza emails, teléfonos y LinkedIn

### Integrar Formulario Real

El formulario actualmente simula el envío. Para hacerlo funcional:

1. **Opción 1: Cloudflare Workers** (Recomendado)
   - Crea un Worker para procesar el formulario
   - Usa KV para almacenar o envía emails vía API

2. **Opción 2: Servicios externos**
   - [Formspree](https://formspree.io)
   - [Netlify Forms](https://www.netlify.com/products/forms/)
   - [EmailJS](https://www.emailjs.com/)

3. **Opción 3: API propia**
   - Crea una API REST en tu backend
   - Actualiza el fetch en `scripts.js`

## 🔒 Seguridad

Los headers de seguridad están configurados en `_headers`:

- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection
- ✅ Content-Security-Policy
- ✅ Referrer-Policy
- ✅ Permissions-Policy

## 📊 SEO

El sitio incluye:

- ✅ Meta tags optimizados
- ✅ Open Graph para redes sociales
- ✅ Estructura semántica HTML5
- ✅ Lazy loading de imágenes
- ✅ URLs limpias y descriptivas
- ✅ Alt tags en todas las imágenes

## 🐛 Troubleshooting

### Problema: Los estilos no cargan

- Verifica que `styles.css` esté en la raíz del proyecto
- Comprueba la consola del navegador para errores
- Asegúrate que el path en `index.html` sea correcto

### Problema: JavaScript no funciona

- Abre la consola del navegador (F12)
- Verifica que `scripts.js` esté cargando correctamente
- Comprueba que no haya errores de sintaxis

### Problema: Imágenes no aparecen

- Verifica que las imágenes existan en `assets/`
- Comprueba los nombres de archivo (case-sensitive)
- Usa placeholders temporales si es necesario

## 📞 Contacto

**OF1 SOLUTIONS**
- 📧 Email: contacto@of1solutions.com
- 📱 Teléfono: +593 991 840 854
- 🔗 LinkedIn: [OF1 SOLUTIONS](https://linkedin.com/company/of1solutions)
- 📍 Ubicación: Lima, Perú

## 📄 Licencia

© 2025 OF1 SOLUTIONS. Todos los derechos reservados.

---

**Desarrollado con ❤️ para transformar tu futuro con tecnología**