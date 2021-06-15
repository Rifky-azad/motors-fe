import React, { useState } from "react";
import VehicleForm from "../src/VehicleForm";
import VehicleTable from "../src/VehicleTable";
import Main from "../src/layouts/Main";
import Button from "@material-ui/core/Button";
import axios from "axios";
import cookie from "js-cookie";

export default function page() {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const getVehicleTypes = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:1337/vehicle-types", {
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      })
      .then((res) => {
        setVehicleTypes(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => setIsLoading(false));
  };

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
            data.push(value);
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
    getVehicleTypes();
  }, []);

  const getAllVehicle = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:1337/vehicles", {
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      })
      .then((res) => {
        const data = [];
        res.data.map((value) => {
          data.push([
            value["vehicle_number"],
            value["users_permissions_user"]["name"],
            value["model"],
            value["vehicle_type"]["name"],
            value["milage"],
            value["service_notes"],
            value["_id"],
          ]);
        });
        setVehicle(data);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getAllVehicle();
  }, []);

  const closeDialog = () => setIsShowDialog(false);
  return (
    <Main isLoading={isLoading}>
      <Button variant="contained" color="primary" onClick={() => setIsShowDialog(true)}>
        New Vehicle
      </Button>
      <VehicleForm
        isShowDialog={isShowDialog}
        closeDialog={closeDialog}
        getAllVehicle={getAllVehicle}
        customers={customers}
        vehicleTypes={vehicleTypes}
      />
      <VehicleTable vehicle={vehicle} getAllVehicle={getAllVehicle} />
    </Main>
  );
}
