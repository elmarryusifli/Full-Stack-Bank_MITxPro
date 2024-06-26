function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="danger"
      txtcolor="white"
      header="Withdraw Funds"
      status={status}
      body={show ? (
        <WithdrawForm setShow={setShow} setStatus={setStatus} />
      ) : (
        <WithdrawMsg setShow={setShow} setStatus={setStatus} />
      )}
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success!</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Make Another Withdrawal
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const ctx = React.useContext(UserContext);
  const email = ctx.user.email;
  const [amount, setAmount] = React.useState('');
  const [balance, setBalance] = React.useState(0);

  React.useEffect(() => {
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setBalance(data.balance);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus(text);
          console.log('err:', text);
        }
      });
  }, [email, props]);

  function handle() {
    if (isNaN(amount)) {
      props.setStatus('Error: Please enter a valid number for the withdrawal.');
      return;
    }

    if (parseFloat(amount) < 0) {
      props.setStatus('Error: Please enter a non-negative withdrawal amount.');
      return;
    }

    if (parseFloat(amount) > parseFloat(balance)) {
      props.setStatus(
        'Error: Insufficient funds. Withdrawal amount exceeds account balance.'
      );
      return;
    }

    fetch(`/account/update/${email}/-${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.value));
          props.setShow(false);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus('Withdrawal failed');
          console.log('err:', text);
        }
      });
  }

  return (
    <>
      <h5>Current balance: ${parseFloat(balance).toFixed(2)}</h5>

      Withdrawal Amount<br/>
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br/>

      <button type="submit" className="btn btn-light" onClick={handle}>
        Withdraw
      </button>
    </>
  );
}