import { act, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import * as MockedCatService from '../services/catService';
import * as MockedFavoritesService from '../services/favoritesService';
import CatDetail from './CatDetail';

describe('CatDetail', () => {

    const getCatSpy = jest.spyOn(MockedCatService,'getCat');
    const saveToFavoritesSpy = jest.spyOn(MockedFavoritesService,'saveToFavorites');

    test('Test rendering a single Cat withoutModal',async ()=>{
        getCatSpy.mockImplementation(()=>Promise.resolve({
            breeds: [{
                description: 'breed1',
                id: 'breed1',
                name:'Persian'
            }],
            id:'cat1',
            url:'cat1_url'
        }));
        const {getByText, getByRole} = render(<CatDetail catId='123' imageUrl='url/123' withModal={false} />)
        await waitFor(() => getByText('Cat Detail'));
        
        const img = getByRole('img');
        expect(img).toHaveAttribute('src','cat1_url');
        expect(getByText('breed1')).toBeInTheDocument();
        expect(getByText('Persian')).toBeInTheDocument();
    });
    test('Test rendering a single Cat withModal',async ()=>{
        const portalEl = document.createElement('div');
            portalEl.id = 'modal_root';
            document.body.appendChild(portalEl);

        getCatSpy.mockImplementation(()=>Promise.resolve({
            breeds: [{
                description: 'breed1',
                id: 'breed1',
                name:'Persian'
            }],
            id:'cat1',
            url:'cat1_url'
        }));
        const {getByText} = render(<CatDetail catId='123' imageUrl='url/123' withModal={true} />)
        await waitFor(() => getByText('Learn more about the breeds of this cat'));

        expect(document.querySelector('#modal_root')).not.toBeNull();
        expect(getByText('breed1')).toBeInTheDocument();
    });

    test('Test rendering a single Cat withoutModal and a lengthy description',async ()=>{
        getCatSpy.mockImplementation(()=>Promise.resolve({
            breeds: [{
                description: 'breed1'.repeat(50),
                name: 'Persian',
                id: 'breed1'
            }],
            id:'cat1',
            url:'cat1_url'
        }));
        const {getByText} = render(<CatDetail catId='123' imageUrl='url/123' withModal={false} />);
        await waitFor(() => getByText('Cat Detail'));
        
        const readMoreButton = getByText('Read More');
        expect(getByText('breed1'.repeat(50).slice(0,150)+'...')).toBeInTheDocument();
        await act( async ()=>{
            fireEvent.click(readMoreButton);
        })
        expect(getByText('breed1'.repeat(50))).toBeInTheDocument();

        const readLessButton = getByText('Read Less');
        await act(async()=>{
            fireEvent.click(readLessButton);
        })
        expect(getByText('breed1'.repeat(50).slice(0,150)+'...')).toBeInTheDocument();
    });

    test('Test saving a cat to favourites',async ()=>{
        saveToFavoritesSpy.mockImplementation(()=>Promise.resolve(true));
        const savedToFavoritesSuccessMessage = 'Saved to favorites';
        const savedToFavoritesErrorMessage = 'Could not save to favorites';

        const {getByTestId, getByText, debug} = render(<CatDetail catId='123' imageUrl='url/123' withModal={false} />);
        await waitFor(() => getByText('Cat Detail'));
        const favIcon = getByTestId('add_to_favorites_icon');
        await act(async ()=>{
            fireEvent.click(favIcon);
        });
        expect(saveToFavoritesSpy).toHaveBeenCalledTimes(1);
        expect(getByText(savedToFavoritesSuccessMessage)).toBeInTheDocument();
        saveToFavoritesSpy.mockImplementation(()=>Promise.resolve(false));
        await act(async ()=>{
            fireEvent.click(favIcon);
        });
        expect(getByText(savedToFavoritesErrorMessage)).toBeInTheDocument();

    });
})