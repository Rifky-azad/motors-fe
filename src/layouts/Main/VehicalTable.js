import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import MUITable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import DeleteDialog from "../src/components/DeleteDialog";
import axios from "axios";
import cookie from "js-cookie";

const useStyles = makeStyles((theme) => ({
  status: {
    padding: "5px",
    minWidth: "70%",
    textAlign: "center",
    color: "#f2f2f2",
    borderRadius: "18px",
  },
  completedStatus: {
    backgroundColor: "#43a047",
  },
  pendingStatus: {
    backgroundColor: "#ffa000",
  },
  deliveredStatus: {
    backgroundColor: "#546e7a",
  },
}));

function CustomerList({ customers, getAllCustomers }) {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const deleteFunction = () => {
    axios
      .delete("http://localhost:1337/users" + id, {
        Headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      })
      .then(() => {
        // getAllCustomers();                                                       

        
      }).catch((err)=>{
        console.error(err)
      });
  };

  const columns = [
    "vehical_number",
    "module",
    "vehical_type",
    {
      name: "millage",
      options: {
        setCellHeaderProps: () => ({
          style: { display: "flex", justifyContent: "center" },
        }),
        customBodyRender: (value, tableMeta, updatedValue) => {
          return (
            <div className={`${classes.status} ${value ? classes.pendingStatus : classes.completedStatus}`}>
              {" "}
              {value ? "Blocked" : "Active"}{" "}
            </div>
          );
        },
      },
    },
    {
      name: "service_notes ",
      options: {
        filter: false,
        download: false,
        sort: false,
        setCellProps: () => ({
          style: { textAlign: "center" },
        }),
        setCellHeaderProps: () => ({
          style: { textAlign: "center" },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <IconButton color="primary">
                <Edit color="inherit" />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  setId(value)
                  setIsOpenDialog(true);
                }}
              >
                <Delete color="error" />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  const options = {
    onRowDelete: (dataIndex, data) => {},
    download: false,
    filter: false,
    print: false,
    search: false,
    viewColumns: false,
    fixedHeader: true,
    fixedSelectColumn: true,
    pagination: true,
    responsive: "standard",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
  };

  return (
    <>
      <DeleteDialog outSideFunction={deleteFunction} closeDialog={() => setIsOpenDialog(false)} open={isOpenDialog} />
      <MUITable title="List of all Customer" columns={columns} options={options} data={customers} className="card" />
    </>
  );
}

export default CustomerList;
