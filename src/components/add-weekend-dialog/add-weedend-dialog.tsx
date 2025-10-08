import type { WeekendEvent } from "@/hooks/useAllWeekends";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getDateOptions } from "@/hooks/useDateOptions";
import { type Dispatch, type SetStateAction, useState } from "react";
import { DatePicker } from "../date-picker";

const AddWeekendDialog = ({
    toggleWeekend,
    events,
    isOpen,
    setIsOpen,
    username,
}: {
    toggleWeekend: (date: string) => void;
    events: WeekendEvent[];
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    username: string;
}) => {
  const dateOptions = getDateOptions(events, username);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  // console.log(selectedDate)
  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          setIsSelectOpen(false);
        }
        setIsOpen(open);
      }}
    >
        <DialogTrigger asChild>
          <Button className="fixed bottom-8 right-8 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 hover:shadow-3xl animate-pulse p-0">
            <Plus size={20} strokeWidth={3} />
          </Button>
        </DialogTrigger>
        <DialogContent 
          className="sm:max-w-md fade-in-up"
          onInteractOutside={(e) => {
            // Предотвращаем закрытие при клике на элементы DatePicker
            const target = e.target as HTMLElement;
            // console.log('onInteractOutside', target);
            e.preventDefault();
            if (target.closest('[data-radix-popper-content-wrapper]')) {
              alert('onInteractOutside');
              e.preventDefault();
            }
          }}
        >
          <DialogHeader className="text-center">
            <DialogTitle>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Выберите дату</h3>
            </DialogTitle>
            <DialogDescription className="text-slate-600 mt-2">
              Выберите дату для добавления выходного дня
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <DatePicker setSelectedDate={setSelectedDate} disabledDates={events.map((event) => new Date(event.date))} />
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={async () => {
                  if (selectedDate) {
                    await toggleWeekend(selectedDate);
                    setIsOpen(false);
                  }
                }}
                disabled={!selectedDate}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Добавить выходной
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  )
}

export {AddWeekendDialog};