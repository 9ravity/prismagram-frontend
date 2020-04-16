import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
}); // Apollo configuration

// apollographql.com client 참고
/* apollo boost configuration options header에 token 보내기*/
