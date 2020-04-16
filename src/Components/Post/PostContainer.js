import React, { useState, useEffect } from "react";
import PostPresenter from "./PostPresenter";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { typeFromAST } from "graphql";
import { useQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";

//useEffect -> componentDidMount
const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location,
}) => {
  /* like */
  const [isLikedState, setIsLiked] = useState(isLiked); // useState() db데이터, default 셋팅
  const [likeCountState, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");

  /*****************Mutation********************** */
  const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });

  const addCoomentMutation = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });

  /*************************************** */
  // post 이미지 자동 슬라이드,
  const slide = () => {
    const totlaFiles = files.length;
    if (currnetItem === totlaFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };
  //componentDidMount = useEffect 같음
  useEffect(() => {
    slide();
  }, [currentItem]);
  console.log(currentItem);

  /**************************************** */

  // fake 토글 처리
  const toggleLike = async () => {
    await toggleLikeMutation();
    if (isLikedState === true) {
      setIsLiked(false);
      setLikeCount(likeCountState - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountState + 1);
    }
  };

  const onKeyPress = async (e) => {
    //console.log(e.keyCode);
    const { which } = e;
    //enter keycode 13
    if (which === 13) {
      e.preventDefault();
      try {
        const {
          data: { addComment },
        } = await addCoomentMutation();
        setSelfComments([...selfComments, addComment]);
        comment.setValue("");
      } catch (error) {
        toast.error("Can't send comment");
      }
    }
  };

  /**************************************** */

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountState}
      location={location}
      caption={caption}
      isLiked={isLikedState}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  ); // state에 연결되어 있는 likeCount를 postPresenter에 전달 index->postContainer.js>postPresenter.js
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default PostContainer;
