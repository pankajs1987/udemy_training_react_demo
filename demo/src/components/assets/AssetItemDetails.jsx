import AssetItems from "./AssetItems";
import * as React from "react";

function AssetItemDetails(props) {
  const {assets,roi,saveOrUpdateAssetHandler,goldRates,silverRates} = props;
  return (
    <div>
      <AssetItems
        assets={assets}
        roi={roi}
        saveOrUpdateAssetHandler={saveOrUpdateAssetHandler}
        goldRates={goldRates}
        silverRates={silverRates}
      />
    </div>
  );
}

export default AssetItemDetails;
