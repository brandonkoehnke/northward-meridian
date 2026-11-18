"use client";

import { useState } from "react";

type Answer = "yes" | "no" | "unknown";
type Path = "direct" | "dp" | "hdmi" | "dock" | "usbgraphics";
type Input = "usbvideo" | "dp" | "hdmi" | "dataonly" | "unknown";
const inputStyle = "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3";

export type Diagnostic = { status: "missing" | "investigate" | "check"; title: string; detail: string; next: string[] };
export function assessUsbCVideo(source: Answer, path: Path, accessory: Answer, monitor: Input, power: Answer, worked: Answer): Diagnostic {
  const usbGraphics = path === "usbgraphics";
  const expected = path === "dp" ? "dp" : path === "hdmi" ? "hdmi" : path === "direct" ? "usbvideo" : null;
  if (expected && monitor !== "unknown" && monitor !== expected) {
    return { status: "missing", title: "Selected monitor input does not match the connection", detail: "The selected path needs a matching display input. A USB-C port used only for data or charging is not a video input.", next: ["Verify the monitor's exact input specifications and select the corresponding input.", "Use a connection type supported by both ends."] };
  }
  if (!usbGraphics && source === "no") {
    return { status: "missing", title: "Native USB-C video output is not supported", detail: "A charging or data-capable USB-C port does not necessarily output native video. Replacing the cable alone cannot add a missing source-port video mode.", next: ["Use a confirmed HDMI or DisplayPort output if available.", "A compatible USB graphics adapter may be an alternative, but needs its own driver and OS support."] };
  }
  if (accessory === "no") {
    return { status: "missing", title: "The selected cable or accessory lacks the required video capability", detail: usbGraphics ? "The selected USB graphics device is not confirmed to support the intended display output." : "The cable, dock or adapter has been identified as incompatible with this video path.", next: ["Check the exact model's specifications for video output and the required connector path.", "Test with a known-good, video-capable cable or adapter."] };
  }
  if (monitor === "dataonly" && path === "dock") {
    return { status: "missing", title: "The selected monitor USB-C input is data-only", detail: "A data-only USB-C input cannot receive the video signal from this dock path.", next: ["Use a documented video input on the monitor."] };
  }
  if (source === "unknown" && !usbGraphics || accessory === "unknown" || monitor === "unknown") {
    return { status: "investigate", title: "More specifications are needed", detail: usbGraphics ? "USB graphics devices can carry video over ordinary USB data, but compatibility depends on the adapter, drivers and operating system." : "USB-C connector shape, charging wattage and USB data speed do not establish native video support.", next: ["Find the exact source-device model and check its USB-C video-output specification.", "Check the cable/dock model for the required video protocol and direction.", "Confirm the monitor's video input, not just its connector shape."] };
  }
  if (power === "no") {
    return { status: "check", title: "Check display power before diagnosing the signal", detail: "Some portable monitors require separate power even when the video path is supported.", next: ["Power the monitor using its specified supply.", "Select the matching input and retest with a known-good cable."] };
  }
  return { status: "check", title: "Basic requirements appear plausible — continue troubleshooting", detail: usbGraphics ? "USB graphics output still requires compatible software, drivers and hardware. This result does not certify operation." : "The entered capabilities do not identify a definite missing requirement. They do not guarantee signal bandwidth, resolution, refresh rate or compatibility.", next: [worked === "yes" ? "Check for a recent OS, firmware, driver or display-setting change." : "Try a known-good video cable and the correct monitor input.", "Bypass docks and adapters where possible to isolate the connection.", "Confirm monitor power and test a lower resolution or refresh rate.", "Check device firmware, graphics drivers and display detection settings."] };
}

export default function UsbCVideoChecker() {
  const [device, setDevice] = useState("laptop");
  const [source, setSource] = useState<Answer>("unknown");
  const [path, setPath] = useState<Path>("direct");
  const [accessory, setAccessory] = useState<Answer>("unknown");
  const [monitor, setMonitor] = useState<Input>("unknown");
  const [power, setPower] = useState<Answer>("unknown");
  const [worked, setWorked] = useState<Answer>("unknown");
  const result = assessUsbCVideo(source, path, accessory, monitor, power, worked);
  return <section id="usb-c-video-checker" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-12">
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-9">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Connection troubleshooter</p>
      <h2 className="mt-3 text-3xl font-semibold">Why is there no picture?</h2>
      <p className="mt-3 leading-7 text-[var(--muted)]">Choose what you know about the connection. Unknown is a valid answer. This checker does not identify your hardware automatically or guarantee a particular resolution.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">Source device<select className={inputStyle} value={device} onChange={e=>setDevice(e.target.value)}><option value="laptop">Laptop</option><option value="desktop">Desktop</option><option value="phone">Phone or tablet</option></select></label>
        <label className="flex flex-col gap-2 text-sm font-semibold">Connection path<select className={inputStyle} value={path} onChange={e=>setPath(e.target.value as Path)}><option value="direct">Direct USB-C to USB-C</option><option value="dp">USB-C to DisplayPort</option><option value="hdmi">USB-C to HDMI</option><option value="dock">Through a dock or hub</option><option value="usbgraphics">USB graphics adapter (e.g., DisplayLink)</option></select></label>
        <label className="flex flex-col gap-2 text-sm font-semibold">Does the source USB-C port explicitly support native video output?<select className={inputStyle} value={source} onChange={e=>setSource(e.target.value as Answer)}><option value="unknown">Unknown</option><option value="yes">Yes — verified in device specifications</option><option value="no">No — specifications say no native video</option></select></label>
        <label className="flex flex-col gap-2 text-sm font-semibold">Is the cable, adapter or dock confirmed to support this video path?<select className={inputStyle} value={accessory} onChange={e=>setAccessory(e.target.value as Answer)}><option value="unknown">Unknown</option><option value="yes">Yes — exact model verified</option><option value="no">No — incompatible or data/charge-only</option></select></label>
        <label className="flex flex-col gap-2 text-sm font-semibold">Monitor input being used<select className={inputStyle} value={monitor} onChange={e=>setMonitor(e.target.value as Input)}><option value="unknown">Unknown</option><option value="usbvideo">USB-C with video input</option><option value="dp">DisplayPort</option><option value="hdmi">HDMI</option><option value="dataonly">USB-C data/charging only</option></select></label>
        <label className="flex flex-col gap-2 text-sm font-semibold">Is the monitor powered on?<select className={inputStyle} value={power} onChange={e=>setPower(e.target.value as Answer)}><option value="unknown">Unknown</option><option value="yes">Yes</option><option value="no">No / not enough power</option></select></label>
        <label className="flex flex-col gap-2 text-sm font-semibold sm:col-span-2">Has this exact connection worked before?<select className={inputStyle} value={worked} onChange={e=>setWorked(e.target.value as Answer)}><option value="unknown">Unknown</option><option value="yes">Yes</option><option value="no">No</option></select></label>
      </div>
      <div className="mt-7 rounded-2xl border-2 border-[var(--accent)] bg-white p-6" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Diagnostic result · {result.status === "missing" ? "Missing requirement" : result.status === "investigate" ? "Information needed" : "Next checks"}</p>
        <h3 className="mt-3 text-xl font-semibold">{result.title}</h3>
        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{result.detail}</p>
        <h4 className="mt-5 font-semibold">What to do next</h4>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6">{result.next.map(item=><li key={item}>{item}</li>)}</ol>
      </div>
      <p className="mt-4 text-xs leading-6 text-[var(--muted)]">For USB graphics adapters, native source-port video support may not be required. Driver, OS and adapter compatibility must be checked separately. For native USB-C video, check DisplayPort Alt Mode, Thunderbolt or USB4 video support as documented for your exact device. Charging power and data transfer speed alone are not proof of video support.</p>
    </div>
  </section>;
}
