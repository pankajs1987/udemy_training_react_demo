import AssetItems from "./AssetItems";

function AssetItemDetails(props) {
  const assets = props.assets;
  
  return (
    <div className="assets-item">{assets ? <AssetItems assets={assets} /> : "No Record Found"}</div>
  );
}

export default AssetItemDetails;
