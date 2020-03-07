import { gql } from 'apollo-server';

export default gql`
    type Team {
        id: ID!
        name: String!
        members: [User!]!
        recipes: [Recipe!]!
        scheduledRecipes: [ScheduledRecipe!]!
        groceryLists: [GroceryList!]!
    }

    type User {
        id: ID!
    }

    type Recipe {
        id: ID!
        name: String!
        url: String!
        # Separate resolver for this
        # ingredients: [Ingredient!]!
    }

    type Ingredient {
        id: ID!
        name: String!
        quantity: Float!
        unit: String!
    }

    type ScheduledRecipe {
        id: ID!
        date: String!
        recipe: Recipe!
    }

    type GroceryList {
        id: ID!
        name: String!
        year: Int!
        week: Int!
        # Maybe a separate resolver for this
        items: String!
    }

    input ScheduledRecipesFilter {
        date: [String]
    }

    input ScheduledRecipesOptions {
        filter: ScheduledRecipesFilter
    }

    type Query {
        scheduledRecipes(teamId: Int!, options: ScheduledRecipesOptions): [ScheduledRecipe!]
    }
`;
