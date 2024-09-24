import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
`;

const MainScreen: React.FC = () => {
  return (
    <Container>
      <Header>Welcome Cat Enthusiast</Header>
      <Paragraph>
        This is an application about Cats. In this Application you can <br/><br/>
        1. <a href="/cats">Browse through our Cat Selection</a><br/>
        2. <a href="/breeds">Browse through our Breed Selection</a><br/>
        3. <a href="/favorites">View your Favorites</a><br/><br/>
        Whenever you select a cat to check on detail you can always add it to your favorites 
        by clicking the little heart icon. Later on you can check this cat on your favorites section
      </Paragraph>
    </Container>
  );
};

export default MainScreen;