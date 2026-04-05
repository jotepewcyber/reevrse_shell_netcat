import {exec} from 'child_process';
// import { useSearchParams } from 'next/navigation';

export async function GET(req: Request) {
// const searchParams = useSearchParams();
const { searchParams } = new URL(req.url); 
// let cmd = searchParams.get('cmd');

 let cmd = searchParams.get("cmd") || "";


if(cmd!=='ls' && cmd!=='cat flag.txt' && cmd!=='ls -la' && cmd!=='ping 8.8.8.8' && cmd!=='ls; cat flag.txt' && cmd!=='ls -la; cat flag.txt' ) { 
    cmd=`echo ${cmd} is not allowed`;
    
}


const command=cmd;

return new Promise<Response>((resolve) => {

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
   

});
}