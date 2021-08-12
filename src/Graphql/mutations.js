import {gql} from '@apollo/client';

export const POST_JOB = gql `

mutation postJob($title:String!,$companyName:String!,$commitmentId:ID!,$locationNames:String!,$userEmail:String!,$description:String!,$applyUrl:String!) {

    postJob(input:{
        title:$title,
        companyName:$companyName,
        commitmentId:$commitmentId,
        locationNames:$locationNames,
        userEmail:$userEmail,
        description:$description,
        applyUrl:$applyUrl
        }){
        title
    }
}
`;