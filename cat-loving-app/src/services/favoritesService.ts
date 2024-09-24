

export interface FavouriteCat {
    id: string;
    image: {
        url: string;
    };
}

const saveToFavorites = async (catId: string): Promise<boolean> => {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/favourites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'live_Ka5tWZF7c0Gm8UhINCls6XSG8wmnHHVyxF8gFnQcnXXl4zPTA8RZcAWSsnpCphEm'
            },
            body: JSON.stringify({
                image_id: catId,
                sub_id: 'my-user-1234'
            })
        });
        if (response.ok) {
            console.log('Added to favorites!');
            return true;
        }
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return false;
    }
    return false;
}

const getAllFavorites = async ():Promise<FavouriteCat[]> => {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/favourites?sub_id=my-user-1234&order=desc', {
            headers: {
                'x-api-key': 'live_Ka5tWZF7c0Gm8UhINCls6XSG8wmnHHVyxF8gFnQcnXXl4zPTA8RZcAWSsnpCphEm'
            }
        });
        return await response.json() as FavouriteCat[];
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
}

const removeFromFavorites = async (id:string):Promise<boolean> => {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/favourites/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'live_Ka5tWZF7c0Gm8UhINCls6XSG8wmnHHVyxF8gFnQcnXXl4zPTA8RZcAWSsnpCphEm'
            }
        });
        if (response.ok) {
            console.log('Added to favorites!');
            return true;
        }
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return false;
    }
    return false;
};


export {
    saveToFavorites,
    getAllFavorites,
    removeFromFavorites
}