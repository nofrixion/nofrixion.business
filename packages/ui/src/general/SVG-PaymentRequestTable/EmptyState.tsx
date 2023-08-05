import * as React from "react";
import { Button } from "../../atoms";

interface EmptyStateProps {
  state: "nothingFound" | "empty";
  onCreatePaymentRequest?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ state, onCreatePaymentRequest }) => {
  const title = state === "nothingFound" ? "Nothing found here" : "This list is empty";
  const description =
    state === "nothingFound"
      ? "No payment requests match this criteria."
      : "Start requesting payments from your customers.";

  return (
    <div className="flex flex-col items-center justify-center text-center my-16">
      <div className="w-auto h-[9.375rem] mx-auto mb-6">
        <svg width="150" height="153" viewBox="0 0 150 153" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0C33.5786 0 0 33.5786 0 75C0 116.421 33.5786 150 75 150Z"
            fill="#EDF2F7"
          />
          <g filter="url(#filter0_d_2196_15603)">
            <mask
              id="mask0_2196_15603"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="150"
              height="150"
            >
              <path
                d="M75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0C33.5786 0 0 33.5786 0 75C0 116.421 33.5786 150 75 150Z"
                fill="url(#paint0_linear_2196_15603)"
              />
            </mask>
            <g mask="url(#mask0_2196_15603)">
              <path
                d="M118 43H32C29.2386 43 27 45.2386 27 48V153C27 155.761 29.2386 158 32 158H118C120.761 158 123 155.761 123 153V48C123 45.2386 120.761 43 118 43Z"
                fill="white"
              />
            </g>
          </g>
          <path
            d="M66 53H40C38.3431 53 37 54.3431 37 56C37 57.6569 38.3431 59 40 59H66C67.6569 59 69 57.6569 69 56C69 54.3431 67.6569 53 66 53Z"
            fill="#EDF2F7"
          />
          <path
            d="M108 66H42C39.7909 66 38 67.5919 38 69.5556V78.4444C38 80.4081 39.7909 82 42 82H108C110.209 82 112 80.4081 112 78.4444V69.5556C112 67.5919 110.209 66 108 66Z"
            stroke="#EDF2F7"
            strokeWidth="2"
          />
          <path
            d="M108 88H42C39.7909 88 38 89.5919 38 91.5556V100.444C38 102.408 39.7909 104 42 104H108C110.209 104 112 102.408 112 100.444V91.5556C112 89.5919 110.209 88 108 88Z"
            stroke="#EDF2F7"
            strokeWidth="2"
          />
          <path
            d="M42 111H108C110.209 111 112 112.791 112 115V123C112 125.209 110.209 127 108 127H42C39.7909 127 38 125.209 38 123V115C38 112.791 39.7909 111 42 111Z"
            stroke="#EDF2F7"
            strokeWidth="2"
          />
          <defs>
            <filter
              id="filter0_d_2196_15603"
              x="21"
              y="34"
              width="108"
              height="119"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="-3" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2196_15603" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2196_15603" result="shape" />
            </filter>
            <linearGradient
              id="paint0_linear_2196_15603"
              x1="75"
              y1="0"
              x2="75"
              y2="150"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F6F8F9" />
              <stop offset="1" stopColor="#F6F8F9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="text-xl/6 mb-2 font-semibold">{title}</p>
      <p className="text-sm/4 text-greyText">{description}</p>

      {state === "empty" && onCreatePaymentRequest && (
        <Button size="big" onClick={onCreatePaymentRequest} className="mt-[2.625rem] w-64">
          Create payment request
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
