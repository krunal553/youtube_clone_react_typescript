import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import Menu from './components/menu/Menu';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Video from './pages/video/Video';
import Channel from './pages/channel/Channel';
import Playlist from './pages/playlist/Playlist';

type Props = {}

const App = (props: Props) => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Menu />
        <div className="main">
          <Navbar />
          <div className="wrapper">
            <Routes>
              <Route path='/'>
                <Route index element={<Home/>}/>
                <Route path='video'>
                  <Route path=':id' element={<Video/>}/>
                </Route>
                <Route path='channels'>
                  <Route path=':id' element={<Channel/>}/>
                </Route>
                <Route path='playlist'>
                  <Route path=':id' element={<Playlist/>}/>
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
};

export default App;