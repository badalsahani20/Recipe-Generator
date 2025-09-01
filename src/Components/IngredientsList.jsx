export default function IngredientsList(props) {

    const listItems = props.ingredients.map(ingredient => (
        <li key={ingredient}> {ingredient}</li>
    ))
    return (
        <section>
                <h2 className= 'ingredient-label'>Ingredients on hand: </h2>
                <ul className='ingredients-list' aria-live="polite">{listItems}</ul>
                {props.ingredients.length > 3 ?
                    <div className='get-recipe-container'>
                        <div className="ready">
                            <h3>Ready for a recipe?</h3>
                            <p className='para'>Generate a recipe from your list of ingredients</p>
                        </div>
                        <button onClick={props.getRecipe} className='recipe-btn'>Get a recipe</button>
                    </div>:null}
            </section>
    )
}