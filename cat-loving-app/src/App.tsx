import React from 'react';
import GlobalStyle from './index.styles';
import { AppStyle, AppHeader } from './App.style';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CatDetail from './cats/CatDetail';
import BreedDetail from './breeds/BreedDetail';
import BreedsScreen from './breeds/BreedsScreen';
import Favorites from './favorites/Favorites';
import RandomCatsScreen from './cats/RandomCatsScreen';
import { styled } from 'styled-components';
import MainScreen from './mainScreen/MainScreen';

const NavSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const NavItem = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppStyle>
          <AppHeader>
            Cat Loving App
            <NavSection>
              <NavItem to="/breeds">Breeds</NavItem>
              <NavItem to="/cats">Cats</NavItem>
              <NavItem to="/favorites">Favorites</NavItem>
            </NavSection>
          </AppHeader>
          <Routes>
            <Route path="/" element={<MainScreen/>} />
            <Route path="/breeds" element={<BreedsScreen />} />
            <Route path="/cats" element={<RandomCatsScreen />} />
            <Route path="/catDetail/:catId" element={<CatDetail withModal={false}/>} />
            <Route path="/breedDetail/:breedId/:catId" element={<BreedDetail />} />
            <Route path="/favorites" element={<Favorites/>} />
          </Routes>
        </AppStyle>
      </BrowserRouter>
    </>
  );
}

export default App;
