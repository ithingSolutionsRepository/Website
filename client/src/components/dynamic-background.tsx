import { useBackground, backgroundGradients } from "@/lib/background-context";

export function DynamicBackground() {
  const { currentBackground } = useBackground();
  const gradients = backgroundGradients[currentBackground];

  return (
    <>
      <style>{`
        @keyframes bg-float-1 {
          0%, 100% { transform: translate(20%, -30%) scale(1); }
          50% { transform: translate(15%, -25%) scale(1.1); }
        }
        @keyframes bg-float-2 {
          0%, 100% { transform: translate(-20%, 30%) scale(1); }
          50% { transform: translate(-15%, 25%) scale(1.15); }
        }
        @keyframes bg-float-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.15; }
        }
        @keyframes bg-float-4 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes bg-float-5 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(-15px); }
        }
      `}</style>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradients.primary}`}
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
            animation: "bg-float-1 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)",
            animation: "bg-float-2 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 60%)",
            animation: "bg-float-3 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
            animation: "bg-float-4 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-[350px] h-[350px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            animation: "bg-float-5 9s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}
