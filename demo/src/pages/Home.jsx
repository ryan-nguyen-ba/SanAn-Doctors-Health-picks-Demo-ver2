import React, { useEffect } from 'react'
import { useNavigationType } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/home.css'

function Home() {
  const navigationType = useNavigationType()

  useEffect(() => {
    // Nếu quay lại màn này bằng nút Back/Forward trên browser,
    // reload lại toàn bộ trang để reset layout gốc
    if (navigationType === 'POP') {
      window.location.reload()
    }
  }, [navigationType])

  const rightSidebarContent = (
    <>
      <div className="widget">
        <img src="/images/home/bnr_01.png" alt="睡眠前に＋α" className="widget__ad-image" />
      </div>
      <div className="widget">
        <h4 className="widget__title">取得したバッジ <a href="#">全部見る &gt;</a></h4>
        <div className="widget__image">
          <img src="/images/home/img_side_01.svg" alt="" />
        </div>
      </div>
      <div className="widget">
        <h4 className="widget__title">社内取り組みランキング <a href="#">部署毎 &gt;</a></h4>
        <div className="widget__image">
          <img src="/images/home/img_side_02.svg" alt="" />
        </div>
      </div>
      <div className="widget">
        <h4 className="widget__title">サプリタイマー <a href="#">設定する &gt;</a></h4>
        <div className="widget__image">
          <img src="/images/home/img_side_03.svg" alt="" />
        </div>
      </div>
    </>
  )

  return (
    <Layout activeNav="home" showRightSidebar={true} rightSidebarContent={rightSidebarContent}>
      <div className="notifications-content">
        <section className="hero-banner">
          <div className="hero-banner__text">
            <h2>カラダに習慣<br />レシピで改善</h2>
          </div>
        </section>

        <section className="notifications-area">
          <div className="notifications-grid">
            <div className="notification-card">
              <header className="notification-card__header">
                <h3 className="notification-card__title">
                  <img src="/images/home/icon_bell.svg" alt="" className="nav__icon" />
                  お知らせ
                </h3>
                <span className="notification-card__badge">1</span>
              </header>
              <ul className="notification-card__list">
                <li className="notification-item">
                  <div className="notification-item__header">
                    <p>
                      <span className="notification-item__icon notification-item__icon--campaign"></span>
                      キャンペーン
                    </p>
                    <span className="notification-item__time">1時間前</span>
                  </div>
                  <div className="notification-item__content">
                    <p className="notification-item__text">
                      初回ご利用キャンペーンのお知らせが届きました。
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="notification-card">
              <header className="notification-card__header">
                <h3 className="notification-card__title">
                  <img src="/images/home/icon_chat.svg" alt="" className="nav__icon" />
                  チャット
                </h3>
                <span className="notification-card__badge">2</span>
              </header>
              <ul className="notification-card__list">
                <li className="notification-item">
                  <div className="notification-item__header">
                    <p>
                      <span className="notification-item__icon notification-item__icon--campaign"></span>
                      チャット栄養相談
                    </p>
                    <span className="notification-item__time">1時間前</span>
                  </div>
                  <div className="notification-item__content">
                    <p className="notification-item__text">チャットが届きました。</p>
                    <p className="notification-item__meta">田中 さやか</p>
                  </div>
                </li>
                <li className="notification-item">
                  <div className="notification-item__header">
                    <p>
                      <span className="notification-item__icon notification-item__icon--campaign"></span>
                      チャット栄養相談
                    </p>
                    <span className="notification-item__time">1時間前</span>
                  </div>
                  <div className="notification-item__content">
                    <p className="notification-item__text">パーソナルアドバイスが届きました。</p>
                    <p className="notification-item__meta">田中 絢子</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="notification-card">
              <header className="notification-card__header">
                <h3 className="notification-card__title">
                  <img src="/images/home/icon_notifications.svg" alt="" className="nav__icon" />
                  通知
                </h3>
                <span className="notification-card__badge">2</span>
              </header>
              <ul className="notification-card__list">
                <li className="notification-item">
                  <div className="notification-item__header">
                    <p>
                      <span className="notification-item__icon notification-item__icon--campaign"></span>
                      ミッション通知
                    </p>
                    <span className="notification-item__time">1時間前</span>
                  </div>
                  <div className="notification-item__content">
                    <p className="notification-item__text">そろそろミッションのお時間です。</p>
                    <p className="notification-item__meta">6/28 23:00に予約</p>
                  </div>
                </li>
                <li className="notification-item">
                  <div className="notification-item__header">
                    <p>
                      <span className="notification-item__icon notification-item__icon--campaign"></span>
                      サプリタイマー
                    </p>
                    <span className="notification-item__time">1時間前</span>
                  </div>
                  <div className="notification-item__content">
                    <p className="notification-item__text">服用の時間です。</p>
                    <p className="notification-item__meta">毎日 22:45に予約</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="notification-card">
              <header className="notification-card__header">
                <h3 className="notification-card__title">
                  <img src="/images/home/icon_truck.svg" alt="" className="nav__icon" />
                  配送
                </h3>
                <span className="notification-card__badge">2</span>
              </header>
              <ul className="notification-card__list">
                <li className="notification-item">
                  <div className="notification-item__header">
                    <p>
                      <span className="notification-item__icon notification-item__icon--campaign"></span>
                      〇〇〇〇〇〇〇〇
                    </p>
                    <span className="notification-item__time">1時間前</span>
                  </div>
                  <div className="notification-item__content">
                    <p className="notification-item__text">商品の配送が完了しました。</p>
                    <p className="notification-item__meta">6/28 10:00発送分</p>
                  </div>
                </li>
                <li className="notification-item">
                  <div className="notification-item__header">
                    <p>
                      <span className="notification-item__icon notification-item__icon--campaign"></span>
                      〇〇〇〇〇〇〇〇
                    </p>
                    <span className="notification-item__time">1時間前</span>
                  </div>
                  <div className="notification-item__content">
                    <p className="notification-item__text">商品が発送されました。</p>
                    <p className="notification-item__meta">7/28 10:00発送分</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="notification-card">
              <header className="notification-card__header">
                <h3 className="notification-card__title">
                  <img src="/images/home/icon_wallet.svg" alt="" className="nav__icon" />
                  お支払い
                </h3>
                <span className="notification-card__badge">1</span>
              </header>
              <ul className="notification-card__list">
                <li className="notification-item">
                  <div className="notification-item__header">
                    <p>
                      <span className="notification-item__icon notification-item__icon--campaign"></span>
                      〇〇〇〇〇〇〇〇
                    </p>
                    <span className="notification-item__time">1時間前</span>
                  </div>
                  <div className="notification-item__content">
                    <p className="notification-item__text">請求が届きました。</p>
                    <p className="notification-item__meta">オンライン診療費(6/28 10:00)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section className="mission-card">
        <header className="mission-card__header">
          <h4>選択したチャレンジ</h4>
          <a href="/mission">ミッション一覧 &gt;</a>
        </header>
        <div className="mission-card__title-group">
          <img src="/images/home/pic_mission_icon_01.jpg" alt="" className="mission-card__icon" />
          <div className="mission-card__title-group__inner">
            <div className="mission-card__title-group__header">
              <h3 className="mission-card__title">睡眠の質 改善チャレンジ</h3>
              <a href="/challenge">他のチャレンジを見る &gt;</a>
            </div>
            <div className="mission-card__level">
              チャレンジレベル <span className="mission-card__level__star">★★★☆☆</span>
            </div>
          </div>
        </div>
        <div className="mission-card__body">
          <div className="mission-card__recipe">
            <img src="/images/home/pic_mission_card_01.jpg" alt="" className="mission-card__image" />
            <h4 className="mission-card__subtitle">夜を取り戻す、スマホ断ちレシピ</h4>
            <p className="mission-card__description">
              「しっかり寝たはずなのに、なぜか疲れが取れない…。」そんなお悩み、ありませんか？その原因は、あなたが寝る前に見ているスマートフォンのブルーライト…
            </p>
            <button className="mission-card__button" onClick={() => window.location.href = '/recipe'}>
              健康レシピを見る
            </button>
          </div>
          <div className="mission-card__details">
            <h4 className="mission-card__subtitle">寝る2時間前スマホOFF宣言</h4>
            <img src="/images/home/pic_mission_card_02.jpg" alt="" className="mission-card__image" />
            <p className="mission-card__description">
              今夜、寝る30分前までにスマホやPC、テレビなどの画面を見るのをやめてみよう。
            </p>
            <div className="mission-card__achievement">
              <p>今日も達成した</p>
              <label className="mission-card__toggle">
                <input type="checkbox" />
              </label>
            </div>
          </div>
          <div className="mission-card__progress">
            <img src="/images/home/img_progress_01.svg" alt="" className="mission-card__progress-image" />
          </div>
        </div>
      </section>

      <section className="mission-card">
        <header className="mission-card__header">
          <h4>選択したチャレンジ</h4>
          <a href="/mission">ミッション一覧 &gt;</a>
        </header>
        <div className="mission-card__title-group">
          <img src="/images/home/pic_mission_icon_02.jpg" alt="" className="mission-card__icon" />
          <div className="mission-card__title-group__inner">
            <div className="mission-card__title-group__header">
              <h3 className="mission-card__title">睡眠の質 改善チャレンジ</h3>
              <a href="/challenge">他のチャレンジを見る &gt;</a>
            </div>
            <div className="mission-card__level">
              チャレンジレベル <span className="mission-card__level__star">★★★☆☆</span>
            </div>
          </div>
        </div>
        <div className="mission-card__body">
          <div className="mission-card__recipe">
            <img src="/images/home/pic_mission_card_03.jpg" alt="" className="mission-card__image" />
            <h4 className="mission-card__subtitle">疲れ知らずのカラダをつくるレシピ</h4>
            <p className="mission-card__description">
              最近、朝起きても疲れが取れていない、日中に集中力が続かない、夜になるとぐったり……そんな状態が当たり前になっていませんか？
            </p>
            <button className="mission-card__button" onClick={() => window.location.href = '/recipe'}>
              健康レシピを
            </button>
          </div>
          <div className="mission-card__details">
            <h4 className="mission-card__subtitle">疲れに負けない「筋肉装備」⋯</h4>
            <img src="/images/home/pic_mission_card_04.jpg" alt="" className="mission-card__image" />
            <p className="mission-card__description">
              疲れ知らずのカラダは、あなたのパフォーマンスも気分も、そして人生の質さえも変えて⋯
            </p>
            <div className="mission-card__achievement">
              <p>今日も達成した</p>
              <label className="mission-card__toggle">
                <input type="checkbox" />
              </label>
            </div>
          </div>
          <div className="mission-card__progress">
            <img src="/images/home/img_progress_02.svg" alt="" className="mission-card__progress-image" />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home

