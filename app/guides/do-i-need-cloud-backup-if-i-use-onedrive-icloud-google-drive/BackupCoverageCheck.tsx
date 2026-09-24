"use client";

import { useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type Answer = "yes" | "no" | "unknown";

type Question = {
    id: string;
    title: string;
    description: string;
};

type CoverageState = {
    syncedCopy: Answer;
    recoveryHistory: Answer;
    independentLocation: Answer;
    disconnectedCopy: Answer;
    restoreTested: Answer;
    accountIndependence: Answer;
};

type ResultTone = "covered" | "partial" | "gap";

type Result = {
    title: string;
    description: string;
    tone: ResultTone;
};

const questions: Question[] = [
    {
        id: "syncedCopy",
        title: "Do your important files exist somewhere other than the original device?",
        description:
            "This could be a cloud copy, NAS, external drive, or another independently available location.",
    },
    {
        id: "recoveryHistory",
        title: "Can you recover an older version of an important file?",
        description:
            "Version history or another point-in-time recovery feature can matter when a file is changed, corrupted, encrypted, or deleted.",
    },
    {
        id: "independentLocation",
        title: "Is at least one copy stored in a separate location?",
        description:
            "A copy outside the physical location of the original can help with theft, fire, or other local disasters.",
    },
    {
        id: "disconnectedCopy",
        title: "Is at least one backup normally disconnected from your devices?",
        description:
            "A disconnected or otherwise isolated copy can provide protection when unwanted changes spread through connected systems.",
    },
    {
        id: "restoreTested",
        title: "Have you successfully restored an important file from your backup?",
        description:
            "A backup that has never been tested may not provide the recovery experience you expect.",
    },
    {
        id: "accountIndependence",
        title: "Would another copy remain accessible if your primary cloud account became unavailable?",
        description:
            "Account loss, access problems, or provider-side issues can become a separate failure mode when every copy depends on the same account.",
    },
];

function getResultToneClass(tone: ResultTone) {
    if (tone === "covered") {
        return "border-[var(--border)]";
    }

    if (tone === "partial") {
        return "border-[var(--border)]";
    }

    return "border-[var(--accent)]";
}

function getStatusLabel(tone: ResultTone) {
    if (tone === "covered") {
        return "Covered";
    }

    if (tone === "partial") {
        return "Recovery-dependent";
    }

    return "Potential gap";
}

function getStatusDescription(tone: ResultTone) {
    if (tone === "covered") {
        return "Your answers indicate a meaningful recovery path for this failure mode.";
    }

    if (tone === "partial") {
        return "You may have recovery protection, but it depends on features or conditions that should be verified.";
    }

    return "Your answers indicate that an additional independent recovery layer may be useful.";
}

function AnswerButton({
    value,
    selected,
    onClick,
}: {
    value: Answer;
    selected: boolean;
    onClick: () => void;
}) {
    const label =
        value === "yes"
            ? "Yes"
            : value === "no"
                ? "No"
                : "I do not know";

    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${selected
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                : "border-[var(--border)] bg-white text-[var(--text)] hover:border-[var(--accent)]"
                }`}
        >
            {label}
        </button>
    );
}

function ResultCard({
    title,
    description,
    tone,
}: Result) {
    return (
        <div
            className={`rounded-2xl border bg-[var(--background)] p-6 ${getResultToneClass(
                tone,
            )}`}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold tracking-tight">
                        {title}
                    </p>

                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                        {getStatusLabel(tone)}
                    </p>
                </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                {description}
            </p>

            <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
                {getStatusDescription(tone)}
            </p>
        </div>
    );
}

export default function BackupCoverageCheck() {
    const [answers, setAnswers] =
        useState<CoverageState>({
            syncedCopy: "unknown",
            recoveryHistory: "unknown",
            independentLocation: "unknown",
            disconnectedCopy: "unknown",
            restoreTested: "unknown",
            accountIndependence: "unknown",
        });

    const [hasInteracted, setHasInteracted] =
        useState(false);

    const hasStarted = useRef(false);

    const markStarted = () => {
        if (!hasStarted.current) {
            hasStarted.current = true;

            trackEvent("backup_coverage_check_started", {
                tool: "backup_coverage_check",
            });
        }

        setHasInteracted(true);
    };

    const updateAnswer = (
        id: keyof CoverageState,
        value: Answer,
    ) => {
        markStarted();

        setAnswers((current) => ({
            ...current,
            [id]: value,
        }));
    };

    const result = useMemo(() => {
        const deviceFailure: Result =
            answers.syncedCopy === "yes"
                ? {
                    title: "Device failure",
                    description:
                        "Your important files exist somewhere other than the original device.",
                    tone: "covered",
                }
                : answers.syncedCopy === "unknown"
                    ? {
                        title: "Device failure",
                        description:
                            "You have not confirmed that an additional copy exists outside the original device.",
                        tone: "partial",
                    }
                    : {
                        title: "Device failure",
                        description:
                            "Your answers indicate that the original device may be the only known copy.",
                        tone: "gap",
                    };

        const accidentalDeletion: Result =
            answers.recoveryHistory === "yes"
                ? {
                    title: "Accidental deletion",
                    description:
                        "You report having a way to recover an older version of an important file.",
                    tone: "covered",
                }
                : answers.recoveryHistory === "unknown"
                    ? {
                        title: "Accidental deletion",
                        description:
                            "Recovery may exist through recycle bins, version history, or another feature, but you have not confirmed the available recovery window.",
                        tone: "partial",
                    }
                    : {
                        title: "Accidental deletion",
                        description:
                            "You do not currently have a confirmed older version or recovery history.",
                        tone: "gap",
                    };

        const localDisaster: Result =
            answers.independentLocation === "yes"
                ? {
                    title: "Local disaster",
                    description:
                        "At least one copy is stored in a separate location from the original.",
                    tone: "covered",
                }
                : answers.independentLocation === "unknown"
                    ? {
                        title: "Local disaster",
                        description:
                            "You have not confirmed that a usable copy exists outside the original physical location.",
                        tone: "partial",
                    }
                    : {
                        title: "Local disaster",
                        description:
                            "Your known copies may all be exposed to the same fire, theft, or other local event.",
                        tone: "gap",
                    };

        const ransomware: Result =
            answers.disconnectedCopy === "yes" &&
                answers.recoveryHistory === "yes"
                ? {
                    title: "Ransomware or widespread file corruption",
                    description:
                        "You report both an isolated copy and the ability to recover an older version.",
                    tone: "covered",
                }
                : answers.disconnectedCopy === "unknown" ||
                    answers.recoveryHistory === "unknown"
                    ? {
                        title: "Ransomware or widespread file corruption",
                        description:
                            "Some recovery features may exist, but you have not confirmed both an isolated copy and usable historical recovery.",
                        tone: "partial",
                    }
                    : {
                        title: "Ransomware or widespread file corruption",
                        description:
                            "Your answers do not show a confirmed isolated recovery copy with historical recovery.",
                        tone: "gap",
                    };

        const restoreConfidence: Result =
            answers.restoreTested === "yes"
                ? {
                    title: "Recovery confidence",
                    description:
                        "You have successfully tested a restore rather than relying only on a backup configuration.",
                    tone: "covered",
                }
                : answers.restoreTested === "unknown"
                    ? {
                        title: "Recovery confidence",
                        description:
                            "You have not confirmed whether a real restore has been tested successfully.",
                        tone: "partial",
                    }
                    : {
                        title: "Recovery confidence",
                        description:
                            "Your current backup has not been successfully tested through a restore.",
                        tone: "partial",
                    };

        const accountAccess: Result =
            answers.accountIndependence === "yes"
                ? {
                    title: "Primary cloud account loss",
                    description:
                        "You report having another copy that would remain accessible if the primary cloud account became unavailable.",
                    tone: "covered",
                }
                : answers.accountIndependence === "unknown"
                    ? {
                        title: "Primary cloud account loss",
                        description:
                            "You have not confirmed an independent recovery path outside the primary cloud account.",
                        tone: "partial",
                    }
                    : {
                        title: "Primary cloud account loss",
                        description:
                            "Your known copies may depend on the same cloud account or provider.",
                        tone: "gap",
                    };

        const gapCount = [
            deviceFailure,
            accidentalDeletion,
            localDisaster,
            ransomware,
            restoreConfidence,
            accountAccess,
        ].filter((item) => item.tone === "gap").length;

        const partialCount = [
            deviceFailure,
            accidentalDeletion,
            localDisaster,
            ransomware,
            restoreConfidence,
            accountAccess,
        ].filter((item) => item.tone === "partial").length;

        const unknownCount = Object.values(
            answers,
        ).filter(
            (answer) => answer === "unknown",
        ).length;

        const summary =
            unknownCount === 6
                ? {
                    title: "Your recovery coverage still needs to be verified",
                    description:
                        "You have not confirmed how your current setup handles these failure modes. Check your recovery features, retention periods, independent copies, and restore process before deciding whether another backup layer is necessary.",
                }
                : gapCount === 0 && partialCount <= 1
                    ? {
                        title: "You have multiple meaningful recovery protections",
                        description:
                            "Your answers indicate that your current setup has more than simple file synchronization. Verify the exact recovery windows and test an important restore periodically.",
                    }
                    : gapCount === 0
                        ? {
                            title: "Your setup may provide useful protection, but several details need verification",
                            description:
                                "Your answers do not show a confirmed backup gap, but some recovery capabilities remain uncertain or untested.",
                        }
                        : gapCount === 1
                            ? {
                                title: "You have useful protection, but there is a recovery gap to address",
                                description:
                                    "Your current setup provides several recovery capabilities, but one important failure mode is not clearly covered.",
                            }
                            : {
                                title: "Your current setup has meaningful backup gaps",
                                description:
                                    "Synchronization or cloud storage may protect against some failures, but your answers indicate that additional independent recovery protection would be useful.",
                            };

        return {
            deviceFailure,
            accidentalDeletion,
            localDisaster,
            ransomware,
            restoreConfidence,
            accountAccess,
            summary,
        };
    }, [answers]);

    return (
        <section
            id="backup-coverage-check"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16"
        >
            <div className="border-t border-[var(--border)] pt-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Backup Coverage Check
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                    What would happen if your current copy failed?
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                    Answer the questions below based on how your files are
                    stored today. The check looks at several different failure
                    modes because cloud synchronization, version history,
                    local backups, and independent off-site backups do not
                    provide the same protection.
                </p>

                <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-8">
                    <div className="space-y-8">
                        {questions.map((question) => {
                            const id =
                                question.id as keyof CoverageState;

                            return (
                                <div
                                    key={question.id}
                                    className="border-b border-[var(--border)] pb-8 last:border-b-0 last:pb-0"
                                >
                                    <p className="text-base font-semibold">
                                        {question.title}
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                                        {question.description}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <AnswerButton
                                            value="yes"
                                            selected={
                                                answers[id] ===
                                                "yes"
                                            }
                                            onClick={() =>
                                                updateAnswer(
                                                    id,
                                                    "yes",
                                                )
                                            }
                                        />

                                        <AnswerButton
                                            value="no"
                                            selected={
                                                answers[id] ===
                                                "no"
                                            }
                                            onClick={() =>
                                                updateAnswer(
                                                    id,
                                                    "no",
                                                )
                                            }
                                        />

                                        <AnswerButton
                                            value="unknown"
                                            selected={
                                                answers[id] ===
                                                "unknown"
                                            }
                                            onClick={() =>
                                                updateAnswer(
                                                    id,
                                                    "unknown",
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {hasInteracted ? (
                        <>
                            <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                                    What the check says
                                </p>

                                <p className="mt-4 text-xl font-semibold tracking-tight">
                                    {result.summary.title}
                                </p>

                                <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                                    {result.summary.description}
                                </p>
                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-2">
                                <ResultCard
                                    {...result.deviceFailure}
                                />

                                <ResultCard
                                    {...result.accidentalDeletion}
                                />

                                <ResultCard
                                    {...result.localDisaster}
                                />

                                <ResultCard
                                    {...result.ransomware}
                                />

                                <ResultCard
                                    {...result.restoreConfidence}
                                />

                                <ResultCard
                                    {...result.accountAccess}
                                />
                            </div>

                            <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5 text-sm leading-6 text-[var(--muted)]">
                                <strong>Important:</strong> This is a coverage
                                check, not a guarantee that a particular
                                provider or backup system will recover every
                                file. Recovery capabilities, retention periods,
                                account policies, and synchronization behavior
                                vary by service and configuration.
                            </div>
                        </>
                    ) : (
                        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center">
                            <p className="text-xl font-semibold tracking-tight">
                                Answer the questions to check your backup
                                coverage
                            </p>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                                There is no universal backup score. The goal is
                                to identify which failure modes your current
                                setup can recover from and which ones still
                                depend on assumptions.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm leading-6 text-[var(--muted)]">
                    <p>
                        A cloud-synced file can have useful recovery options
                        without being a complete independent backup. Check the
                        actual retention, version-history, restore, and account
                        recovery features of the service you use.
                    </p>
                </div>
            </div>
        </section>
    );
}