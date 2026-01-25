export async function onRequest(context) {
  try {
    const { env } = context;
    
    // Test if SESSION binding exists
    if (!env.SESSION) {
      return new Response('ERROR: SESSION binding not found', { status: 500 });
    }
    
    // Test if we can write to it
    await env.SESSION.put('test-key', 'test-value');
    const value = await env.SESSION.get('test-key');
    
    return new Response(`SUCCESS: SESSION binding works. Value: ${value}`, { 
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
    
  } catch (error) {
    return new Response(`ERROR: ${error.message}\n\nStack: ${error.stack}`, { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
