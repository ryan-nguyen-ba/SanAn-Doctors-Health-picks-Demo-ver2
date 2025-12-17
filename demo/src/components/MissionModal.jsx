import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission.css'

function MissionModal({ isOpen, onClose }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div className={`mission-modal ${isOpen ? '' : 'mission-modal--hidden'}`}>
      <div className="mission-modal__overlay" onClick={onClose}></div>
      <div className="mission-modal__content">
        <button className="mission-modal__close-button" onClick={onClose}>
          &times;
        </button>

        <div className="mission-card__details">
          <h4 className="mission-card__subtitle">寝る2時間前スマホOFF宣言</h4>
          <img src="/images/mission/modal_pic_01.jpg" alt="" className="mission-card__image" />
          <p className="mission-card__description">
            今夜、寝る30分前までにスマホやPC、テレビなどの画面を見るのをやめてみよう。
          </p>
        </div>

        <p className="mission-modal__description">
          寝る30分前にスマホを見ないようにすると、脳がリラックスして寝つきが良くなり、睡眠の質が向上します。メラトニンの分泌も整い、朝の目覚めがスッキリしやすくなります。
        </p>

        <button
          className="mission-modal__button"
          onClick={() => {
            onClose()
            navigate('/home')
          }}
        >
          このミッションに挑戦する
        </button>

        <div className="mission-separator">
          <span className="mission-separator__text">ミッション内容</span>
          <ul className="mission-list">
            <li className="mission-list__item">
              <span className="mission-list__icon"></span>
              <span className="mission-list__text">就寝1時間前にスマホを別室に置く</span>
            </li>
            <li className="mission-list__item">
              <span className="mission-list__icon"></span>
              <span className="mission-list__text">夜21時以降は通知をオフにする</span>
            </li>
            <li className="mission-list__item">
              <span className="mission-list__icon"></span>
              <span className="mission-list__text">SNSや動画視聴アプリをタイマーで制限</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MissionModal

