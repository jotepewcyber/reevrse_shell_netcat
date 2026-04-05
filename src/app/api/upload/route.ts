// // // import { NextRequest, NextResponse } from "next/server";
// // // import { writeFile, mkdir } from "fs/promises";
// // // import { exec } from "child_process";
// // // import { promisify } from "util";
// // // import path from "path";
// // // import { randomUUID } from "crypto";

// // // const execAsync = promisify(exec);
// // // const BASE_PORT = 10000;
// // // const TTL = 1800; // 30 min

// // // // Simple in-memory port tracker (no DB needed)
// // // const usedPorts = new Set<number>();

// // // function getFreePort(): number {
// // //   for (let p = BASE_PORT; p < BASE_PORT + 1000; p++) {
// // //     if (!usedPorts.has(p)) return p;
// // //   }
// // //   throw new Error("No free ports available");
// // // }

// // // export async function POST(req: NextRequest) {
// // //   try {
// // //     const formData = await req.formData();
// // //     const files = formData.getAll("file") as File[];

// // //     if (!files.length)
// // //       return NextResponse.json({ error: "No file provided" }, { status: 400 });

// // //     // Save uploaded script to disk
// // //     const sessionId = randomUUID().slice(0, 8);
// // //     const uploadDir = `/tmp/ctf-uploads/${sessionId}`;
// // //     await mkdir(uploadDir, { recursive: true });

// // //     for (const file of files) {
// // //       const buffer = Buffer.from(await file.arrayBuffer());
// // //       await writeFile(path.join(uploadDir, file.name), buffer);
// // //     }

// // //     // Spawn container
// // //     const port = getFreePort();
// // //     usedPorts.add(port);
// // //     const containerName = `ctf_${sessionId}`;

// // //     await execAsync(`
// // //       docker run -d \
// // //         --name ${containerName} \
// // //         --memory="128m" \
// // //         --cpus="0.5" \
// // //         --cap-drop=ALL \
// // //         --security-opt no-new-privileges \
// // //         -p ${port}:4444 \
// // //         --restart=no \
// // //         ctf-challenge:latest
// // //     `);

// // //     // Auto-kill after TTL
// // //     setTimeout(async () => {
// // //       await execAsync(`docker rm -f ${containerName} 2>/dev/null || true`);
// // //       usedPorts.delete(port);
// // //     }, TTL * 1000);

// // //     return NextResponse.json({
// // //       host: process.env.CTF_HOST || "localhost",
// // //       port,
// // //       expires_in: TTL,
// // //       session_id: sessionId,
// // //     });

// // //   } catch (err: any) {
// // //     return NextResponse.json({ error: err.message }, { status: 500 });
// // //   }
// // // }


// // import { NextRequest, NextResponse } from "next/server";
// // import { writeFile, mkdir } from "fs/promises";
// // import { exec } from "child_process";
// // import { promisify } from "util";
// // import path from "path";
// // import { randomUUID } from "crypto";

// // const execAsync = promisify(exec);
// // const BASE_PORT = 10000;
// // const TTL = 1800; // 30 min

// // // Simple in-memory port tracker (no DB needed)
// // const usedPorts = new Set<number>();

// // //TO GET FREE PORT
// // function getFreePort(): number {
// //   for (let p = BASE_PORT; p < BASE_PORT + 1000; p++) {
// //     if (!usedPorts.has(p)) return p;
// //   }
// //   throw new Error("No free ports available");
// // }

// // export async function POST(req: NextRequest) {
// //   try {
// //     const formData = await req.formData();
// //     const files = formData.getAll("file") as File[];

// //     if (!files.length)
// //       return NextResponse.json({ error: "No file provided" }, { status: 400 });

// //     // Save uploaded script to disk
// //     const sessionId = randomUUID().slice(0, 8);
// //     const uploadDir = `/tmp/ctf-uploads/${sessionId}`;
// //     await mkdir(uploadDir, { recursive: true });

// //     for (const file of files) {
// //       const buffer = Buffer.from(await file.arrayBuffer());
// //       await writeFile(path.join(uploadDir, file.name), buffer);
// //     }

// //     // Spawn container
// //     const port = getFreePort();
// //     usedPorts.add(port);
// //     const containerName = `ctf_${sessionId}`;

// //     await execAsync(`
// //       docker run -d \
// //         --name ${containerName} \
// //         --memory="128m" \
// //         --cpus="0.5" \
// //         --cap-drop=ALL \
// //         --security-opt no-new-privileges \
// //         -p ${port}:4444 \
// //         --restart=no \
// //         ctf-challenge:latest
// //     `);

// //     // Auto-kill after TTL
// //     setTimeout(async () => {
// //       await execAsync(`docker rm -f ${containerName} 2>/dev/null || true`);
// //       usedPorts.delete(port);
// //     }, TTL * 1000);

// //     return NextResponse.json({
// //       host: process.env.CTF_HOST || "localhost",
// //       port,
// //       expires_in: TTL,
// //       session_id: sessionId,
// //     });

// //   } catch (err: any) {
// //     return NextResponse.json({ error: err.message }, { status: 500 });
// //   }
// // }



// import { NextRequest, NextResponse } from "next/server";
// import { writeFile, mkdir, chmod } from "fs/promises";
// import { exec } from "child_process";
// import { promisify } from "util";
// import path from "path";
// import { randomUUID } from "crypto";

// const execAsync = promisify(exec);
// const TTL = 1800; // 30 min

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file)
//       return NextResponse.json({ error: "No script uploaded" }, { status: 400 });

//     // Read the script content
//     const scriptContent = await file.text();

//     // Safety check — make sure it contains a reverse shell pattern
//     // so random files aren't executed
//     if (!scriptContent.includes("/dev/tcp/") && !scriptContent.includes("bash -i")) {
//       return NextResponse.json(
//         { error: "Script must contain a bash reverse shell one-liner" },
//         { status: 400 }
//       );
//     }

//     // Save script to disk
//     const sessionId   = randomUUID().slice(0, 8);
//     const uploadDir   = `/tmp/ctf-uploads/${sessionId}`;
//     const scriptPath  = path.join(uploadDir, "shell.sh");

//     await mkdir(uploadDir, { recursive: true });
//     await writeFile(scriptPath, scriptContent);
//     await chmod(scriptPath, 0o755);

//     const containerName = `ctf_${sessionId}`;

//     // 1 — Spin up the victim container
//     await execAsync(
//   `docker run -d --name ${containerName} --memory=128m --cpus=0.5 --cap-drop=ALL --security-opt no-new-privileges --network=CTF --restart=no ctf-challenge:latest sh -c "sleep 600"`
// );


// await new Promise(r => setTimeout(r, 1000));

//     // 2 — Copy the uploaded script into the container
//     await execAsync(`docker cp ${scriptPath} ${containerName}:/tmp/shell.sh`);

//     // 3 — Execute it inside the container
//     //     Container will call back to player's IP:PORT
//     await execAsync(`docker exec -d ${containerName} bash /tmp/shell.sh`);

//     // Auto-kill after TTL
//     setTimeout(async () => {
//       await execAsync(`docker rm -f ${containerName} 2>/dev/null || true`);
//     }, TTL * 1000);

//     return NextResponse.json({ success: true });

//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, chmod } from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { randomUUID } from "crypto";

const execAsync = promisify(exec);
const TTL = 1800;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const scriptContent = await file.text();

    // if (!scriptContent.includes("/dev/tcp/") && !scriptContent.includes("bash -i"))
    //   return NextResponse.json({ error: "Script must contain a bash reverse shell" }, { status: 400 });
if (scriptContent.includes("/dev/tcp/") || scriptContent.includes("bash -i")){
    const sessionId  = randomUUID().slice(0, 8);
    const uploadDir  = `/tmp/ctf-uploads/${sessionId}`;
    const scriptPath = path.join(uploadDir, "shell.sh");

    await mkdir(uploadDir, { recursive: true });
    await writeFile(scriptPath, scriptContent);
    await chmod(scriptPath, 0o755);

    const containerName = `ctf_${sessionId}`;

    // removed: --security-opt no-new-privileges  ← was blocking privesc
   await execAsync(`docker run -d --name ${containerName} --memory=128m --cpus=0.5 --cap-drop=ALL --network=CTF --restart=no ctf-challenge:latest sh -c "sleep 600"`);

    await new Promise(r => setTimeout(r, 1500));

    await execAsync(`docker cp ${scriptPath} ${containerName}:/tmp/shell.sh`);
    //copies file from my machine to container at location /tmp/shell.sh

    // removed: -d flag so errors are visible
    await execAsync(`docker exec ${containerName} bash /tmp/shell.sh`);
}
else {
  return NextResponse.json({ error: "Script must contain a bash reverse shell one-liner" }, { status: 400 });
}
    // setTimeout(async () => {
    //   await execAsync(`docker rm -f ${containerName} 2>/dev/null || true`);
    // }, TTL * 1000);

    // Return the attacker IP so player knows what IP to use in their script
    // const { stdout: attackerIp } = await execAsync(
    //   `docker inspect attacker --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'`
    // );

    // return NextResponse.json({
    //   success: true,
    //   attacker_ip: attackerIp.trim(), // tell the player what IP to point reverse shell at
    //   session_id: sessionId,
    // });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}