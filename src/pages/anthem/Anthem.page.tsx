// @ts-expect-error types do not exist
// eslint-disable-next-line
import anthemVideo from '@assets/videos/anthem.zip';
// @ts-expect-error types do not exist
// eslint-disable-next-line import/no-extraneous-dependencies
import JSZipUtils from 'jszip-utils';
import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { LoadVideo } from '@components/LoadVideo';
import { VideoContent } from '@components/VideoContent';
import { PAGES, PageType } from '@assets/utils/pages.utils';
import { useNavigate } from 'react-router-dom';

/**
 * Displays the Anthem Video content and structure
 * for the Anthem tab.
 */

export const AnthemPage = () => {
  /**
   * .....................................................
   * Local State Hooks
   */

  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  /**
   * .....................................................
   * Misc Hooks
   */

  const navigate = useNavigate();

  /**
   * .....................................................
   * useEffects
   */

  useEffect(() => {
    const jsZip = new JSZip();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    JSZipUtils.getBinaryContent(
      anthemVideo,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any, data: any) => {
        if (err) {
          throw err;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        jsZip.loadAsync(data).then(
          (zip) => {
            void zip
              .file(`anthem.mp4`)
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

  /**
   * .....................................................
   * Render
   */

  return (
    <div className="flex w-full h-full py-6 justify-center items-center overflow-hidden ">
      <div
        className="flex flex-col w-full h-4/6 md:h-5/6 lg:h-full xl:w-5/6 px-2 md:mx-6 md:p-4 pb-4 md:pb-8 gap-4 items-center bg-backgroundTransparent rounded-xl overflow-x-hidden overflow-y-auto md:overflow-y-hidden"
        style={{
          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0px 0px 4px 4px #08472f18 ',
        }}
      >
        {/* Title */}

        <div className="flex flex-col items-center h-1/6 w-full">
          <div className="flex justify-center items-center font-bold text-lg md:text-lg xl:text-2xl text-primaryDark py-1 md:pb-2">
            {PAGES[PageType.anthem].label}
          </div>
          <div className="border-solid border-t-2 border-gray-200 w-5/6 pb-4" />
        </div>

        {/* Video Content */}

        {!videoBlob ? <LoadVideo /> : <VideoContent videoBlob={videoBlob} />}

        {/* Buttons */}

        <div className="flex md:h-1/6 w-full justify-center">
          <button
            style={{
              transition:
                'outline 0.1s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '1px 1px 3px 1px #0000004b ',
            }}
            className="bg-secondary py-1 px-2 h-fit md:py-2 text-lg md:px-4 rounded-md text-contrastText outline-secondary outline outline-0 hover:outline-4 hover:bg-white hover:text-secondary"
            type="button"
            onClick={() => navigate(PAGES[PageType.greetings].navigate)}
          >
            BACK TO PART II
          </button>
        </div>
      </div>
    </div>
  );
};
