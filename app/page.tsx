import { Footer, build } from "./build";

/**
 * The home page announces which build is serving it, at booth size. That is
 * the proving visual for every deployment demo: a rollout shows two versions
 * answering, a preview shows a branch, an Actions run shows its commit.
 */
export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-10 px-10 text-center"
      style={{ background: build.theme.background, color: build.theme.foreground }}
    >
      <p className="text-3xl tracking-widest uppercase opacity-70">{build.app}</p>
      <h1 className="text-[12rem] leading-none font-black tabular-nums">{build.version}</h1>
      <p className="text-5xl font-medium">{build.headline}</p>
      <Footer />
    </main>
  );
}
