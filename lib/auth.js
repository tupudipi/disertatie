import { serialize, parse } from 'cookie';

export function setLoginSession(res, session) {
  const sessionCookie = serialize('session', JSON.stringify(session), {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  });

  res.setHeader('Set-Cookie', sessionCookie);
}
