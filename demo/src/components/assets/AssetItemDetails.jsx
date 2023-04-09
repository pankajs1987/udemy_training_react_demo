import AddAssets from "./AddAssets";
import AssetItems from "./AssetItems";

function AssetItemDetails(props) {
  const assets = props.assets;
  const roi = props.roi;
  
  return (
    <div >
      {assets ? <AssetItems assets={assets} roi={roi} saveOrUpdateAssetHandler={props.saveOrUpdateAssetHandler} openPopup = {props.openPopup}/> : "No Record Found"}</div>
  );
}

export default AssetItemDetails;
