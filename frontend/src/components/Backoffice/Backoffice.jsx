const Backoffice = () => {
  const token = getUserToken();
  const isLogged = !!token;
  const userRole = getUserRole();

  if (isLogged && userRole === 'admin') {
    return (
      <div className={styles.body}>
        <BackofficeNav />
        <BackofficeCompany />
        <BackofficeHome />
        <BackofficeProducts />
        <BackofficeUsers />
      </div>
    );
  } else {
    navigate('/backofficeLogin');
    return null;
  }
};
