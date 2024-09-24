interface Breed {
    id: string;
    name: string;
    description: string;
}

interface CatApiResponse {
    id: string;
    url: string;
    breeds: Breed[];
}


export interface CatData { 
    id: string, 
    url: string, 
    width: number, 
    height: number 
};

export const getCat = async (catId: string): Promise<CatApiResponse | undefined> => {
    try{
        const response = await fetch(`https://api.thecatapi.com/v1/images/${catId}`, {
        headers: {
            'x-api-key': 'live_Ka5tWZF7c0Gm8UhINCls6XSG8wmnHHVyxF8gFnQcnXXl4zPTA8RZcAWSsnpCphEm'
        }
    });
    const data: CatApiResponse = await response.json();
    return data;
    }catch(error){
        console.error('Error fetching cat description:', error);
    }
}

export const getRandomCats = async (): Promise<CatData[]> => {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1', {
            headers: {
                'x-api-key': 'live_Ka5tWZF7c0Gm8UhINCls6XSG8wmnHHVyxF8gFnQcnXXl4zPTA8RZcAWSsnpCphEm'
            }
        });
        const data = await response.json();
        const catData = data as CatData[];
        return catData;
    } catch (error) {
        console.error('Error fetching cats:', error);
        return [];
    }
};