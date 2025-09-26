export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="animated-bg"></div>
      <div className="dots-pattern absolute inset-0 opacity-20"></div>
    </div>
  );
}
