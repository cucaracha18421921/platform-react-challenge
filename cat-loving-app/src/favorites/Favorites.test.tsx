import { act, fireEvent, render, waitFor } from '@testing-library/react';
import * as MockedFavoritesService from '../services/favoritesService';
import Favorites from './Favorites';
import '@testing-library/jest-dom';

describe('Favorites', () => {
    
    const favoriteCatsMock = Array.from({ length: 10 }, (_, index) => ({
        id: `cat${index}`,
        image: {
            url: `cat_url_${index}`,
        },
    }));

    const removeFromFavoritesSpy = jest.spyOn(MockedFavoritesService, 'removeFromFavorites');
    const getAllFavoritesSpy = jest.spyOn(MockedFavoritesService, 'getAllFavorites');

    test('renders a list of favorite cats', async () => {
        const portalEl = document.createElement('div');
        portalEl.id = 'modal_root';
        document.body.appendChild(portalEl);

        getAllFavoritesSpy.mockImplementation(() => Promise.resolve(favoriteCatsMock));

        const {getByText, getAllByRole, getByTestId, debug} = render(<Favorites />);
        await waitFor(() => getByText('Favorites'));
        // debug();
        const allImages = getAllByRole('img');
        allImages.forEach((img, index) => {
            expect(img).toHaveAttribute('src',`cat_url_${index}`);
        });
        await act(async ()=>{
            fireEvent.click(allImages[0]);
        });
        const removeIcon = getByTestId('remove-favorite-icon');

        await act(async ()=>{
            fireEvent.click(removeIcon);
        });

        expect(removeFromFavoritesSpy).toHaveBeenCalledTimes(1);
        expect(getAllFavoritesSpy).toHaveBeenCalledTimes(2);
    });
});