import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/challenge.css'

function Challenge() {
  const navigate = useNavigate()

  const challenges = [
    {
      id: 1,
      title: '睡眠の質 改善チャレンジ',
      level: '★★★★☆',
      description: '質の高い睡眠は、心身の健康に不可欠です。日中の疲労回復はもちろん、ストレス軽減、免疫力向上、記憶の定着を促します。結果的に集中力や判断力が高まり、仕事や学習の効率を向上させ、生活全体の質を高めるための重要な鍵となります。',
      image: '/images/questionnaire/pic_modal_01.jpg'
    },
    {
      id: 2,
      title: '疲労 改善チャレンジ',
      level: '★★☆☆☆',
      description: '体の疲労改善は、日々の活力を保ち最高の能力を発揮するために不可欠です。疲労の蓄積は、集中力や免疫力の低下、さらには怪我のリスクを高めます。放置すれば慢性疲労に繋がりかねません。心身の健康と生活の質を守るため、こまめなケアが重要です。',
      image: '/images/questionnaire/pic_modal_02.jpg'
    },
    {
      id: 3,
      title: 'カラダの代謝 改善チャレンジ',
      level: '★★★★★',
      description: '代謝を改善しエネルギー消費を高めることは、太りにくく痩せやすい体を作る基本です。血行が促進され、冷えやむくみ、肩こりを解消。老廃物の排出も促され、肌の健康や疲労回復にも繋がります。健康的な毎日を送る上で非常に重要です。',
      image: '/images/questionnaire/pic_modal_03.jpg'
    },
    {
      id: 4,
      title: '腸内環境 改善チャレンジ',
      level: '★★★☆☆',
      description: '便通改善は、お腹の不快感を解消するだけではありません。腸内環境を整えることで、老廃物や有害物質の排出を促進し、肌荒れの改善に繋がります。また、栄養の吸収を助けて免疫力を高めるなど、心身全体の健康を支えるための重要な生活習慣です。',
      image: '/images/questionnaire/pic_modal_04.jpg'
    }
  ]

  return (
    <Layout activeNav="challenge">
      <section className="content-section">
        <h2 className="content-section__title">マイチャレンジ</h2>
        <div className="challenge-thumb__wrapper">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="challenge-thumb"
              onClick={() => navigate(`/challenge/${challenge.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="challenge-thumb__title">{challenge.title}</h3>
              <img src={challenge.image} alt="" className="challenge-thumb__image" />
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2 className="content-section__title">全てのチャレンジ一覧</h2>
        {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-card">
            <img src={challenge.image} alt="" className="challenge-card__image" />
            <div className="challenge-card__body">
              <h3 className="challenge-card__title">{challenge.title}</h3>
              <p className="challenge-card__level">
                チャレンジレベル{' '}
                <span className="challenge-card__level__star">{challenge.level}</span>
              </p>
              <p className="challenge-card__description">{challenge.description}</p>
              <button
                className="challenge-card__button"
                onClick={() => navigate(`/challenge/${challenge.id}`)}
              >
                このチャレンジを選ぶ
              </button>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default Challenge

