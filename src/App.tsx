import { useState } from 'react'
import './assets/question.png'
import { ItemSuggestion } from './components/ItemSuggestion'
import { getHistoric, setHistoric } from './storage/historic'
import { sendMessage } from './api/openai'
import { ThreeDots } from 'react-loader-spinner'
// pending -> started -> done
// pending -> esperando fazer pergunta
// started -> começo o chat
// done -> volta ao inicial

type ProgressType = 'pending' | 'started' | 'done'

type Message ={
  role: 'user' | 'assistant'
  content: string
  subject?: string
}

function App() {
  const [progress, setProgress] = useState<ProgressType>('pending')
  const [textarea, setTextarea] = useState<string>('')
  const [chat, setChat] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmitChat(){
    if(!textarea){
      return
    }

    const textTextearea = textarea
    setTextarea('') 

    if(progress === 'pending'){
      setHistoric(textTextearea)
      setProgress('started')

      const prompt = `gere uma pergunta onde simule uma entrevista de
      emprego sobre ${textTextearea}, após gerar a pergunta, enviarei a resposta e 
      você  me dará um feedback.
      O feedback precisa ser simples e objetvo e corresponder fielmente
      a resposta enviada.
      Após o feedback não existirá mais interação.`

      const messageGPT: Message = {
        role: 'user',
        content: prompt,
        subject: textTextearea
      }
      setChat(text => [...text, messageGPT])

      setLoading(true)
      // Chamando a API da OpenAI
      const questionGPT = await sendMessage([messageGPT])
      setChat(text => [...text, {
        role: 'assistant',
        content: questionGPT.content
      }])

      setLoading(false)
      return
    }

    const resonseUser: Message ={
      role: 'user',
      content: textTextearea
    }
    setChat(text => [...text, resonseUser])

    setLoading(true)
    // Chamando a API da OpenAI
    const feedbackGPT = await sendMessage([...chat, resonseUser])
    setChat(text => [...text, {
      role: 'assistant',
      content: feedbackGPT.content
    }])

    setLoading(false)
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
          <ItemSuggestion name='JavaScript' onClick={() => setTextarea('JavaScript')}/>
          <ItemSuggestion name='React' onClick={() => setTextarea('React')}/>
          <ItemSuggestion name='Python' onClick={() => setTextarea('Python')}/>
          <ItemSuggestion name='Django' onClick={() => setTextarea('Django')}/>
        </details>

        <details className="historic" open>
          <summary>Histórico</summary>
          {
            getHistoric().map(item => (
              <ItemSuggestion  name={item} onClick={() => setTextarea(item)}/>
            ))
          }
          
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
                  <h1>Você esta estudando sobre <span className="gradient-color">{chat[0].subject}</span></h1>
                )
              }

              {
                chat[1] &&(
                  <div className="box-question">
                    <h2><img src="./assets/question.png"></img>Pergunta</h2>
                    {chat[1].content}
                  </div>
                )
              }

              {
                chat[2] &&(
                  <div className="box-answer">
                    <h2>Sua resposta</h2>
                    {chat[2].content}
                  </div>
                )
              }

              {
                chat[3] &&(
                  <div className="box-feedback">
                    <h2>Feedback <span className="gradient-color">TemaQuiz</span></h2>
                    {chat[3].content}
                    <div className="action">
                      <button 
                        className="gradient-background"
                        onClick={resetChat}
                      >Novo tópico</button>
                    </div>
                  </div>
                )
              }

              {
                loading &&(
                  <ThreeDots
                    visible={true}
                    height="30"
                    width="60"
                    color="#663399"
                    radius="9"
                    ariaLabel='three-dots-loading'
                    wrapperStyle={{margin: '30px auto'}}
                  />
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
