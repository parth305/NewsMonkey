import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country: "in",
        pagesize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            totalResults: 0,
            page: 1,
            loading: true
        }

        document.title = `NewsMonkey- ${this.props.category}`
    }

    fetchMoreData = async () => {
        this.setState({
            loading: false
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0d52ad867b94a9e89044ed9d2c2541f&pagesize=${this.props.pagesize}&page=${this.state.page}`;
        let data = await fetch(url);
        let parseddata = await data.json();
        console.log(parseddata);
        this.setState({
            article: this.state.article.concat(parseddata.articles),
            page: this.state.page + 1,
            totalResults: parseddata.totalResults,
            loading: false
        })
        console.log(parseddata);
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0d52ad867b94a9e89044ed9d2c2541f&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parseddata = await data.json();
        this.setState({
            article: parseddata.articles,
            page: 1,
            totalResults: parseddata.totalResults,
            loading: false
        })
    }


    render() {
        return (
            <>
                <h2 style={{ color: this.props.mode === "dark" ? "white" : "black", margin: "35px 0px" }} className="text-center">NewsMonkey - quike news for you</h2>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    {
                        <div className='container my-3'>
                        <div className="row">
                            {this.state.article.map(Element => {
                                if (Element) {
                                    return (
                                        <div className="col-md-3 mx-5 my-3" key={Element.url}>
                                            <Newsitem title={Element.title ? Element.title : ""} description={Element.description ? Element.description : ""}
                                                imageUrl={Element.urlToImage ? Element.urlToImage :
                                                    "https://images.axios.com/KoWqRr8ysblxSoAmZ_QtIZdeqgA=/0x108:3000x1795/1366x768/2022/03/31/1648693812276.jpg"}
                                                newsurl={Element.url ? Element.url : "#"} author={Element.author ? Element.author : "Unknown"}
                                                publishedAt={Element.publishedAt} source={Element.source.name} />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    }
                </InfiniteScroll>
            </>
        )
    }
}
