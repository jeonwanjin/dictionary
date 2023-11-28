import React,{useContext} from "react";
import { DicContext } from "../App";
import useInput from '../hook/useInput';
import { Link } from "react-router-dom";

const DicWrite = () => {
    const [{word,content,category}, onChange,reset] = 
    useInput({
        word:'',
        content:'',
        category: ''
    })

    const {onCreate} = useContext(DicContext)
    const onCreateBTN=()=>{
        onCreate(word,content,category)
        alert("등록되었습니다.")
        reset()
    }
   
    return (  
        <div className="dicWrite">
            <div className="flex">
                <Link to="/"><div className='pv'></div></Link>
                <h1 className="write_title">새 단어 등록</h1>
                <button className="creatBTN" onClick={onCreateBTN}>+</button>
            </div>
            <div>
                <input type="text" placeholder="단어" name="word" value={word} onChange={onChange}></input>
            </div>
            <div>
                <textarea placeholder="설명글" name="content" value={content} onChange={onChange}></textarea>
            </div>
            <div className="flex">
                <span className="cate">분류:</span>
                <select name="category" value={category} onChange={onChange}  required="required">
                    <option value='none' hidden>html</option>
                    <option value={'html'}>html</option>
                    <option value={'css'}>css</option>
                    <option value={'js'}>JavaScript</option>
                    <option value={'node'}>node</option>
                    <option value={'react'}>react</option>
                </select>
            </div>
       
        </div>
    );
}
 
export default React.memo(DicWrite);