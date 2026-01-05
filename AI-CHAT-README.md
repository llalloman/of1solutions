# Chat AI con Cloudflare Workers AI

## 🎯 Características

- ✅ **100% Gratuito** (hasta 10,000 mensajes/día)
- ✅ **Respuestas instantáneas 24/7**
- ✅ **Conocimiento sobre OF1 SOLUTIONS**
- ✅ **Interfaz moderna y responsive**
- ✅ **Sin instalación de terceros**

## 📦 Archivos Creados

1. `functions/ai-chat.js` - Cloudflare Pages Function con Workers AI
2. `ai-chat-widget.js` - Widget de chat para el cliente
3. `ai-chat-widget.css` - Estilos del chat

## 🚀 Despliegue en Cloudflare Pages

### Paso 1: Habilitar Workers AI

1. Ve a tu dashboard de Cloudflare
2. Selecciona tu sitio `of1solutions`
3. Ve a **Settings** > **Functions**
4. Asegúrate que **Workers AI** esté habilitado (es gratis)

### Paso 2: Desplegar

Simplemente haz push a GitHub - Cloudflare Pages lo detectará automáticamente:

```bash
git add -A
git commit -m "✨ Agregar chat AI con Cloudflare Workers AI"
git push origin main
```

Cloudflare Pages automáticamente:
- Detectará la carpeta `functions/`
- Habilitará la función `ai-chat.js`
- Configurará Workers AI según `wrangler.toml`

### Paso 3: Verificar

1. Espera a que el despliegue termine (2-3 minutos)
2. Visita tu sitio: `https://of1solutions.com`
3. Verás el botón del chat AI en la esquina inferior derecha
4. ¡Pruébalo!

## 🎨 Personalización

### Cambiar el prompt del AI

Edita `functions/ai-chat.js` línea 25-45 para modificar el contexto que el AI conoce sobre tu empresa.

### Cambiar colores

Edita `ai-chat-widget.css`:
- Línea 15: Color del botón flotante
- Línea 76: Color del header
- Línea 166: Color de mensajes del usuario

### Preguntas rápidas

Edita `ai-chat-widget.js` línea 89-94 para cambiar las sugerencias iniciales.

## 💰 Límites Gratuitos

Cloudflare Workers AI Plan Gratuito:
- ✅ 10,000 mensajes por día
- ✅ Modelos LLaMA 3.1 8B
- ✅ Sin tarjeta de crédito requerida

## 🔧 Solución de Problemas

### Error: "AI binding not found"

Asegúrate que en tu Cloudflare Pages:
1. Ve a **Settings** > **Functions**
2. En **AI Bindings**, debe aparecer `AI`
3. Si no está, agrega manualmente: Name: `AI`, Type: `Workers AI`

### El chat no aparece

1. Verifica la consola del navegador (F12)
2. Asegúrate que `ai-chat-widget.js` y `ai-chat-widget.css` se carguen
3. Revisa que la ruta `/ai-chat` esté disponible

### Respuestas lentas

El modelo LLaMA puede tardar 2-5 segundos. Es normal en el plan gratuito.

## 📊 Monitoreo

Ve a Cloudflare Dashboard > Analytics > Workers AI para ver:
- Número de consultas
- Tokens usados
- Errores

## 🎯 Próximos Pasos

Considera agregar:
- Historial de conversación persistente
- Integración con CRM
- Analytics de conversaciones
- Respuestas personalizadas por contexto
