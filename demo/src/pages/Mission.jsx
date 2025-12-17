import React, { useState } from 'react'
import Layout from '../components/Layout'
import MissionModal from '../components/MissionModal'
import '../styles/mission.css'

function Mission() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [checkedBoxes, setCheckedBoxes] = useState(new Set())
  const [selectedMission, setSelectedMission] = useState(null)

  const rightSidebarContent = (
    <>
      <div className="widget">
        <a href="#" className="widget__header widget__header--link">
          <h4 className="widget__title">ミッションカレンダー</h4>
          &gt;
        </a>
        <div className="widget__calendar">
          <img src="/images/mission/img_side_calender.svg" alt="" className="widget__calendar__icon" />
        </div>
      </div>

      <div className="widget">
        <header className="widget__header">
          <h4 className="widget__title">お気に入りミッション</h4>
          <a href="#" className="widget__link">もっと見る &gt;</a>
        </header>
        <ul className="widget-list">
          <li className="widget-list__item">
            <img src="/images/mission/pic_01.jpg" alt="" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">寝る前の「断スマ」！</p>
              <p className="widget-list__meta">2025/08/28</p>
            </div>
          </li>
          <li className="widget-list__item">
            <img src="/images/mission/pic_02.jpg" alt="" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">布団に入る前に5分の深呼吸</p>
              <p className="widget-list__meta">2025/08/28</p>
            </div>
          </li>
          <li className="widget-list__item">
            <img src="/images/mission/pic_05.jpg" alt="" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">食事は寝る3時間前まで</p>
              <p className="widget-list__meta">2025/08/28</p>
            </div>
          </li>
          <li className="widget-list__item">
            <img src="/images/mission/pic_03.jpg" alt="" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">朝、5分カーテンを開けよう</p>
              <p className="widget-list__meta">2025/08/28</p>
            </div>
          </li>
          <li className="widget-list__item">
            <img src="/images/mission/pic_04.jpg" alt="" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">一駅前から歩こう</p>
              <p className="widget-list__meta">2025/08/28</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="widget">
        <header className="widget__header">
          <h4 className="widget__title">新着ミッション</h4>
          <a href="#" className="widget__link">もっと見る &gt;</a>
        </header>
        <ul className="widget-list">
          <li className="widget-list__item">
            <img src="/images/mission/pic_05.jpg" alt="" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">食事は寝る3時間前まで</p>
              <p className="widget-list__meta">2025/08/28</p>
            </div>
          </li>
          <li className="widget-list__item">
            <img src="/images/mission/pic_03.jpg" alt="" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">朝、5分カーテンを開けよう</p>
              <p className="widget-list__meta">2025/08/28</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  )

  const missions = [
    {
      id: 1,
      title: '寝る2時間前スマホOFF宣言',
      image: '/images/mission/pic_01.jpg',
      description: '就寝2時間前にスマホやPCの画面を見るのをやめ、脳を休める習慣をつくるミッションです。'
    },
    {
      id: 2,
      title: '布団に入る前に5分の深呼吸',
      image: '/images/mission/pic_02.jpg',
      description: '就寝前に5分間の深呼吸を行い、副交感神経を優位にして眠りの質を高めます。'
    }
  ]

  const allMissions = [
    {
      id: 3,
      title: '朝、5分カーテンを開けよう',
      image: '/images/mission/pic_03.jpg',
      description: '起床後すぐにカーテンを開けて日光を浴び、体内時計をリセットします。'
    },
    {
      id: 4,
      title: '一駅前から歩こう',
      image: '/images/mission/pic_04.jpg',
      description: '通勤時に一駅前で降りて歩くことで、日常に無理なく運動を取り入れます。'
    },
    {
      id: 5,
      title: '食事は寝る3時間前まで',
      image: '/images/mission/pic_05.jpg',
      description: '就寝3時間前までに食事を終えることで、消化を促し睡眠の質を高めます。'
    },
    {
      id: 6,
      title: '日光に浴びよう',
      image: '/images/mission/pic_06.jpg',
      description: '日中に15分以上日光を浴びることで、体内時計とホルモンバランスを整えます。'
    },
    {
      id: 7,
      title: '果糖を中心に摂ろう',
      image: '/images/mission/pic_07.jpg',
      description: '甘味を摂る際は精製糖ではなく果物由来の糖を中心に選びます。'
    },
    {
      id: 8,
      title: '胃に負担が少ない食事',
      image: '/images/mission/pic_08.jpg',
      description: '脂っこい食事を控え、胃にやさしいメニューを意識して選びます。'
    }
  ]

  const allMissionCards = [...missions, ...allMissions]

  const handleCheckboxChange = (index, checked) => {
    const newCheckedBoxes = new Set(checkedBoxes)
    if (checked) {
      newCheckedBoxes.add(index)
      setSelectedMission(allMissionCards[index])
      setIsModalOpen(true)
    } else {
      newCheckedBoxes.delete(index)
      if (newCheckedBoxes.size === 0) {
        setIsModalOpen(false)
        setSelectedMission(null)
      }
    }
    setCheckedBoxes(newCheckedBoxes)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMission(null)
    setCheckedBoxes(new Set())
  }

  return (
    <Layout activeNav="mission" showRightSidebar={true} rightSidebarContent={rightSidebarContent}>
      <section className="content-section">
        <h2 className="content-section__title">挑戦中のミッションカード一覧</h2>
        <div className="mission-grid mission-grid--horizontal">
          {missions.map((mission, index) => (
            <div key={mission.id} className="mission-card__details">
              <h4 className="mission-card__subtitle">{mission.title}</h4>
              <img src={mission.image} alt="" className="mission-card__image" />
              <p className="mission-card__description">
                今夜、寝る30分前までにスマホやPC、テレビなどの画面を見るのをやめてみよう。
              </p>
              <div className="mission-card__achievement">
                <p>挑戦する</p>
                <label className="mission-card__toggle">
                  <input
                    type="checkbox"
                    className="open-modal-button-mission"
                    checked={checkedBoxes.has(index)}
                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="content-section__header">
          <h2 className="content-section__title">ミッションカード一覧</h2>
          <button className="filter-button">
            <span className="filter-button__text">カテゴリで並べる</span>
            <span className="filter-button__icon">+</span>
          </button>
        </div>
        <h3 className="category-title">睡眠改善</h3>
        <div className="mission-grid">
          {allMissions.map((mission, index) => (
            <div key={mission.id} className="mission-card__details">
              <h4 className="mission-card__subtitle">{mission.title}</h4>
              <img src={mission.image} alt="" className="mission-card__image" />
              <p className="mission-card__description">
                今夜、寝る30分前までにスマホやPC、テレビなどの画面を見るのをやめてみよう。
              </p>
              <div className="mission-card__achievement">
                <p>挑戦する</p>
                <label className="mission-card__toggle">
                  <input
                    type="checkbox"
                    className="open-modal-button-mission"
                    checked={checkedBoxes.has(index + missions.length)}
                    onChange={(e) => handleCheckboxChange(index + missions.length, e.target.checked)}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MissionModal isOpen={isModalOpen} onClose={handleCloseModal} mission={selectedMission} />
    </Layout>
  )
}

export default Mission

