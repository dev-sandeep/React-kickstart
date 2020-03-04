import React, { useEffect, useState } from 'react'
import UseBaseContext from './../ContextApi/UseBaseContext'
import UrlCall from '../ContextApi/UrlCall'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { limitString } from './../Utility/Utility'
function Home() {
    /* get the context instance */
    const { getData } = UseBaseContext();
    const { defaultCall } = UrlCall();
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        defaultCall().then((resp)=>{
            setMovies(resp);
        });
    }, []);

    /* have the loop in the const */
    const loop = movies.map((singleData) => (
        <div className="col-lg-4 m-1-b" key={singleData.id.toString()}>
            <Card>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>{singleData.original_title}</Card.Title>
                    <Card.Text>
                        {limitString(singleData.overview, 100)}...
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    ));

    /* all of the maon content goes here  */
    return (
        <section className="home-page m-top-3">
            <div className="row1 ov-y-hide">
                <div className="container">
                    <div className="col-lg-12">
                        <div className="main-container">
                            Hello {getData("search")}

                            {/* lets loop things here */}
                           
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">

                            {/* lets loop things here */}
                            {loop}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;