import Dynamsoft from "dynamsoft-javascript-barcode";

Dynamsoft.BarcodeReader.engineResourcePath =
  "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.3.0-v2/dist/";
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license
Dynamsoft.BarcodeReader.productKeys =
  "t0068NQAAACTVuD0EGs/dmQkA81ffhMNHjD5s5agPuCo+XZrvg051gl0BZsag1eDnh20ONDLloRVRZLXXZMnV7IXH01kIkSk=";
// Dynamsoft.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default Dynamsoft;
