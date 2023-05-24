import styles from "./LoginScreen.module.css";

export function LoginScreen() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h1>Distributed Chat</h1>
        <form>
          <h2>Faça Login 👇</h2>

          <div className={styles.inputWrapper}>
            <label htmlFor="emailInput">Email</label>
            <input id="emailInput" type="email"></input>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="passwordInput">Senha</label>
            <input id="passwordInput" type="password"></input>
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
