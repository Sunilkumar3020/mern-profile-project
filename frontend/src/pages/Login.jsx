import { useState } from "react"

import { loginUser } from "../services/authApi.js"

export default function Login() {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            const data = await loginUser({ email, password })

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user))

            onLogin(data.user)

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                {error && <p>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>Don't have an accout ?</p>
            <button type="button" onClick={onRegister}>Register</button>
        </div>
    )
}