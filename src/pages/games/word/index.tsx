import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import type { NextPage } from 'next';
import { APP_NAME } from '../../../config/constants';
import { useAppSelector } from '../../../state/hooks';

const Word: NextPage = () => {
  const nickname = useAppSelector((state) => state.localSlice.nickname);
  return (
    <div className="word-main pt-8 h-screen text-white">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{APP_NAME} - Word</title>
      </Head>

      <div className="bg-[url('../../public/wordbackground.svg')] bg-cover fixed top-0 left-0 w-full h-full"></div>

      <div className="content relative z-10 mx-auto">
        <div className="game-content text-center sm:text-right p-1 sm:pr-10">
          <Link href="/">
            <Image
              src="/wordlogo.svg"
              width="100"
              height="100"
              className="cursor-pointer"
            />
          </Link>
          <h2 dir="rtl" className="text-5xl mb-10 mt-5">
            مرحبا <span className="text-[#6fed37]">{nickname}</span>!
          </h2>
          <p className="text-2xl leading-10">
            لعبة "كلمة" هي نسخة الكترونية للعبة القديمة والممتعة التي لعبناها
            صغارا، عند بداية الجولة
            <br />
            بحرف معين، يتسابق اللاعبون على كتابة كلمات تبدأ بذلك الحرف تبعا
            للتصنيفات الموجودة
            <br />
            وتنتهي الجولة عندما ينتهي أول شخص من الكتابة
          </p>
        </div>

        <div className="buttons text-center mt-16 sm:mt-28 pb-10">
          <Link href="/">
            <button className="homepage text-xl xs:block xs:mx-auto mb-8 sm:mb-0 sm:mr-8 px-12 py-3 text-[#6fed37] rounded-2xl border-[#6fed37] border">
              الواجهة الرئيسية
            </button>
          </Link>

          <Link href="/games/word/room?mode=create">
            <button className="start-new-main text-xl xs:block xs:mx-auto px-12 py-3 text-white rounded-2xl bg-gradient-to-r from-btngradient-from to-btngradient-to">
              ابدأ لعبة جديدة
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Word;
