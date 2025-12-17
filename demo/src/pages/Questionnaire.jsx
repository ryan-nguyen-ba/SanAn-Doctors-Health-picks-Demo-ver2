import React, { useState } from 'react'
import Layout from '../components/Layout'
import QuestionnaireModal from '../components/QuestionnaireModal'
import '../styles/questionnaire.css'

function Questionnaire() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    condition: '',
    focus: '',
    sleep: '',
    stress: '',
    diet: '',
    exercise: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const rightSidebarContent = (
    <>
      <div className="card team-card">
        <div className="team-card__avatars">
          <img src="/images/pic_team_avatar_01.jpg" alt="Team member 1" className="team-card__avatar" />
          <img src="/images/pic_team_avatar_02.jpg" alt="Team member 2" className="team-card__avatar" />
        </div>
        <p className="team-card__title">
          <a href="">マイ管理栄養士チーム</a>
          <img src="/images/icon_arrow_white.svg" alt="" className="nav__icon" />
        </p>
      </div>
      <div className="actions">
        <button className="action-btn">
          <img src="/images/icon_chat.svg" alt="" className="nav__icon" />
          <span className="action-btn__text">チャット</span>
        </button>
        <button className="action-btn">
          <img src="/images/icon_request.svg" alt="" className="nav__icon" />
          <span className="action-btn__text">リクエスト</span>
        </button>
      </div>
    </>
  )

  return (
    <Layout activeNav="home" showRightSidebar={true} rightSidebarContent={rightSidebarContent}>
      <div className="card questionnaire">
        <div className="questionnaire__header">
          <span className="questionnaire__title">
            <img src="/images/questionnaire/icon_questionnaire.svg" alt="" className="nav__icon" />
            初回アンケート
          </span>
          <span className="questionnaire__meta">あなたが送信 1時間前</span>
          <button className="questionnaire__options">
            <img src="/images/icon_three_dot.svg" alt="" className="nav__icon" />
          </button>
        </div>
        <div className="questionnaire__banner">
          <img src="/images/questionnaire/illust_questionnaire.svg" alt="" />
        </div>
        <div className="questionnaire__body">
          <p className="questionnaire__intro">
            加藤 佳子 さん<br />
            ようこそ、Health Picksへ。<br />
            まずはあなたの状態を知るために、体調・睡眠・ストレス・食事に関する質問にお答えください。
          </p>

          <form className="form">
            <h3 className="form__title">体調</h3>
            <fieldset className="form__group">
              <legend className="form__legend">
                最近、朝起きたときに疲れが残っていると感じることはありますか？
              </legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="condition"
                    value="1"
                    checked={formData.condition === '1'}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                  />
                  ほぼ毎日
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="condition"
                    value="2"
                    checked={formData.condition === '2'}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                  />
                  ときどき
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="condition"
                    value="3"
                    checked={formData.condition === '3'}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                  />
                  ほとんどない
                </label>
              </div>
            </fieldset>

            <fieldset className="form__group">
              <legend className="form__legend">
                ぼんやりしたり、集中力が続かないと感じることがありますか？
              </legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="focus"
                    value="1"
                    checked={formData.focus === '1'}
                    onChange={(e) => handleInputChange('focus', e.target.value)}
                  />
                  よくある
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="focus"
                    value="2"
                    checked={formData.focus === '2'}
                    onChange={(e) => handleInputChange('focus', e.target.value)}
                  />
                  たまにある
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="focus"
                    value="3"
                    checked={formData.focus === '3'}
                    onChange={(e) => handleInputChange('focus', e.target.value)}
                  />
                  ない
                </label>
              </div>
            </fieldset>

            <fieldset className="form__group">
              <legend className="form__legend">
                季節の変わり目に体調を崩しやすいと感じますか？
              </legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="season"
                    value="1"
                    checked={formData.season === '1'}
                    onChange={(e) => handleInputChange('season', e.target.value)}
                  />
                  はい
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="season"
                    value="2"
                    checked={formData.season === '2'}
                    onChange={(e) => handleInputChange('season', e.target.value)}
                  />
                  いいえ
                </label>
              </div>
            </fieldset>
          </form>

          <form className="form">
            <h3 className="form__title">睡眠</h3>
            <fieldset className="form__group">
              <legend className="form__legend">
                最近、夜しっかり眠れていますか？<br />
                （途中で目が覚める、入眠に時間がかかるなど）
              </legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="sleep_quality"
                    value="1"
                    checked={formData.sleepQuality === '1'}
                    onChange={(e) => handleInputChange('sleepQuality', e.target.value)}
                  />
                  よく眠れている
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="sleep_quality"
                    value="2"
                    checked={formData.sleepQuality === '2'}
                    onChange={(e) => handleInputChange('sleepQuality', e.target.value)}
                  />
                  あまり眠れていない
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="sleep_quality"
                    value="3"
                    checked={formData.sleepQuality === '3'}
                    onChange={(e) => handleInputChange('sleepQuality', e.target.value)}
                  />
                  眠れないことが多い
                </label>
              </div>
            </fieldset>

            <fieldset className="form__group">
              <legend className="form__legend">起床時にスッキリ目覚められますか？</legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="wake_up"
                    value="1"
                    checked={formData.wakeUp === '1'}
                    onChange={(e) => handleInputChange('wakeUp', e.target.value)}
                  />
                  はい
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="wake_up"
                    value="2"
                    checked={formData.wakeUp === '2'}
                    onChange={(e) => handleInputChange('wakeUp', e.target.value)}
                  />
                  まあまあ
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="wake_up"
                    value="3"
                    checked={formData.wakeUp === '3'}
                    onChange={(e) => handleInputChange('wakeUp', e.target.value)}
                  />
                  ぐったりしている
                </label>
              </div>
            </fieldset>
          </form>

          <form className="form">
            <h3 className="form__title">ストレス</h3>
            <fieldset className="form__group">
              <legend className="form__legend">
                日常生活の中でイライラや緊張を感じやすいですか？
              </legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="stress"
                    value="1"
                    checked={formData.stress === '1'}
                    onChange={(e) => handleInputChange('stress', e.target.value)}
                  />
                  ほぼ毎日
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="stress"
                    value="2"
                    checked={formData.stress === '2'}
                    onChange={(e) => handleInputChange('stress', e.target.value)}
                  />
                  週に数回
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="stress"
                    value="3"
                    checked={formData.stress === '3'}
                    onChange={(e) => handleInputChange('stress', e.target.value)}
                  />
                  ほとんどない
                </label>
              </div>
            </fieldset>

            <fieldset className="form__group">
              <legend className="form__legend">
                気分が落ち込む、理由もなく不安になることはありますか？
              </legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="mood"
                    value="1"
                    checked={formData.mood === '1'}
                    onChange={(e) => handleInputChange('mood', e.target.value)}
                  />
                  よくある
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="mood"
                    value="2"
                    checked={formData.mood === '2'}
                    onChange={(e) => handleInputChange('mood', e.target.value)}
                  />
                  たまにある
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="mood"
                    value="3"
                    checked={formData.mood === '3'}
                    onChange={(e) => handleInputChange('mood', e.target.value)}
                  />
                  ない
                </label>
              </div>
            </fieldset>
          </form>

          <form className="form">
            <h3 className="form__title">食事</h3>
            <fieldset className="form__group">
              <legend className="form__legend">
                １週間にどれくらい外食またはコンビニ食をとっていますか？
              </legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="diet_frequency"
                    value="1"
                    checked={formData.dietFrequency === '1'}
                    onChange={(e) => handleInputChange('dietFrequency', e.target.value)}
                  />
                  週5回以上
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="diet_frequency"
                    value="2"
                    checked={formData.dietFrequency === '2'}
                    onChange={(e) => handleInputChange('dietFrequency', e.target.value)}
                  />
                  週2〜4回
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="diet_frequency"
                    value="3"
                    checked={formData.dietFrequency === '3'}
                    onChange={(e) => handleInputChange('dietFrequency', e.target.value)}
                  />
                  週1回以下
                </label>
              </div>
            </fieldset>

            <fieldset className="form__group">
              <legend className="form__legend">
                食後に「もたれ」や「胃の重さ」を感じることはありますか？
              </legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="stomach"
                    value="1"
                    checked={formData.stomach === '1'}
                    onChange={(e) => handleInputChange('stomach', e.target.value)}
                  />
                  よくある
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="stomach"
                    value="2"
                    checked={formData.stomach === '2'}
                    onChange={(e) => handleInputChange('stomach', e.target.value)}
                  />
                  時々ある
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="stomach"
                    value="3"
                    checked={formData.stomach === '3'}
                    onChange={(e) => handleInputChange('stomach', e.target.value)}
                  />
                  ほとんどない
                </label>
              </div>
            </fieldset>

            <fieldset className="form__group">
              <legend className="form__legend">朝食をとる習慣はありますか？</legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="breakfast"
                    value="1"
                    checked={formData.breakfast === '1'}
                    onChange={(e) => handleInputChange('breakfast', e.target.value)}
                  />
                  毎日食べる
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="breakfast"
                    value="2"
                    checked={formData.breakfast === '2'}
                    onChange={(e) => handleInputChange('breakfast', e.target.value)}
                  />
                  時々食べる
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="breakfast"
                    value="3"
                    checked={formData.breakfast === '3'}
                    onChange={(e) => handleInputChange('breakfast', e.target.value)}
                  />
                  食べない
                </label>
              </div>
            </fieldset>
          </form>

          <form className="form">
            <h3 className="form__title">運動</h3>
            <fieldset className="form__group">
              <legend className="form__legend">
                週にどのくらい体を動かしていますか？<br />
                （ウォーキング・筋トレなど）
              </legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="exercise"
                    value="1"
                    checked={formData.exercise === '1'}
                    onChange={(e) => handleInputChange('exercise', e.target.value)}
                  />
                  週3回以上
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="exercise"
                    value="2"
                    checked={formData.exercise === '2'}
                    onChange={(e) => handleInputChange('exercise', e.target.value)}
                  />
                  週1〜2回
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="exercise"
                    value="3"
                    checked={formData.exercise === '3'}
                    onChange={(e) => handleInputChange('exercise', e.target.value)}
                  />
                  ほとんどしない
                </label>
              </div>
            </fieldset>

            <fieldset className="form__group">
              <legend className="form__legend">
                １日の中で３０分以上歩くことが多いですか？
              </legend>
              <div className="form__radio-group">
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="walking"
                    value="1"
                    checked={formData.walking === '1'}
                    onChange={(e) => handleInputChange('walking', e.target.value)}
                  />
                  はい
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="walking"
                    value="2"
                    checked={formData.walking === '2'}
                    onChange={(e) => handleInputChange('walking', e.target.value)}
                  />
                  時々
                </label>
                <label className="form__radio-label">
                  <input
                    type="radio"
                    name="walking"
                    value="3"
                    checked={formData.walking === '3'}
                    onChange={(e) => handleInputChange('walking', e.target.value)}
                  />
                  ほとんど
                </label>
              </div>
            </fieldset>
          </form>

          <form className="form form__last" onSubmit={handleSubmit}>
            <div className="form__actions">
              <button type="submit" className="btn btn--primary open-modal-button">
                入力内容の確認
              </button>
              <button type="button" className="btn btn--secondary">
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>

      <QuestionnaireModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Layout>
  )
}

export default Questionnaire

