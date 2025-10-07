
"use client";

export function SettingsHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-3">
      <div>
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Customize your app experience</p>
      </div>
    </header>
  );
}
