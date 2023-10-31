import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/footer';
import BlogPage from './components/blogPage';
import CreaterPage from './components/createrPage';
import AddPage from './components/addPage';
import ViewPage from './components/viewPage';
import LoginPage from './components/loginPage';
import { Route,Routes
} from 'react-router-dom';
function App() {
  return (
    <div>
    <div className="App">
       <Navbar/>
       {/* <BlogPage/> */}
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blogPage' element={<BlogPage/>}/>
        <Route path='/createrPage' element={<CreaterPage/>}/>
        <Route path='/addPage' element={<AddPage/>}/>
        <Route path='/viewPage/:id' element={<ViewPage/>}/>
        <Route path='/loginpage' element={<LoginPage/>}/>
       </Routes>
       <Footer/>
      
    </div>

     </div>
  );
}

export default App;
