import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CompanyModal from "../components/UI/CompanyModal";
import MovieList from "../components/UI/movieList";

const HomePage = () => {
  const history = useHistory();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function getData() {
      try{
        const response = await fetch("https://hoblist.com/api/movieList", {
        method: "POST",
        body: JSON.stringify({
          category: "movies",
          language: "kannada",
          genre: "all",
          sort: "voting",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFetchedData((prevData) => [...prevData, ...data.result]);
      }catch(err){
        alert('Something went wrong. Please try again later!');
      }
      
    }
    getData();
  }, []);

  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const showCompanyHandler = () => {
    setShowCompanyDetails(!showCompanyDetails);
  };
  const hideCompanyHandler = () => {
    setShowCompanyDetails(false);
  };

  const logoutHandler = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      {showCompanyDetails && <CompanyModal onClose={hideCompanyHandler} />}
      <div style={{ overflowX: "hidden" }}>
        <Row className="d-flex justify-between space-around py-1 px-1">
          <Col xs={3} className="text-start">
            <Button variant="primary" onClick={showCompanyHandler}>
              Company Info
            </Button>{" "}
          </Col>
          <Col xs={6} className="text-center mt-2">
            <h5>
              <i>Welcome to Hoblist!</i>
            </h5>
          </Col>
          <Col xs={3} className="d-flex align-items-center justify-content-end">
            <Button variant="danger" onClick={logoutHandler}>
              Logout
            </Button>{" "}
          </Col>
        </Row>
        <div
          style={{ border: "none", backgroundColor: "black", height: "1px" }}
        ></div>
      </div>
      <MovieList movies={fetchedData}/>
    </>
  );
};
export default HomePage;
