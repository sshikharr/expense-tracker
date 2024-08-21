import { ChangeEvent } from "react";
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"

interface AmountSelectorProps{
    amount: string,
    setAmount: (amount: string) => void
}

function AmountSelector({amount, setAmount}: AmountSelectorProps){

    return(
        <>
            <div className="flex flex-col gap-3">
                      <Label>Amount</Label>
                      <Input type="number" value={amount} placeholder="₹ 0.00" onChange={(e:ChangeEvent<HTMLInputElement>)=>setAmount(e.target.value)}></Input>
            </div>
        </>
    )
}

export default AmountSelector;