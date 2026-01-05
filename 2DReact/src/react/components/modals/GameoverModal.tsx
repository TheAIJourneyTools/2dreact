export default function GameoverModal(): React.ReactNode {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2rem',
        }}
      >
        <div>Game Over</div>
        <div
          style={{
            fontSize: '1rem',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <button
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '5px',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
