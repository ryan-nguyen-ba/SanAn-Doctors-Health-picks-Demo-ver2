import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import '../styles/timeline.css'

function TimelineList() {
  const navTabs = [
    { label: '総合', path: '/timeline', active: false },
    { label: '睡眠改善', path: '/timeline', active: true },
    { label: '疲労改善', path: '/timeline', active: false },
    { label: '代謝改善', path: '/timeline', active: false },
    { label: '便通改善', path: '/timeline', active: false }
  ]

  const recipes = [
    { id: 1, image: '/images/timeline/timeline_list_01.svg' },
    { id: 2, image: '/images/timeline/timeline_list_02.svg' },
    { id: 3, image: '/images/timeline/timeline_list_03.svg' }
  ]

  const miniMissions = [
    { id: 1, image: '/images/timeline/timeline_list_thumb_01.svg' },
    { id: 2, image: '/images/timeline/timeline_list_thumb_02.svg' },
    { id: 3, image: '/images/timeline/timeline_list_thumb_03.svg' },
    { id: 4, image: '/images/timeline/timeline_list_thumb_04.svg' },
    { id: 5, image: '/images/timeline/timeline_list_thumb_01.svg' }
  ]

  return (
    <div className="container">
      <Header navItems={navTabs} />
      <Sidebar activeNav="recipe" />
      
      <div className="main-area timeline__list">
        <div className="article__title-group">
          <Link to="/challenge">
            <img src="/images/home/pic_mission_icon_01.jpg" alt="" className="article__icon" />
            <div className="article__title-group__inner">
              <div className="article__title-group__header">
                <h3 className="article__title">睡眠の質 改善チャレンジ</h3>
              </div>
              <div className="article__level">
                チャレンジレベル <span className="article__level__star">★★★☆☆</span>
              </div>
            </div>
          </Link>
        </div>

        <main className="main-content">
          <div>
            <h3 className="timeline__list__title">レシピ一覧</h3>
            <div className="timeline__body">
              {recipes.map((recipe) => (
                <img
                  key={recipe.id}
                  src={recipe.image}
                  alt=""
                  className="mb20"
                  style={{ display: 'block', marginBottom: '20px' }}
                />
              ))}
            </div>
          </div>
        </main>

        <h3 className="timeline__list__thumb__title">ミニミッション一覧</h3>
        <div className="timeline__list__thumb">
          {miniMissions.map((mission) => (
            <img key={mission.id} src={mission.image} alt="" />
          ))}
        </div>
      </div>

      <aside className="sidebar sidebar--right">
        <div className="side-card">
          <img src="/images/timeline/side_selected_challenge.svg" alt="" />
        </div>
        <div className="team-card">
          <a href="">
            <div className="team-card__avatars">
              <img src="/images/pic_team_avatar_01.jpg" alt="Team member 1" className="team-card__avatar" />
              <span className="team-card__text">睡眠専門家相談</span>
            </div>
            <p className="team-card__title">
              <img src="/images/icon_arrow_white.svg" alt="" className="nav__icon" />
            </p>
          </a>
        </div>
        <div className="side-card">
          <img src="/images/timeline/side_mission_check.svg" alt="" />
        </div>
        <div className="side-card">
          <a href="">
            <img src="/images/timeline/side_thumb_01_active.svg" alt="" />
          </a>
        </div>
        <div className="side-card">
          <a href="">
            <img src="/images/timeline/side_thumb_02.svg" alt="" />
          </a>
        </div>
        <div className="side-card">
          <a href="">
            <img src="/images/timeline/side_thumb_03.svg" alt="" />
          </a>
        </div>
      </aside>
    </div>
  )
}

export default TimelineList
