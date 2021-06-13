import React, { useState } from "react";
import CustomerForm from "../src/CustomerForm";
import CustomerTable from "../src/CustomerTable";
import Main from "../src/layouts/Main";
import Button from "@material-ui/core/Button";
import axios from "axios";
import cookie from "js-cookie";

export default function page() {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const getAllCustomers = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:1337/users", {
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      })
      .then((res) => {
        const data = [];
        res.data.map((value) => {
          if (value.role["name"] == "customer") {
            data.push([value["name"], value["email"], value["blocked"], value["_id"]]);
          }
        });

        setCustomers(data);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getAllCustomers();
  }, []);

  const closeDialog = () => setIsShowDialog(false);
  return (
    <Main isLoading={isLoading}>
      <Button variant="contained" color="primary" onClick={() => setIsShowDialog(true)}>
        New Customer
      </Button>
      <CustomerForm isShowDialog={isShowDialog} closeDialog={closeDialog} getAllCustomers={getAllCustomers} />
      <CustomerTable customers={customers} getAllCustomers={getAllCustomers} />
    </Main>
  );
}
