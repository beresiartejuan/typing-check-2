import { useEffect, useState } from "react";
import getRandomElement from "../helpers/getRandomElement";

interface tweet_api_response {
    author: string;
    tweet: string;
    title: string;
}

export default function useTweet(): PhraseInterface {

    const [tweet, setTweet] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [authors, setAuthors] = useState<string[]>([]);

    const getTweets = async (): Promise<tweet_api_response[]> => {

        setIsLoading(true);

        const response = await fetch("/tweets.json");
        const tweets: tweet_api_response[] = await response.json();

        return tweets;

    };

    const parseTweets = (tweets: tweet_api_response[]): string => {

        let tweet1 = getRandomElement<tweet_api_response>(tweets);
        let tweet2 = getRandomElement<tweet_api_response>(tweets);

        setAuthors([tweet1.author, tweet2.author]);

        return `${tweet1.tweet} ${tweet2.tweet}`;

    }

    const reload = () => {
        setTweet("");
    }

    useEffect(() => {

        if (tweet !== "") return;

        getTweets()
            .then(tweets => setTweet(parseTweets(tweets)))
            .catch(err => {
                console.log(err);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [tweet]);

    return [tweet, authors, { isLoading, isError, reload }];

}