import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "../../../lib/utils"
import { Calendar } from "../../ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"
import { Label } from "../../ui/label"
import { Button } from "../../ui/button"

interface DateProps{
  date: Date | null,
  setDate: (date: Date | null) => void
}

function MyCalendar({date, setDate}: DateProps){
    // const selectRef = useRef<HTMLDivElement | null>(null);
    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate || null);
    };
    return(
        <>
            <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                    <div className="rounded-md border">
                      <Calendar mode="single" selected={date || undefined} onSelect={handleDateSelect} />
                    </div>
                  </PopoverContent>
                </Popover>
        </>
    )
}

export default MyCalendar