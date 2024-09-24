export interface Breed {
    id: string;
    name: string;
    description: string;
    reference_image_id: string;
}

export interface BreedDetails {
    name: string;
    description: string;
    origin: string;
    temperament: string;
}

const getAllBreeds = async ():Promise<Breed[]> => {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds', {
            headers: {
                'x-api-key': 'live_Ka5tWZF7c0Gm8UhINCls6XSG8wmnHHVyxF8gFnQcnXXl4zPTA8RZcAWSsnpCphEm'
            }
        });
        const data = await response.json();
        return data.map((breed: Breed) => ({
            id: breed.id,
            reference_image_id: breed.reference_image_id,
            name: breed.name
        }));
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
        return [];
    }
};

const getDataForBreed = async ( breedId?: string ):Promise<BreedDetails | undefined> => {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`, {
            headers: {
                'x-api-key': 'live_Ka5tWZF7c0Gm8UhINCls6XSG8wmnHHVyxF8gFnQcnXXl4zPTA8RZcAWSsnpCphEm'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching breed:', error);
    }
}

const getImagesForBreed = async (breedId?: string): Promise<string[]> => {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breedId}&limit=100`, {
            headers: {
                'x-api-key': 'live_Ka5tWZF7c0Gm8UhINCls6XSG8wmnHHVyxF8gFnQcnXXl4zPTA8RZcAWSsnpCphEm'
            }
        });
        const data = await response.json();
        return data.map((image: any) => image.url);
    } catch (error) {
        console.error('Error fetching images for breed:', error);
        return [];
    }
}

export {
    getAllBreeds,
    getDataForBreed,
    getImagesForBreed,
}