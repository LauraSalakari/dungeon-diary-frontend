import {Box} from "@mui/material"
import {keyframes} from "@mui/system"

const bounce = keyframes`
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
`

export default function TypingIndicator() {
    return (
        <Box display="flex" gap={0.5}>
            {[0, 1, 2].map((i) => (
                <Box
                    key={i}
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "text.secondary",
                        animation: `${bounce} 1.4s infinite ease-in-out`,
                        animationDelay: `${i * 0.2}s`,
                    }}
                />
            ))}
        </Box>
    )
}