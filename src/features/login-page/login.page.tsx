import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";
import { useUsers } from "@/hooks/useUsers";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";


const LoginPage = () => {
  const [name, setName] = useState('')
  
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {setUser} = useUser()
  const {getAllUsers} = useFirebaseUser()
  const {setUsers} = useUsers()

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers()
      console.log(users)
      setUsers(users)
    }
    fetchUsers()
  }, [])

  const users = useUsers(state => state.users);

  // console.log(users)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = users.find((u) => u.name === name)
    if (found) {
      // Сохраняем пользователя в localStorage с временной меткой
      localStorage.setItem('user', JSON.stringify({
        value: found,
        timestamp: Date.now()
      }))
      setUser({
        name: found.name,
        color: found.color,
        weekends: found.weekends
      })
      
      setError('')
      navigate('/calendar')
    } else {
      setError('Неверное имя или пароль')
    } 
  }

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col justify-center items-center p-4">
    <div className="w-full max-w-md flex flex-col items-center gap-4">
      <div className="text-center mb-8 fade-in-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          Добро пожаловать
        </h1>
        <p className="text-slate-600">Войдите в систему управления выходными</p>
      </div>
      
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm fade-in-up" style={{animationDelay: '0.2s'}}>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center gap-4">
            <div className="space-y-2 w-full">
              <label className="text-sm font-medium text-slate-700">Имя пользователя</label>
              <input
                type="text"
                placeholder="Введите ваше имя"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                autoFocus
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Войти
            </Button>
            
            {error && (
              <div className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
      <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/register')}>Зарегистрироваться</Button>
        </div>
    </div>
  </div>;
};

export {LoginPage};