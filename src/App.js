import { Routes , Route } from 'react-router-dom';
import {useCallback, useMemo, useReducer ,useRef} from 'react';
import {createContext} from 'react';
import '../src/App.css';
import Main from './pages/main';
import Write from './pages/write';
import Header from './components/header';


export const DicStateContext = createContext(null);
export const DicContext = createContext(null);
// export const DicWriteContext =  createContext(null);

const initState = {
  inputs :{
    word : '',
    content: '',
    category:'html'
  },
  dics: [
    {
      id:1,
      word:'tag',
      content:"html 에 사용하는 약속된 용어들로 요소를 만들 때 사용",
      category:"html",
      createDate:'2023-09-14'
    },
    {
      id:2,
      word:'blackground',
      content:"요소의 배경색을 설정합니다.",
      category:"css",
      createDate:'2023-09-14'
    },
    {
      id:3,
      word:'getTime',
      content:"인스턴스 메서드는 UTC 1970년 1월 1일 초 자정으로 정의되는 qpochDate 이후 해당 날따의 밀리초 수를 반환합니다.",
      category:"js",
      createDate:'2023-09-14'
    },
    {
      id:4,
      word:'React',
      content:"React는 JSX(JavaScript와 XML)라는 HTML-in-JavaScript 문법을 사용합니다. HTML와 JavaScript에 익숙하다면 JSX를 배우는 것에 도움이 됩니다. 또한 애플리케이션에서 발생하는 버그가 JavaScript와 관련이 있는지 아니면 React의 구체적인 도메인과 관련이 있는지 수월하게 식별하는 것에 도움이 됩니다.",
      category:"react",
      createDate:'2023-09-14'
    },
    {
      id:5,
      word:'Ref',
      content:"React는 컴포넌트에 접근할 수 있는 특수한 어트리뷰트를 지원합니다. ref 어트리뷰트 React.createRef() 함수, 콜백 함수, 혹은 문자열(레거시 API에서)로 생성할 수 있습니다. ref 어트리뷰트가 콜백 함수인 경우, 함수는 DOM 엘리먼트나 class 인스턴스를 인자로 받습니다. 이를 통해 컴포넌트 인스턴스나 DOM 엘리먼트에 직접 접근할 수 있습니다.",
      category:"react",
      createDate:'2023-09-18'
    }
  ]
}

const reducer = (state , action) =>{
  switch(action.type){
    case "change" : {
      return {
        ...state,
        inputs:{
          ...state.inputs,
          [action.name]: action.value
        }
      }
    }
    case "create":{
      return {
        inputs : initState.inputs,
        dics: state.dics.concat(action.dic)
      }
    }
    case "edit":{
      return {
        ...state,
        dics: state.dics.map((item)=> item.id === action.id ?  {...item, content:action.content} : item)
      }
    }
    case "remove":{
      return{
        ...state,
        dics:state.dics.filter((item)=>item.id !== action.id)
      }
    }
    default  :
    return state;
  }
}

function App () {
  //비구조 할당  다음에 공부 할 것 
  const [state,dispatch] = useReducer(reducer, initState)
  const {dics} = state;

  const {word, content, category} = state.inputs;
  const userId = useRef(5);

  const onCreate = useCallback((word,content,category)=>{
    const createDate = new Date().toISOString().slice(0,10);
    dispatch({
      type:"create",
      dic:{
        word, content, category,createDate,
        id: userId.current
      }
     
    })      
    userId.current += 1;
  },[word,content,category])

  const onEdit = (id,content) => {
    dispatch({
      type:'edit',
      id,content
    })
  }
  const onRemove = (id) => {
    dispatch({
      type:'remove',
      id
    })
  }



  const memoizedDic = useMemo(()=>{
    return{
      onCreate,onEdit,onRemove
    }
  },[])
  return (
    <div className="App">
      <Header />
      <DicStateContext.Provider value={dics}>
         {/* list */}
        <DicContext.Provider value={memoizedDic}>
          {/* onCreate,onEdit,onRemove */}
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/write' element={<Write />}></Route>
          </Routes>
        </DicContext.Provider>
      </DicStateContext.Provider>
    </div>
  );
}

export default App;