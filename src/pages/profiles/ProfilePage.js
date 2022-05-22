import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMorePosts } from "../../utils/utils";
import NoResults from "../../assets/no-results.jpg";
import { ProfileEditDropdown } from "../../components/OptionsDropdown";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);

  const {id} = useParams();
  const setProfileData = useSetProfileData()
  const {pageProfile} = useProfileData()
  const [profile] = pageProfile.results


  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
      const fetchData = async () => {
          try {
            const [{data: pageProfile}, { data: profilePosts }] = await Promise.all([
                axiosReq.get(`/profiles/${id}/`),
                axiosReq.get(`/posts/?owner__profile=${id}`),
            ])
            setProfileData(prevState => ({
                ...prevState,
                pageProfile: {results: [pageProfile]}
            }))
            setProfilePosts(profilePosts);
            setHasLoaded(true);
          } catch(err) {
            console.log(err)
          }
      }
      fetchData()
  }, [id, setProfileData]);

  const mainProfile = (
    <>
    {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image className={styles.ProfileImage}
          roundedCircle src={profile?.image} />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
               <Col xs={4} className="my-2">
                   <div>{profile?.posts_count}</div>
                   <div>Posts shared</div>
               </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">

        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <h3 className="text-center">{profile?.owner}'s posts</h3>
      <hr />
      {profilePosts.results.length ? (
          <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMorePosts(profilePosts, setProfilePosts)}
          />
      ) : (
          <Asset src={NoResults}
          message={` ${profile?.owner} has not share any posts yet.`}
          />
      ) }
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;