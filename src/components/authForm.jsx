import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AuthForm() {
  const { user, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (
      <div>
        <p>Logged in as {user.email}</p>
        <button onClick={signOut}>Log out</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login / Signup</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => signIn(email, password)}>Sign In</button>
      <button onClick={() => signUp(email, password)}>Sign Up</button>
    </div>
  );
}
