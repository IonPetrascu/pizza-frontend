"use client"

import { useTranslations } from 'next-intl';
import { useSession, signIn } from 'next-auth/react';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const { data: session } = useSession()
  console.log(session);

  return (
    <div>
      <h1>{t('title')}</h1>
      <button onClick={() => signIn("github", { callbackUrl: "/", redirect: true })}>sign in</button>
    </div>
  );
} 