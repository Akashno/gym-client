import gql from 'graphql-tag'
const tet = gql`
query getAllClients {
  getAllClients{
    user{
      firstName
    }
  }
}`
export default tet