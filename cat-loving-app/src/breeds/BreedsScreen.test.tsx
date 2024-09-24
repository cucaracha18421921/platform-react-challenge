import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as MockedBreedService from '../services/breedsService';
import BreedsScreen from './BreedsScreen';

describe('BreedsScreen', ()=>{
    test('test list of breeds is rendering successfully',async ()=>{
        jest.spyOn(MockedBreedService,'getAllBreeds').mockImplementation(()=>Promise.resolve([{
                id: '1',
                name:'name1',
                description:'name1Description',
                reference_image_id:'123',
            },
            {
                id:'2',
                name: 'name2',
                description: 'name2Description',
                reference_image_id: '1234'
            }
        ]));
        const {getByText} = render(<BreedsScreen/>);
        await waitFor(() => getByText('List of Cat Breeds'));
        const firstItem = getByText('name1');
        expect(firstItem).toBeInTheDocument();
        const secondItem = getByText('name2');
        expect(secondItem).toBeInTheDocument();
        
        expect(firstItem).toHaveAttribute('href','/breedDetail/1/123')
        expect(secondItem).toHaveAttribute('href','/breedDetail/2/1234')
    })
})