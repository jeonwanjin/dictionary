import DicList from "../components/dicList";
import DicSerch from "../components/dicSerch";

const Main = () => {
    return (
        <div className="main loaded">
            <DicSerch />
            <DicList />
        </div>
      );
}
 
export default Main;