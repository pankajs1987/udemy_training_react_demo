import Cards from "../common/Cards";
import "../common/DateComponent.css";
import "./AssetItems.css";
import dateFormat from "dateformat";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const AssetItems = () => {
//  const gridRef = useRef<AgGridReact>(null);
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [isLoading, setisLoading] = useState(true);
  const [httpError, sethttpError] = useState();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  
  
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "customerName", filter: true },
    { field: "amount", filter: true },
    { field: "rateofInterest", filter: true },
    { field: "dateIn", filter: true,cellRenderer: (data) => {
      return  dateFormat(data.value, "dS mmmm yyyy");} },
    { field: "goldWeight", filter: true },
    { field: "silverWeight", filter: true },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    editable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const response = await fetch(
        "https://dailytransactions-99473-default-rtdb.firebaseio.com/customers_new.json"
      );
      if (!response.ok) {
        throw new Error("Not able to fetch customer details");
      }
      const responseData = await response.json();
      const customerDetailsObj = [];
      for (const key in responseData) {
        customerDetailsObj.push({
          key: key,
          customerName: responseData[key].newAsset.customerName,
          amount: responseData[key].newAsset.amount,
          rateofInterest: responseData[key].newAsset.rateofInterest,
          goldWeight: responseData[key].newAsset.goldWeight,
          silverWeight: responseData[key].newAsset.silverWeight,
          dateIn: responseData[key].newAsset.dateIn,
        });
      }
      setRowData(customerDetailsObj);
      setisLoading(false);
    };
    fetchCustomerDetails().catch((error) => {
      setisLoading(false);
      sethttpError("Not able to fetch customer details");
    });
  }, []);

  //Setting row data

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  const onCellValueChanged = useCallback((event) => {
    console.log(
      "onCellValueChanged: " + event.colDef.field + " = " + event.newValue
    );
  }, []);

  const onRowValueChanged = useCallback((event) => {
    var data = event.data;
    console.log("onRowValueChanged: ( New Row Data : ) => "+data);
  }, []);

  return (
    <div>
      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: 1200, height: 1200 }}>
        <AgGridReact 
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          editType={"fullRow"}
          onCellValueChanged={onCellValueChanged}
          onRowValueChanged={onRowValueChanged}
          pagination={true}
        />
      </div>
    </div>
  );
};

export default AssetItems;
