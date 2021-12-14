import React from 'react'

const NewsItem = (props) => {
    let { title, desc, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-3">
            <div className="card">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    right: '0',
                    position: 'absolute'
                }}>
                    <span className="badge rouded-pill bg-danger">
                        {source}
                    </span>
                </div>
                <img src={imageUrl ? imageUrl : "https://images.moneycontrol.com/static-mcnews/2021/08/cryptocurrency-770x433.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{desc}...</p>
                    <p className="card-text"><small className="text-muted">By- {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more...</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;
