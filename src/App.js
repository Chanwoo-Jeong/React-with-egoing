import logo from './logo.svg';
// build 모든 개발이 완료되었을 때 빌드 하는 것.
// npm run start
// npm run <command>
import './App.css';
import {useState} from 'react';

function  Create(props) {
    return <article>
        <h2>create</h2>
        <form onSubmit={ event =>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title,body);
        }}>
            <p><input type="text" name="title" placeholder="title"/></p>
            <p><textarea name="body" placeholder="body"></textarea></p>
            <p><input type="submit" value="create"/></p>
        </form>
    </article>
}

function Header(props) {
    console.log('props', props.title)
    return <header>
           <h1><a href="/" onClick={function (event) {
               event.preventDefault();
               props.onChangeMode();
           }}>{props.title}</a></h1>
           </header>
}

function Navigation (props) {
    const lis = []

    for(let i=0; i<props.topics.length; i++){
        let t = props.topics[i];
        lis.push(<li key={t.id}>
            <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
        }}> {t.title}</a></li>)
    }
    //this로 할 수는 없나요?

    return <nav>
          <ol>
              {lis}
          </ol>
        </nav>
}

function Article (props) {
    return <article>
          <h2>{props.title}</h2>
          {props.body}
        </article>
}

function App() {
    // const _mode = useState("welcome");
    // const mode = _mode[0];
    // const setMode = _mode[1];
    const [mode,setMode]=useState('welcome');
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
  const [topics,setTopics] = useState([
    {id:1, title:'html', body:'html is ...' },
    {id:2, title:'css', body:'css is ...' },
    {id:3, title:'javascript', body:'javascript is ...' }
    ]);

    let content = null;
    if (mode === 'welcome'){
        content = <Article title = "Welcome" body = "Hello, WEB"></Article>
    } else if(mode === 'read'){
        let title,body = null;

        for (let i=0; i<topics.length; i++){
            if(topics[i].id === id ){
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title ={title} body ={body}></Article>
    } else if (mode === 'CREATE'){
            content = <Create onCreate={(_title,_body)=>{
            const newTopic = {id: nextId , title: _title, body : _body}
            const newTopics = [...topics]
            newTopics.push(newTopic);
            setTopics(newTopics);
            setMode('read');
            setId(nextId);
            setNextId(nextId+1);
        }
        }></Create>
    }
  return (
      <div>
          <Header title = "WEB" onChangeMode={()=>{
              setMode('welcome');
          }}></Header>
            <Navigation topics = {topics} onChangeMode={(_id)=>{
              setMode('read');
              setId(_id);
            }}></Navigation>
          {content}
          <a href="/create" onClick={event =>{
              event.preventDefault();
              setMode('CREATE');
          } }>create</a>



      </div>
  );
}

export default App;