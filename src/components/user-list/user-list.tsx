import { UsersIcon } from "lucide-react";

const UserList = ({
  rendersUsers,
}: {
  rendersUsers: () => React.ReactNode;
}) => {
  return (
    <div className="w-72 h-72 flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden fade-in-up">
      <div className="flex items-center gap-2 p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white shadow-sm">
        <UsersIcon className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-700">Пользователи</h3>
      </div>
      <div className="flex flex-col gap-3 p-4 overflow-auto">
        {rendersUsers()}
      </div>
    </div>
  );
};

export { UserList };
