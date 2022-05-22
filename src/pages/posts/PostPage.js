import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import AddCommentForm from "../comments/AddCommentForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";

function PostPage() {
    const {id} = useParams();
    const [post, setPost] = useState({ results: [] });


    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: []});

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }, {data: comments}] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`/comments/?posts=${id}`)
                ]);
                setPost({ results: [post] });
                setComments(comments);
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={10}>
        <Post {...post.results[0]} setPosts={setPost} postPage={true} />
        <Container className={appStyles.Content}>
        {currentUser ? (
        <AddCommentForm profile_id={currentUser.profile_id}
        profileImage={profile_image} post={id}
        setPost={setPost} setComments={setComments} />
        ) : comments.results.length ? (
          "Comments"
          ) : null}
          {comments.results.length ? (
            comments.results.map(comment => (
              <Comment key={comment.id} {...comment}
              setPost={setPost} setComments={setComments} />
            ))
          ) : currentUser ? (
            <span>There are no comments on this posts yet, be the first to add a comment!</span>
          ) : (
            <span>There are no comments on this post yet...</span>
          )
        }
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;