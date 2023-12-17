// Write your code here
import {Component} from 'react'

import {FaStar} from 'react-icons/fa'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'
import SimiliarCard from '../SimilarProductItem'
import Header from '../Header'

import './index.css'

class ProductItemDetails extends Component {
  state = {ProductDetails: {}, count: 1, SimilarProduct: []}

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const UpdatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        price: data.price,
        description: data.description,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }

      const UpdatedSimiliarData = data.similar_products.map(each => ({
        id: each.id,
        imagUrl: each.image_url,
        title: each.title,
        style: each.style,
        price: each.price,
        description: each.description,
        brand: each.brand,
        totalReviews: each.total_reviews,
        Rating: each.rating,
        Availibility: each.availability,
      }))

      this.setState({
        ProductDetails: UpdatedData,
        SimilarProduct: UpdatedSimiliarData,
      })
    } else {
      console.error('Failed to fetch product details')
    }
  }

  add = () => {
    this.setState(prev => ({count: prev.count + 1}))
  }

  sub = () => {
    this.setState(prev => ({count: Math.max(prev.count - 1, 1)}))
  }

  render() {
    const {ProductDetails, count, SimilarProduct} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = ProductDetails

    return (
      <div className="main-container">
        <Header />
        <div className="small-container">
          <div className="img-url-design">
            <img src={imageUrl} className="image-height" />
          </div>
          <div className="Details-container">
            <h1>{title}</h1>
            <p className="rs-para"> Rs {price}/-</p>
            <div className="button-div">
              <button type="button" className="button">
                {rating}
                <FaStar className="fastar" />
              </button>
              <p className="total-review">{totalReviews} Reviews</p>
            </div>
            <p className="des">{description}</p>
            <p className="available-para">
              Available: <span className="span">{availability}</span>
            </p>
            <p className="available-para">
              Brand: <span className="span">{brand}</span>
            </p>
            <hr />
            <div className="bs-design">
              <BsPlusSquare onClick={this.add} />
              <p>{count}</p>
              <BsDashSquare onClick={this.sub} />
            </div>
            <button type="button" className="button2">
              Add to cart
            </button>
          </div>
        </div>
        <SimiliarCard SimilarData={SimilarProduct} />
      </div>
    )
  }
}

export default ProductItemDetails
