export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          Privacy Policy
        </p>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          Your privacy matters.
        </h1>

        <p className="mt-8 text-xl leading-9 text-[var(--muted)]">
          Meridian is committed to respecting your privacy and being transparent
          about the information we collect.
        </p>

        <div className="mt-16 space-y-12">

          <section>
            <h2 className="text-2xl font-semibold">Information We Collect</h2>

            <p className="mt-4 leading-8 text-[var(--muted)]">
              Meridian may collect anonymous usage information such as page
              views, browser type, device information, and general geographic
              region through analytics tools. This information helps improve the
              website and understand which guides are most useful.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Cookies</h2>

            <p className="mt-4 leading-8 text-[var(--muted)]">
              Meridian may use cookies and similar technologies to improve site
              functionality, measure traffic, and enhance the user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Advertising</h2>

            <p className="mt-4 leading-8 text-[var(--muted)]">
              Meridian may display advertising in the future. Advertising
              partners may use cookies or similar technologies to deliver and
              measure advertisements in accordance with their own privacy
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Email</h2>

            <p className="mt-4 leading-8 text-[var(--muted)]">
              If you contact Meridian by email, your message and contact
              information will only be used to respond to your inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Third-Party Services</h2>

            <p className="mt-4 leading-8 text-[var(--muted)]">
              Meridian may use third-party services such as analytics,
              advertising, hosting, or email providers. These services may
              process information according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Policy Updates</h2>

            <p className="mt-4 leading-8 text-[var(--muted)]">
              This Privacy Policy may be updated periodically. Changes will be
              reflected on this page.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}