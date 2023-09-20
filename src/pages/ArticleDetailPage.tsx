import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import useAuthQuery from '@/hooks/useAuthQuery';
import { deleteLikePost, likePost } from '@/api/common/Like';
import { deletePost } from '@/api/common/Post';
import ArticleDetail from '@components/ArticleDetail';
import ArticleInfoIcon from '@components/ArticleInfoIcon';
import BackButton from '@components/BackButton';
import Loader from '@components/Loader';
import SubButton from '@components/SubButton';
import { useArticleDetail } from '@hooks/useArticleDetail';
import CommentInput from './ArticleDetailPage/CommentInput';
import Comments from './ArticleDetailPage/Comments';

const ArticleDetailPage = () => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const { data: article, isLoading, addComment } = useArticleDetail();
  const navigate = useNavigate();
  const [likePushed, setLikePushed] = useState(false);
  const [likesCount, setLikesCount] = useState(article?.likes.length);

  useEffect(() => {
    if (user) {
      const isPostLiked = user.likes.some((like) => like.post === article?._id);
      setLikePushed(isPostLiked);
    }
  }, [user, article]);

  if (isLoading) {
    return <Loader />;
  }

  const { _id, title, author, createdAt, likes, image, comments } = article!;
  const { fullName, _id: postUserId } = author;
  const { title: articleTitle, body: articleBody } = JSON.parse(title);

  const isMyPost = user ? user._id === postUserId : false;
  const isLoginUser = user ? true : false;

  const handleLikePost = async () => {
    if (user && likePushed) {
      try {
        const likeByUser = likes.find((like) => like.user === user._id);
        if (likeByUser) {
          await deleteLikePost(likeByUser._id);
        }
        setLikePushed(false);
        setLikesCount((prevCount) => (prevCount ? prevCount - 1 : likes.length - 1));
      } catch (error) {
        alert(error);
      }
    } else if (user && !likePushed) {
      try {
        await likePost(_id);
        setLikePushed(true);
        setLikesCount((prevCount) => (prevCount ? prevCount + 1 : likes.length + 1));
      } catch (error) {
        alert(error);
      }
    } else {
      alert('로그인 후에 누를 수 있습니다!');
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(_id);
      navigate('/news');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-[25.875rem] mx-auto mb-9 h-[56rem] pt-[2.75rem] font-Cafe24SurroundAir text-tricorn-black">
      <section className="post-field max-w-[22rem] w-full">
        <div className="flex justify-between">
          <BackButton onClick={() => navigate(-1)} />
          <div />
          {isMyPost && (
            <div id="isMine" className="flex items-center justify-between w-[3rem]">
              <button type="button" name="edit">
                <FiEdit className="w-[1rem] h-[1rem]" />
              </button>
              <button type="button" name="delete" onClick={handleDeletePost}>
                <BsTrash className="w-[1rem] h-[1rem]" />
              </button>
            </div>
          )}
        </div>
        <div>
          <ArticleDetail nickname={fullName} postedDate={createdAt} />
          <div className="my-3 text-lg font-Cafe24Surround">{articleTitle}</div>
          <div className="flex items-center justify-center">
            {image && <img src={image} className="w-[10rem] m-5" />}
          </div>
          <div className="text-base">{articleBody}</div>
          <div className="flex justify-between mt-6">
            {user && (
              <SubButton
                label="응원하기"
                onClick={() => handleLikePost()}
                color="blue"
                type={likePushed ? 'fill' : 'outline'}
              />
            )}
            <ArticleInfoIcon
              likes={likesCount ? likesCount : likes.length}
              comments={comments.length}
              mode="post"
            />
          </div>
        </div>
        <div className="banner mt-[10%] mb-[5%] border-b-[0.01rem] border-lazy-gray" />
      </section>
      <section>
        {comments.length === 0 ? (
          <div className="flex justify-start w-[22rem] mt-[3%]">
            <span className="text-xs text-gray-400">댓글이 없습니다</span>
          </div>
        ) : (
          <div className="mb-[10rem]">
            <Comments comments={comments} userId={user ? user._id : null} />
          </div>
        )}
      </section>
      {isLoginUser && <CommentInput onAddComment={addComment} postId={_id} />}
    </div>
  );
};

export default ArticleDetailPage;
