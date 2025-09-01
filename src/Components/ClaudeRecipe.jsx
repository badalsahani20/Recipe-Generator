import ReactMarkdown from 'react-markdown'
export default function ClaudeRecipe(props) {
    return (
        <section className="claude-recipe-section" aria-live="polite">
            <div className="suggested-recipe-container">
                <h2>Mistral Chef Recommends: </h2>
                <ReactMarkdown>{props.recipe}</ReactMarkdown>
            </div>
        </section>
    )
}