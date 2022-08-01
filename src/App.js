import Error404 from 'containers/errors/Error404';
import Home from 'containers/pages/Home';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Blog from 'containers/pages/blog/Blog';
import BlogPost from 'containers/pages/blog/BlogPost';
import BlogCategory from 'containers/pages/blog/category/BlogCategory';
import Search from 'containers/pages/Search';
import Datasets from 'containers/pages/datasets/Datasets';
import Servicios from 'containers/pages/servicios/Servicios';
import Nosotros from 'containers/pages/nosotros/Nosotros';
import Contacto from 'containers/pages/contacto/Contacto';
import Connect from 'containers/pages/Connect';
import Privacy from 'containers/pages/Privacy';
import Terms from 'containers/pages/Terms';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route path="*" element={<Error404/>}/>

          {/* Home Display */}
          <Route path="/" element={<Home/>}/>

          <Route path="/blog" element={<Blog/>}/>
          <Route path="/blog/post/:slug" element={<BlogPost/>}/>
          <Route path="/blog/categories/:category_id" element={<BlogCategory/>}/>

          <Route path="/search/:term" element={<Search/>}/>

          <Route path="/datasets" element={<Datasets/>}/>
          <Route path="/servicios" element={<Servicios/>}/>
          <Route path="/nosotros" element={<Nosotros/>}/>
          <Route path="/contacto" element={<Contacto/>}/>
          <Route path="/connect" element={<Connect/>}/>
          <Route path="/privacidad" element={<Privacy/>}/>
          <Route path="/terminos" element={<Terms/>}/>

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
