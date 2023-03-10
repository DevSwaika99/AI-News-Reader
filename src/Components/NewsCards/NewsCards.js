import React from 'react'
import useStyles from './style.js'
import NewsCard from '../NewsCard/NewsCard'
import { Grid, Grow, Typography } from '@material-ui/core';

const infoCards = [
    { color: '#00838f', title: 'AI Image Captioning', text: 'Caption an Image'},
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, NDTV, LiveMint, News18, Hindustan Times, Indian Express...', text: 'Give me the news from NDTV' },
  ];

const NewsCards = ({ results, activeArticle }) => {
    const classes = useStyles();

    if(!results.length) {
        return (
            <Grow in>
                <Grid className={classes.container} container alignContent='stretch' spacing={3}>
                {infoCards.map((infoCard) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                    <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                        <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                        {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
                        <Typography variant="h6" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
                    </div>
                    </Grid>
                ))}
                </Grid>
            </Grow>
        )

    }

  return (
    <Grow in>
        <Grid className={classes.container} container alignContent='stretch' spacing={3}>
            {results.map((result,i) => (
                <Grid item xs={12} sm={6} md ={4} lg={3} style={{ display: 'flex' }}>
                    <NewsCard result={result} activeArticle={ activeArticle } i={i}/>
                </Grid>
            ))}
        </Grid>
    </Grow>
  ) 
}

export default NewsCards;