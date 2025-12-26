export default function CircleProgress({ value = 0, size = 25 }) {
    const radius = (size - 4) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="text-primary transition-all"
                strokeLinecap="round"
            />
        </svg>
    );
}
