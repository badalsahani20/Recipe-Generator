import {useEffect, useState} from "react";
import IngredientsList from "./IngredientsList.jsx";
import ClaudeRecipe from "./ClaudeRecipe.jsx"
import {getRecipeFromMistral} from "../AI.js";


function Main() {

    const [darkMode,setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true";
    })

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const [loading, setLoading] = useState(false);


    const [ingredients, setIngredients] = useState([]);

    const [recipe, setRecipe] = useState("");

    async function getRecipe() {
        setLoading(true);
        setRecipe("");
        // setRecipeShown(prevState => !prevState);
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
        setLoading(false);
        }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim();
        if (!newIngredient) return;

        if (newIngredient.length < 3) {
            alert("Ingredient must be at least 3 characters long");
            return;
        }

        setIngredients(prevState => [...prevState, newIngredient]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        addIngredient(formData);
        e.currentTarget.reset(); // Optional: clears input after submitting
    }

    return (
        <>
            <footer>
                <button onClick={() => setDarkMode(prevMode => !prevMode)} className="toggle-mode-btn">{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}</button>
            </footer>
            <main>
                <form onSubmit={handleSubmit} className="add-ingredient-form">
                    <input
                        type="text"
                        name="ingredient"
                        placeholder="e.g. oregano"
                        aria-label="Add ingredient"/>

                    <button>Add ingredients</button>
                </form>


                {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />}
                {loading && <p className="loading-message">🧠 Chef Claude is thinking...</p>}
                {recipe && !loading && <ClaudeRecipe recipe={recipe} />}


            </main>
        </>
    )
}

export default Main