import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../assets/css/ArticleDetailPage.css";

const ArticleDetailPage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/news/${id}`);
                console.log("Dữ liệu bài viết:", res.data);
                setArticle(res.data);
            } catch (err) {
                console.error("Lỗi khi lấy bài viết:", err);
                setError('Không tìm thấy bài viết hoặc có lỗi xảy ra.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;
    if (!article) return <div>Không tìm thấy bài viết.</div>;

    return (
        <div className="article-detail">
            <h1>{article.title || "Không có tiêu đề"}</h1>
            <div className="article-meta">
                <span>{article.author || "Tác giả không rõ"}</span> | <span>{article.date || "Không rõ ngày"}</span>
            </div>
            <div className="article-description">
                <p>{article.description || "Không có mô tả."}</p>
            </div>

            {/* Hiển thị hình ảnh nếu có */}
            <div className="article-images">
                {(article.images && article.images.length > 0 ? article.images : ['https://via.placeholder.com/600x400?text=No+Image']).map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Ảnh ${index + 1}`}
                        className="article-main-image"
                    />
                ))}
            </div>

            {/* Hiển thị nội dung HTML */}
            <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content || "<p>Không có nội dung.</p>" }}
            />
        </div>
    );
};

export default ArticleDetailPage;
