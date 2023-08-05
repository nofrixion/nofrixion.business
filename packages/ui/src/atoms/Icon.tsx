import * as React from "react";

import { cn } from "@nofrixion/utils";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size: "8" | "12" | "16" | "24";
}

const SVG: React.FC<SVGProps> = ({ className, size, children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    {...props}
  >
    {children}
  </svg>
);

export const Icons = {
  "bank/24": (className: string) => (
    <SVG className={className} size="24">
      <path
        d="M3 21L3.75943 18.3415C3.78784 18.2422 3.84236 18.1557 3.91528 18.0944C3.98819 18.0331 4.0758 18.0001 4.16571 18H19.8343C19.9242 18.0001 20.0118 18.0331 20.0847 18.0944C20.1576 18.1557 20.2122 18.2422 20.2406 18.3415L21 20.996"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 10H19V18H5V10Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 21H2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M20.9778 7.66065C21.0094 7.56246 21.0072 7.45597 20.9715 7.35928C20.9359 7.26258 20.869 7.18166 20.7822 7.13025L12.2181 2.06002C12.1523 2.0207 12.0777 2 12.0017 2C11.9258 2 11.8512 2.0207 11.7854 2.06002L3.21777 7.12666C3.131 7.17807 3.06411 7.259 3.02846 7.35569C2.9928 7.45239 2.99059 7.55888 3.02219 7.65707L3.68336 9.69358C3.71205 9.78275 3.7671 9.86032 3.84071 9.91531C3.91433 9.9703 4.00279 9.99993 4.09357 10H19.9134C20.0041 9.99993 20.0926 9.9703 20.1662 9.91531C20.2398 9.86032 20.2949 9.78275 20.3236 9.69358L20.9778 7.66065Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21 7.5H3" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "card/24": (className: string) => (
    <SVG className={className} size="24">
      <path
        d="M18.424 7H3.57214C2.70873 7 2.00879 7.72667 2.00879 8.62307V18.3615C2.00879 19.2579 2.70873 19.9845 3.57214 19.9845H18.424C19.2874 19.9845 19.9874 19.2579 19.9874 18.3615V8.62307C19.9874 7.72667 19.2874 7 18.424 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.00879 10H19.9874" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.9908 13H14.9932" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.2593 13H4.00586" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.00348 16H4.00586" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4.00586 6.48006V4.62307C4.00586 3.72667 4.74468 3 5.65607 3H21.333C22.2444 3 22.9832 3.72667 22.9832 4.62307V14.3615C22.9832 15.2579 22.2444 15.9845 21.333 15.9845H20.1998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  "wallets/24": (className: string) => (
    <SVG className={className} size="24">
      <path d="M16.9435 17.4673H4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M17 12.5539V20.2609C17 20.7222 16.7893 21.1645 16.4143 21.4907C16.0391 21.8169 15.5304 22 15 22H6C5.46957 22 4.96086 21.8169 4.58578 21.4907C4.21071 21.1645 4 20.7222 4 20.2609V3.73913C4 3.27789 4.21071 2.83553 4.58578 2.50938C4.96086 2.18323 5.46957 2 6 2H13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7489 19.9978C10.6114 19.9978 10.5 19.8863 10.5 19.7489C10.5 19.6114 10.6114 19.5 10.7489 19.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.749 19.9978C10.8865 19.9978 10.9979 19.8863 10.9979 19.7489C10.9979 19.6114 10.8865 19.5 10.749 19.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4783 12.4979C20.7776 12.4979 23.4522 9.82326 23.4522 6.52396C23.4522 3.22466 20.7776 0.550049 17.4783 0.550049C14.179 0.550049 11.5044 3.22466 11.5044 6.52396C11.5044 9.82326 14.179 12.4979 17.4783 12.4979Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2705 3.24634H18.7664C17.8971 3.24634 17.0635 3.59165 16.4488 4.20632C15.8341 4.82099 15.4888 5.65466 15.4888 6.52393C15.4888 7.3932 15.8341 8.22686 16.4488 8.84153C17.0635 9.4562 17.8971 9.80151 18.7664 9.80151H19.2705"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.501 5.51123H17.9519" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.501 7.53662H17.9519" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "bitcoin/24": (className: string) => (
    <SVG className={className} size="24">
      <path d="M9.11523 11.1265L13.4619 12.2912" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.1777 7.55636L13.6953 5.62451" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.8481 16.2495L10.3305 18.1814" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M14.6265 7.94447C15.2029 8.09892 15.6943 8.47601 15.9927 8.9928C16.291 9.50959 16.3719 10.1237 16.2174 10.7001C16.063 11.2766 15.6859 11.768 15.1691 12.0664C14.6523 12.3647 14.0382 12.4456 13.4618 12.2911C14.0382 12.4456 14.5296 12.8227 14.828 13.3395C15.1263 13.8563 15.2072 14.4704 15.0528 15.0468C14.8983 15.6232 14.5212 16.1147 14.0044 16.413C13.4876 16.7114 12.8735 16.7923 12.2971 16.6378L7.95041 15.4731L10.2798 6.77979L14.6265 7.94447Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  "back/24": (className: string) => (
    <SVG className={className} size="24">
      <path d="M11 22L1 12L11 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 12H23" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "next/24": (className: string) => (
    <SVG className={className} size="24">
      <path d="M13 2L23 12L13 22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 12L1 12" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "close/24": (className: string) => (
    <SVG className={className} size="24">
      <path d="M22 22L12 12L22 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 2L12 12L2 22" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "close/16": (className: string) => (
    <SVG className={className} size="16">
      <path d="M2 2L14 14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2L2.00001 14" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "back/16": (className: string) => (
    <SVG className={className} size="16">
      <path d="M7.66665 14.5L1 8L7.66665 1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 8H15" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "next/16": (className: string) => (
    <SVG className={className} size="16">
      <path d="M8.33335 1.5L15 8L8.33335 14.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 8L1 8" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "add/16": (className: string) => (
    <SVG className={className} size="16">
      <path d="M1 8H15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 1L8 15" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "capture/16": (className: string) => (
    <SVG className={className} size="24">
      <path
        d="M0.5 8C0.5 9.98912 1.29018 11.8968 2.6967 13.3033C4.10322 14.7098 6.01088 15.5 8 15.5C9.98912 15.5 11.8968 14.7098 13.3033 13.3033C14.7098 11.8968 15.5 9.98912 15.5 8C15.5 6.01088 14.7098 4.10322 13.3033 2.6967C11.8968 1.29018 9.98912 0.5 8 0.5C6.01088 0.5 4.10322 1.29018 2.6967 2.6967C1.29018 4.10322 0.5 6.01088 0.5 8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 5L7.82611 10.5691C7.7445 10.6925 7.64058 10.7946 7.52134 10.8684C7.4021 10.9423 7.27032 10.9862 7.13488 10.9972C6.99945 11.0083 6.8635 10.9862 6.73622 10.9324C6.60893 10.8786 6.49327 10.7945 6.39702 10.6856L4.5 8.52867"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  "euros/16": (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  "delete/16": (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M12.0384 14.923H3.96146C3.65544 14.923 3.36196 14.8014 3.14557 14.585C2.92918 14.3686 2.80762 14.0752 2.80762 13.7691V3.38452H13.1922V13.7691C13.1922 14.0752 13.0707 14.3686 12.8543 14.585C12.6379 14.8014 12.3444 14.923 12.0384 14.923Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.26904 11.4616V6.84619" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.73096 11.4616V6.84619" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.5 3.38452H15.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9.73063 1.0769H6.26907C5.96306 1.0769 5.66957 1.19847 5.45319 1.41486C5.23679 1.63124 5.11523 1.92473 5.11523 2.23075V3.3846H10.8844V2.23075C10.8844 1.92473 10.7629 1.63124 10.5465 1.41486C10.3301 1.19847 10.0366 1.0769 9.73063 1.0769Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  "edit/16": (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M14.7933 1.2066C14.5663 0.980492 14.2967 0.801613 14.0001 0.6803C13.7036 0.558986 13.3859 0.497642 13.0655 0.499811C12.7451 0.501981 12.4282 0.567621 12.1333 0.69294C11.8384 0.818259 11.5713 1.00077 11.3473 1.22993L1.68067 10.8966L0.5 15.4999L5.10333 14.3193L14.77 4.6526C14.9992 4.42864 15.1817 4.1615 15.307 3.8666C15.4323 3.57169 15.498 3.25488 15.5001 2.93447C15.5023 2.61405 15.4409 2.29638 15.3196 1.9998C15.1983 1.70323 15.0194 1.43364 14.7933 1.2066Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.0708 1.50659L14.4935 4.92926" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.6748 2.90259L13.0975 6.32525" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.68066 10.8967L5.10666 14.3161" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "check/16": (className: string) => (
    <SVG className={className} size="16">
      <path d="M14.3333 3.33335L5.66665 12L2 8.33335" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "search/16": (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M1.25664 8.82093C1.85501 10.2289 2.98818 11.3415 4.40687 11.914C5.82556 12.4864 7.41356 12.4719 8.82152 11.8735C10.2295 11.2751 11.3421 10.142 11.9145 8.72327C12.487 7.30458 12.4725 5.71658 11.8741 4.30862C11.2757 2.90066 10.1425 1.78807 8.72386 1.2156C7.30517 0.643133 5.71717 0.657684 4.30921 1.25605C2.90125 1.85442 1.78866 2.98759 1.21619 4.40628C0.643721 5.82497 0.658273 7.41297 1.25664 8.82093V8.82093Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 11L15 15" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "copy/16": (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M11.1667 3V1.16667C11.1667 0.79848 10.8682 0.5 10.5 0.5H1.16667C0.79848 0.5 0.5 0.798473 0.5 1.16667V10.5C0.5 10.8682 0.79848 11.1667 1.16667 11.1667H3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.8335 5.49992C4.8335 5.13173 5.13198 4.83325 5.50016 4.83325H14.8335C15.2017 4.83325 15.5002 5.13173 15.5002 5.49992V14.8333C15.5002 15.2015 15.2017 15.4999 14.8335 15.4999H5.50016C5.13197 15.4999 4.8335 15.2015 4.8335 14.8333V5.49992Z"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  "duplicate/16": (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M11.1663 4.17263V3.414C11.1663 3.14897 11.0611 2.8948 10.8737 2.70733L8.95899 0.792667C8.77152 0.605321 8.51739 0.500057 8.25232 0.5H2.83301C2.56779 0.5 2.31344 0.605357 2.1259 0.792893C1.93837 0.980427 1.83301 1.23479 1.83301 1.5V10.8333C1.83301 11.0985 1.93837 11.3529 2.1259 11.5405C2.31344 11.728 2.56779 11.8333 2.83301 11.8333H4.83051"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1668 14.5001C14.1668 14.7653 14.0615 15.0197 13.874 15.2072C13.6864 15.3947 13.432 15.5001 13.1668 15.5001H5.8335C5.56828 15.5001 5.31392 15.3947 5.12639 15.2072C4.93886 15.0197 4.8335 14.7653 4.8335 14.5001V5.16675C4.8335 4.90153 4.93886 4.64717 5.12639 4.45964C5.31392 4.27211 5.56828 4.16675 5.8335 4.16675H11.2528C11.5178 4.1668 11.772 4.27207 11.9595 4.45941L13.8742 6.37408C14.0615 6.56155 14.1668 6.81575 14.1668 7.08075V14.5001Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.3335 7.33325H10.0002" strokeLinecap="round" />
      <path d="M7.3335 10H11.6668" strokeLinecap="round" />
      <path d="M7.3335 12.6667H11.6668" strokeLinecap="round" />
    </SVG>
  ),
  "tag/16": (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M0.70752 1.70679V5.87812C0.707456 6.40841 0.917999 6.91703 1.29285 7.29212L9.00019 15.0001C9.18771 15.1876 9.44202 15.2929 9.70719 15.2929C9.97235 15.2929 10.2267 15.1876 10.4142 15.0001L15.0002 10.4135C15.1877 10.2259 15.293 9.97162 15.293 9.70645C15.293 9.44129 15.1877 9.18698 15.0002 8.99945L7.29285 1.29212C6.91776 0.917266 6.40915 0.706724 5.87885 0.706787H1.70752C1.4423 0.706787 1.18795 0.812144 1.00041 0.99968C0.812876 1.18722 0.70752 1.44157 0.70752 1.70679Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.20752 4.20679C3.20752 4.33811 3.23339 4.46814 3.28364 4.58947C3.33389 4.7108 3.40755 4.82104 3.50041 4.91389C3.59327 5.00675 3.70351 5.08041 3.82484 5.13067C3.94616 5.18092 4.0762 5.20679 4.20752 5.20679C4.33884 5.20679 4.46888 5.18092 4.5902 5.13067C4.71153 5.08041 4.82177 5.00675 4.91463 4.91389C5.00749 4.82104 5.08114 4.7108 5.1314 4.58947C5.18165 4.46814 5.20752 4.33811 5.20752 4.20679C5.20752 4.07547 5.18165 3.94543 5.1314 3.8241C5.08114 3.70278 5.00749 3.59254 4.91463 3.49968C4.82177 3.40682 4.71153 3.33316 4.5902 3.28291C4.46888 3.23265 4.33884 3.20679 4.20752 3.20679C4.0762 3.20679 3.94616 3.23265 3.82484 3.28291C3.70351 3.33316 3.59327 3.40682 3.50041 3.49968C3.40755 3.59254 3.33389 3.70278 3.28364 3.8241C3.23339 3.94543 3.20752 4.07547 3.20752 4.20679Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  "open/16": (className: string) => (
    <SVG className={className} size="16">
      <path d="M6.1665 9.682L15.4998 0.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.4998 5.74733V0.5H10.1665" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8.08333 3.83325H1.08333C0.928624 3.83325 0.780251 3.89471 0.670854 4.00411C0.561458 4.1135 0.5 4.26188 0.5 4.41659V14.9166C0.5 15.0713 0.561458 15.2197 0.670854 15.3291C0.780251 15.4385 0.928624 15.4999 1.08333 15.4999H11.5833C11.738 15.4999 11.8864 15.4385 11.9958 15.3291C12.1052 15.2197 12.1667 15.0713 12.1667 14.9166V7.91659"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  "link/16": (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M6.24269 12.3333L5.62135 12.9546C5.05874 13.5172 4.29567 13.8333 3.50002 13.8333C2.70436 13.8333 1.9413 13.5172 1.37869 12.9546C0.816073 12.392 0.5 11.6289 0.5 10.8333C0.5 10.0376 0.816073 9.27455 1.37869 8.71194L4.56069 5.52927C5.09417 4.99459 5.8097 4.68081 6.56441 4.6506C7.31911 4.62039 8.05744 4.87597 8.63195 5.3663C9.20647 5.85664 9.57488 6.54564 9.66362 7.29571C9.75237 8.04579 9.55491 8.80174 9.11069 9.41261"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.8788 3.71133L10.3788 3.21133C10.9414 2.64871 11.7045 2.33264 12.5001 2.33264C13.2958 2.33264 14.0588 2.64871 14.6215 3.21133C15.1841 3.77394 15.5001 4.53701 15.5001 5.33266C15.5001 6.12831 15.1841 6.89138 14.6215 7.45399L11.4395 10.636C10.9059 11.1705 10.1903 11.484 9.4357 11.514C8.68107 11.5441 7.94288 11.2884 7.3685 10.798C6.79413 10.3076 6.42584 9.61865 6.33717 8.86865C6.24849 8.11865 6.44595 7.36279 6.89013 6.75199"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  "alert/16": (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M8.87525 1.51685C8.78879 1.36038 8.66199 1.22995 8.50805 1.13911C8.35412 1.04827 8.17865 1.00037 7.99992 1.00037C7.82112 1.00037 7.64565 1.04827 7.49172 1.13911C7.33779 1.22995 7.21099 1.36038 7.12459 1.51685L0.624564 13.5168C0.540509 13.6691 0.497611 13.8406 0.500103 14.0145C0.502595 14.1884 0.550391 14.3586 0.638773 14.5084C0.727159 14.6582 0.853065 14.7823 1.00409 14.8686C1.1551 14.9548 1.32599 15.0002 1.4999 15.0002H14.4999C14.6738 15.0002 14.8447 14.9548 14.9957 14.8686C15.1467 14.7823 15.2727 14.6582 15.3611 14.5084C15.4494 14.3586 15.4972 14.1884 15.4997 14.0145C15.5022 13.8406 15.4593 13.6691 15.3753 13.5168L8.87525 1.51685Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 10V5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12.5C7.86193 12.5 7.75 12.3881 7.75 12.25C7.75 12.1119 7.86193 12 8 12" />
      <path d="M8 12.5C8.13807 12.5 8.25 12.3881 8.25 12.25C8.25 12.1119 8.13807 12 8 12" />
    </SVG>
  ),
  "info/16": (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 6.99805H8V10.998" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 10.998H9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 5C7.86193 5 7.75 4.88807 7.75 4.75C7.75 4.61193 7.86193 4.5 8 4.5" />
      <path d="M8 5C8.13807 5 8.25 4.88807 8.25 4.75C8.25 4.61193 8.13807 4.5 8 4.5" />
    </SVG>
  ),

  "close/12": (className: string) => (
    <SVG className={className} size="16">
      <path d="M2 2L10 10" strokeLinecap="round" />
      <path d="M10 2L2 10" strokeLinecap="round" />
    </SVG>
  ),
  "done/12": (className: string) => (
    <SVG className={className} size="12">
      <path d="M1.5 6.31579L4.34211 9.15789L10.5 3" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  "not-started/12": (className: string) => (
    <SVG className={cn(className, "fill-current stroke-none")} size="12">
      <circle cx="6" cy="6" r="4" />
    </SVG>
  ),
  "partial/12": (className: string) => (
    <SVG className={cn(className, "fill-current stroke-none")} size="12">
      <path d="M2 10H10L2 2V10Z" />
    </SVG>
  ),
  "cancelled/12": (className: string) => (
    <SVG className={cn(className, "fill-current stroke-none")} size="12">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.70712 2.2929C3.3166 1.90237 2.68343 1.90236 2.2929 2.29288C1.90237 2.6834 1.90236 3.31657 2.29288 3.7071L4.58685 6.00112L2.29314 8.29488C1.90262 8.68541 1.90263 9.31858 2.29316 9.7091C2.68369 10.0996 3.31686 10.0996 3.70738 9.70908L6.00104 7.41535L8.2947 9.70908C8.68522 10.0996 9.31839 10.0996 9.70892 9.7091C10.0994 9.31858 10.0995 8.68541 9.70894 8.29489L7.41524 6.00112L9.7092 3.7071C10.0997 3.31657 10.0997 2.6834 9.70918 2.29288C9.31865 1.90236 8.68548 1.90237 8.29497 2.2929L6.00104 4.58689L3.70712 2.2929Z"
      />
    </SVG>
  ),
  "arrow-down/8": (className: string) => (
    <SVG className={className} size="8">
      <path d="M0.5 2L4 5.5L7.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
} as const;

export type IconNames = keyof typeof Icons;

export interface IconProps {
  className?: string;
  name: IconNames;
}

const Icon: React.FC<IconProps> = ({ className, name }) => Icons[name](cn("stroke-current fill-none", className));

Icon.displayName = "Icon";

export { Icon };
