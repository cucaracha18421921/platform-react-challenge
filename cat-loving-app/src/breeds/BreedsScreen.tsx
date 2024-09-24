import React, { useEffect, useState } from 'react';
import { Breed, getAllBreeds } from '../services/breedsService';

const BreedsScreen: React.FC = () => {
    const [breeds, setBreeds] = useState<Breed[]>([]);

    useEffect(() => {
        const fetchBreeds = async () => {
            const breeds = await getAllBreeds();
            setBreeds(breeds);
        };
        fetchBreeds();
    }, []);

    return (
        <div>
            <h1>List of Cat Breeds</h1>
            <ul>
                {breeds.map((breed) => (
                    <li key={breed.id}>
                        <a href={`/breedDetail/${breed.id}/${breed.reference_image_id}`}>
                            {breed.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BreedsScreen;