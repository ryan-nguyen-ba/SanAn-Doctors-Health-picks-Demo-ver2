import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberEmail, setRememberEmail] = useState(false)
  const [role, setRole] = useState('employee') // 'provider', 'employee', 'hr'
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Navigate based on selected role
    if (role === 'provider') {
      navigate('/provider/dashboard')
    } else if (role === 'hr') {
      navigate('/hr/dashboard')
    } else {
      // Employee - navigate to questionnaire
      navigate('/questionnaire')
    }
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

          <div className="login-form__group">
            <label className="login-form__label" style={{ marginBottom: '12px', display: 'block', fontWeight: 'bold', fontSize: '14px' }}>
              ログインタイプ
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={role === 'employee'}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', color: '#333' }}>従業員</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <input
                  type="radio"
                  name="role"
                  value="provider"
                  checked={role === 'provider'}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', color: '#333' }}>提供者側</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <input
                  type="radio"
                  name="role"
                  value="hr"
                  checked={role === 'hr'}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', color: '#333' }}>人事管理者</span>
              </label>
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

