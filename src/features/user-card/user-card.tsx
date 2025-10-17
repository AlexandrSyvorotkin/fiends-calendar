	// import { Switch } from "@/components/ui/switch"
	// import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";

const UserCard = () => {
	const { user } = useUser();
	// const { theme, toggleTheme } = useTheme();

	return (
		
		<div className="inline-flex items-center gap-4 p-4 sm:p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20 w-full sm:w-auto">
		<div
			className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg"
			style={{ backgroundColor: user.color }}
		>
			{user.name.charAt(0).toUpperCase()}
		</div>
		<div>
			<h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
				Привет, {user.name}!
			</h1>
			<p className="text-slate-600 mt-1">Управляйте своими выходными</p>
		</div>

	</div>
	)
}

export { UserCard }