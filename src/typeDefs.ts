import { gql } from 'apollo-server';

export default gql`
    type Team {
        id: Int!
        name: String!
        #members: [User!]!
        #recipes: [Recipe!]!
        #scheduledRecipes: [ScheduledRecipe!]!
        #groceryLists: [GroceryList!]!
    }

    type User {
        id: String!
    }

    type Recipe {
        id: Int!
        name: String!
        url: String!
        # Separate resolver for this
        # ingredients: [Ingredient!]!
    }

    type Ingredient {
        id: Int!
        name: String!
        quantity: Float!
        unit: String!
    }

    type ScheduledRecipe {
        id: Int!
        date: String!
        recipe: Recipe!
    }

    type GroceryList {
        id: Int!
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
        teams: [Team!]
        scheduledRecipes(teamId: Int!, options: ScheduledRecipesOptions): [ScheduledRecipe!]
    }
`;
