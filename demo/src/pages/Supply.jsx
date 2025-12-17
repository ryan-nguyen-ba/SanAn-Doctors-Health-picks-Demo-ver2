import React from 'react'
import Layout from '../components/Layout'
import '../styles/supply.css'

function Supply() {
  const currentSupplements = [
    {
      id: 1,
      title: '摂取中のサプリ',
      mainImage: '/images/supply/pic_supply_01.jpg',
      timerImage: '/images/supply/img_supply_timer_01.svg',
      name: 'GABA受容体作動サプリ',
      subName: 'COZY GABA',
      amount: '(30日分)',
      company: 'ABCサプリ株式会社',
      lastPurchase: '2025年8月1日',
      notice: 'そろそろ購入の時期です',
      primaryAction: '購入する',
      type: 'supplement',
    },
    {
      id: 2,
      title: '摂取中のサプリ',
      mainImage: '/images/supply/pic_supply_02.jpg',
      timerImage: '/images/supply/img_supply_timer_02.svg',
      name: 'メラトニン受容体作動薬',
      subName: 'メラトニオン',
      amount: '',
      company: '大門クリニック',
      lastPurchase: '2025年8月1日',
      notice: 'そろそろ薬がなくなる頃です',
      primaryAction: 'オンライン処方を受ける',
      type: 'medicine',
    },
  ]

  const checkListItems = [
    {
      label: '定期副作用チェック',
      date: '2025年8月26日',
      linkText: 'これまでの記録 >',
    },
    {
      label: '効果を感じている',
      value: 'はい',
    },
    {
      label: 'これからも服用を続ける',
      value: 'はい',
    },
  ]

  const recommendedSupplements = [
    {
      id: 1,
      title: '目覚めをサポート',
      name: 'COZY GABA',
      company: 'ABCサプリ株式会社',
      image: '/images/timeline/modal_img_02.jpg',
    },
    {
      id: 2,
      title: '疲れを残さない',
      name: 'GABAトレール',
      company: '株式会社DEFサプリ',
      image: '/images/timeline/modal_img_03.jpg',
    },
    {
      id: 3,
      title: '目覚めをサポート',
      name: 'COZY GABA',
      company: 'ABCサプリ株式会社',
      image: '/images/timeline/modal_img_02.jpg',
    },
    {
      id: 4,
      title: '疲れを残さない',
      name: 'GABAトレール',
      company: '株式会社DEFサプリ',
      image: '/images/timeline/modal_img_03.jpg',
    },
  ]

  const rightSidebarContent = (
    <>
      <div className="widget">
        <header className="widget__header">
          <h4 className="widget__title">服用中のサプリメント</h4>
          <a href="#" className="widget__link">もっと見る &gt;</a>
        </header>
        <ul className="widget-list">
          <li className="widget-list__item">
            <img src="/images/supply/pic_side_01.jpg" alt="サプリ" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">GABA受容体作動サプリ</p>
              <p className="widget-list__company">ABCサプリ株式会社</p>
            </div>
          </li>
          <li className="widget-list__item">
            <img src="/images/supply/pic_side_02.jpg" alt="サプリ" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">オレキシン受容体拮抗サプリ</p>
              <p className="widget-list__company">DEFサプリ株式会社</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="widget">
        <header className="widget__header">
          <h4 className="widget__title">服薬中の薬</h4>
          <a href="#" className="widget__link">もっと見る &gt;</a>
        </header>
        <ul className="widget-list">
          <li className="widget-list__item">
            <img src="/images/supply/pic_side_02.jpg" alt="薬" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">メラトニン受容体作動薬</p>
              <p className="widget-list__company">大門クリニック</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="widget">
        <header className="widget__header">
          <h4 className="widget__title">お気に入りサプリメント</h4>
          <a href="#" className="widget__link">もっと見る &gt;</a>
        </header>
        <ul className="widget-list">
          <li className="widget-list__item">
            <img src="/images/supply/pic_side_01.jpg" alt="サプリ" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">明日に疲れを持ち越さない！睡眠サポートサプリメント</p>
              <p className="widget-list__company">COサプリ株式会社</p>
            </div>
          </li>
          <li className="widget-list__item">
            <img src="/images/supply/pic_side_02.jpg" alt="サプリ" className="widget-list__image" />
            <div className="widget-list__info">
              <p className="widget-list__name">明日に疲れを持ち越さない！睡眠サポートサプリメント</p>
              <p className="widget-list__company">COサプリ株式会社</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  )

  return (
    <Layout activeNav="supply" showRightSidebar={true} rightSidebarContent={rightSidebarContent}>
      <div className="content-section-wrapper">
        {currentSupplements.map((supplement) => (
          <section key={supplement.id} className="content-section">
            <div className="supplement-card">
              <h2 className="content-section__title">{supplement.title}</h2>
              <header className="supplement-card__header">
                <div className="supplement-card__body">
                  <a href="#">
                    <img src={supplement.mainImage} className="supplement-card__image" alt={supplement.name} />
                  </a>
                  <div className="supplement-timer">
                    <img src={supplement.timerImage} className="supplement-card__image" alt="" />
                  </div>
                </div>
                <div className="supplement-card__info">
                  <h3 className="supplement-card__title">
                    {supplement.name}
                    <br />
                    <span>{supplement.subName}</span>
                    {supplement.amount && <small>{supplement.amount}</small>}
                  </h3>
                  <p className="supplement-card__company">{supplement.company}</p>
                  <p className="supplement-card__purchase-info">
                    前回購入: {supplement.lastPurchase}
                    <br />
                    {supplement.notice}
                  </p>
                  <button className="supplement-card__button supplement-card__button--primary">
                    {supplement.primaryAction}
                  </button>

                  {Array(2)
                    .fill(null)
                    .map((_, idx) => (
                      <div key={idx} className="check-list">
                        {checkListItems.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className={
                              'check-list__item' + (itemIdx > 0 ? ' check-list__item--sub' : '')
                            }
                          >
                            <span className="check-list__label">{item.label}</span>
                            {item.date && <span className="check-list__date">{item.date}</span>}
                            {item.value && <span className="check-list__value">{item.value}</span>}
                            {item.linkText && (
                              <a href="#" className="check-list__link">
                                {item.linkText}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </header>
            </div>
          </section>
        ))}
      </div>

      <div className="supplement-list">
        <h3 className="supplement-list__title">この栄養素をサプリで補う</h3>
        <div className="supplement-list__thumbnails">
          {recommendedSupplements.map((supp) => (
            <div key={supp.id} className="supplement-thumb">
              <div className="supplement-thumb__image">
                <img src={supp.image} alt={supp.name} />
              </div>
              <p className="supplement-thumb__title">{supp.title}</p>
              <p className="supplement-thumb__name">{supp.name}</p>
              <p className="supplement-thumb__company">{supp.company}</p>
              <button className="supplement-thumb__button">マイサプリに加える</button>
              <button className="supplement-thumb__button">購入する</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Supply

