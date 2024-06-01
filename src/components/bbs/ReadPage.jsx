import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Button,
  Col,
  InputGroup,
  Row,
  Table,
  Card,
} from "react-bootstrap";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "../../firebaseInit";
const ReadPage = () => {
  const [post, setPost] = useState("");
  const { id } = useParams();
  //   console.log(id);
  const db = getFirestore(app);
  const loginEmail = sessionStorage.getItem("email");
  const { email, date, title, contents } = post;
  const callAPI = async () => {
    const res = await getDoc(doc(db, `posts/${id}`));
    console.log(res.data);
    setPost(res.data());
  };
  useEffect(() => {
    callAPI();
  }, []);
  return (
    <Row className="my-5 justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <h1>게시글 정보</h1>
        {loginEmail == email && (
          <div className="text-end mb-2">
            <Button variant="success" size="sm" className="me-2">
              수정
            </Button>
            <Button variant="danger" size="sm">
              삭제
            </Button>
          </div>
        )}
        <Card>
          <Card.Body>
            <h5>{title}</h5>
            <div className="text-muted">
              <span className="me-3"> {date}</span>
              <span>{email}</span>
            </div>
            <hr />
            <div style={{ whiteSpace: "pre-wrap" }}>{contents}</div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ReadPage;
