import axios from 'axios';

const Search = async (query) => {
    let url = `http://api.tvmaze.com/search/shows?q=${query}`;
    
    let response = await axios(url);

    return response.data;
}

export default Search;