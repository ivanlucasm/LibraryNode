import chalk from "chalk";
import { promises } from "dns";

function extraiLinks(arrLinks){
    return arrLinks.map((objLink) => Object.values(objLink).join())
}

async function checaStatus(listaUrls){

    const arrStatus = await Promise.all(
            listaUrls.map(async (url) => {
            try{
                const response = await fetch(url, {method: 'HEAD'});
                return `${response.status} - ${response.statusText}`;
            }catch(erro){
                return manejaErros(erro);
            }
        })
    )
    return arrStatus;
}

function manejaErros (erro) {
   if(erro.cause.code === 'ENOTFOUND'){
    return 'link não encontrado';
   }else{
    return 'ocorreu algum erro';
   }
}

export default  async function listaValidada(listaLinks){
    const links = extraiLinks(listaLinks);
    const status = await checaStatus(links);

    return listaLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}

