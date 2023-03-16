type PodcastServerList = {
    "im:artist": Object<any>;
    "im:name": Object<any>;
    "im:image": Object<any>;
    summary: Object<any>;
    id: Object<any>;
};

type PodcastCard = {
    id: string;
    title: string;
    author: string;
    description: string;
    imgUrl: string;
};

export {PodcastServerList, PodcastCard}