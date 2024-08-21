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

function IncomeCategory({category, setCategory}: CategoryProps){
    return(
        <>
            
                  <div className="flex flex-col gap-3">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={(value)=>setCategory(value)}>
                        <SelectTrigger className="w-5/6">
                          <SelectValue  placeholder="Select the category"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salary">Salary</SelectItem>
                          <SelectItem value="bonus">Bonus</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="freelancing">Freelancing</SelectItem>
                          <SelectItem value="internship">Internships</SelectItem>
                          <SelectItem value="other-incomes">Other Incomes</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
          
        </>
    )
}

export default IncomeCategory;