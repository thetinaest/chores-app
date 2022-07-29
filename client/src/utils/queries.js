import { gql } from @apollo/client;

export const QUERY_PARENT = gql`
{
    parent {
        _id
        username
        children {
            _id
            username
           chores{
            _id
            name
            description
            complete
            allowance
           } 
        }
    }
}`

