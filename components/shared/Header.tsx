"use client";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-100 shadow-soft sticky top-0 z-10 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Health Picks
          </h1>
        </div>
      </div>
    </header>
  );
}

