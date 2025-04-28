'use client';  // ← важно: делает этот файл Client Component

import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Header() {
  return (
    <header
      className="
        sticky top-0            /* «прилипает» к верху при скролле */
        z-50                   /* всегда сверху */
        px-6 py-4
        flex justify-end items-center
        bg-[#0f0f0f]
        backdrop-blur-md shadow-md
        text-white
      "
    >
      <LanguageSwitcher
        className="space-x-4 font-semibold text-gray-100"
        activeClass="underline decoration-white/80"
        renderItem={(lang, isActive) => (
          <button
            key={lang}
            className={`
              transition
              ${isActive ? 'text-white' : 'text-gray-200 hover:text-white'}
            `}
          >
            {lang.toUpperCase()}
          </button>
        )}
      />
    </header>
  );
}
