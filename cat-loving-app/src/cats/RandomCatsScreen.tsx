import React, { useEffect, useState } from 'react';
import RandomCatsTop from '../common/RandomCatsTop';
import CatImage from '../common/CatImage';
import { getRandomCats, CatData } from '../services/catService';
import { styled } from 'styled-components';


const CatImageListContainer = styled.div`
    position: relative;
`;

const CatImageContainer = styled.ul`
    display: flex; 
    flex-wrap: wrap;
`;

const RandomCatsScreen: React.FC = () => {
    const [cats, setCats] = useState<CatData[]>([]);
    const [imagesPerRow, setImagesPerRow] = useState(2);

    useEffect(() => {
        const savedCats = localStorage.getItem('cats');
        if (savedCats) {
            setCats(JSON.parse(savedCats));
            return;
        }
    
    const fetchData = async () => {
        const cats = await getRandomCats();
        setCats(cats);
        localStorage.setItem('cats', JSON.stringify(cats));
    };
    fetchData();
    }, []);

    return (
        <div>
            <RandomCatsTop 
                header="Random Cats"
                imagesPerRow={imagesPerRow} 
                setImagesPerRow={setImagesPerRow}  
                getNewListOfCats={async ()=> {
                    localStorage.removeItem('cats');
                    const newCats = await getRandomCats();
                    setCats(newCats);
                    localStorage.setItem('cats', JSON.stringify(newCats));
                }}
            />
            <CatImageListContainer >
                <CatImageContainer>
                    {cats.map(({ url, id }, index) => (
                        <CatImage 
                            key={index}
                            catUrl={url}
                            catId={id} 
                            index={index} 
                            imagesPerRow={imagesPerRow}
                        />
                    ))}
                </CatImageContainer>
            </CatImageListContainer>
            <button onClick={async () => {
                const newCats = await getRandomCats();
                const allCats = [...cats, ...newCats];
                setCats(allCats);
                localStorage.setItem('cats', JSON.stringify(allCats));
            }}>More Cats Please...</button>
        </div>
    );
};

export default RandomCatsScreen;
