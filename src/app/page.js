'use client'

import { useState } from 'react'

const EXAMPLES = [
  { ingredient: '굴소스', dish: '볶음밥', purpose: '볶음/炒', amount: '1큰술' },
  { ingredient: '버터밀크', dish: '팬케이크', purpose: '베이킹', amount: '1컵' },
  { ingredient: '두반장', dish: '마파두부', purpose: '볶음/炒', amount: '1큰술' },
  { ingredient: '생크림', dish: '파스타', purpose: '소스/드레싱', amount: '200ml' },
  { ingredient: '달걀', dish: '계란말이', purpose: '', amount: '2개' },
]

function Stars({ n }) {
  return (
    <span className="row-stars">
      {'★'.repeat(n)}{'☆'.repeat(3 - n)}
    </span>
  )
}

function ResultList({ data }) {
  return (
    <div>
      <div className="section-label-sm">대체 재료 목록</div>
      <div className="result-list">
        {data.substitutes.map((s, i) => (
          <div className="result-row" key={i}>
            <div className="row-num">{i + 1}</div>
            <div className="row-main">
              <div className="row-name">{s.name}</div>
              <div className="row-ratio">{s.ratio}</div>
              <div className="row-taste">{s.taste_note}</div>
            </div>
            <div className="row-right">
              <Stars n={s.stars} />
              <div className="row-stars-label">{s.stars_label}</div>
            </div>
          </div>
        ))}
      </div>

      {data.recipe?.title && data.recipe.steps.length > 0 && (
        <>
          <div className="section-label-sm">직접 만들기</div>
          <div className="recipe-box">
            <div className="recipe-box-title">{data.recipe.title}</div>
            <div className="recipe-steps">
              {data.recipe.steps.map((step, i) => (
                <div className="recipe-step" key={i}>{step}</div>
              ))}
            </div>
          </div>
        </>
      )}

      {data.tip && (
        <>
          <div className="section-label-sm">요리사 팁</div>
          <div className="tip-box">
            <div className="tip-box-label">Chef&apos;s tip</div>
            {data.tip}
          </div>
        </>
      )}
    </div>
  )
}

export default function Home() {
  const [ingredient, setIngredient] = useState('')
  const [dish, setDish] = useState('')
  const [purpose, setPurpose] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const fillExample = (ex) => {
    setIngredient(ex.ingredient)
    setDish(ex.dish)
    setPurpose(ex.purpose)
    setAmount(ex.amount)
    setResult(null)
    setError(null)
  }

  const search = async () => {
    if (!ingredient.trim()) return
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch('/api/substitute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredient, dish, purpose, amount }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'API 오류')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') search()
  }

  return (
    <>
      <header>
        <div className="logo">
          <div className="logo-main">없으면<span>뭐써</span></div>
          <div className="logo-sub">Ingredient Substitute Finder</div>
        </div>
        <div className="header-deco">
          <div className="deco-dot" />
          <div className="deco-dot" />
          <div className="deco-dot" />
        </div>
      </header>

      <section className="hero">
        <div className="hero-eyebrow">재료 대체 검색기</div>
        <h1 className="hero-title">
          지금 없는 <span className="accent">그 재료</span>,<br />다른 걸로 써도 돼요
        </h1>
        <p className="hero-desc">
          요리 중 재료가 부족할 때 바로 찾아보세요.<br />
          대체 재료와 직접 만드는 소스 레시피까지 알려드려요.
        </p>

        <div className="search-card">
          <div className="form-row">
            <div className="form-group">
              <label>없는 재료</label>
              <input
                type="text"
                placeholder="예: 굴소스, 버터밀크"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="form-group">
              <label>만들고 있는 요리 (선택)</label>
              <input
                type="text"
                placeholder="예: 볶음밥, 파스타"
                value={dish}
                onChange={(e) => setDish(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>용도</label>
              <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                <option value="">선택 안 함</option>
                <option value="볶음/炒">볶음</option>
                <option value="조림/찜">조림 / 찜</option>
                <option value="국/찌개">국 / 찌개</option>
                <option value="베이킹">베이킹</option>
                <option value="소스/드레싱">소스 / 드레싱</option>
                <option value="마리네이드">마리네이드</option>
              </select>
            </div>
            <div className="form-group">
              <label>양</label>
              <input
                type="text"
                placeholder="예: 1큰술, 200ml"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <button className="search-btn" onClick={search} disabled={loading}>
            <span>{loading ? '⏳' : '🔍'}</span>
            {loading ? '찾는 중...' : '대체 재료 찾기'}
          </button>

          <div className="example-tags">
            <span className="example-label">예시</span>
            {EXAMPLES.map((ex) => (
              <span key={ex.ingredient} className="tag" onClick={() => fillExample(ex)}>
                {ex.ingredient}
              </span>
            ))}
          </div>
        </div>
      </section>

      {(loading || result || error) && (
        <section className="result-section">
          <div className="result-header">
            <div className="result-badge">대체 재료</div>
            <div className="result-ingredient-name">
              <span>{ingredient}</span> 대신 쓸 수 있는 것들
            </div>
          </div>

          {loading && (
            <div className="loading-dots">
              <span /><span /><span />
            </div>
          )}
          {error && <div className="error-msg">⚠️ {error}</div>}
          {result && <ResultList data={result} />}
        </section>
      )}
    </>
  )
}
