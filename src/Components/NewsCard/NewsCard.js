import React, { useState,useEffect,createRef } from 'react'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style.js'

const NewsCard = ({ result: { description, pubDate, source_id, title, link, image_url },i ,activeArticle }) => {
    const classes = useStyles();
    const [elRefs,setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_,j)=> refs[j] || createRef()));
    }, []);

    useEffect(() => {
        if (i===activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle]);
        }
    }, [i, activeArticle, elRefs])

  return (
    <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle===i ? classes.activeCard : null)}>
        <CardActionArea href={link} target="_blank">
            <CardMedia className={classes.media} image={image_url || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'}/>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(pubDate)).toDateString()}</Typography>
                    <Typography variant='body2' color='textSecondary' component='h2'>{source_id}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p' >
                        { description }
                        {/* { description.substring(0, 250) } ...<a href={ link } target="_blank" rel="noreferrer">Read more</a> */}
                    </Typography>
                </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
            <Button size='small' color='primary'>Learn More</Button>
            <Typography variant='h5' color='textSecondary'>{i+1}</Typography>
        </CardActions>
    </Card>
  )
}

export default NewsCard;