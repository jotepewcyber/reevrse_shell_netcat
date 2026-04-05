

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
 
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}