const Backoffice = () => {
  return (
    <div className={styles.body}>
      <BackofficeNav />
      <BackofficeCompany />
      <BackofficeHome />
      <BackofficeProducts />
      <BackofficeUsers />
    </div>
  );
};

export default Backoffice;
