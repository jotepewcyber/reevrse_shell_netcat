import {exec} from 'child_process';
// import { useSearchParams } from 'next/navigation';

export async function GET(req: Request) {
// const searchParams = useSearchParams();
const { searchParams } = new URL(req.url); 
// let cmd = searchParams.get('cmd');

 let cmd = searchParams.get("cmd") || "";


if(cmd!=='ls' && cmd!=='type flag.txt' && cmd!=='dir' && cmd!=='cat flag.txt' && cmd!=='ping 8.8.8.8' && cmd!=='dir; type flag.txt' ){ 
    cmd=`echo ${cmd} is not allowed`;
    // return (
    //     <div className="min-h-screen flex items-center justify-center bg-[#031023] text-red-400 font-mono">
    //       <p className="text-lg tracking-widest">
    //         Invalid command. 
    //       </p>
    //     </div>
    //   );
}


const command=cmd;

return new Promise((resolve) => {

    exec(command, (error, stdout, stderr) => {
let op='';
        if(error){
op=error.message;
        }
        else if(stderr){
op=stderr;
        }
        else op=stdout;

        resolve(new Response(op));
    });
    // reject(new Response('Error executing command', { status: 500 }));

});
}