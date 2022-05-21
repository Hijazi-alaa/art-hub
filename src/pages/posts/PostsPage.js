import React, { useEffect, useState } from "react";
import Post from "./Post";
import NoResults from "../../assets/no-results.jpg";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";

function PostsPage({message, filter= ""}) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();

    useEffect(() => {
        const fetcPosts = async () => {
            try {
                const {data} = await axiosReq.get(`/posts/?${filter}`)
                setPosts(data)
                setHasLoaded(true)
            } catch(err) {
                console.log(err)
            }
        }
        setHasLoaded(false);
        fetcPosts()
    }, [filter, pathname])
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={10}>
      {hasLoaded ? (
          <>
            {posts.results.length ? (
              posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default PostsPage;