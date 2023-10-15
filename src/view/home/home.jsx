import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/menu';

function Home() {
    
    return (
        <>
            <Navbar/>
            <h1>Home</h1>
            <h1>{useSelector( state => state.userEmail)}</h1>
            <h1>{useSelector( state => state.userLogged)}</h1>
        </>
    );
}

export default Home;
