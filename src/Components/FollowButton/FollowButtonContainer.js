import React, {useState} from "react";
import PropTypes from "prop-types";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter"
import { useMutation } from "@apollo/react-hooks";

const FollowButtonContainer = ({isFollowing,id}) =>{
    /******state****** */
    const [isFollowingState, setIsFollowing] = useState(isFollowing); // useState에 default로 isFollowing을 넣기

    /***************** */
    
    const followMutation = useMutation(FOLLOW,{variables:{id}});
    const unFollowMutation = useMutation(UNFOLLOW,{variables:{id}});


    const onClick = () =>{
        if(isFollowingState === true) {
            setIsFollowing(false); // state와 prop을 가지고 가짜 UI 변경;
            unFollowMutation();
        }else{
            setIsFollowing(true);
            followMutation();
        }
    }

    return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingState}/>
}

FollowButtonContainer.propTypes ={
    isFollowing:PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
}

export default FollowButtonContainer;

// Follow 프로세스 
/*

    searchPresenter.js -> UserCard에서 user.id를 보냄 UserCard.js에서 id를 받아서 
    FollowButton(Folder)에서 id(userCard.id)를 넣어줌
    FollowButtonContainer.js ->id받아서

*/