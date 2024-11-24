import { Trophy } from "lucide-react";

function ProductHuntBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm">
      <Trophy className="h-4 w-4 text-[#DA552F]" />
      <span className="font-medium text-gray-700">
        Available on Product Hunt
      </span>
    </div>
  );
}

export default ProductHuntBadge;
