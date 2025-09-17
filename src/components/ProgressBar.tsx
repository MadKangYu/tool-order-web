interface ProgressBarProps {
  current: number;
  min: number;
  max: number;
  showPercentage?: boolean;
  height?: string;
}

export default function ProgressBar({
  current,
  min,
  max,
  showPercentage = true,
  height = 'h-6'
}: ProgressBarProps) {
  const percentage = Math.min(((current - min) / (max - min)) * 100, 100);
  const remaining = max - current;
  const isAlmostComplete = percentage >= 80;
  const isComplete = current >= max;

  return (
    <div className="w-full">
      <div className={`relative bg-gray-200 rounded-full overflow-hidden ${height}`}>
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${
            isComplete ? 'bg-green-500' : isAlmostComplete ? 'bg-orange-500' : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
        </div>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-700">
              {current}명 / {max}명
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-600">
        <span>{min}명 (최소)</span>
        {!isComplete && remaining > 0 && (
          <span className="font-semibold text-red-600">
            {remaining}명 더 필요!
          </span>
        )}
        {isComplete && (
          <span className="font-semibold text-green-600">
            목표 달성! 🎉
          </span>
        )}
      </div>
    </div>
  );
}