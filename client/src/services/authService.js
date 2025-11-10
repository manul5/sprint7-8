// Servicio que simula la llamada al backend para autenticación y devuelve un JWT simulado

function base64UrlEncode(str) {
  // btoa works in browser; encode as UTF-8 first
  const utf8 = unescape(encodeURIComponent(str));
  return btoa(utf8).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function generateFakeJWT(payloadObj, expiresInSeconds = 60 * 60) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const iat = Math.floor(Date.now() / 1000);
  const payload = { ...payloadObj, iat, exp: iat + expiresInSeconds };

  const headerEnc = base64UrlEncode(JSON.stringify(header));
  const payloadEnc = base64UrlEncode(JSON.stringify(payload));
  const signature = base64UrlEncode('fake-signature');

  return `${headerEnc}.${payloadEnc}.${signature}`;
}

// Simula login: comprueba email/password básicos y devuelve token o error
export function simulateLogin(email, password) {
  return new Promise((resolve, reject) => {
    // Simular latencia
    setTimeout(() => {
      // Validación trivial (solo ejemplo)
      if (!email || !password) {
        reject(new Error('Email y contraseña requeridos'));
        return;
      }

      // Para demo: aceptar cualquier contraseña con longitud >= 4
      if (password.length < 4) {
        reject(new Error('Contraseña demasiado corta (mínimo 4 caracteres)'));
        return;
      }

      const name = email.split('@')[0];
      const token = generateFakeJWT({ sub: name, email, name }, 60 * 60 * 24 * 7); // 7 días
      resolve({ token });
    }, 700);
  });
}

// Útil: decodificar payload de JWT sin verificar la firma (solo para cliente)
export function decodeJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    // base64url -> base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}
