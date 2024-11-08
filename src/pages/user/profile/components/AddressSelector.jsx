import React, { useEffect, useState } from 'react';
import { taiwanRegionsData } from '../../../../utils/address';
import { ProfileItem, AddressRow, AddressInput, Input } from '../style';

const AddressSelector = ({ formData, setFormData }) => {
  const [county, setCounty] = useState('');
  const [district, setDistrict] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  // 地址解析函數，將地址解析成各個部分
  const parseAddress = (address) => {
    const addressParts = address.match(/(.+市|.+縣)(.+區)(\d{3})(.*)/);
    if (addressParts) {
      const [, savedCounty, savedDistrict, savedZipCode, savedAddress] = addressParts;
      setCounty(savedCounty);
      setDistrict(savedDistrict);
      setZipCode(savedZipCode);
      setAddressDetail(savedAddress);
    }
  };

  // 加載時解析地址
  useEffect(() => {
    if (formData.address) {
      parseAddress(formData.address);
    }
  }, [formData.address]);

  // 更新完整地址
  const updateFullAddress = (newDetail = addressDetail) => {
    const fullAddress = `${county}${district}${zipCode}${newDetail}`;
    setFormData({ ...formData, address: fullAddress });
  };

  // 處理詳細地址的輸入變更
  const handleAddressChange = (e) => {
    const newAddressDetail = e.target.value;
    setAddressDetail(newAddressDetail);
    updateFullAddress(newAddressDetail);
  };

  // 處理縣市選擇的變更
  const handleCountyChange = (e) => {
    const selectedCounty = e.target.value;
    setCounty(selectedCounty);
    setDistrict('');
    setZipCode('');
    // 不要在這裡更新 addressDetail，保持用戶已輸入的詳細地址
    updateFullAddress();
  };

  // 處理行政區選擇的變更
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    const postalCode = taiwanRegionsData[county]?.[selectedDistrict] || '';
    setZipCode(postalCode);
    updateFullAddress();
  };

  // 當 county, district, zipCode, addressDetail 發生變化時，更新完整地址
  useEffect(() => {
    updateFullAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [county, district, zipCode, addressDetail]);

  return (
    <ProfileItem>
      <label>地址:</label>
      <div>
        <AddressRow>
          <select value={county} onChange={handleCountyChange}>
            <option value="">縣市</option>
            {Object.keys(taiwanRegionsData).map((countyName) => (
              <option key={countyName} value={countyName}>
                {countyName}
              </option>
            ))}
          </select>
          <select value={district} onChange={handleDistrictChange} disabled={!county}>
            <option value="">區</option>
            {county &&
              Object.keys(taiwanRegionsData[county]).map((districtName) => (
                <option key={districtName} value={districtName}>
                  {districtName}
                </option>
              ))}
          </select>
          <AddressInput type="text" value={zipCode} readOnly placeholder="郵遞區號" />
        </AddressRow>
        <Input
          type="text"
          name="addressDetail"
          placeholder="請輸入地址"
          maxLength={50}
          value={addressDetail}
          onChange={handleAddressChange}
        />
      </div>
    </ProfileItem>
  );
};

export default AddressSelector;