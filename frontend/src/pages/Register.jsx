import { useState } from "react"

export default function Register({ onRegisterSuccess, onLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()
    return (
        <div className="auth-page">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} name="name" onChange={e => setName(e.target.value)} />

                <input type="email" placeholder="Email" value={email} name="email" onChange={e => setEmail(e.target.value)} />

                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />

                {error && <p>{error}</p>}
                <button type="submit" disabled={loading}  >{loading ? "Registering..." : "Register"}</button>

                <p>Already have an account?
                    <button type="button" onClick={onLogin}>Login</button>
                </p>
            </form>
        </div>
    )
}