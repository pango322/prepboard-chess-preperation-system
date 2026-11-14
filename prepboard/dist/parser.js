import {parseGame} from './core.mjs';
onmessage=({data})=>{let parsed=[],skipped=0;for(let i=0;i<data.raw.length;i++){try{const g=parseGame(data.raw[i],data.username);if(g&&g.initial==='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')parsed.push(g);else skipped++;}catch{skipped++;}if(i%100===0)postMessage({progress:i,total:data.raw.length});}postMessage({parsed,skipped});};
