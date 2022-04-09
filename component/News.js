import React, { useState ,useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {
    

    let [article,setarticle]=useState([]);
    let [totalResults,settotalResults]=useState(0);
    let [page,setpage]=useState(1);
    let [loading,setloading]=useState(true);
    

    let fetchMoreData = async () => {
        console.log("hegasi");
        setloading(
             false
        )
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pagesize=${props.pagesize}&page=${page}`;
        let data = await fetch(url);
        let parseddata = await data.json();
        // console.log(parseddata);
        let temp=article.concat(parseddata.articles)
        setarticle(
            temp
        )
        setpage(page + 1)
        setloading(false)
        settotalResults(parseddata.totalResults)

        // console.log(parseddata);
    }
    let updatenews= async()=> {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pagesize=${props.pagesize}`;
            let data = await fetch(url);
            let parseddata = await data.json();
    
            setpage(page+1);
            setarticle( parseddata.articles)
            settotalResults(parseddata.totalResults)
            setloading(false)
    }

    useEffect(()=>{
        document.title = `NewsMonkey- ${props.category}`
        updatenews()},
        [])

        return (
            <>
                <h2 style={{ color: props.mode === "dark" ? "white" : "black", margin: "35px 0px",marginTop:"90px" }} className="text-center">NewsMonkey - quike news for you</h2>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={article.length}
                    next={fetchMoreData}
                    hasMore={article.length !==totalResults}
                    loader={<Spinner />}
                >
                    {
                        <div className='container my-3'>
                        <div className="row">
                            {article.map(Element => {
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

News.defaultProps = {
    country: "in",
    pagesize: 8,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    apikey:PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string

}