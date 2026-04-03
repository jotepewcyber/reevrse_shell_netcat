// const Docker = require("dockerode");
// const docker = new Docker();

// const activeInstances = new Map();

// const BASE_PORT = 10000;
// const MAX_INSTANCES = 10;
// const INSTANCE_TTL = 1800 * 1000; // 30 min in ms

// // Simple lock to avoid race conditions
// let lock = false;

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function acquireLock() {
//   while (lock) await sleep(10);
//   lock = true;
// }

// function releaseLock() {
//   lock = false;
// }

// // Get free port
// function getFreePort() {
//   const usedPorts = new Set(
//     Array.from(activeInstances.values()).map(v => v.port)
//   );

//   for (let port = BASE_PORT; port < BASE_PORT + 1000; port++) {
//     if (!usedPorts.has(port)) return port;
//   }

//   throw new Error("No free ports available");
// }




// // Start instance
// async function spawnInstance(userId) {
//   await acquireLock();

//   try {
//     if (activeInstances.has(userId)) {
//       return activeInstances.get(userId);
//     }

//     if (activeInstances.size >= MAX_INSTANCES) {
//       throw new Error("Max instances reached");
//     }

//     const port = getFreePort();
// const safeUser = userId.replace(/[^a-zA-Z0-9]/g, "");

// let container;

//    try {
//      container = await docker.createContainer({
//        Image: "ctf-challenge:latest",
//        name: `ctf_${safeUser}_${Date.now()}`,
//        ExposedPorts: {
//          "4444/tcp": {}
//        },
//        HostConfig: {
//          PortBindings: {
//            "4444/tcp": [{ HostPort: String(port) }]
//          },
//          Memory: 128 * 1024 * 1024,
//          NanoCPUs: 200_000_000,
//          CapDrop: ["ALL"],
//          SecurityOpt: ["no-new-privileges:true"]
//        }
//      });
 
//      await container.start();
//      await sleep(1000); // Give it a moment to start
 
//    } catch (error) {
//     if(container){
//         await container.remove.catch(() => {});
//     }
//     throw new Error(`Failed to spawn container: ${error.message}`);
    
//    }
//     const instance = {
//       containerId: container.id,
//       port,
//       expiresAt: Date.now() + INSTANCE_TTL,
//       userId
//     };

//     activeInstances.set(userId, instance);

//     console.log(`[+] Spawned instance for ${userId} on port ${port}`);

//     return instance;

//   } finally {
//     releaseLock();
//   }
// }

// // Kill instance
// async function killInstance(userId) {
//   if (!activeInstances.has(userId)) return;

//   const inst = activeInstances.get(userId);
//   activeInstances.delete(userId);

//   try {
//     const container = docker.getContainer(inst.containerId);
//     await container.stop({ t: 5 });
//     await container.remove();

//     console.log(`[-] Killed instance for ${userId}`);
//   } catch (err) {
//     console.error(`[!] Error killing container: ${err.message}`);
//   }
// }

// //  Reaper (cleanup expired containers)
// async function reaper() {
//   while (true) {
//     const now = Date.now();

//     for (const [userId, inst] of activeInstances.entries()) {
//       if (inst.expiresAt < now) {
//         console.log(`[*] Expiring instance for ${userId}`);
//         await killInstance(userId);
//       }
//     }

//     await sleep(60000);
//   }
// }

// // Start reaper in background
// reaper();
// //at every 10 mins it will check for expired containers and kill them. This ensures that we don't have orphaned containers consuming resources indefinitely.

// // Export functions (for API use)
// module.exports = {
//   spawnInstance,
//   killInstance
// };



import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

// Import your JS instance manager
const { spawnInstance, execScript } = require("@/lib/instance_manager");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
      return NextResponse.json({ error: "No script uploaded" }, { status: 400 });

    // Read the script text
    const scriptContent = await file.text();

    // Validate it contains a reverse shell
    if (!scriptContent.includes("/dev/tcp/")) {
      return NextResponse.json(
        { error: "Script must contain a bash reverse shell one-liner using /dev/tcp/" },
        { status: 400 }
      );
    }

    const sessionId = randomUUID().slice(0, 8);

    // 1 — Spawn the container
    await spawnInstance(sessionId);

    // 2 — Execute uploaded script inside it
    //     Container will call back to player's IP:PORT
    await execScript(sessionId, scriptContent);

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}