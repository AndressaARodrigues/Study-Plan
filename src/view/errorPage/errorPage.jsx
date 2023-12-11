import Navbar from '../../components/navbar/mainNavigation';

function ErrorPage() {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2em',
    marginBottom: '10px',
    color: '#e74c3c', // Cor vermelha para indicar erro
  };

  const messageStyle = {
    fontSize: '1.2em',
    color: '#777', // Cor cinza para o texto informativo
  };

  return (
    <>
      <Navbar />
      <div style={styles}>
        <h1 style={titleStyle}>Ops! Algo deu errado.</h1>
        <p style={messageStyle}>
          A página que você está procurando não pode ser encontrada ou não existe.
        </p>
      </div>
    </>
  );
}

export default ErrorPage;
