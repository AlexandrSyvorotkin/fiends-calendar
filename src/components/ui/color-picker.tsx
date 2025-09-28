import { HexColorPicker } from "react-colorful"
import { Button } from "./button"
import { Popover, PopoverTrigger, PopoverContent } from "./popover"
import { useMemo, useState } from "react"

function ColorPicker({
  value,
  onChange,
  onBlur,
}: {
  value: string,
  onChange?: (color: string) => void,
  onBlur?: () => void
}) {
  const [open, setOpen] = useState(false)
  const parsedValue = useMemo(() => value || '#FFFF', [value])
  

  return (
    <Popover onOpenChange={newOpen => {
      setOpen(newOpen)
      if (!newOpen) onBlur?.()
    }}
    open={open}>
      <PopoverTrigger>
        <Button type="button" className='w-12 cursor-pointer' style={{ backgroundColor: parsedValue }}>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <HexColorPicker 
          color={parsedValue}
          onChange={onChange}
        />
      </PopoverContent>
    </Popover>
  )
}

export {ColorPicker} 