import { useNavigate } from 'react-router-dom';
import { HiFire } from 'react-icons/hi2';
import HomeBanner from '@components/Banner/HomeBanner';
import BottomNavigation from '@components/BottomNavigation';
import DarkModeButton from '@components/DarkModeButton';
import HeaderText from '@components/HeaderText';
import Loader from '@components/Loader';
import { API } from '@constants/Article';
import { MESSAGE, POST_COUNT } from '@constants/Home';
import { CURRENT_NEWS_TAB_KEY, TAB_CONSTANTS } from '@constants/Tab';
import { useFetchArticles } from '@hooks/useFetchArticles';
import { useFilteredArticles } from '@hooks/useFilteredArticles';
import useTab from '@hooks/useTab';
import RenderArticles from './ArticlesPage/RenderArticles';
import HotArticles from './HomePage/HotArticles';

const CHARACTER_SRC = '/img/character.webp';

const BANNER_ITEMS = [
  {
    imgSrc: '/img/banner-icon-1.webp',
    text: '나만의\nTMI를\n공유해주세요',
  },
  {
    imgSrc: '/img/banner-icon-2.webp',
    text: '아무말이나\n지껄이더라도\n용서해줘요!',
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { changeTab } = useTab(CURRENT_NEWS_TAB_KEY);

  const { data: articles, isLoading } = useFetchArticles({
    id: API.CHANNEL_ID,
    type: 'channel',
  });

  const newestArticles = useFilteredArticles(TAB_CONSTANTS.NEWEST, articles).slice(
    0,
    POST_COUNT.NEWEST,
  );
  const hottestArticles = useFilteredArticles(TAB_CONSTANTS.HOTTEST, articles).slice(
    0,
    POST_COUNT.HOTTEST,
  );

  return (
    <div className="max-w-[25.875rem] mx-auto h-screen flex flex-col relative justify-between overflow-hidden">
      <div className="z-10 flex flex-col w-full max-w-md gap-10 overflow-y-scroll">
        <section className="relative z-10">
          <div className="bg-cooled-blue dark:bg-dark-primary h-[80%] absolute top-0 w-full" />
          <header className="flex h-[180px] justify-between px-10 items-center relative">
            <HeaderText label={MESSAGE.HOME} />
            <DarkModeButton />
          </header>
          <div className="relative flex justify-center w-full">
            <div className="w-[90%] flex flex-col gap-2">
              <div className="flex items-center gap-2 ml-2">
                <h2 className="flex text-lg font-bold text-tricorn-black dark:text-white font-Cafe24Surround">
                  <HiFire size="24" className="mr-1 text-article-highly-liked" />
                  <span
                    onClick={() => {
                      navigate('/news');
                      changeTab(TAB_CONSTANTS.HOTTEST);
                    }}
                    className="cursor-pointer"
                  >
                    {TAB_CONSTANTS.HOTTEST} 뉴스
                  </span>
                </h2>
              </div>
              <div className="bg-white dark:bg-tricorn-black text-tricorn-black dark:text-lazy-gray w-full rounded-xl shadow-article-container max-w-sm self-center pt-2 z-20 h-[304px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-[304px]">
                    <Loader />
                  </div>
                ) : (
                  <HotArticles articles={hottestArticles} />
                )}
              </div>
              <img
                src={CHARACTER_SRC}
                className="absolute w-[44%] max-w-[215px] -top-16 left-1/2 z-10"
                alt="character"
              />
            </div>
          </div>
        </section>
        <section className="px-5">
          <div className="z-10">
            <HomeBanner carouselItems={BANNER_ITEMS} />
          </div>
        </section>
        <section className="flex flex-col items-center justify-center flex-grow gap-6">
          <div className="flex flex-col gap-3 w-[90%]">
            <h2 className="pl-2 text-lg font-bold text-tricorn-black dark:text-white font-Cafe24Surround">
              <span
                onClick={() => {
                  navigate('/news');
                  changeTab(TAB_CONSTANTS.NEWEST);
                }}
                className="cursor-pointer"
              >
                {TAB_CONSTANTS.NEWEST} 뉴스
              </span>
            </h2>
            <div className="relative">
              {isLoading ? (
                <div className="flex justify-center h-[104px]">
                  <Loader />
                </div>
              ) : (
                <RenderArticles articles={newestArticles} />
              )}
            </div>
          </div>
        </section>
      </div>
      <div className="z-10 flex justify-center flex-none w-full">
        <BottomNavigation currentPage="/home" />
      </div>
    </div>
  );
};

export default HomePage;
