import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import usersData from '@/users'
import { useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";

type User = {
  id: number
  name: string
  password?: string
  email?: string
  color: string
}

const LoginPage = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const users: User[] = usersData as User[]
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const {setUser} = useUser()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = users.find((u) => u.name === name && u.password === password)
    if (found) {
      setUser({
        id: found.id,
        name: found.name,
        color: found.color
      })
      setError('')
      navigate('/calendar')
    } else {
      setError('Неверное имя или пароль')
    } 
  }

  return <div className="flex flex-col justify-center items-center min-h-screen p-4">
  <h1 className="text-2xl font-bold mb-4">Вход</h1>
  <Card className="min-w-80">
    <CardContent className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit" className="w-full">Войти</Button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </CardContent>
  </Card>
</div>;
};

export {LoginPage};