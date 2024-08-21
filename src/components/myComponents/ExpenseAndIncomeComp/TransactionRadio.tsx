import { Label } from "../../ui/label"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"

interface TypeProps{
  setType: (type: string)=>void
}

function TransactionRadio({setType}: TypeProps){

    return(
        <>
            <Label>Transaction Type</Label>
                  <RadioGroup
                  
                   className="flex flex-row "
                   onValueChange={(value)=>{setType(value)}} >
                      <div className="flex items-center space-x-2 [&:has(:checked)]:border-gray-500 border-2 p-2 rounded-md">
                      <RadioGroupItem value="income" id="option-one" />
                        <Label htmlFor="income">Income</Label>
                      </div>
                      <div className="flex items-center space-x-2 border-2 p-2 rounded-md [&:has(:checked)]:border-gray-500">
                        <RadioGroupItem value="expense" id="option-two" />
                        <Label htmlFor="expense">Expense</Label>
                      </div>
                  </RadioGroup>
        </>
    )
}

export default TransactionRadio;