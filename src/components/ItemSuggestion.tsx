import { ComponentProps } from "react"

type ItemSuggestionProps = ComponentProps<'button'> &{
    name: string
}

export function ItemSuggestion({name, ...props}: ItemSuggestionProps){
    return(
        <button {...props}>{name}</button>
    )
}