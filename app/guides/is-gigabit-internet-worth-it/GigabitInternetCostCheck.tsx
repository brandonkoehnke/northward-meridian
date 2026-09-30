"use client";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
function parseNumber(value: string) {
    const parsed = Number(
        value.replace(/[^0-9.-]/g, ""),
    );
    return Number.isFinite(parsed)
        ? parsed
        : 0;
}
function formatCurrency(
    value: number,
    digits = 0,
) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(value);
}
function formatNumber(
    value: number,
    digits = 0,
) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
    }).format(value);
}
function formatDuration(seconds: number) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "Not available";
    }
    if (seconds < 60) {
        return `${formatNumber(seconds, 1)} sec`;
    }
    const minutes = seconds / 60;
    if (minutes < 60) {
        return `${formatNumber(minutes, 1)} min`;
    }
    const hours = minutes / 60;
    if (hours < 24) {
        return `${formatNumber(hours, 1)} hr`;
    }
    const days = hours / 24;
    return `${formatNumber(days, 1)} days`;
}
export default function GigabitInternetCostCheck() {
    const [hasInteracted, setHasInteracted] =
        useState(false);
    const [currentMonthlyCost, setCurrentMonthlyCost] =
        useState("60");
    const [currentDownload, setCurrentDownload] =
        useState("300");
    const [currentUpload, setCurrentUpload] =
        useState("20");
    const [upgradeMonthlyCost, setUpgradeMonthlyCost] =
        useState("80");
    const [upgradeDownload, setUpgradeDownload] =
        useState("1000");
    const [upgradeUpload, setUpgradeUpload] =
        useState("1000");
    const [ownershipYears, setOwnershipYears] =
        useState("3");
    const [fourKStreams, setFourKStreams] =
        useState("2");
    const [hdStreams, setHdStreams] =
        useState("1");
    const [videoCalls, setVideoCalls] =
        useState("2");
    const [otherDemand, setOtherDemand] =
        useState("20");
    const [downloadSize, setDownloadSize] =
        useState("50");
    const [uploadSize, setUploadSize] =
        useState("20");
    const hasStarted = useRef(false);
    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;
            trackEvent(
                "gigabit_internet_cost_check_started",
                {
                    tool:
                        "gigabit_internet_cost_check",
                },
            );
        }
        setHasInteracted(true);
    };
    const currentPrice = Math.max(
        parseNumber(currentMonthlyCost),
        0,
    );
    const currentDown = Math.max(
        parseNumber(currentDownload),
        0,
    );
    const currentUp = Math.max(
        parseNumber(currentUpload),
        0,
    );
    const upgradePrice = Math.max(
        parseNumber(upgradeMonthlyCost),
        0,
    );
    const upgradeDown = Math.max(
        parseNumber(upgradeDownload),
        0,
    );
    const upgradeUp = Math.max(
        parseNumber(upgradeUpload),
        0,
    );
    const years = Math.max(
        parseNumber(ownershipYears),
        0,
    );
    const streams4K = Math.max(
        parseNumber(fourKStreams),
        0,
    );
    const streamsHd = Math.max(
        parseNumber(hdStreams),
        0,
    );
    const calls = Math.max(
        parseNumber(videoCalls),
        0,
    );
    const additionalDemand = Math.max(
        parseNumber(otherDemand),
        0,
    );
    const largeDownloadGb = Math.max(
        parseNumber(downloadSize),
        0,
    );
    const largeUploadGb = Math.max(
        parseNumber(uploadSize),
        0,
    );
    const monthlyPremium =
        upgradePrice - currentPrice;
    const annualPremium =
        monthlyPremium * 12;
    const ownershipPremium =
        annualPremium * years;
    const FOUR_K_BANDWIDTH = 25;
    const HD_BANDWIDTH = 5;
    const VIDEO_CALL_BANDWIDTH = 5;
    const estimatedConcurrentDemand =
        streams4K * FOUR_K_BANDWIDTH +
        streamsHd * HD_BANDWIDTH +
        calls * VIDEO_CALL_BANDWIDTH +
        additionalDemand;
    const currentHeadroom =
        currentDown -
        estimatedConcurrentDemand;
    const upgradeHeadroom =
        upgradeDown -
        estimatedConcurrentDemand;
    const currentHeadroomPercent =
        currentDown > 0
            ? (currentHeadroom / currentDown) * 100
            : null;
    const upgradeHeadroomPercent =
        upgradeDown > 0
            ? (upgradeHeadroom / upgradeDown) * 100
            : null;
    const largeDownloadBits =
        largeDownloadGb *
        1024 *
        1024 *
        1024 *
        8;
    const largeUploadBits =
        largeUploadGb *
        1024 *
        1024 *
        1024 *
        8;
    const currentDownloadSeconds =
        currentDown > 0
            ? largeDownloadBits /
            (currentDown * 1_000_000)
            : Number.NaN;
    const upgradeDownloadSeconds =
        upgradeDown > 0
            ? largeDownloadBits /
            (upgradeDown * 1_000_000)
            : Number.NaN;
    const currentUploadSeconds =
        currentUp > 0
            ? largeUploadBits /
            (currentUp * 1_000_000)
            : Number.NaN;
    const upgradeUploadSeconds =
        upgradeUp > 0
            ? largeUploadBits /
            (upgradeUp * 1_000_000)
            : Number.NaN;
    const downloadTimeReduction =
        Number.isFinite(currentDownloadSeconds) &&
            Number.isFinite(upgradeDownloadSeconds)
            ? currentDownloadSeconds -
            upgradeDownloadSeconds
            : null;
    const uploadTimeReduction =
        Number.isFinite(currentUploadSeconds) &&
            Number.isFinite(upgradeUploadSeconds)
            ? currentUploadSeconds -
            upgradeUploadSeconds
            : null;
    useEffect(() => {
        if (!hasStarted.current) {
            return;
        }
        trackEvent(
            "gigabit_internet_cost_check_changed",
            {
                tool:
                    "gigabit_internet_cost_check",
            },
        );
    }, [
        currentMonthlyCost,
        currentDownload,
        currentUpload,
        upgradeMonthlyCost,
        upgradeDownload,
        upgradeUpload,
        ownershipYears,
        fourKStreams,
        hdStreams,
        videoCalls,
        otherDemand,
        downloadSize,
        uploadSize,
    ]);
    const currentHasHeadroom =
        currentHeadroom >= 0;
    const upgradeHasHeadroom =
        upgradeHeadroom >= 0;
    let resultHeading: string;
    let resultDescription: string;
    if (
        currentDown <= 0 ||
        upgradeDown <= 0
    ) {
        resultHeading =
            "Add download speeds for both plans.";
        resultDescription =
            "The comparison needs both download speeds to estimate remaining household download capacity and large-file transfer times.";
    } else if (years <= 0) {
        resultHeading =
            "Add an expected time on the plan.";
        resultDescription =
            "The calculator can still compare monthly and annual pricing, but the total cost over time requires an expected time on the plan.";
    } else if (
        currentHasHeadroom &&
        upgradeHasHeadroom
    ) {
        resultHeading =
            "Both plans have remaining capacity for the demand you entered.";
        resultDescription =
            "Your entered household activities fit within both plans' advertised download capacity under this simplified planning model. The upgrade may still matter for large transfers, uploads, or future usage.";
    } else if (
        !currentHasHeadroom &&
        upgradeHasHeadroom
    ) {
        resultHeading =
            "Your entered demand exceeds the current plan but fits within the upgrade.";
        resultDescription =
            "Under your planning assumptions, the faster plan provides more advertised download capacity than the simultaneous demand you entered. Real-world performance can still be limited by Wi-Fi, device hardware, remote servers, and network conditions.";
    } else if (
        !currentHasHeadroom &&
        !upgradeHasHeadroom
    ) {
        resultHeading =
            "Your entered demand exceeds both plans' advertised download capacity.";
        resultDescription =
            "The upgrade increases available bandwidth but does not fully cover the simultaneous demand you entered. Check whether your activity assumptions are realistic and whether another bottleneck is limiting performance.";
    } else {
        resultHeading =
            "Your entered demand fits the current plan but not the upgrade's added capacity requirement.";
        resultDescription =
            "Your inputs suggest the current plan already covers the modeled simultaneous demand. The upgrade may therefore be driven more by transfer speed, upload needs, or future usage than by the activity mix entered here.";
    }
    return (
        <section
            id="gigabit-internet-cost-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Internet Speed &amp; Upgrade Cost Check
                </p>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    What will a faster internet plan change for your household?
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Compare the monthly and long-term price
                    difference, estimate simultaneous household
                    bandwidth demand, and see how much theoretical
                    transfer time changes for large downloads and
                    uploads.
                </p>
                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                        Current plan
                    </p>
                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                        <NumberField
                            label="Monthly price"
                            value={currentMonthlyCost}
                            prefix="$"
                            suffix="/mo"
                            step="1"
                            onChange={(value) => {
                                markStarted();
                                setCurrentMonthlyCost(
                                    value,
                                );
                            }}
                        />
                        <NumberField
                            label="Download speed"
                            value={currentDownload}
                            suffix="Mbps"
                            step="10"
                            onChange={(value) => {
                                markStarted();
                                setCurrentDownload(value);
                            }}
                        />
                        <NumberField
                            label="Upload speed"
                            value={currentUpload}
                            suffix="Mbps"
                            step="5"
                            onChange={(value) => {
                                markStarted();
                                setCurrentUpload(value);
                            }}
                        />
                    </div>
                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Upgrade plan
                        </p>
                        <div className="mt-6 grid gap-5 md:grid-cols-3">
                            <NumberField
                                label="Monthly price"
                                value={upgradeMonthlyCost}
                                prefix="$"
                                suffix="/mo"
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setUpgradeMonthlyCost(
                                        value,
                                    );
                                }}
                            />
                            <NumberField
                                label="Download speed"
                                value={upgradeDownload}
                                suffix="Mbps"
                                step="10"
                                onChange={(value) => {
                                    markStarted();
                                    setUpgradeDownload(
                                        value,
                                    );
                                }}
                            />
                            <NumberField
                                label="Upload speed"
                                value={upgradeUpload}
                                suffix="Mbps"
                                step="10"
                                onChange={(value) => {
                                    markStarted();
                                    setUpgradeUpload(
                                        value,
                                    );
                                }}
                            />
                        </div>
                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Compare the actual plans you are considering
                            </p>
                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                Internet tiers can differ in upload
                                speed, data allowances, equipment,
                                fees, introductory pricing, and
                                service terms. Use the recurring price
                                you expect to pay rather than a
                                temporary promotional rate when
                                possible.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Household usage
                        </p>
                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <NumberField
                                label="4K streams at once"
                                value={fourKStreams}
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setFourKStreams(value);
                                }}
                            />
                            <NumberField
                                label="HD streams at once"
                                value={hdStreams}
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setHdStreams(value);
                                }}
                            />
                            <NumberField
                                label="Video calls at once"
                                value={videoCalls}
                                step="1"
                                onChange={(value) => {
                                    markStarted();
                                    setVideoCalls(value);
                                }}
                            />
                            <NumberField
                                label="Other bandwidth use"
                                value={otherDemand}
                                suffix="Mbps"
                                step="5"
                                onChange={(value) => {
                                    markStarted();
                                    setOtherDemand(value);
                                }}
                            />
                        </div>
                        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                            <p className="font-semibold">
                                Planning estimate, not a speed test
                            </p>
                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                                The calculator uses 25 Mbps per 4K stream, 5 Mbps per
                                HD stream, and 5 Mbps per video call as planning
                                assumptions. Actual bandwidth use varies by service,
                                video quality, device behavior, compression, and
                                network conditions. Add estimated bandwidth for other
                                activities happening at the same time.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Large file transfers
                        </p>
                        <div className="mt-6 grid gap-5 md:grid-cols-3">
                            <NumberField
                                label="Large download"
                                value={downloadSize}
                                suffix="GB"
                                step="5"
                                onChange={(value) => {
                                    markStarted();
                                    setDownloadSize(value);
                                }}
                            />
                            <NumberField
                                label="Large upload"
                                value={uploadSize}
                                suffix="GB"
                                step="5"
                                onChange={(value) => {
                                    markStarted();
                                    setUploadSize(value);
                                }}
                            />
                        </div>
                        <div className="mt-10 border-t border-[var(--border)] pt-10">
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                                Ownership
                            </p>
                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                <NumberField
                                    label="Expected time on plan"
                                    value={ownershipYears}
                                    suffix="years"
                                    step="1"
                                    onChange={(value) => {
                                        markStarted();
                                        setOwnershipYears(value);
                                    }}
                                />
                            </div>
                            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                                Use the period you realistically expect to keep the
                                upgraded plan. This determines the total price
                                difference shown in the long-term comparison.
                            </p>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                            Transfer-time results are theoretical:
                            they assume the full advertised connection
                            speed is available to the transfer. Real
                            transfers can be slower because of remote
                            server limits, Wi-Fi, device hardware,
                            protocol overhead, congestion, and other
                            factors.
                        </p>
                    </div>
                    <div className="mt-10 border-t border-[var(--border)] pt-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            Your results
                        </p>
                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <ResultMetric
                                label="Monthly upgrade cost difference"
                                value={formatCurrency(
                                    monthlyPremium,
                                )}
                                detail="Upgrade monthly price minus current monthly price. Positive means the upgrade costs more; negative means it costs less."
                            />
                            <ResultMetric
                                label="Annual upgrade cost difference"
                                value={formatCurrency(
                                    annualPremium,
                                )}
                                detail="Monthly upgrade cost difference multiplied by 12."
                            />
                            <ResultMetric
                                label="Total cost difference over time"
                                value={formatCurrency(
                                    ownershipPremium,
                                )}
                                detail="Annual upgrade cost difference multiplied by your expected time on the plan."
                            />
                            <ResultMetric
                                label="Estimated simultaneous demand"
                                value={`${formatNumber(
                                    estimatedConcurrentDemand,
                                    0,
                                )} Mbps`}
                                detail="The activity-based demand represented by the usage assumptions you entered."
                            />
                            <ResultMetric
                                label="Current plan remaining download capacity"
                                value={`${formatNumber(
                                    currentHeadroom,
                                    0,
                                )} Mbps`}
                                detail={
                                    currentHeadroomPercent === null
                                        ? "Current download speed must be greater than zero to calculate remaining capacity."
                                        : currentHeadroom >= 0
                                            ? `${formatNumber(
                                                currentHeadroomPercent,
                                                0,
                                            )}% of the current plan's stated download capacity remains after the modeled demand.`
                                            : `The modeled demand exceeds the current plan's stated download capacity by ${formatNumber(
                                                Math.abs(currentHeadroom),
                                                0,
                                            )} Mbps.`
                                }
                            />
                            <ResultMetric
                                label="Upgrade plan remaining download capacity"
                                value={`${formatNumber(
                                    upgradeHeadroom,
                                    0,
                                )} Mbps`}
                                detail={
                                    upgradeHeadroomPercent === null
                                        ? "Upgrade download speed must be greater than zero to calculate remaining capacity."
                                        : upgradeHeadroom >= 0
                                            ? `${formatNumber(
                                                upgradeHeadroomPercent,
                                                0,
                                            )}% of the upgrade plan's stated download capacity remains after the modeled demand.`
                                            : `The modeled demand exceeds the upgrade plan's stated download capacity by ${formatNumber(
                                                Math.abs(upgradeHeadroom),
                                                0,
                                            )} Mbps.`
                                }
                            />
                            <ResultMetric
                                label="Current large-download time"
                                value={formatDuration(
                                    currentDownloadSeconds,
                                )}
                                detail={`Theoretical time to transfer ${formatNumber(
                                    largeDownloadGb,
                                    0,
                                )} GB at the full advertised current download speed.`}
                            />
                            <ResultMetric
                                label="Upgrade large-download time"
                                value={formatDuration(
                                    upgradeDownloadSeconds,
                                )}
                                detail={`Theoretical time to transfer ${formatNumber(
                                    largeDownloadGb,
                                    0,
                                )} GB at the full advertised upgrade download speed.`}
                            />
                            <ResultMetric
                                label="Download time reduction"
                                value={
                                    downloadTimeReduction !==
                                        null
                                        ? formatDuration(
                                            downloadTimeReduction,
                                        )
                                        : "Not available"
                                }
                                detail="Theoretical time saved for the large download when moving from the current to the upgrade plan."
                            />
                            <ResultMetric
                                label="Current large-upload time"
                                value={formatDuration(
                                    currentUploadSeconds,
                                )}
                                detail={`Theoretical time to transfer ${formatNumber(
                                    largeUploadGb,
                                    0,
                                )} GB at the full advertised current upload speed.`}
                            />
                            <ResultMetric
                                label="Upgrade large-upload time"
                                value={formatDuration(
                                    upgradeUploadSeconds,
                                )}
                                detail={`Theoretical time to transfer ${formatNumber(
                                    largeUploadGb,
                                    0,
                                )} GB at the full advertised upgrade upload speed.`}
                            />
                            <ResultMetric
                                label="Upload time reduction"
                                value={
                                    uploadTimeReduction !==
                                        null
                                        ? formatDuration(
                                            uploadTimeReduction,
                                        )
                                        : "Not available"
                                }
                                detail="Theoretical time saved for the large upload when moving from the current to the upgrade plan."
                            />
                        </div>
                        <div
                            className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
                            aria-live="polite"
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                What the numbers suggest
                            </p>
                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                {resultHeading}
                            </h3>
                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                {resultDescription}
                            </p>
                            <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                                These calculations compare the plans
                                you entered. They do not determine
                                whether faster internet is worth the
                                price to your household and do not
                                diagnose Wi-Fi, device, modem,
                                router, server, or ISP congestion
                                problems.
                            </p>
                        </div>
                    </div>
                    {!hasInteracted ? (
                        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                                Example only
                            </p>
                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                Replace the example assumptions with your actual plans and household usage.
                            </h3>
                            <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
                                Pricing, advertised speeds,
                                simultaneous usage, upload needs,
                                transfer sizes, and time on the plan
                                can materially change the comparison.
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
type NumberFieldProps = {
    label: string;
    value: string;
    prefix?: string;
    suffix?: string;
    step?: string;
    onChange: (value: string) => void;
};
function NumberField({
    label,
    value,
    prefix,
    suffix,
    step,
    onChange,
}: NumberFieldProps) {
    return (
        <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </span>
            <div className="mt-3 flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-4">
                {prefix ? (
                    <span className="text-[var(--muted)]">
                        {prefix}
                    </span>
                ) : null}
                <input
                    type="number"
                    min="0"
                    step={step}
                    inputMode="decimal"
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    className="w-full bg-transparent px-2 py-3 text-[var(--foreground)] outline-none"
                />
                {suffix ? (
                    <span className="whitespace-nowrap text-sm text-[var(--muted)]">
                        {suffix}
                    </span>
                ) : null}
            </div>
        </label>
    );
}
type ResultMetricProps = {
    label: string;
    value: string;
    detail: string;
};
function ResultMetric({
    label,
    value,
    detail,
}: ResultMetricProps) {
    return (
        <div className="rounded-xl border border-[var(--border)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">
                {value}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {detail}
            </p>
        </div>
    );
}
