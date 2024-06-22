function Home() {
  return (
    <>
      <Card
        bgcolor="info"
        txtcolor="red"
        header="Full Stack Bank App Landing Module"
        title="Welcome to the bank!"
        text="You can move around using the navigation bar."
        body={(
          <>
            <div className="d-flex justify-content-center">
              <img src="./bank.jpg" className="img-fluid" alt="Bank logo" style={{ maxWidth: '100%' }} />
            </div>
            <div className="text-end mt-2">
              <a href="https://unsplash.com/photos/grey-concrete-building-2_K82gx9Uk8" target="_blank" rel="noreferrer">Photo source</a>
            </div>
          </>
        )}
      /> 
    </> 
  );  
}