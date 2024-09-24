import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BreedDetails, getDataForBreed, getImagesForBreed } from '../services/breedsService';

interface BreedDetailProps {
    catId?: string;
    breedId?: string;
}


const BreedDetail: React.FC<BreedDetailProps> = () => {
    const navigate = useNavigate();
    const {breedId, catId} = useParams();
    const [breed, setBreed] = useState<BreedDetails | undefined>(undefined);
    const [breedImages, setBreedImages] = useState<string[]>([]);
    useEffect(() => {
        const fetchBreed = async () => {
            const data = await getDataForBreed(breedId);
            if(data){
                setBreed(data);
            }
        };

        const fetchImagesForBreed = async () => {
            const data = await getImagesForBreed(breedId);
            setBreedImages(data);
        }
        fetchBreed();
        fetchImagesForBreed();
    }, [breedId]);

    if (!breed) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{breed.name}</h1>
            <p>{breed.description}</p>
            <p>Origin: {breed.origin}</p>
            <p>Temperament: {breed.temperament}</p>
            <h2>Images</h2>
            <ul>
                {breedImages.map((image, index) => (
                    <li key={index}>
                        <img 
                            src={image} 
                            alt = {`Breed ${breed.name} ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} 
                            onClick = {() => {
                                navigate(`/catDetail/${catId}`);
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BreedDetail;