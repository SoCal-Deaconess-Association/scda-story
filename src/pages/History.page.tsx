// eslint-disable-next-line
// @ts-expect-error types do not exist
import historyVideo from '@assets/videos/history.zip';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import JSZip from 'jszip';
// @ts-expect-error types do not exist
// eslint-disable-next-line import/no-extraneous-dependencies
import JSZipUtils from 'jszip-utils';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '@assets/utils/pages.utils';

export const HistoryPage = () => {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const jsZip = new JSZip();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    JSZipUtils.getBinaryContent(
      historyVideo,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any, data: any) => {
        if (err) {
          throw err;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        jsZip.loadAsync(data).then(
          (zip) => {
            void zip
              .file(`history.mp4`)
              ?.async('blob')
              .then((res) => {
                setVideoBlob(res);
              });
          },
          (e) => {
            console.log(e);
          },
        );
      },
    );
  }, []);

  return (
    <div className="flex w-full h-full my-6 justify-center items-center overflow-hidden ">
      <div
        className="flex flex-col w-full xl:w-5/6 h-full px-2 md:mx-6 md:p-4 md:pb-8 gap-10 items-center bg-backgroundTransparent rounded-xl"
        style={{ transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div className="flex flex-col items-center h-1/5 w-full">
          <div className="flex justify-center items-center font-bold text-lg md:text-lg xl:text-2xl text-primaryDark py-1 md:pb-2">
            HISTORY
          </div>
          <div className="border-solid border-t-2 border-gray-200 w-5/6 pb-4" />
        </div>
        {!videoBlob ? (
          <div className="flex justify-center items-center text-primaryText h-3/5 w-full">
            <div
              role="status"
              className="flex flex-col py-8 w-full md:py-28 2xl:py-0 gap-2 md:gap-4 justify-center items-center"
            >
              <svg
                aria-hidden="true"
                className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-200 fill-green-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span>Loading Video . . .</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-3/5 w-full">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              key="history-video"
              className="h-full w-fit rounded-lg"
              controls
            >
              <source
                src={window.URL.createObjectURL(videoBlob)}
                type="video/mp4"
              />
              Your current browser does not support the video tag. Try running
              on Google Chrome browser.
            </video>
          </div>
        )}
        <div className="flex h-1/5 w-full p-10 justify-center">
          <button
            className="h-fit bg-secondary py-1 px-2 md:py-2 text-lg md:px-4 rounded-md text-contrastText"
            type="button"
            onClick={() => navigate(PAGES['GREETINGS'].navigate)}
          >
            CONTINUE TO GREETINGS & STORIES
          </button>
        </div>
      </div>
    </div>
  );
};