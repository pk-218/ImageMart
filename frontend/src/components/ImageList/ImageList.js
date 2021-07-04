import React, { Component } from "react";
import axios from "axios";
import Image from "./Image";
import { Button, Spinner } from "react-bootstrap";

class ImageLIst extends Component {
  state = {
    images: [],
    visible: 2,
    isLoading: true,
    newLoaded: false,
    status: false,
  };

  componentDidMount() {
    setTimeout(this.getImages, 1500);
  }

  getImages = () => {
    axios
      .get("http://127.0.0.1:8000/api/images/", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        this.setState({
          images: res.data,
          status: true,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ isLoading: false });
  };

  handleVisible = () => {
    const visible = this.state.visible;
    const newVisible = visible + 2;
    this.setState({ newLoaded: true });
    setTimeout(() => {
      this.setState({
        visible: newVisible,
        newLoaded: false,
      });
    }, 300);
  };
  render() {
    const images = this.state.images.slice(0, this.state.visible).map((img) => {
      return <Image key={img.id} pic={img.picture} name={img.classified} />;
    });
    return (
      <div>
        {this.state.isLoading ? (
          <Spinner animation="border" role="status" />
        ) : (
          <>
            {this.state.images.length === 0 && this.state.status && (
              <h3>No images classified</h3>
            )}
            {images}
            {this.state.newLoaded && (
              <Spinner animation="border" role="status"></Spinner>
            )}
            <br />
            {this.state.images.length > this.state.visible &&
              this.state.images.length > 2 && (
                <Button
                  className="mb-3"
                  variant="primary"
                  size="lg"
                  onClick={this.handleVisible}
                >
                  Load more
                </Button>
              )}
            {this.state.images.length <= this.state.visible &&
              this.state.images.length > 0 && (
                <h3 className="mb-3">No more images to load</h3>
              )}
          </>
        )}
      </div>
    );
  }
}

export default ImageLIst;
