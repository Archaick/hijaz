export default function Home() {
  return (
    <main className="page">

      <section className="hero">
        <p className="eyebrow">Next.js + JavaScript</p>
        <h1>We have a clean Next.js app running.</h1>
        <p className="description">
          If you know Vite, think of this file like the component for the
          <code> / </code>
          route.
        </p>
      </section>

      <section className="card">
        <h2>Quick map from Vite</h2>
        <p>
          <strong>`app/page.js`</strong> is your home page.
        </p>
        <p>
          <strong>`app/layout.js`</strong> is the shared wrapper around pages.
        </p>
        <p>
          <strong>`app/globals.css`</strong> is where global styles live.
        </p>
      </section>
    </main>
  );
}
