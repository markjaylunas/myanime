type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      {...props}
      width="30"
      height="12"
      viewBox="0 0 190 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 65.7254C20 43.892 42.4 2.82538 52 13.2254C64 26.2254 49 77.7254 71.5 61.7254C94 45.7254 109 -25.7746 125 35.2254C137.8 84.0254 167.667 55.5587 181 35.2254"
        stroke="currentColor"
        strokeWidth="21"
      />
    </svg>
  ),
};
