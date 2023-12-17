// Write your code here
import './index.css'

const SimiliarCard = props => {
  const {SimilarData} = props
  const {title, brand, imagUrl, Rating, price} = SimilarData

  return (
    <li className="product-item">
      <img src={imagUrl} alt="product" className="thumbnail" />
      <h1 className="title">{title}</h1>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="rating-container">
          <p className="rating">{Rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}
export default SimiliarCard
