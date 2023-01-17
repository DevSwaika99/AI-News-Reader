import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './Components/NewsCards/NewsCards';
import useStyles from './style.js';
import wordsToNumbers from 'words-to-numbers';
import { Typography } from '@material-ui/core'

const alanKey = 'b74f364a493825a8ba9e127f2502e9e62e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(()=> {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, results, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(results);
                    setActiveArticle(-1);
                } else if(command==='highlight') {
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
                } else if(command==='open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const result = results[parsedNumber-1]
                    if (parsedNumber > 20) {
                        alanBtn().playText('Please try that again.')
                    } else if (result) {
                        alanBtn().playText('Opening...');
                        window.open(result.link, '_blank');
                        
                    }
                }
            }
        })
    }, [])

    return (
        <div>
            <Typography className={classes.title} gutterBottom variant='h2'><strong>AI News Reader</strong></Typography>
            <NewsCards results={ newsArticles } activeArticle={ activeArticle } />
        </div>
    );
}

export default App;