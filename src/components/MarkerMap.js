import '../scss/MarkerMap.scss';
import React, { useEffect, useRef } from 'react';

const { kakao } = window;

const MarkerMap = ({ latitude, longitude, changeRoadAddress }) => {
  const coord = [Number(latitude), Number(longitude)];
  const container = useRef(null);
  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(coord[0] + 0.0008, coord[1]),
      level: 4,
    };
    const map = new window.kakao.maps.Map(container.current, options);

    // 지도에 확대 축소 컨트롤을 생성한다
    const zoomControl = new kakao.maps.ZoomControl();

    // 지도의 우측에 확대 축소 컨트롤을 추가한다
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const imageSrc = 'book-marker.png'; // 마커이미지의 주소
    const imageSize = new kakao.maps.Size(80, 80); // 마커이미지의 크기
    const imageOption = { offset: new kakao.maps.Point(39, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    );
    const markerPosition = new kakao.maps.LatLng(coord[0], coord[1]);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
      map: map,
    });
    getAddress(map, marker, coord);
    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      // 마커 위에 인포윈도우를 표시합니다
      getAddress(map, marker, coord);
    });
  }, [coord]);

  const getAddress = (map, marker, coord) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const setCoord = new kakao.maps.LatLng(coord[0], coord[1]);
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const addressDetail = result[0].road_address
          ? result[0].road_address.address_name
          : result[0].address.address_name;

        if (changeRoadAddress) {
          changeRoadAddress(addressDetail);
        }

        const content = function () {
          const wrap = document.createElement('div');
          wrap.className = 'wrap';

          const header = document.createElement('div');
          header.className = 'header';
          header.textContent = '거래 희망 위치';

          const closeIcon = document.createElement('i');
          closeIcon.className = 'fas fa-times';
          closeIcon.addEventListener('click', closeOverlay);

          const overlayHeader = document.createElement('div');
          overlayHeader.className = 'overlay-header';

          const address = document.createElement('div');
          address.className = 'address';

          address.textContent = addressDetail;
          overlayHeader.appendChild(header);
          overlayHeader.appendChild(closeIcon);
          wrap.appendChild(overlayHeader);
          wrap.appendChild(address);

          return wrap;
        };

        const overlay = new kakao.maps.CustomOverlay({
          content: content(),
          map: map,
          position: marker.getPosition(),
        });

        overlay.setMap(map);

        function closeOverlay() {
          overlay.setMap(null);
        }
      }
    };

    geocoder.coord2Address(setCoord.getLng(), setCoord.getLat(), callback);
  };

  return <div className="map" ref={container}></div>;
};

export default MarkerMap;
