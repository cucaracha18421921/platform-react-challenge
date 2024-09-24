import React, { useCallback, useEffect, useState } from 'react';
import CatImage from '../common/CatImage';
import RandomCatsTop from '../common/RandomCatsTop';
import { FavouriteCat, getAllFavorites, removeFromFavorites } from '../services/favoritesService';
import { styled } from 'styled-components';


const FavoritesContainer = styled.div`
    position: relative;
`;

const RemoveFavoritesIcon = styled.span`
    position: absolute;
    bottom: 0vh; 
    right: 0vw;
    fontSize: 1em;
    backgroundColor: rgba(255, 255, 255, 0.5);
    cursor: pointer;
`;

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<FavouriteCat[]>([]);
    const [imagesPerRow, setImagesPerRow] = useState(2);

    const fetchFavorites = useCallback(async () => {
        const data = await getAllFavorites();
        setFavorites(data);
    },[]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const handleRemoveFromFavorites = useCallback(async (id:string) => {
        removeFromFavorites(id);
    }, []);

    return (
        <div>
            <RandomCatsTop
                header="Favorites"
                imagesPerRow={imagesPerRow}
                setImagesPerRow={setImagesPerRow}
            />
            <FavoritesContainer>
                <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {favorites.map((favorite, index) => (
                        <CatImage 
                            key={index}
                            catUrl={favorite.image.url} 
                            catId={favorite.id} 
                            index={index} 
                            imagesPerRow={Math.min(imagesPerRow,favorites.length)}
                            icon = {<RemoveFavoritesIcon 
                                data-testid="remove-favorite-icon"
                                onClick={async () => {
                                    await handleRemoveFromFavorites(favorite.id);
                                    await fetchFavorites();
                                }}
                            >
                                &#128465;
                            </RemoveFavoritesIcon>}
                        />
                    ))}
                </ul>
            </FavoritesContainer>
        </div>
    );
};

export default Favorites;