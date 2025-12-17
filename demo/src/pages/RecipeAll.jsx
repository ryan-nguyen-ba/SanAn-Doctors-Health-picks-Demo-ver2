import React, { useState } from 'react'
import Layout from '../components/Layout'
import '../styles/recipe_all.css'

function RecipeAll() {
  const [activeTab, setActiveTab] = useState('総合')

  const tabs = [
    { key: '総合', label: '総合' },
    { key: '睡眠改善', label: '睡眠改善' },
    { key: '疲労改善', label: '疲労改善' },
    { key: '代謝改善', label: '代謝改善' },
    { key: '便通改善', label: '便通改善' }
  ]

  const myRecipes = [
    { id: 1, image: '/images/recipe_all/recipe_all_my_01.svg' },
    { id: 2, image: '/images/recipe_all/recipe_all_my_02.svg' }
  ]

  const miniMissions = [
    { id: 1, image: '/images/recipe_all/recipe_all_mini_01.svg' },
    { id: 2, image: '/images/recipe_all/recipe_all_mini_02.svg' },
    { id: 3, image: '/images/recipe_all/recipe_all_mini_03.svg' },
    { id: 4, image: '/images/recipe_all/recipe_all_mini_04.svg' }
  ]

  const allRecipes = [
    { id: 1, image: '/images/recipe_all/recipe_all_list_01.svg' },
    { id: 2, image: '/images/recipe_all/recipe_all_list_02.svg' },
    { id: 3, image: '/images/recipe_all/recipe_all_list_03.svg' },
    { id: 4, image: '/images/recipe_all/recipe_all_list_04.svg' },
    { id: 5, image: '/images/recipe_all/recipe_all_list_05.svg' },
    { id: 6, image: '/images/recipe_all/recipe_all_list_06.svg' }
  ]

  const favoriteRecipes = [
    {
      id: 1,
      name: '睡眠の質 改善チャレンジ',
      date: '2025/08/28',
      image: '/images/questionnaire/pic_modal_01.jpg'
    },
    {
      id: 2,
      name: '疲労 改善チャレンジ',
      date: '2025/08/28',
      image: '/images/questionnaire/pic_modal_02.jpg'
    },
    {
      id: 3,
      name: 'カラダの代謝 改善チャレンジ',
      date: '2025/08/28',
      image: '/images/questionnaire/pic_modal_03.jpg'
    },
    {
      id: 4,
      name: '腸内環境 改善チャレンジ',
      date: '2025/08/28',
      image: '/images/questionnaire/pic_modal_04.jpg'
    }
  ]

  const newRecipes = [
    {
      id: 1,
      name: '睡眠の質 改善チャレンジ',
      date: '2025/08/28',
      image: '/images/questionnaire/pic_modal_01.jpg'
    },
    {
      id: 2,
      name: '疲労 改善チャレンジ',
      date: '2025/08/28',
      image: '/images/questionnaire/pic_modal_02.jpg'
    }
  ]

  const rightSidebarContent = (
    <>
      <div className="widget">
        <header className="widget__header">
          <h4 className="widget__title">お気に入りレシピ</h4>
          <a href="#" className="widget__link">もっと見る &gt;</a>
        </header>
        <ul className="widget-list">
          {favoriteRecipes.map((recipe) => (
            <li key={recipe.id} className="widget-list__item">
              <img src={recipe.image} alt="" className="widget-list__image" />
              <div className="widget-list__info">
                <p className="widget-list__name">{recipe.name}</p>
                <p className="widget-list__meta">{recipe.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="widget">
        <header className="widget__header">
          <h4 className="widget__title">新着レシピ</h4>
          <a href="#" className="widget__link">もっと見る &gt;</a>
        </header>
        <ul className="widget-list">
          {newRecipes.map((recipe) => (
            <li key={recipe.id} className="widget-list__item">
              <img src={recipe.image} alt="" className="widget-list__image" />
              <div className="widget-list__info">
                <p className="widget-list__name">{recipe.name}</p>
                <p className="widget-list__meta">{recipe.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )

  // Filter recipes based on active tab
  const getFilteredRecipes = () => {
    if (activeTab === '総合') return allRecipes
    // For demo, show different subsets based on tab
    if (activeTab === '睡眠改善') return allRecipes.slice(0, 2)
    if (activeTab === '疲労改善') return allRecipes.slice(1, 4)
    if (activeTab === '代謝改善') return allRecipes.slice(2, 5)
    if (activeTab === '便通改善') return allRecipes.slice(3, 6)
    return allRecipes
  }

  const filteredRecipes = getFilteredRecipes()

  return (
    <Layout activeNav="recipe" showRightSidebar={true} rightSidebarContent={rightSidebarContent}>
      {/* Header tabs */}
      <div className="recipe-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`recipe-tab ${activeTab === tab.key ? 'recipe-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="content-section">
        <h2 className="content-section__title">マイレシピ</h2>
        <div className="content-section__wrapper">
          {myRecipes.map((recipe) => (
            <div key={recipe.id} className="content-section__thumb">
              <img src={recipe.image} alt="" className="content-section__thumb__image" />
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2 className="content-section__title">マイミニミッション</h2>
        <div className="content-section__wrapper">
          {miniMissions.map((mission) => (
            <div key={mission.id} className="content-section__thumb">
              <img src={mission.image} alt="" className="content-section__thumb__image" />
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2 className="content-section__title">
          {activeTab === '総合' ? '全レシピ一覧' : `${activeTab}レシピ一覧`}
        </h2>
        <div className="content-section__wrapper">
          {filteredRecipes.slice(0, 3).map((recipe) => (
            <div key={recipe.id} className="content-section__thumb">
              <img src={recipe.image} alt="" className="content-section__thumb__image" />
            </div>
          ))}
        </div>
        {filteredRecipes.length > 3 && (
          <div className="content-section__wrapper">
            {filteredRecipes.slice(3, 6).map((recipe) => (
              <div key={recipe.id} className="content-section__thumb">
                <img src={recipe.image} alt="" className="content-section__thumb__image" />
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .recipe-tabs {
          display: flex;
          gap: 0;
          margin-bottom: 20px;
          border-bottom: 2px solid #e0e0e0;
          padding: 0 20px;
        }
        .recipe-tab {
          padding: 12px 24px;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
        }
        .recipe-tab:hover {
          color: #87581E;
        }
        .recipe-tab--active {
          color: #87581E;
          font-weight: bold;
        }
        .recipe-tab--active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: #FFCC00;
        }
      `}</style>
    </Layout>
  )
}

export default RecipeAll
