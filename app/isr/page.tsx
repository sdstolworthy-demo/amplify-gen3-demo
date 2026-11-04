import { cacheLife, cacheTag } from "next/cache";

/**
 * Incremental static regeneration, made visible. The page body is one cached
 * function tagged `clock`, so the time it shows is the time the cache entry
 * was built, not the time of the request. It stays put across reloads until
 * `aws amplifygen3 cache revalidate --tag clock` or the hourly window, and no
 * redeploy is involved either way.
 */
async function generated() {
  "use cache";
  cacheTag("clock");
  cacheLife("hours");
  const now = new Date();
  return {
    clock: now.toISOString().slice(11, 19) + " UTC",
    date: now.toISOString().slice(0, 10),
    serial: Math.floor(now.getTime() / 1000) % 100000,
  };
}

export default async function Isr() {
  const page = await generated();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-10 text-center bg-[#0b0e14] text-white">
      <p className="text-3xl tracking-widest uppercase opacity-70">generated at</p>
      <h1 className="text-[11rem] leading-none font-black tabular-nums">{page.clock}</h1>
      <p className="text-4xl font-mono opacity-70">
        {page.date} · entry #{page.serial}
      </p>
      <p className="text-3xl opacity-60 max-w-4xl">
        Cached at the edge under the tag <code className="font-mono">clock</code>. Reload all you like.
      </p>
    </main>
  );
}
