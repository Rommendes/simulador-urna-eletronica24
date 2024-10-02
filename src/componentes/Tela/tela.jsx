import React from "react";

const Tela = ({numero, candidato, votoBranco, mensagem, tipoVoto, votacaoConcluida, handleInputChange })=>{
  

// Função para gerar os campos de input de acordo com o comprimento do número necessário (5 para vereador, 2 para prefeito)
const gerarInputs = (length) => {
  const inputs = [];
  for (let i = 0; i < length; i++) {
    inputs.push(
      <input
        key={i}
        type="text"
        maxLength="1"
        value={numero[i] || ""} // Exibe o número digitado ou vazio
        readOnly 
        style={{ width: "30px", textAlign: "center", fontSize:"24px", margin: "0 5px" }} // Adiciona estilo para centralizar o número
      />
    );
  }
  return inputs;
};

  return (
    <div className="tela">
      {/* Se a votação estiver concluída, mostra apenas "FIM" */}
      {votacaoConcluida ? (
        <div className="telaFim">
          <h1>FIM</h1>
          <audio controls>
              <source src="/public/fim.mp3"   type="audio/mpeg" />
                Seu navegador não suporta o áudio.
              </audio>
        </div>
      ) : (
        <>
          {/* Exibe os espaços para digitar o número de vereador */}
          {tipoVoto === "vereador" && (
            <div>
              <h3>SEU VOTO PARA</h3>
              <h3>Vereador</h3>
              <p >{gerarInputs( 5)}</p>
            </div>
          )}

          {/* Exibe os espaços para digitar o número de prefeito */}
          {tipoVoto === "prefeito" && (
            <div>
              <h3>Prefeito:</h3>
              <p >{gerarInputs( 2)}</p>
            </div>
          )}

          {/* Exibe o candidato encontrado */}
          {candidato && (
            <div>
              <h3>Nome: {candidato.nome}</h3>
              <p>Partido: {candidato.partido}</p>
              
            {candidato && candidato.imagem && (
      <div className="candidato-imagem">
        <img src={candidato.imagem} alt={` Foto de ${candidato.nome}`} />
      </div>
     )}

            </div>
            
          )}

          {/* Exibe a mensagem passada */}
          <div>
            <p className="msg">{mensagem}</p>
          </div>

          {/* Exibe mensagem de voto em branco */}
          {votoBranco}
        </>
      )}
    </div>
  );
};



export default Tela