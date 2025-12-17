import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/challenge_detail.css'

function ChallengeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock data - in real app, fetch based on id
  const challenge = {
    id: id,
    title: '睡眠の質 改善チャレンジ',
    description: '質の高い睡眠は、心身の健康に不可欠です。'
  }

  return (
    <Layout activeNav="challenge">
      <section className="content-section">
        <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
          <img src="/images/challenge_detail/icon_arrow_orange.svg" alt="戻る" />
        </button>
        <h2 className="content-section__title">{challenge.title}</h2>
        <img src="/images/challenge_detail/pic_01.jpg" alt="" style={{ width: '100%', marginBottom: '20px' }} />
        <p>{challenge.description}</p>
      </section>
    </Layout>
  )
}

export default ChallengeDetail

