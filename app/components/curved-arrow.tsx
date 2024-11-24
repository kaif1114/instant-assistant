function CurvedArrow() {
  return (
    <div className="absolute left-1/2 top-[90%] -translate-x-1/2 transform z-10">
      <svg
        width="120"
        height="160"
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 5C5 5 26.4 57.2 60 95C93.6 132.8 115 155 115 155"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-gray-400"
        />
        <path
          d="M115 155L105 135M115 155L95 145"
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
