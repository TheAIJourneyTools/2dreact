const groundContainerStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  display: 'flex',
  alignItems: 'end',
  left: 0,
};

export default function Ground({
  groundRef,
  children,
}: {
  groundRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={groundRef}
      style={{
        ...groundContainerStyle,
      }}
    >
      {children}
    </div>
  );
}
