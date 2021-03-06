import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ArticleCard from "../../../components/articleCard/articleCard";
import firebase from "../../../Config/firebase";
import "./main.css";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
const db = firebase.firestore();
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      articles: [],
    };
  }
  componentDidMount() {
    this.getMyArticles();
  }

  getMyArticles = () => {
    db.collection("Articles")
      .limit(5)
      .get()
      .then((docs) => {
        if (!docs.empty) {
          let allArticles = [];
          docs.forEach(function (doc) {
            const article = {
              id: doc.id,
              ...doc.data(),
            };
            allArticles.push(article);
          });
          this.setState(
            {
              articles: allArticles,
            },
            () => {
              this.setState({
                isLoader: true
              });
            }
          );
        }
      });
  };

  render() {
    return (
      <div>
        <div className="banner_bg">
          <Container>
            <Row>
              <Col sm="7">
                <Carousel className="carousel">
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://www.vietnambooking.com/wp-content/uploads/2017/01/du-lich-sai-gon-16-10-2017-1.jpg"
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="http://static.tapchitaichinh.vn/800x450/images/upload/duongthanhhai/05082020/15-dia-diem-du-lich-hot-nhat-viet-nam.jpg"
                      alt="Third slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="http://divui.com/blog/wp-content/uploads/2017/01/temple-of-literature-hanoi-vietnam-6-696x398.jpg"
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>

              <Col sm="5">
                <div className="slider_cont_section">
                 
                  <h3>Blog Du Lịch</h3>
                  <p>
                  Là một quốc gia với những bờ biển kì diệu, những khu rừng xanh mướt, những loại trái cây nhiệt đới tươi ngon cùng những con người địa phương thân thiện và lịch sử thú vị, Việt Nam chắc chắn nên nằm trong danh sách những điểm du lịch phải đặt chân đến trong đời của bạn
                  </p>
                  <div className="button-section">
                    <Link to="#">Read More</Link>
                    <Link to={{pathname: '/blog/contact'}}>Contact Us</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <h3 className="aboutUs">
          </h3>
          {this.state.isLoader
            ? this.state.articles.map((article, index) => {
                return <ArticleCard key={index} data={article} />;
              })
            : ""}
        </Container>
      </div>
    );
  }
}
