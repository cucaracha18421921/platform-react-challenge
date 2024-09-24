import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

import ReactDOM from 'react-dom';
import BreedDetail from './BreedDetail';
import { BreedDetails } from '../services/breedsService';
import * as MockedBreedService from '../services/breedsService';

describe('BreedDetail', () => {
    test('renders breedDetails Component', async () => {
        jest.spyOn(MockedBreedService, 'getDataForBreed').mockImplementation(() => Promise.resolve({
            name: 'Abyssinian',
            description: 'The Abyss',
            origin: 'Egypt',
            temperament: 'Active',
        }));
        jest.spyOn(MockedBreedService,'getImagesForBreed').mockImplementation(()=>Promise.resolve(['image1','image2','image3']))
            const {getByText, getAllByRole} =
            render(
                <MemoryRouter initialEntries={['/breedDetail/asd/asd']}>
                    <Routes>
                        <Route path="/breedDetail/:breedId/:catId" element={<BreedDetail />} />
                    </Routes>
                </MemoryRouter>
        );
        await waitFor(() => getByText('Images'));
        
        expect(getByText('Abyssinian')).toBeInTheDocument();
        expect(getByText('The Abyss')).toBeInTheDocument();
        expect(getByText('Origin: Egypt')).toBeInTheDocument();
        expect(getByText('Temperament: Active')).toBeInTheDocument();
        const images = getAllByRole('img');
        expect(images).toHaveLength(3);
        expect(images[0]).toHaveAttribute('src', 'image1');
        expect(images[1]).toHaveAttribute('src', 'image2');
        expect(images[2]).toHaveAttribute('src', 'image3');
    });

    test('BreedDetails has no breed', async () => {
        jest.spyOn(MockedBreedService, 'getDataForBreed').mockImplementation(() => Promise.resolve(undefined));
        const {getByText} =
            render(
                <MemoryRouter initialEntries={['/breedDetail/asd/asd']}>
                    <Routes>
                        <Route path="/breedDetail/:breedId/:catId" element={<BreedDetail />} />
                    </Routes>
                </MemoryRouter>
        );
        await waitFor(() => getByText('Loading...'));
    });
});