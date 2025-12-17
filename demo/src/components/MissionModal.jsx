import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission.css'

function MissionModal({ isOpen, onClose, mission }) {
  const navigate = useNavigate()

  if (!isOpen || !mission) return null

  return (
    <div className={`mission-modal ${isOpen ? '' : 'mission-modal--hidden'}`}>
      <div className="mission-modal__overlay" onClick={onClose}></div>
      <div className="mission-modal__content">
        <button className="mission-modal__close-button" onClick={onClose}>
          &times;
        </button>

        <div className="mission-card__details">
          <h4 className="mission-card__subtitle">{mission.title}</h4>
          <img src={mission.image} alt={mission.title} className="mission-card__image" />
          {mission.description && (
            <p className="mission-card__description">
              {mission.description}
            </p>
          )}
        </div>

        <p className="mission-modal__description">
          寝る前の習慣を少しずつ整えることで、睡眠の質や日中のコンディションが改善していきます。
          自分のペースで無理なく続けてみましょう。
        </p>

        <button
          className="mission-modal__button"
          onClick={() => {
            onClose()
            window.location.href = '/home'
          }}
        >
          このミッションに挑戦する
        </button>

        <div className="mission-separator">
          <span className="mission-separator__text">ミッション内容</span>
          <ul className="mission-list">
            <li className="mission-list__item">
              <span className="mission-list__icon"></span>
              <span className="mission-list__text">今日のミッションを完了したらチェックを入れてください。</span>
            </li>
            <li className="mission-list__item">
              <span className="mission-list__icon"></span>
              <span className="mission-list__text">無理のない範囲で、できることから始めましょう。</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MissionModal

