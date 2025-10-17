const UserListItem = ({
  user,
}: {
  user: { id: string; name: string; color: string };
}) => {
  return (
    <div
      key={user.id}
      className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
          style={{ backgroundColor: user.color }}
        >
          {user.name[0].toUpperCase()}
        </div>
        <span className="text-slate-700 font-medium">{user.name}</span>
      </div>
      <div
        className="w-12 h-4 rounded-full shadow-inner border-2 border-white"
        style={{ backgroundColor: user.color }}
      ></div>
    </div>
  );
};

export { UserListItem };
