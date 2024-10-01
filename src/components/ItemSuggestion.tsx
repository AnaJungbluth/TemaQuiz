type ItemSuggestionProps = {
    name: string
}

export function ItemSuggestion({name}: ItemSuggestionProps){
    return(
        <button>{name}</button>
    )
}