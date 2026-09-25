export default function SafetyCallout() {
  return (
    <section id="safety" className="scroll-mt-24 mx-auto max-w-4xl px-6 pt-4 pb-12">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-800">
          Stop and Address Safety First
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          Do not begin with a cost comparison when there may be an immediate hazard.
        </h2>
        <p className="mt-4 leading-8 text-red-950">
          Leave the area and contact emergency services or the appropriate utility when
          you suspect a gas leak or carbon-monoxide exposure. Arrange qualified
          evaluation for abnormal combustion, blocked or damaged venting, scorching,
          damaged wiring, repeated breaker trips, uncontrolled overheating,
          relief-system problems, or rapidly expanding leakage.
        </p>
        <p className="mt-4 text-sm leading-6 text-red-900">
          Never plug, cap, or disable a temperature-and-pressure relief device. Follow
          the appliance manufacturer’s instructions and local emergency guidance.
        </p>
      </div>
    </section>
  );
}
