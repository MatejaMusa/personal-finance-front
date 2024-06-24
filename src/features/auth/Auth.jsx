import AuthForm from "./AuthForm";

export const Auth = () => {
  return (
    <div
      style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(9, 1fr)', 
            height: '100vh'
          }}
    >
      <main
        style={{
            gridColumn: '4 / span 3',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: '20px'
        }}
      >
        <h1 style={{ color: '#ff8906' }}>Personal Finance App</h1>
        <div style={{ width: '100%', border: '1px solid #ff8906', backgroundColor: 'white' }}>

        <AuthForm />
        </div>
      </main>
    </div>
  );
};
