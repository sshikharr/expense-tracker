import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"

interface DescriptionProps{
    setDescription: (description: string)=>void
}

function Description({setDescription}: DescriptionProps){
    return(
        <>
            <Label>Description</Label>
            <Textarea className="mt-4" onChange={(e)=>setDescription(e.target.value)}/>
        </>
    )
}

export default Description;