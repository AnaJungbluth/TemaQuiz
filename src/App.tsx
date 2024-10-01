import { useState } from 'react'
import './assets/question.png'
import { ItemSuggestion } from './components/ItemSuggestion'
// pending -> started -> done
// pending -> esperando fazer pergunta
// started -> começo o chat
// done -> volta ao inicial

type ProgressType = 'pending' | 'started' | 'done'

function App() {
  const [progress, setProgress] = useState<ProgressType>('pending')
  const [textarea, setTextarea] = useState<string>('')
  const [chat, setChat] = useState<string[]>([])

  function handleSubmitChat(){
    if(!textarea){
      return
    }

    const textTextearea = textarea
    setTextarea('') 

    if(progress === 'pending'){
      setChat(text => [...text, textTextearea])
      setChat(text => [...text, 'pergunta gerada'])

      setProgress('started')
      return
    }

    setChat(text => [...text, textTextearea])
    setChat(text => [...text, 'feedback gerado'])

    setProgress('done')
  }

  function resetChat(){
    setProgress('pending')
    setChat([])
  }

  return (
    <div className="container">
      <div className="sidebar">
        <details className="suggestion" open>
          <summary className="gradient-background">Tópicos Sugeridos</summary>
          <ItemSuggestion name='JavaScript' />
          <ItemSuggestion name='React' />
          <ItemSuggestion name='Python' />
          <ItemSuggestion name='Django' />
        </details>

        <details className="historic" open>
          <summary>Histórico</summary>
          <ItemSuggestion name='Python' />
          <ItemSuggestion name='Django' />
        </details>
      </div>

      <div className="content">
        {
          progress === 'pending' && (
            <div className="box-home">
              <span>Olá! eu sou o</span>
              <h1 className="gradient-color">TemaQuiz</h1>
              <p>
                Estou aqui para te ajudar nos estudos.
                Escolha um dos tópicos sugeridos ou digite um tema,
                e eu gerarei uma questão para você.
              </p>
            </div>
          )
        }

        { 
          progress !== 'pending' && (
            <div className="box-chat">
              {
                chat[0] &&(
                  <h1>Você esta estudando sobre <span className="gradient-color">{chat[0]}</span></h1>
                )
              }

              {
                chat[1] &&(
                  <div className="box-question">
                    <h2><img src="./assets/question.png"></img>Pergunta</h2>
                    {chat[1]}
                  </div>
                )
              }

              {
                chat[2] &&(
                  <div className="box-answer">
                    <h2>Sua resposta</h2>
                    {chat[2]}
                  </div>
                )
              }

              {
                chat[3] &&(
                  <div className="box-feedback">
                    <h2>Feedback <span className="gradient-color">TemaQuiz</span></h2>
                    {chat[3]}
                    <div className="action">
                      <button 
                        className="gradient-background"
                        onClick={resetChat}
                      >Novo tópico</button>
                    </div>
                  </div>
                )
              }

            </div>
          )
        }

        {
          progress !== 'done' &&(
            <div className="box-input">
              <textarea 
                value={textarea} 
                onChange={element => setTextarea(element.target.value)}
                placeholder={
                  progress === 'started' 
                    ? "Digite sua resposta..." 
                    : "Digite aqui o tema que você deseja estudar."
                }
              />
              <button className="gradient-background" onClick={handleSubmitChat}>{
                progress === 'pending'
                  ? 'Enviar Pergunta'
                  : 'Enviar Resposta'
              }</button>
            </div>
          )
        }

        <div className="box-footer">
          <footer className="gradient-color">TemaQuiz</footer>
        </div>
      </div>
    </div>
  )
}

export default App
