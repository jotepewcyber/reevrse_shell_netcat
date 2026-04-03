'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
export default function CTFPage() {
// const [cmd,setCmd]=useState('');
const [loading,setLoading]=useState(false);
// const [output,setOutput]=useState('');


const searchParams = useSearchParams();
const cmd=searchParams.get('cmd') ;

if(!cmd) return;
// if(cmd!=='ls' && cmd!=='ls -la' && cmd!=='ping 8.8.8.8' && cmd!=='cat flag.txt'){ {
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-[#031023] text-red-400 font-mono">
//           <p className="text-lg tracking-widest">
//             Invalid command. 
//           </p>
//         </div>
//       );
// }

useEffect(()=>{
    if(cmd.length==0) return;
// setLoading(true);
// setOutput('');
const run=async()=>{
try {
    const res=await fetch(`/api/connect?cmd=${encodeURIComponent(cmd)}`);
   const text=await res.text();
//    setOutput(text);
// if(text.length==0)  return (
//         <div className="min-h-screen flex items-center justify-center bg-[#031023] text-red-400 font-mono">
//           <p className="text-lg tracking-widest">
//             Invalid command. 
//           </p>
//         </div>
//       );
// else
    if(text.length==0) alert('No output returned');
else
alert(`\n\nOutput:\n${text}`);

} catch (error) {
    alert('Error executing command');
 } 
// finally {
//     // setLoading(false);
// }
}
run()
},[cmd]);   

return (
    <div className="min-h-screen flex items-center justify-center bg-[#031023] text-green-400 font-mono">
      <p className="text-lg tracking-widest">
          {cmd ? "Executing..." : "Waiting for command..."}
      </p>
    </div>
  );
}
