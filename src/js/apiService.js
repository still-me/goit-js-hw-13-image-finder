import clientStorage from './services/clientStorage'
import STORAGE_KEY from './keys'
const API_KEY = '21079808-fc3c19baaaeb0df1cf39adfe9';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.pageNumber = 1;
    }

     async fetchPictures() {
    //   return  fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`)
    // .then(response => response.json())
    // .then(({hits}) => {
    //     this.incrementPage();
    //     return hits;
    // })

        const response = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`)
        
        if (!response.ok) {
            throw response
        };

        const {hits} = await response.json()
        this.incrementPage();
         return hits;
         
    }

    incrementPage() {
        this.pageNumber += 1;
        clientStorage.setItem(STORAGE_KEY.PAGE, this.pageNumber);
    }

    resetPage() {
        this.pageNumber = 1;
        clientStorage.clearStorage(STORAGE_KEY.PAGE);
    }
}


    
    