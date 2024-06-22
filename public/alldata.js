function priceFormatter(cell, row){
  return '$' + Number(cell).toFixed(2);
}

function Table() {
  const [data, setData] = React.useState([]);    

  React.useEffect(() => {
      fetch('/account/all')
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setData(data);                
          });
  }, []);

  return (
    <BootstrapTable
        data={data}
        bodyStyle={{ border: "none" }}
        tableStyle={{ border: "none" }}
        headerStyle={{ border: "none !important" }}
        striped
        version="4"
        height="500"
    >
      <TableHeaderColumn isKey dataField={'name'}>
        Name
      </TableHeaderColumn>
      <TableHeaderColumn dataField={'email'}>
        Email
      </TableHeaderColumn>
      <TableHeaderColumn dataField={'balance'} dataFormat={priceFormatter}>
        Balance
      </TableHeaderColumn>
    </BootstrapTable>
  );
}

function AllData() {
  return (
    <>
      <Card
        bgcolor="light"
        txtcolor="black"
        header={'All Bank Accounts'}
        body={<Table/>}
      />
    </>
  );
}