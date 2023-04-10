import AssetItems from "./AssetItems";

function AssetItemDetails(props) {
  const assets = props.assets;
  const roi = props.roi;
  
  return (
    <div >
      {/* {assets ? <AssetItems assets={assets} roi={roi} saveOrUpdateAssetHandler={props.saveOrUpdateAssetHandler} /> : "No Record Found"}</div> */}
      <AssetItems assets={assets} roi={roi} saveOrUpdateAssetHandler={props.saveOrUpdateAssetHandler} goldRates={props.goldRates} silverRates={props.silverRates} /></div>
  );
}

export default AssetItemDetails;
