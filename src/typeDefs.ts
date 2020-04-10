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
        ingredients: [Ingredient!]!
    }

    type Ingredient {
        name: String!
        quantity: Float!
        unit: String
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

    type ImportRecipeTask {
        team: Team!
        state: String!
        url: String!
        recipe: Recipe
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

    type Mutation {
        importRecipe(teamId: Int!, url: String!): ImportRecipeTask!
    }
`;
