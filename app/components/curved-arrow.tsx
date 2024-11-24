function CurvedArrow() {
  return (
    <div className="absolute left-[55%] top-[45%] transform z-10">
      <svg
        width="400"
        height="250"
        viewBox="0 0 400 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20C20 20 150 30 250 80C350 130 360 200 360 200"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-gray-400"
        />
        <path
          d="M360 200L350 180M360 200L340 190"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-gray-400"
        />
      </svg>
    </div>
  );
}
export default CurvedArrow;
