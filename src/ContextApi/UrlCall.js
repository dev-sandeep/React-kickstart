import Axios from 'axios'
import UseBaseContext from './../ContextApi/UseBaseContext'

function UrlCall() {
    const {
        setData
    } = UseBaseContext();
    
    const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=gb&apiKey=0dc8ac7f0e564f7a98de3c56a0d9c640&country=gb';
    // const SEARCH_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=0dc8ac7f0e564f7a98de3c56a0d9c640&country=gb';

    let url = BASE_URL;
    getCall(url);

    function getCall(url) {
        return new Promise((resolve, reject) => {
            Axios.get(url).then((promise) => {
                resolve(promise.data);
            });
        })
    };

    function getSearchResult(search){
        let url = BASE_URL+'&q='+search;
        console.log(url);
        return new Promise((resolve, reject) => {
            getCall(url).then((data) => {
                if (data && data.articles) {
                    setData(data.articles, "news");
                    resolve(data.articles);
                }
            },(error)=>{
                reject(error);
            })
        });
    }

    /* the first call which the system would do */
    function defaultCall() {
        return new Promise((resolve, reject) => {
            getCall(BASE_URL).then((data) => {
                if (data && data.articles) {
                    setData(data.articles, "news");
                    resolve(data.articles);
                }
            },(error)=>{
                reject(error);
            })
        });
    }

    return {
        defaultCall,
        getSearchResult
    }
}

export default UrlCall;