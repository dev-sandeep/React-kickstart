import React, { useEffect, useState } from 'react'
import UseBaseContext from './../ContextApi/UseBaseContext'
import UrlCall from '../ContextApi/UrlCall'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { limitString } from './../Utility/Utility'
import CardNews from './../Components/CardNews'
import { Container, Row, Col } from 'reactstrap';

/**
 * based on props.number decide which of the column to show
 * @param {} props 
 */
const CardColumn = (props)=>{
    return (<>
        {
            props.resources.map((data, i)=>(
                    <CardNews 
                        key={i}
                        className={i%3!=props.number?'hidden':''}//hiding based on condition
                        title={data.title}
                        description={data.description}
                        image={data.urlToImage}
                        url={data.url}
                        source={data.source.name}
                        time={data.publishedAt} />
            ))
        }
        </>);
}

function Home() {
    /* get the context instance */
    const { getData } = UseBaseContext();
    const { defaultCall, getSearchResult } = UrlCall();
    const [col1, setCol1] = useState([]);
    const [col2, setCol2] = useState([]);
    const [col3, setCol3] = useState([]);
    const [loader, setLoader] = useState(false);
    
    useEffect(()=>{
        let searchTerm = getData("search");
        setLoader(true);
        if(searchTerm.length == 0 || col1.length == 0){//load the data for the first time
            defaultCall().then((resp)=>{
                setColData(resp);
                setLoader(false);
            });
        }else if(searchTerm){
            getSearchResult(searchTerm).then((resp)=>{
                setColData(resp);
                setLoader(false);
            });
        }    
    }, [getData("search")]);

    //dividing the data in to 3 different columns
    const setColData = (data)=>{
        let arr1 = [], arr2 = [], arr3 = [];
        for(let i = 0; i < data.length; i++){
            if(i % 3 == 0){
                arr1.push(data[i])
            }else if(i % 3 == 1){
                arr2.push(data[i])
            }else{
                arr3.push(data[i])
            }
        }

        setCol1(arr1);
        setCol2(arr2);
        setCol3(arr3);
    }

    /* all of the maon content goes here  */
    return (
        <section className="home-page m-top-3">
            <div className={loader?'loader':'hidden'}>Loading...</div>
            <div className="row1 ov-y-hide">
                <div className="container">
                    <Container>
                        <Row>
                            <Col className={col1.length == 0 && !loader?'':'hidden'} lg={12} md={12} sm={12} xs={12}>
                                <div className="error-text">
                                    <span className="error-msg">No data found :/</span>
                                    <span className="desc">Try again with other keyword</span>
                                </div>
                            </Col>
                            
                            <Col lg={4} md={4} sm={6} xs={12}>
                                <CardColumn resources={col1} />
                            </Col>
                            <Col lg={4} md={4} sm={6} xs={12}>
                                <CardColumn resources={col2} />
                            </Col>
                            <Col lg={4} md={4} sm={6} xs={12}>
                                <CardColumn resources={col3} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    );
}

export default Home;