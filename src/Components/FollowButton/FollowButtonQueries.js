import { gql } from "apollo-boost";


//true | false
export const FOLLOW = gql`
    mutation follow($id:String!){
        follow(id:$id)
    }
`;

//true | false
export const UNFOLLOW = gql`
    mutation unfollow($id:String!){
        unfollow(id:$id)
    }
`;
