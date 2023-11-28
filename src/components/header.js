import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <h1 className='title'><Link to="/">Dictionary</Link></h1>
            <Link to="/write"><div className="list_icon"></div></Link>
        </div>
      );
}
 
export default Header;