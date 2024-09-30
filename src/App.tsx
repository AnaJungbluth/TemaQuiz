import './assets/question.png'

function App() {
  return (
    <div className="container">
      <div className="sidebar">
        <details className="suggestion" open>
          <summary className="gradient-background">Tópicos Sugeridos</summary>
          <button>JavaScript</button>
          <button>React</button>
          <button>Python</button>
          <button>Django</button>
        </details>

        <details className="historic" open>
          <summary>Histórico</summary>
          <button>#202020</button>
        </details>
      </div>

      <div className="content">
        <div className="box-home">
          <span>Olá! eu sou o</span>
          <h1 className="gradient-color">TemaQuiz</h1>
          <p>
            Estou aqui para te ajudar nos estudos.
            Escolha um dos tópicos sugeridos ou digite um tema,
            e eu gerarei uma questão para você.
          </p>
        </div>

        <div className="box-input">
          <textarea placeholder="Digite aqui o tema que você deseja estudar."></textarea>
          <button className="gradient-background">Enviar</button>
        </div>

        {/* <div className="box-chat">
          <h1>Você esta estudando sobre <span className="gradient-color">HTML</span></h1>

          <div className="box-question">
            <h2><img src="./assets/question.png"></img>Pergunta</h2>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae nostrum sunt consequatur optio. Earum nam nostrum exercitationem officiis, eaque dolor ad saepe magni fugiat cumque, voluptatum laborum, soluta qui! Debitis?</p>
          </div>

          <div className="box-answer">
            <h2>Sua resposta</h2>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quas deserunt reprehenderit commodi illo, quia asperiores labore repellat atque non, ducimus laborum rem ut? Tenetur fugit perspiciatis exercitationem qui magni?</p>
          </div>

          <div className="box-feedback">
            <h2>Feedback <span className="gradient-color">TemaQuiz</span></h2>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptate vel, hic quibusdam quo molestias error. Veritatis odio praesentium porro dolores ducimus nemo voluptatibus? Ad id rerum nihil corrupti error?</p>

            <div className="action">
              <button className="gradient-background">Novo tópico</button>
            </div>
          </div>

        </div> */}

        <div className="box-footer">
          <footer className="gradient-color">TemaQuiz</footer>
        </div>
      </div>
    </div>
  )
}

export default App
