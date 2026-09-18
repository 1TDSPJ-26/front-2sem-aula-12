import { useState } from "react";

export default function Conteudo() {
    let nomeComum:string| null = "Matheus";

    function alterNomeComum(){
        nomeComum = prompt("Digite o novo nome");
        console.log("Nome alterado: ", nomeComum)
    }

    const[nomeState, setNomeState] = useState<string| null>("Carlos");

    function alteraNomeState(){
        const nome: string | null = prompt("Digite o novo nome");
        setNomeState(nome)
        console.log("Nome alterado: ", nomeState)
    }

    return (
        <main>
            <div>
                <p>Nome Comum: {nomeComum}</p>
                <button onClick={alterNomeComum}>Nome alterado = {nomeComum}</button>
            </div>
            <div>
                <p>Nome State: {nomeState}</p>
                <button onClick={alteraNomeState}>Nome alterado = {nomeState}</button>
            </div>
        </main>
    )
}