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

    type ImportRecipeTask {
        state: String!
        url: String!
        recipe: Recipe
    }

    type GroceryList {
        id: Int!
        date: String!
        name: String!
        items: [GroceryListItem!]!
    }

    type GroceryListItem {
        name: String!
        category: String!
        quantity: Float!
        unit: String
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
        recipes(teamId: Int!): [Recipe!]
    }

    type Mutation {
        importRecipe(teamId: Int!, url: String!): ImportRecipeTask!
        addRecipe(teamId: Int!, recipeId: Int!, date: String!): ScheduledRecipe!
        removeRecipe(id: Int!): Boolean!
        createGroceryList(teamId: Int!, date: String!): GroceryList!
    }
`;
