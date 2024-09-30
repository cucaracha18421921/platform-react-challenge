import { act, fireEvent, getAllByTestId, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import * as MockedCatService from '../services/catService';
import CatDetail from './CatDetail';
import RandomCatsScreen from './RandomCatsScreen';

// jest.clearAllMocks();

// const getRandomCatsMock = jest.spyOn(MockedCatService,'getRandomCats');

describe('RandomCatsScreen', () => {

    const catMock = Array.from({ length: 10 }, (_, index) => ({
        width: 500,
        height: 500,
        breeds: [{
            description: `breed${index}`,
            id: `breed${index}`,
            name: 'Persian'
        }],
        id: `cat${index}`,
        url: `cat${index}_url`
    }));

    afterEach(()=>{
        jest.clearAllMocks();
    })

    test('Test rendering a table with 10 results',async ()=>{
        
        jest.spyOn(MockedCatService,'getRandomCats').mockImplementation(()=>Promise.resolve(catMock));
        const {getByText, getAllByRole, debug, getAllByTestId} = render(<RandomCatsScreen />)
        await waitFor(() => getByText('More Cats Please...'));
        // debug();
        const allImages = getAllByRole('img');
        expect(allImages).toHaveLength(10);
        allImages.forEach((img, index) => {
            expect(img).toHaveAttribute('src',`cat${index}_url`);
        });

        const allLis = getAllByTestId("cat-image-container");
        allLis.forEach((li, index) => {
            expect(li).toHaveStyle("width: 50%; display: flex; justify-content: center; align-items: center;");
        });
    });

    test('test if New Cats are loaded when button is clicked', async () => {    
        jest.spyOn(MockedCatService,'getRandomCats').mockImplementation(()=>Promise.resolve(catMock));
        const {getByText, getAllByRole, debug, getAllByTestId} = render(<RandomCatsScreen />)
        await waitFor(() => getByText('More Cats Please...'));
        const button = getByText('Give me New Cats');
        await act(async ()=>{
            fireEvent.click(button);
        });
        expect(MockedCatService.getRandomCats).toHaveBeenCalledTimes(1);
        const allImages = getAllByRole('img');
        expect(allImages).toHaveLength(10);  
    });

    test('test if more Cats are loaded when button is clicked', async () => {    
        jest.spyOn(MockedCatService,'getRandomCats').mockImplementation(()=>Promise.resolve(catMock));
        const {getByText, getAllByRole, debug, getAllByTestId} = render(<RandomCatsScreen />)
        await waitFor(() => getByText('More Cats Please...'));
        const button = getByText('More Cats Please...');
        await act(async ()=>{
            fireEvent.click(button);
        });
        expect(MockedCatService.getRandomCats).toHaveBeenCalledTimes(1);
        const allImages = getAllByRole('img');
        expect(allImages).toHaveLength(20);  
    });

    test('test if cats are arranged in rows of 4', async () => {    
        jest.spyOn(MockedCatService,'getRandomCats').mockImplementation(()=>Promise.resolve(catMock));
        const {getByText, getAllByTestId, debug, getByTestId} = render(<RandomCatsScreen />)
        await waitFor(() => getByText('More Cats Please...'));
        const input = getByTestId('images-per-row');
        await act(async ()=>{
            fireEvent.input(input, {target: {value: 4}});
        });
        expect(input).toHaveValue(4);
        const allLis = getAllByTestId('cat-image-container');
        allLis.forEach((li, index) => {
            let computedStyle = getComputedStyle(li);
            var width = computedStyle.width;
            expect(width).toEqual("25%");
        });
    });
})