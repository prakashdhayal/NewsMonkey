import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    // articles=[
    //     {
    //         "source": {
    //             "id": "independent",
    //             "name": "Independent"
    //         },
    //         "author": "Shweta Sharma",
    //         "title": "Ashes score LIVE: England vs Australia cricket updates from first Test, day two",
    //         "description": "England take on Australia in the first Ashes Test in Brisbane",
    //         "url": "http://www.independent.co.uk/sport/cricket/ashes-live-stream-score-england-australia-b1972129.html",
    //         "urlToImage": "https://static.independent.co.uk/2021/12/08/14/PRI214059616.jpg?width=1200&auto=webp&quality=75",
    //         "publishedAt": "2021-12-09T04:18:46Z",
    //         "content": "Follow live coverage as England look to battle back against Australia in the first Ashes Test.\r\nJoe Roots side began their tour in disarray on day one at The Gabba, collapsing to 147 all out after op… [+2363 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt": "2020-04-27T11:41:47Z",
    //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //         "publishedAt": "2020-03-30T15:26:05Z",
    //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    // ]


    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const newsUpdate = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey `;
        newsUpdate();
        // eslint-disable-next-line
    }, [])
    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.newsUpdate();
    // }
    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.newsUpdate();
    // }
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    return (
        <>
            <h1 className="text-center" style={{ margin: "90px 0px 35px 0px" }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} HeadLines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0.40) : ""} desc={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={
                             this.state.page+1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
        </>
    )
}
News.defaultProps = {
    country: "in",
    pageSize: 15,
    category: "general",
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
