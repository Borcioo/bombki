import translations from "const/translations.json";

const ViewOnTreeButton = ({ handleShowTree, lang }) => {
  return (
    <button
      onClick={handleShowTree}
      className="absolute hidden sm:flex items-center max-h-[44px] justify-center rounded-[99px] border-[1px] min-w-[260px] border-[#2EA3F2] z-[1000] text-center flex-row gap-[10px] py-[10px] right-[10px] bottom-[10px]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <g clipPath="url(#clip0_69_44)">
          <rect width="24" height="24" transform="translate(0.535156 0.499878)" fill="none" />
          <path
            opacity="0.35"
            d="M12.4565 1.47546L22.0635 6.98766V18.0121L12.4565 23.5243L3.00687 18.0121V6.98766L12.4565 1.47546Z"
            stroke="#2EA3F2"
            strokeMiterlimit="10"
          />
          <path
            d="M12.4565 1.47546V5.38747"
            stroke="#2EA3F2"
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M10.2522 2.75157L12.4563 1.47546"
            stroke="#2EA3F2"
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M14.6606 2.75157L12.4565 1.47546"
            stroke="#2EA3F2"
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M22.0633 18.0122L18.5807 16.0166"
            stroke="#2EA3F2"
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M22.0634 15.4926V18.0123"
            stroke="#2EA3F2"
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M19.8554 19.2905L22.0635 18.0121"
            stroke="#2EA3F2"
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M3.0069 18.0122L6.44928 16.007"
            stroke="#2EA3F2"
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M3.00696 15.1726V18.0123"
            stroke="#2EA3F2"
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M5.21498 19.2905L3.0069 18.0121"
            stroke="#2EA3F2"
            strokeWidth="1.3"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M8.02274 14.9897V9.86226L12.4562 7.36853L16.8896 9.86226V14.9897L12.4562 17.622L8.02274 14.9897Z"
            stroke="#2EA3F2"
            strokeWidth="1.3"
          />
          <path
            d="M7.88889 9.82263L12.4561 12.5M12.4561 12.5V17.6973M12.4561 12.5L17.0234 9.82263"
            stroke="#2EA3F2"
            strokeWidth="1.3"
            strokeMiterlimit="10"
          />
        </g>
        <defs>
          <clipPath id="clip0_69_44">
            <rect width="24" height="24" fill="white" transform="translate(0.535156 0.499878)" />
          </clipPath>
        </defs>
      </svg>
      <span className="text-[#2EA3F2]">{translations[lang].tree}</span>
    </button>
  );
};

export default ViewOnTreeButton;
