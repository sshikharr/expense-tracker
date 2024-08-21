import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
}  from "../../ui/select"

import { Label } from "../../ui/label"

interface CategoryProps{
  category: string,
  setCategory: (category: string)=>void
}

function ExpenseCategory({ setCategory }: CategoryProps){
    return(
        <>
                  <div className="flex flex-col gap-3">
                    <Label>Category</Label>
                    <Select onValueChange={(value)=>{
                      if(value === "movies" || value === "live-shows" || value === "ott-subscriptions" || value === "other-entertainment"){
                        setCategory("entertainment");
                      }else if(value === "fuel" || value === "electricity-bill" || value === "water-bill" || value === "rent" || value==="mortgage" || value==="other-bill"){
                        setCategory("bills");
                      }else{
                        setCategory(value);
                      }
                    }}>
                        <SelectTrigger className="w-5/6">
                          <SelectValue placeholder="Select the category"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Entertainment</SelectLabel>
                              <SelectItem value="movies">Movies</SelectItem>
                              <SelectItem value="live-shows">Live Shows</SelectItem>
                              <SelectItem value="ott-subscriptions">OTT Subscriptions</SelectItem>
                              <SelectItem value="other-entertainment">Other Entertainment</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Bills</SelectLabel>
                              <SelectItem value="fuel">Fuel</SelectItem>
                              <SelectItem value="electricity-bill">Electricity Bill</SelectItem>
                              <SelectItem value="water-bill">Water Bill</SelectItem>
                              <SelectItem value="rent">Rent</SelectItem>
                              <SelectItem value="mortgage">Mortgage</SelectItem>
                              <SelectItem value="other-bill">Other Bill</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Others</SelectLabel>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="medical">Medical</SelectItem>
                              <SelectItem value="transportation">Transportation</SelectItem>
                              <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                    </Select>
                  </div>
          
        </>
    )
}

export default ExpenseCategory;