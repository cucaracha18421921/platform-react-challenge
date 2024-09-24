
import React, { useState, useEffect, useCallback } from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { BsFillHeartFill } from 'react-icons/bs';
import { getCat } from '../services/catService';
import { saveToFavorites } from '../services/favoritesService';


interface CatDetailProps {
    imageUrl?: string;
    catId?: string;
    withModal?: boolean;
    favouriteIcon?: React.ReactNode;
}

interface Breed {
    id: string;
    name: string;
    description: string;
}

const FavouritesIcon = styled(BsFillHeartFill)`
    color: red;
    font-size: 24px;
    margin-top: 10px;
`;

const CatDetailContainer = styled.div<{ $withModal?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; // Center vertically
    position: relative;
    justify-content: center;
    padding: 20px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255);
    color: black;
    border-radius: 10px;
    width: 80%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    ${props => props.$withModal && `
        width: 50%;
        top: 25vh;
    `}
`;

const Image = styled.img`
    position: relative;
    max-width: 100%;
`;

const DescriptionStyled = styled.p`
    font-size: small;
`;

const Url = styled.a`
    color: blue;
    font-size: small;
`;

const BreedPresentationText = styled.p`
    font-size: small;
`;

const InformationText = styled.p`
    font-size: small;
`;

const BreedDetailUrl: React.FC<{ breed: Breed, catId: string }> = ({ breed, catId }) => {
    return (
        <Url href={`breedDetail/${breed.id}/${catId}`}>
            {breed.name}
        </Url>
    );
}

const CatDetail: React.FC<CatDetailProps> = ({ catId: id = '', imageUrl: url = '', withModal = true, favouriteIcon }) => {
    let {catId} = useParams();
    if(catId === undefined && id !== '' ) {
        catId = id;
    }
    
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>(url);
    const [showFullText, setShowFullText] = useState<boolean>(id === '');
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [showSucessMessage, setShowSucessMessage] = useState<boolean>(false);

    useEffect(() => {
        const fetchCatDescription = async () => {
                const data = await getCat(catId || '');
                if(!data) {
                    return;
                }
                setImageUrl(data.url);
                if(data.breeds.length > 0) { 
                    setDescription(data.breeds[0].description);
                    setBreeds(data.breeds);
                }else{
                    setDescription('No description available');
                }
        };

        fetchCatDescription();
    }, [catId]);

    const handleAddToFavorites = useCallback(async () => {
        const successFullySaved = await saveToFavorites(catId || '');
        if(successFullySaved) {
            setShowSucessMessage(true);
            setShowErrorMessage(false);
        }else{
            setShowErrorMessage(true);
            setShowSucessMessage(false);
        }
    }, [catId]);

    const renderText = () => {
        if (description.length <= 150) {
            return <DescriptionStyled>{description}</DescriptionStyled>;
        } else {
            if (showFullText) {
                return (
                    <>
                        <DescriptionStyled>{description}</DescriptionStyled>
                        { id!== '' && 
                            <button onClick={(evt) => {
                                evt.stopPropagation();
                                setShowFullText(false)
                            }}>Read Less</button>
                        }
                    </>
                );
            } else {
                return (
                    <>
                        <DescriptionStyled>{description.slice(0, 150)}...</DescriptionStyled>
                        { id!== '' && <button onClick={(evt) => {
                            evt.stopPropagation();
                            setShowFullText(true)
                        }}>Read More</button>
                        }
                    </>
                );
            }
        }
    };

    return (
        <CatDetailContainer $withModal={withModal} onClick={()=>{
            
        }}>
            {!withModal && <h1>Cat Detail</h1>}
            <Image src={imageUrl} alt="Cat" />
            {
                favouriteIcon || <FavouritesIcon data-testid='add_to_favorites_icon' onClick={async(evt) => {
                    evt.stopPropagation();
                    await handleAddToFavorites();
                }} />
            }
            {showErrorMessage && <InformationText>Could not save to favorites</InformationText>}
            {showSucessMessage && <InformationText>Saved to favorites</InformationText>}
            {renderText()}
            {withModal && breeds.length > 0 &&
                <BreedPresentationText>Learn more about the breeds of this cat</BreedPresentationText>
            }
            { id && breeds.length > 0 && 
                breeds.map((br)=> 
                    <BreedDetailUrl key={catId} breed={br} catId={catId || ''}/>)}
        </CatDetailContainer>
    );
};

export default CatDetail;