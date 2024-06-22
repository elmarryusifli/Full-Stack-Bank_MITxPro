function NavBar() {

  function handleLogout() {
    firebase.auth().signOut()
      .then (() => {
        let homeLinkAnchor = document.getElementById('homeLinkAnchor');
        homeLinkAnchor.click();
      });
  }
   
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <div className="container-xl">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ml-3" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item" id="homeLink">
              <a className="nav-link text-danger" id="homeLinkAnchor" href="#/">Home</a>
            </li>
            <li className="nav-item" id="createLink">
              <a className="nav-link text-light" href="#/CreateAccount/">Create Account</a>
            </li>
            <li className="nav-item" id="balanceLink" style={{display: 'none'}}>
              <a className="nav-link text-light" href="#/balance/">Balance</a>
            </li>
            <li className="nav-item" id="depositLink" style={{display: 'none'}}>
              <a className="nav-link text-light" href="#/deposit/">Deposit</a>
            </li>
            <li className="nav-item" id="withdrawLink" style={{display: 'none'}}>
              <a className="nav-link text-light" href="#/withdraw/">Withdraw</a>
            </li>
            {<li className="nav-item" id="dataLink">
              <a className="nav-link text-light" href="#/AllData/">All Data</a>
            </li>} 
            <li className="nav-item" id="loginLink">
              <a className="nav-link fw-bold text-light" href="#/login/">Log In</a>
            </li> 
            <li className="nav-item" id="logoutLink" style={{display: 'none'}}>
              <a className="nav-link cursor-pointer fw-bold text-danger" onClick={handleLogout}>Log Out</a>
            </li>
          </ul>
        </div>
        <div className="float-end">
          <span className="fw-bold mt-1 text-white" id="loggedInStatus">No User</span>
        </div>
      </div>
    </nav>
  );
}