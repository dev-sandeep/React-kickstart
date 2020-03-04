import Axios from 'axios'
import UseBaseContext from './../ContextApi/UseBaseContext'

function UrlCall() {
    const {
        setData
    } = UseBaseContext();

    const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US';
    const HEADER_MENU = '&sort_by=$custom.desc&include_adult=false&include_video=false&page=1'
    let url = BASE_URL;
    getCall(url);

    function getCall(url) {
        return new Promise((resolve, reject) => {
            Axios.get(url).then((promise) => {
                resolve(promise.data);
            });
        })
    };
    // //rated; popularity; favorites; recommendations; watchlist
    function getCustomCall(menu = 'popularity') {
        let url = BASE_URL + HEADER_MENU.replace('$custom', menu);
        console.log(url);
        getCall(url).then((data) => {
            if (data && data.results) {
                // setShowMovies(data.results);
            }
        })
    }

    /* the first call which the system would do */
    function defaultCall() {
        return new Promise((resolve, reject) => {
            getCall(url).then((data) => {
                if (data && data.results) {
                    setData(data.results, "movies");
                    resolve(data.results);
                }
            })
        });
    }

    return {
        defaultCall,
        getCustomCall
    }
}

export default UrlCall;