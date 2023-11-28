import { useState ,useRef,useContext } from "react";
import { DicContext } from "../App";

const DicItem = ({id, word,content,createDate,category}) => {
    const {onRemove,onEdit} = useContext(DicContext);
    const textEdit = useRef();
    const [isEdit,setIsEdit] = useState(false);
    const [editExplain, setEditExplain] = useState(content);
    const editFunc =()=>{
        setIsEdit(!isEdit);
    }
    const changeFunc = (e)=>{
        setEditExplain(e.target.value)
    }
    const removeFunc = () => {
        if(window.confirm(`${word}를 삭제 하시겠습니까?`)){
            onRemove(id);
        }
    }

    const cancelFunc = () => {
        if(window.confirm('취소 하시겠습니까?')){
            editFunc();
            setEditExplain(content);
        }
    }
    const saveFunc = () => {
        if(editExplain.length < 4){
            alert('설명글을 자세히 작성하세요')
            textEdit.current.focus();
        }
        onEdit(id, editExplain);
        editFunc()
    }


    return (  
        <div className="dicItem loaded">
           <h1>{word}</h1>
           <div>
                <dl>
                    <dt>  
                        <span className="cate_txt"> ({category})</span>
                        
                    </dt>
                    
                    <dd className="list_text">{
                    isEdit ?
                     <textarea className="fix_txt loaded" ref={textEdit} value={editExplain} onChange={changeFunc} />  :   content
                     }
                    </dd>
                    <dd className="save">
                        <span className="date">{createDate}</span>

                    {isEdit ? 
                    (<div>
                        <button className="save_icon" onClick={saveFunc}></button>
                        <button className="cancel_icon" onClick={cancelFunc}></button>
                    </div> 
                    )
                    :
                    (<div>
                        <button className="fix" onClick={editFunc}></button>
                        <button className="del" onClick={removeFunc}></button>
                    </div>)
                    }

                    </dd>
                </dl>

            
           </div>
        </div>
    );
}
 
export default DicItem;