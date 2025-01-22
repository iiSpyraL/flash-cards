const SVG = ({
  width = "4rem",
}: {
  width?: string;
}) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 36 36"
    aria-hidden="true"
    role="img"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      fill="#ED2939"
      d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
    ></path>
    <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"></path>
    <path fill="#EEE" d="M12 5h12v26H12z"></path>
  </svg>
);

export default SVG;
