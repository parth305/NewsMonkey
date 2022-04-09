import React, { Component } from 'react'

export default function Newsitem (props) {
    let { title, description, imageUrl, key, newsurl, author, publishedAt ,source} = props
    return (
      <div className="card" style={{ width: "18rem" }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>
          {source}
        </span>
        <img src={imageUrl} className="card-img-top" alt="..." style={{ height: "150px" }} />
        <div className="card-body"  >
          <h5 className="card-title">{title.slice(0, 50)}...</h5>
          <p className="card-text">{description.slice(0, 90)}...</p>
          <p className="card-text"><small className="text-muted">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
          <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    )
}
