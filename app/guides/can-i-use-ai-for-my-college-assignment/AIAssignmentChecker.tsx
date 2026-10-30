
"use client";

import { useState } from "react";

type Policy = "unknown" | "prohibited" | "limited" | "allowed";
type Timing = "planned" | "completed";
type Use =
    | "brainstorming"
    | "outlining"
    | "proofreading"
    | "summarizing"
    | "debugging"
    | "code generation"
    | "drafting text"
    | "other assistance";
type Disclosure = "unknown" | "required" | "not-required";

const uses: Use[] = [
    "brainstorming",
    "outlining",
    "proofreading",
    "summarizing",
    "debugging",
    "code generation",
    "drafting text",
    "other assistance",
];

const inputClass =
    "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-base";

export default function AIAssignmentChecker() {
    const [policy, setPolicy] = useState<Policy>("unknown");
    const [timing, setTiming] = useState<Timing>("planned");
    const [activity, setActivity] = useState<Use>("brainstorming");
    const [expressPermission, setExpressPermission] = useState(false);
    const [disclosure, setDisclosure] = useState<Disclosure>("unknown");
    const [tool, setTool] = useState("");
    const [purpose, setPurpose] = useState("");
    const [extent, setExtent] = useState("");
    const [verification, setVerification] = useState("");
    const [course, setCourse] = useState("");
    const [copied, setCopied] = useState(false);
    const [outputEdited, setOutputEdited] = useState(false);
    const [customOutput, setCustomOutput] = useState("");

    const prohibited = policy === "prohibited";

    const permissionEstablished =
        policy === "allowed" ||
        (policy === "limited" && expressPermission);

    const uncertain = !prohibited && !permissionEstablished;
    const needsClarification = prohibited || uncertain;

    const action = prohibited
        ? "Do not use AI under the stated prohibition"
        : uncertain
            ? "Confirm permission before relying on AI assistance"
            : "Potentially permitted within the stated policy";

    const actionDetail = prohibited
        ? timing === "completed"
            ? "Because you report having already used AI despite a prohibition, do not assume a disclosure fixes the issue. Consult your instructor or academic-integrity office about the appropriate next step."
            : "Your selected policy prohibits AI. Ask the instructor for an explicit exception before using it."
        : uncertain
            ? "Your selections do not establish that this particular use is authorized. The instructor or assignment policy must resolve the uncertainty."
            : "You report explicit permission for this activity. Follow the exact conditions, including any restrictions on what may be submitted.";

    const hasFacts = Boolean(
        tool.trim() && purpose.trim() && extent.trim()
    );

    // Generate wording appropriate to planned or completed AI use.
    // Never claim that an action or verification has already occurred
    // when the student describes only intended future use.
    const disclosureText =
        timing === "planned"
            ? `Planned AI-use disclosure${course.trim() ? ` for ${course.trim()}` : ""
            }: I intend to use ${tool.trim() || "[AI tool]"
            } for ${purpose.trim() || "[purpose]"
            } (${activity}). I plan to limit the assistance to ${extent.trim() || "[describe the intended assistance]"
            }.${verification.trim()
                ? ` I plan to independently ${verification.trim()}.`
                : ""
            } This is a description of intended use, not a claim that AI assistance has already occurred.`
            : `AI-use disclosure${course.trim() ? ` for ${course.trim()}` : ""
            }: I used ${tool.trim() || "[AI tool]"
            } for ${purpose.trim() || "[purpose]"
            } (${activity}). The assistance was limited to ${extent.trim() || "[describe the actual assistance]"
            }.${verification.trim()
                ? ` I independently ${verification.trim()}.`
                : ""
            } I remain responsible for the submitted work.`;

    const requestText = `Subject: Clarification about AI use${course.trim() ? ` in ${course.trim()}` : ""
        }

Hello Professor,

${timing === "completed"
            ? `I have already used ${tool.trim() || "an AI tool"
            } for ${activity} in connection with this assignment and would like to clarify how to address that use.`
            : `I would like to clarify whether ${activity} with ${tool.trim() || "an AI tool"
            } is permitted for this assignment.`
        } ${purpose.trim()
            ? `${timing === "completed"
                ? "My purpose was"
                : "My intended purpose is"
            } ${purpose.trim()}. `
            : ""
        }${extent.trim()
            ? `${timing === "completed"
                ? "The assistance was"
                : "The assistance would be limited to"
            } ${extent.trim()}. `
            : ""
        }Could you confirm whether this use is allowed and whether you require a disclosure or citation?

Thank you.`;

    const generated = needsClarification
        ? requestText
        : disclosureText;

    const output = outputEdited ? customOutput : generated;

    function updateOutput() {
        setCopied(false);
        setOutputEdited(false);
    }

    async function copyOutput() {
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    }

    return (
        <section
            id="ai-policy-checker"
            className="scroll-mt-24 mx-auto max-w-4xl px-6 py-12"
        >
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Decision checker
                </p>

                <h2 className="mt-3 text-3xl font-semibold">
                    AI assignment policy &amp; disclosure checker
                </h2>

                <p className="mt-3 leading-7 text-[var(--muted)]">
                    Describe your assignment rules and how you want to use AI.
                    This tool cannot read or interpret your actual syllabus,
                    grant permission, or determine whether past use was compliant.
                    Nothing is uploaded to NM.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold">
                            What does the assignment policy say?
                        </span>
                        <select
                            className={inputClass}
                            value={policy}
                            onChange={(e) => {
                                setPolicy(e.target.value as Policy);
                                setExpressPermission(false);
                                updateOutput();
                            }}
                        >
                            <option value="unknown">Unclear or not stated</option>
                            <option value="prohibited">AI use is prohibited</option>
                            <option value="limited">
                                AI use is limited to specific activities
                            </option>
                            <option value="allowed">
                                This specific activity is explicitly permitted
                            </option>
                        </select>
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold">
                            When is the AI use happening?
                        </span>
                        <select
                            className={inputClass}
                            value={timing}
                            onChange={(e) => {
                                setTiming(e.target.value as Timing);
                                updateOutput();
                            }}
                        >
                            <option value="planned">I am considering it</option>
                            <option value="completed">I already used AI</option>
                        </select>
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold">
                            What activity?
                        </span>
                        <select
                            className={inputClass}
                            value={activity}
                            onChange={(e) => {
                                setActivity(e.target.value as Use);
                                setExpressPermission(false);
                                updateOutput();
                            }}
                        >
                            {uses.map((u) => (
                                <option key={u} value={u}>
                                    {u.charAt(0).toUpperCase() + u.slice(1)}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold">
                            Disclosure requirement
                        </span>
                        <select
                            className={inputClass}
                            value={disclosure}
                            onChange={(e) => {
                                setDisclosure(e.target.value as Disclosure);
                                updateOutput();
                            }}
                        >
                            <option value="unknown">Unknown</option>
                            <option value="required">Explicitly required</option>
                            <option value="not-required">
                                Explicitly not required
                            </option>
                        </select>
                    </label>
                </div>

                {policy === "limited" && (
                    <label className="mt-5 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-white p-4 text-sm">
                        <input
                            type="checkbox"
                            checked={expressPermission}
                            onChange={(e) => {
                                setExpressPermission(e.target.checked);
                                updateOutput();
                            }}
                            className="mt-1"
                        />
                        <span>
                            The written policy explicitly lists{" "}
                            <strong>{activity}</strong> as permitted, and I meet
                            its conditions. (Do not check based only on an
                            assumption that the activity is harmless.)
                        </span>
                    </label>
                )}

                <div
                    className="mt-7 rounded-2xl border-2 border-[var(--accent)] bg-white p-6"
                    aria-live="polite"
                >
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                        Your next step
                    </p>

                    <h3 className="mt-3 text-xl font-semibold">
                        {action}
                    </h3>

                    <p className="mt-2 leading-7 text-[var(--muted)]">
                        {actionDetail}
                    </p>

                    {permissionEstablished && disclosure === "required" && (
                        <p className="mt-3 text-sm font-semibold">
                            Your stated policy requires disclosure. Use the factual
                            draft below and follow any required format.
                        </p>
                    )}

                    {permissionEstablished && disclosure === "unknown" && (
                        <p className="mt-3 text-sm font-semibold">
                            Disclosure requirements remain unclear. Check the
                            syllabus or ask before submitting.
                        </p>
                    )}

                    {permissionEstablished && disclosure === "not-required" && (
                        <p className="mt-3 text-sm">
                            You report that disclosure is not required. Keep an
                            accurate record of the assistance in case the
                            assignment instructions differ.
                        </p>
                    )}
                </div>

                <div className="mt-8 border-t border-[var(--border)] pt-7">
                    <h3 className="text-xl font-semibold">
                        {needsClarification
                            ? "Prepare a clarification request"
                            : timing === "planned"
                                ? "Draft a planned AI-use statement"
                                : "Draft an accurate AI-use disclosure"}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        Only include facts that are true. This text is editable
                        and does not authorize AI use.
                    </p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <label className="flex flex-col gap-2 text-sm">
                            Course or assignment (optional)
                            <input
                                className={inputClass}
                                value={course}
                                onChange={(e) => {
                                    setCourse(e.target.value);
                                    updateOutput();
                                }}
                                placeholder="e.g., Biology 101 lab report"
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm">
                            AI tool name
                            <input
                                className={inputClass}
                                value={tool}
                                onChange={(e) => {
                                    setTool(e.target.value);
                                    updateOutput();
                                }}
                                placeholder="e.g., ChatGPT"
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm">
                            Purpose
                            <input
                                className={inputClass}
                                value={purpose}
                                onChange={(e) => {
                                    setPurpose(e.target.value);
                                    updateOutput();
                                }}
                                placeholder="e.g., explore possible essay topics"
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm">
                            Extent of assistance
                            <input
                                className={inputClass}
                                value={extent}
                                onChange={(e) => {
                                    setExtent(e.target.value);
                                    updateOutput();
                                }}
                                placeholder="e.g., three topic suggestions, no submitted text"
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                            Independent verification or revisions (optional)
                            <input
                                className={inputClass}
                                value={verification}
                                onChange={(e) => {
                                    setVerification(e.target.value);
                                    updateOutput();
                                }}
                                placeholder="e.g., checked each claim against course readings"
                            />
                        </label>
                    </div>

                    {permissionEstablished && !hasFacts && (
                        <p className="mt-4 text-sm text-amber-900">
                            Complete the tool name, purpose and extent of assistance
                            before using the disclosure. Placeholders are not
                            suitable for submission.
                        </p>
                    )}

                    <label className="mt-5 flex flex-col gap-2">
                        <span className="text-sm font-semibold">
                            Editable draft
                        </span>
                        <textarea
                            className={`${inputClass} min-h-44`}
                            value={output}
                            onChange={(e) => {
                                setCustomOutput(e.target.value);
                                setOutputEdited(true);
                                setCopied(false);
                            }}
                        />
                    </label>

                    <button
                        type="button"
                        onClick={copyOutput}
                        disabled={
                            !output.trim() ||
                            (permissionEstablished && !hasFacts)
                        }
                        className="mt-4 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {copied ? "Copied" : "Copy draft"}
                    </button>

                    <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
                        If your instructor specifies a disclosure format or
                        citation style, use that instead. Never invent prompts,
                        verification steps, or AI contributions. A disclosure
                        does not cure prohibited use.
                    </p>
                </div>
            </div>
        </section>
    );
}
