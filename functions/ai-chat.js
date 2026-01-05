// Cloudflare Pages Function para AI Chat
// Usa Workers AI - Modelo gratuito

export async function onRequest(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { message } = await request.json();

    // Sistema de prompt con contexto de OF1 SOLUTIONS
    const systemPrompt = `Eres un asistente virtual de OF1 SOLUTIONS, una empresa de tecnología que ofrece:

SERVICIOS:
- Desarrollo de Software a Medida
- Optimización de Sistemas y Rendimiento
- Integración de Plataformas Empresariales
- Infraestructura y Despliegue Escalable

INFORMACIÓN DE CONTACTO:
- Ubicación: Quito, Ecuador
- Email: info@of1solutions.com
- WhatsApp: +593 983 904 993
- LinkedIn: Walter Molina (CEO & Fundador)
- Horario: Lunes a Viernes 9:00-18:00 (GMT-5), Sábados 10:00-14:00

CULTURA:
- Trabajo 100% remoto
- Enfoque en resultados y calidad
- Más de 16 años de experiencia
- 50+ proyectos completados

Responde de forma profesional, amable y concisa. Si el usuario pregunta sobre servicios específicos, precios o proyectos complejos, invítalo a contactar directamente por WhatsApp o email. Responde en español.`;

    // Llamada a Workers AI
    const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return new Response(JSON.stringify({
      reply: response.response || 'Lo siento, no pude procesar tu mensaje. ¿Podrías reformularlo?'
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    return new Response(JSON.stringify({
      reply: 'Disculpa, estoy teniendo problemas técnicos. Por favor escríbenos a info@of1solutions.com o por WhatsApp: +593 983 904 993'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}
