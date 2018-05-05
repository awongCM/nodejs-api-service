class PropertyPayloadModule {
  constructor() {
    console.log('Ready to use PropertyPayloadModule!');
  }

  examineJSON(jsonData) {
    if(jsonData.hasOwnProperty('payload')){
      console.log('Initial payload: ' + JSON.stringify(jsonData));
      return jsonData;
    } else {
      throw new Error("Bad payload form!");
    }
  }
  
  filterPayload(jsonData) {
    // assumes the data has the correct payload
    let allItems = jsonData["payload"],
        typeFilter = 'htv',
        workflowFilter = 'completed';
  
    let filteredItems = allItems.filter(item => {
      if(item.type === typeFilter) return item;
    });
  
    filteredItems = filteredItems.filter(item => {
      if(item.workflow === workflowFilter) return item;
    });
  
    console.log(workflowFilter + " items: " + filteredItems.length);
  
    if(filteredItems.length !== 0) {
      return filteredItems;
    }else {
      return [];
    }
  }
  
  constructJSONData(propertyItems) {
    
    let properties_arr = [], 
        jsonObj = {response: properties_arr};
  
    if (propertyItems.length !== 0) {    
      for (const item of propertyItems) {
        let concatenatedAddress = this.concatAddress(item.address);
        
        properties_arr.push({
          concataddress: concatenatedAddress,
          type: item.type,
          workflow: item.workflow
        });
      }
      jsonObj.response = properties_arr;
    }
    
    return jsonObj;
  }
  
  concatAddress(addressObj) {
    let combinedAddress = "", delimiter = " ";
  
    const address_props = ["buildingNumber","street", "suburb", "state", "postcode"];

    for (const props of address_props) {
      if (addressObj.hasOwnProperty(props)) {
        combinedAddress += addressObj[props] + delimiter;
      } 
    }
  
    return combinedAddress.trim();
  }
}

module.exports = PropertyPayloadModule;