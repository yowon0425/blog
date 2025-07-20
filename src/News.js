import React, { useEffect, useState } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = '7782be64a42522d00fc02f1410b93b10'; // GNews API 키

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=9&token=${apiKey}`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('뉴스 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>📰 오늘의 뉴스</h2>

      {loading ? (
        <p>뉴스를 불러오는 중입니다...</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}
        >
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                backgroundColor: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              {article.image && (
                <img
                  src={article.image}
                  alt="뉴스 이미지"
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover'
                  }}
                />
              )}
              <div
                style={{
                  padding: '10px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  height: '60px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {article.title}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
