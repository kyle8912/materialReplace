export const runtime = 'edge'

export async function POST(request) {
  const { ingredient, dish, purpose, amount } = await request.json()

  if (!ingredient?.trim()) {
    return Response.json({ error: '재료를 입력해주세요.' }, { status: 400 })
  }

  let context = ''
  if (dish) context += ` 요리: "${dish}".`
  if (purpose) context += ` 용도: ${purpose}.`
  if (amount) context += ` 필요한 양: ${amount}.`

  const prompt = `당신은 요리 전문가입니다. 아래 조건에 맞게 재료 대체 정보를 JSON으로만 답해주세요. JSON 외에 다른 텍스트, 마크다운, 코드블록은 절대 포함하지 마세요.

없는 재료: "${ingredient}"${context}

반드시 아래 JSON 형식을 그대로 사용하세요:
{
  "substitutes": [
    {
      "name": "재료명",
      "ratio": "${amount ? amount + ' 기준 대체량' : '원래 양 기준 대체량'}",
      "stars": 3,
      "stars_label": "강추",
      "taste_note": "맛/질감 차이 한 줄"
    }
  ],
  "recipe": {
    "title": "직접 만들기 제목 (소스/양념류가 아닌 경우 null)",
    "steps": ["재료와 비율 포함한 단계별 설명"]
  },
  "tip": "요리사 팁 1~2문장"
}

stars는 1~3 정수. stars_label은 3="강추", 2="가능", 1="비슷하지만 차이 있음". substitutes는 3~4개. 한국 가정 요리 기준, 마트에서 흔히 구할 수 있는 재료로. recipe.title이 null이면 steps도 빈 배열로.`

  const apiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3 },
      }),
    }
  )

  if (!apiRes.ok) {
    return Response.json({ error: 'AI 응답 오류' }, { status: 500 })
  }

  const data = await apiRes.json()
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? ''
  const clean = raw.replace(/^```json|^```|```$/gm, '').trim()

  try {
    const parsed = JSON.parse(clean)
    return Response.json(parsed)
  } catch {
    return Response.json({ error: 'JSON 파싱 오류' }, { status: 500 })
  }
}