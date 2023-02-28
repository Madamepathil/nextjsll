import React from "react";
import StoreItems from "../data/items.json";
import { Col, Row, Card } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import { AiFillCaretDown } from "react-icons/ai";
const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {StoreItems.map((item) => (
          <Col>
            <StoreItem {...item} key={item.id} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
