import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover"

export function DatePicker({ 
  setSelectedDate, 
  disabledDates 
}: { 
  setSelectedDate: (date: string) => void
  disabledDates?: Date[]
}) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  // console.log(date)

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Выберите дату"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            disabled={disabledDates}
            onSelect={(date) => {
              console.log(date)
              setDate(date)
              setOpen(false)
              const dateString = date ? 
                `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : ''
              setSelectedDate(dateString)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
