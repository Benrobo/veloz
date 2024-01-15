import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenter,
  FlexRowStartCenter,
} from "@/components/Flex";
import React, { useEffect, useState } from "react";
import HomeTopBar from "@/components/Navbar/HomeTopBar";
import Seo from "@/components/Seo";
import useScrollVisible from "@/hooks/useScrollVisible";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { withoutAuth } from "@/lib/auth/withoutAuth";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import usePageLoaded from "@/hooks/usePageLoaded";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type AuthProps = {
  providers: Record<string, { id: string }>;
  csrfToken: any;
};

function Auth(props: AuthProps) {
  const scrollVisible = useScrollVisible();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const errorParams = router.query["error"];

  const handleAuth = async () => {
    setLoading(true);
    signIn(props.providers["github"].id).then(() => setLoading(false));
  };

  useEffect(() => {
    if (errorParams) {
      if (errorParams === "OAuthCallback") {
        toast.error("Something went wrong. Please try again later.");
      }
      if (errorParams === "AccessDenied") {
        toast.error("Access denied. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  }, [errorParams]);

  return (
    <FlexColStart className="w-full h-full min-h-screen gap-0 overflow-y-scroll bg-dark-103 scroll-smooth hideScrollBar">
      <Seo
        title="Veloz"
        description="A simple, fast, and reliable starter kit for your SaaS project."
      />
      <HomeTopBar scrollVisible={scrollVisible} />
      <FlexColCenter className="w-full mt-[10em] px-6">
        <FlexColStartCenter className="w-full md:max-w-[400px]">
          <FlexColStart className="w-full">
            <h1 className="font-ppSB text-2xl text-white-100">
              Create a <span className="font-ppEB">Veloz</span> account.
            </h1>
            <p className="text-sm font-ppReg text-white-300">
              Get started by signing in with your github account.
            </p>
          </FlexColStart>
          <br />
          <FlexColStart className="w-full">
            {/* <input
              name="csrfToken"
              type="hidden"
              defaultValue={props.csrfToken}
            /> */}
            <Button
              className="w-[280px] px-8 py-5 rounded-full bg-white-100 dark:bg-dark-102/70 hover:bg-white-100/70 border-solid border-[1px] border-white-400/40 dark:hover:bg-dark-102/70 dark:bg-dark-102 disabled:opacity-[.5] disabled:cursor-not-allowed "
              disabled={loading}
              onClick={handleAuth}
            >
              {loading ? (
                <Spinner color="#fff" size={15} />
              ) : (
                <FlexRowStartCenter className="w-full gap-5">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 128 128"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-white-300"
                  >
                    <g>
                      <path
                        fillRule="evenodd"
                        d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388c0 26.682 17.303 49.317 41.297 57.303c3.017.56 4.125-1.31 4.125-2.905c0-1.44-.056-6.197-.082-11.243c-16.8 3.653-20.345-7.125-20.345-7.125c-2.747-6.98-6.705-8.836-6.705-8.836c-5.48-3.748.413-3.67.413-3.67c6.063.425 9.257 6.223 9.257 6.223c5.386 9.23 14.127 6.562 17.573 5.02c.542-3.903 2.107-6.568 3.834-8.076c-13.413-1.525-27.514-6.704-27.514-29.843c0-6.593 2.36-11.98 6.223-16.21c-.628-1.52-2.695-7.662.584-15.98c0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033c11.526-7.813 16.59-6.19 16.59-6.19c3.287 8.317 1.22 14.46.593 15.98c3.872 4.23 6.215 9.617 6.215 16.21c0 23.194-14.127 28.3-27.574 29.796c2.167 1.874 4.097 5.55 4.097 11.183c0 8.08-.07 14.583-.07 16.572c0 1.607 1.088 3.49 4.148 2.897c23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                        clipRule="evenodd"
                      />
                      <path d="M26.484 91.806c-.133.3-.605.39-1.035.185c-.44-.196-.685-.605-.543-.906c.13-.31.603-.395 1.04-.188c.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28c-.396-.42-.47-.983-.177-1.254c.298-.266.844-.14 1.24.28c.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52c-.37-.538-.37-1.183.01-1.44c.373-.258.97-.025 1.35.507c.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23c-.527-.487-.674-1.18-.343-1.544c.336-.366 1.045-.264 1.564.23c.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486c-.683-.207-1.13-.76-.99-1.238c.14-.477.823-.7 1.512-.485c.683.206 1.13.756.988 1.237m4.943.361c.017.498-.563.91-1.28.92c-.723.017-1.308-.387-1.315-.877c0-.503.568-.91 1.29-.924c.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117c-.7.13-1.35-.172-1.44-.653c-.086-.498.422-.997 1.122-1.126c.714-.123 1.354.17 1.444.663zm0 0" />
                    </g>
                  </svg>
                  <span className="text-xs text-dark-300 dark:text-white-300 font-ppReg">
                    Continue with Github
                  </span>
                </FlexRowStartCenter>
              )}
            </Button>
          </FlexColStart>
        </FlexColStartCenter>
      </FlexColCenter>
    </FlexColStart>
  );
}

export default withoutAuth(Auth as any);

export async function getServerSideProps({ context }: any) {
  const providers = await getProviders();
  // const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      // csrfToken,
    },
  };
}
