import React from 'react';
import { styled } from 'styled-components';

interface RandomCatsTopProps {
    imagesPerRow: number;
    header: string;
    setImagesPerRow: (value: number) => void;
    getNewListOfCats?: () => void;
}

const RandomCatsTopContainer = styled.div`
    position: relative;
    top: 0;
    width: auto;
    z-index: 1000;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const RandomCatsTop: React.FC<RandomCatsTopProps> = ({header, imagesPerRow, setImagesPerRow, getNewListOfCats = undefined }) => {
    return (
        <RandomCatsTopContainer>
            <h1>{header}</h1>
            <input
                type="number"
                data-testid="images-per-row"
                value={imagesPerRow}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                        setImagesPerRow(value);
                    }
                }}
            />
            { getNewListOfCats!==undefined && <button onClick={()=>{
                getNewListOfCats();
            }}>Give me New Cats</button>
        }
        </RandomCatsTopContainer>
    );
};

export default RandomCatsTop;