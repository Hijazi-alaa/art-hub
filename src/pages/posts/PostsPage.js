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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMorePosts } from "../../utils/utils";

function PostsPage({message, filter= ""}) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
                const {data} = await axiosReq.get(`/posts/?${filter}search=${query}`)
                setPosts(data)
                setHasLoaded(true)
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1000)
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname]);
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={10}>
          <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`}></i>
        <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()} >
            <Form.Control value={query} onChange={(event) => setQuery(event.target.value)}
            type="text" className="mr-sm-2" placeholder="Search posts" />
        </Form>

      {hasLoaded ? (
          <>
            {posts.results.length ? (
                < InfiniteScroll children={
                    posts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setPosts} postPage={true}/>
                      ))
                }
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMorePosts(posts, setPosts)}
                />
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