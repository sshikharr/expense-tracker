import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
}  from "../../ui/select"

import { Label } from "../../ui/label"

interface CategoryProps{
  category: string,
  setCategory: (category: string)=>void
}

function BudgetCategory({ setCategory }: CategoryProps){
    return(
        <>
                  <div className="flex flex-col gap-3">
                    <Label>Category</Label>
                    <Select onValueChange={(value)=>{
                        setCategory(value);
                    }}>
                        <SelectTrigger className="w-5/6">
                          <SelectValue placeholder="Select the category"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="bills">Bills</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="transportation">Transporatation</SelectItem>
                          <SelectItem value="miscellaneous">Misc.</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
          
        </>
    )
}

export default BudgetCategory;