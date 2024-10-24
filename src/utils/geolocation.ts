export const getUserLocation = (
    successCallback: (position: GeolocationPosition) => void,
    errorCallback: (error: GeolocationPositionError) => void
  ): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  