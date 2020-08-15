import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardImgOverlay, Button
  } from 'reactstrap';

import loadingImgSrc from '../Assets/loadingImg.gif'
import ImageContainer from '../Components/ImageComponent';

import Moment from 'react-moment';
import 'moment-timezone';

const CardNews = (props)=>{
    return (
        <section className="news-tile">
            <Card className="make-it-slow">
                {/* <CardImg top width="100%" src={loadingImgSrc} alt="Card image cap" /> */}
                <ImageContainer preload={loadingImgSrc} src={props.image} />
                
                <CardBody>
                    <CardTitle>{props.title}</CardTitle>
                    <CardText className="font-200">
                        <div className="since">
                            {props.source}
                            {' | '}
                            <Moment fromNow>{props.time}</Moment>    
                        </div>
                        {props.description}
                    </CardText>
                    <div className="text-right">
                        <a href={props.url} target="_blank">Read more</a>
                    </div>
                </CardBody>
            </Card>
        </section>
    );
}

export default CardNews;