import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import './carousel.css';

class CustomCarousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }

  componentDidMount() {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/pictures/animal/${this.props.animalId}`)
      .then(response => {
        console.log(response)
        const { img_url, img_id, animal_id } = response
        const images = img_url
        this.setState({ images: response.data }) 
      })
  }

  render() {
    const customStyles = {
      carousel: {
        width: "90%",
        // maxWidth: "1000px",
        margin: "80px 0px 20px 20px",
      }

    }

    const { images } = this.state
    if (!images.length) return <div>Images are not fetched yet!</div>

    return (
      <GridContainer >
        <GridItem xs={8} sm={8} md={5} >
          <Carousel autoPlay infiniteLoop>
            {
              Array.from(images).map(image => {
                return (
                  <img src={ image.img_url } />
                  )
              })
            }
         </Carousel>
        </GridItem>
      </GridContainer>
    )
  }
}

export default CustomCarousel

