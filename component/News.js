import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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
            api: {
                article: [],
                totalResults:0,
                page: 1
            },
            loading: false
        }
        
        document.title = `NewsMonkey- ${this.props.category}`
    }

    async componentDidMount() {
        this.setState({
            api:this.state.api,
            loading:true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0d52ad867b94a9e89044ed9d2c2541f&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parseddata = await data.json();
        this.setState({
            api:{
            article: parseddata.articles,
            page: 1
        },
        loading: false
        })
    }

    handlenext = async () => {
        this.setState({
            api:this.state.api,
            loading:true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0d52ad867b94a9e89044ed9d2c2541f&page=${this.state.api.page + 1}&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parseddata = await data.json();
        if (parseddata.totalResults === (this.state.api.page * this.props.pagesize + parseddata.articles.length)) {
            document.getElementById("next").disabled = true
        }
        this.setState({
            api:{
            article: parseddata.articles,
            page: this.state.api.page + 1,
            totalResults:parseddata.totalResults
        },
        loading: false
        })

    }
    handleprev = async () => {
        this.setState({
            api: this.state.api,
            loading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0d52ad867b94a9e89044ed9d2c2541f&page=${this.state.api.page - 1}&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parseddata = await data.json();
        this.setState({
            api: {
                article: parseddata.articles,
                page: this.state.api.page - 1,
                totalResults:parseddata.totalResults
            },
            loading: false
        })

        if (document.getElementById("next").disabled) {
            document.getElementById("next").disabled = false
        }

    }
    render() {
        return (
            <div className='container my-3'>
                <h2 style={{ color: this.props.mode === "dark" ? "white" : "black", margin: "35px 0px" }} className="text-center">NewsMonkey - quike news for you</h2>
                {this.state.loading && <Spinner/>}
                    {!this.state.loading &&
                        <div className="row">
                            {this.state.api.article.map(Element => {
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
                    }
                
                <div className="container d-flex justify-content-between my-3" >
                    <button type="button" disabled={this.state.api.page > 1 ? false : true} id="pre" className="btn btn-primary" onClick={this.handleprev}>{"<"} Previous</button>
                    <button type="button" id="next" className="btn btn-primary" onClick={this.handlenext} style={{ outline: "none" }}>Next {">"}</button>
                </div>
            </div>
        )
    }
}
