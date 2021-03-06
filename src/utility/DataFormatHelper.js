
export function formatDataForGrid(data, numberOfCol, fillerObj = {}) {
  if (data && data.length) {
    const lastRowNumElements = data.length % numberOfCol; //number of elements in last row
    let formattedData = data.slice(); //make copy of array to avoid mutating/returning original array
    if (lastRowNumElements !== 0) {
      for (let i = lastRowNumElements; i < numberOfCol; i++) {
        formattedData.push(fillerObj);
      }
    }
    return formattedData;
  } else {
    return data;
  }
}

export function getInitialsFromName(name) {
  if (!name) {
    return name;
  }
  let segments = name.split(" ");
  let initials = "";
  for (let i = 0; i < segments.length; i++) {
    if (!segments[i][0] || segments[i].indexOf(".") > -1) {
      continue;
    }
    initials += segments[i][0];
    if (initials.length >= 2) {
      break;
    }
  }
  return initials;
}
