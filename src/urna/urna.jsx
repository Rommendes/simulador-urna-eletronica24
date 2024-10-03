//fiz os ajustes, porém continua com o problema: qualquer número digitado é considerado como válido
import React, { useState, useEffect } from "react";
import Teclado from "../componentes/Teclado/teclado";
import Tela from "../componentes/Tela/tela";
import Rodape from "../componentes/footer/rodape";
import Header from "../componentes/header/header";

const Urna = () => {
  const [numero, setNumero] = useState("");
  const [candidatos, setCandidatos] = useState([]);
  const [candidato, setCandidato] = useState(null);
  const [votoBranco, setVotoBranco] = useState(false);
  const [mensagem, setMensagem] = useState(""); // Novo estado para a mensagem
  const [tipoVoto, setTipoVoto] = useState("vereador")// Inicia a votação com vereador
  const[votacaoConcluida, setVotacaoConcluida] = useState(false);
  
  // Carregar o JSON externo usando fetch
  useEffect(() => {
    fetch("https://dados-img.vercel.app/index.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na rede");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Candidatos carregados:", data.candidatos); // Debug dos dados carregados
        setCandidatos(data.candidatos); // Acessa a chave 'candidatos'
      })
      .catch((error) => {
        console.error("Erro ao carregar o JSON:", error);
      });
  }, []);

  const handleInput = (num) => {
    
    if(votacaoConcluida) {
      return; // Impede que o usuário continue digitando após encerrar a votação
;    }
      const novoNumero = numero + num
    
      // Limita a quantidade de dígitos com base no tipo de voto
      if (
        (tipoVoto === "vereador" && novoNumero.length <= 5) || (tipoVoto === "prefeito" && novoNumero.length <= 2)
      ) {
          setNumero(novoNumero);
        }
    

   // Verifica o candidato após preencher o número completo
      if(tipoVoto === "vereador" && novoNumero.length === 5){
    
          const candidatoEscolhido = candidatos.find(
            (c)=> c.numero === novoNumero && c.tipo === 'vereador' 
          ) ;
          
          setCandidato(candidatoEscolhido || null); // Define o candidato ou null
          setMensagem('Tem certeza?')
         
          if(!candidatoEscolhido){
            setMensagem('VOTO NULO')
          }
            }  
         console.log("candidato: ", candidato);

         if(tipoVoto === "prefeito" && novoNumero.length === 2){
         
          const candidatoEscolhido = candidatos.find(
            (c) => c.numero === novoNumero && c.tipo === 'prefeito' 
          );
        
        setCandidato(candidatoEscolhido || null); // Define o candidato ou null
          setMensagem('Tem certeza?')
        if(!candidatoEscolhido){
          setMensagem('VOTO NULO')
        }
        
          }
        
        }
     

  const handleConfirma = () => {
    if(votacaoConcluida) return;

    if (votoBranco) {
      setMensagem("Voto em branco confirmado!");
      
    } else if (candidato) {
      setMensagem(`Voto confirmado para ${candidato.nome}`);
     
    } else {
      setMensagem("Número inválido. Voto nulo!");
    }
   
  // Após votar para vereador, passa para o voto de prefeito
    if (tipoVoto === "vereador") {
      // setMensagem(
      //   candidato 
      //   ? `Candidato para vereador: ${candidato.nome}` 
      //   : 'Nenhum candidato para vereador encontrado'
      // );
      setTipoVoto("prefeito");
      setNumero("");
      setCandidato(null)
      setVotoBranco(false);
      setMensagem("Voto nulo")
      setMensagem("Vote agora para prefeito.");
      
    } else if (tipoVoto === "prefeito") {
      
      // Finaliza a votação após votar para prefeito
      setVotacaoConcluida(true);
      //setMensagem("Votação encerrada. Obrigado!");
     
      setMensagem("FIM")
    }
   
  
  };

  const handleCorrige = () => {
    if(votacaoConcluida) return;
    setNumero("");
    setCandidato(null);
    setVotoBranco(false);
    setMensagem(""); // Limpa a mensagem ao corrigir
  };

  const handleBranco = () => {
    if(votacaoConcluida) return;
    setNumero("");
    setCandidato(null);
    setVotoBranco(true);
    setMensagem("Voto em branco");
  };

  return (
    <div className="urna">
     <Header/>
      <Tela 
      numero={numero} 
      candidato={candidato} 
      votoBranco={votoBranco} 
      mensagem={mensagem}
      tipoVoto= {tipoVoto}// Passa o tipo de voto (vereador/prefeito)
      votacaoConcluida={votacaoConcluida}
      
      />
     {!votacaoConcluida && (
        <Teclado
         onInput={handleInput}
          onCorrige={handleCorrige}
          onConfirma={handleConfirma}
          onBranco={handleBranco}
        />

     )}
     
    <Rodape/>   
    </div>
    
  );

}

export default Urna;
