import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberEmail, setRememberEmail] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Navigate to questionnaire after login
    navigate('/questionnaire')
  }

  return (
    <div className="login-page">
      <main className="login-form">
        <header className="login-form__header">
          <h1 className="login-form__logo">
            <img src="/images/logo.png" alt="Health Picks" />
          </h1>
          <h2 className="login-form__title">ログイン</h2>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="login-form__group">
            <input
              type="email"
              className="login-form__input"
              placeholder="メールアドレス"
              aria-label="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-form__group">
            <div className="login-form__password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-form__input"
                placeholder="パスワード"
                aria-label="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src="/images/icon_pw_eye.svg"
                alt=""
                className="login-form__toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className="login-form__options">
            <input
              type="checkbox"
              id="remember"
              className="login-form__checkbox"
              checked={rememberEmail}
              onChange={(e) => setRememberEmail(e.target.checked)}
            />
            <label htmlFor="remember" className="login-form__label">
              メールアドレスを保存する
            </label>
          </div>

          <div className="login-form__group">
            <button type="submit" className="login-form__button">
              ログインする
            </button>
          </div>
        </form>

        <footer className="login-form__footer">
          <p className="login-form__footer-text">
            パスワードをお忘れの方
            <a href="#" className="login-form__link">パスワード再設定</a>
          </p>
          <p className="login-form__footer-text">
            確認メールが届かない方
            <a href="#" className="login-form__link">メール再送信</a>
          </p>
        </footer>
      </main>
    </div>
  )
}

export default Login

