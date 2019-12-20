# Purpose
A ligthweight, recipe database with a web front end intended for use at home to curate and organize recipes. The app includes a controlled-vocabulary search capability, as well as keyword search functionality. Using a REST API design the user can in addition to searching, add, edit recipes, and delete. 

The front-end code is written as a series of React components that format and send the API calls to a Mongodb via a server using Express. The  queries are passed to the controller that evaluates the search parameters using filter and regular expression.  


## Features
- CRUD capabilities
- Search capabilities (controlled vocabulary and keyword) using RegEx
- Create form components with React (including select, checkboxes, text area)
- React Router to setup routes.
- Redirect Component to redirect after submitting the add/update form.



## Technologies Used
- React
- Express
- Mongodb

## Wireframes
Inline-style: 
![alt text](https://github.com/pamkadams/recip2K/blob/master/add_wireframe.png)
![alt text](https://github.com/pamkadams/recip2K/blob/master/view_wireframe.png)
![alt text](https://github.com/pamkadams/recip2K/blob/master/search_wireframe.png)

## Data Model

![alt text](https://github.com/pamkadams/recip2K/blob/master/Screen%20Shot%202019-12-10%20at%208.00.54%20PM.png)

## Search
Formatting the search string: 

```
  async searchKeyword(event) {
    event.preventDefault();
    let searchStringArray = [];
    let tagString = "";
    if (this.state.category.length > 0)
      searchStringArray = [`category=${this.state.category}`];
    if (this.state.keyword && searchStringArray.length > 0)
      searchStringArray = [...searchStringArray, "&keyword="];
    if (this.state.keyword && searchStringArray.length === 0)
      searchStringArray = [...searchStringArray, "keyword="];
    if (this.state.keyword.length > 0)
      searchStringArray = [...searchStringArray, this.state.keyword];
    let str = searchStringArray.join("");
    if (this.state.tags.length > 0 && str.length > 0) tagString = "&tags=";
    if (this.state.tags.length > 0 && str.length === 0) tagString = "tags=";
    if (this.state.tags.length > 0) {
      this.state.tags.map(tag => {
        tagString += `${tag},`;
      });
      str += tagString.substring(0, tagString.length - 1);
    }

    await this.setState({ searchString: str });
       const recipeData = await axios.get(
      `${baseURL}/recipes/search?${this.state.searchString}`
    );
```
The query is then evaluted in the controller:
```
recipes.get("/search", (req, res) => {
  //variables for query including RegEx for keyword
  console.log("query", req.query);
  const category = req.query.category;
  const searchTags = req.query.tags;
  const keyword = new RegExp(`${req.query.keyword}`, "i", "g");

  //search all recipes in db
  Recipe.find({}, (err, foundRecipes) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    let newArray = foundRecipes;
    //filter all recipes by category and then by tags
    if (category)
      newArray = foundRecipes.filter(recipe => recipe.category === category);

    //filter by tag no category

    if (searchTags) {
      newArray = newArray.filter(recipe => {
        const tags = recipe.tags;
        return tags.some(tag => searchTags.includes(tag));
      });
    }

    if (req.query.keyword) {
      //const regexString = new RegExp(`${keyword}`, "i", "g");
      newArray = foundRecipes.filter(
        recipe =>
          recipe.recipeName.match(keyword) ||
          recipe.ingredients.match(keyword) ||
          recipe.category.match(keyword) ||
          recipe.instructions.match(keyword)
      );
    }

    res.status(200).json(newArray);
  });
});
```

## Sources
There were a lot of form tutorials out there that I reviewed. These [components](https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y#comments-iz3eyoq4y) were used as the starting point. 

Bootstrap for CSS

Nice [article](https://medium.com/@anneeb/redirecting-in-react-4de5e517354a) on Redirect React component

## Links to live site
[Recip2K](http://recip2k.surge.sh/)
[database](https://recip2k.herokuapp.com/recipes)




