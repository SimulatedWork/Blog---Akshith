import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/footer';
import BlogPage from './components/blogPage';
import CreaterPage from './components/createrPage';
import AddPage from './components/addPage';

import { Route,Routes
} from 'react-router-dom';
function App() {
  return (
    <div className="App">
       <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blogPage' element={<BlogPage/>}/>
        <Route path='/createrPage' element={<CreaterPage/>}/>
        <Route path='/addPage' element={<AddPage/>}/>
       </Routes>
       <Footer/>
    </div>
  );
}

export default App;
