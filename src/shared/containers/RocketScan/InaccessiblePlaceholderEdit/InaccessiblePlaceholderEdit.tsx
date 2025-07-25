import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'utils/equalityChecks';

import { EditLocationModal } from 'Components/RocketScan';

import { OutlineButton } from 'Components/Button';
import { coreFetchingSelector } from 'Containers/Core/selectors';
import { updateLocation, setRefreshLocations } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { propertySelector } from 'Containers/RocketScan/selectors';
import { nameEditErrorSelector, floorEditErrorSelector } from '../MultiUnit/Locations/selectors';

interface Props {
  location: any;
}

const InaccessiblePlaceholderEditContainer = ({ location }: Props) => {
  const dispatch = useDispatch();

  // local variables
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [locationId, setLocationId] = useState(undefined);
  const [locationTypeId, setLocationTypeId] = useState(undefined);
  const [locationName, setLocationName] = useState('');
  const [floorNumber, setFloorNumber] = useState(0);
  const [locationType, setLocationType] = useState('');
  const [isCommercial, setIsCommercial] = useState(false);
  const [isCommon, setIsCommon] = useState(false);
  const [isAccessible, setIsAccessible] = useState(true);
  const [locationEdited, setLocationEdited] = useState(false);
  const [hideDropDown, setHideDropDown] = useState(false);

  // selectors
  const property = useSelector(propertySelector, areEqual);
  const fetching = useSelector(coreFetchingSelector, areEqual);

  useEffect(() => {
    if (location?.id && location?.location_type) {
      const {
        id,
        floor_number: floor,
        name,
        is_commercial: commercial,
        is_common: common,
        is_accessible: accessible,
        location_type: { id: locationTypeId, name: locationType },
      } = location;

      setLocationId(id);
      setLocationTypeId(locationTypeId);
      setFloorNumber(floor);
      setLocationType(locationType.toLocaleLowerCase());
      setLocationName(name);
      setIsCommercial(commercial);
      setIsCommon(common);
      setIsAccessible(!accessible);
    }
  }, [location]);

  const errors = {
    name: useSelector(nameEditErrorSelector, areEqual),
    floor: useSelector(floorEditErrorSelector, areEqual),
  };

  const setEditModalStatus = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const onClickCloseLocationEdit = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  const onLocationNameChange = useCallback((e: any) => {
    const { value } = e.target;

    setLocationName(value);
  }, []);

  const onCommercialCheckboxClick = useCallback((e: any) => {
    const { checked } = e.target;

    setIsCommercial(checked);
  }, []);

  const onAccessibleCheckboxClick = useCallback((e: any) => {
    const { checked } = e.target;

    setIsAccessible(checked);
  }, []);

  const onSaveChangesFormButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();

      const { id: propertyId } = property;

      setHideDropDown(true);

      dispatch(
        updateLocation(
          locationId,
          {
            property_id: propertyId,
            location_type_id: locationTypeId,
            name: locationName,
            floor_number: floorNumber,
            is_commercial: isCommercial,
            is_common: isCommon,
            is_accessible: !isAccessible,
          },
          setLocationEdited
        )
      );
    },
    [locationId, property, locationName, floorNumber, isCommercial, isAccessible]
  );

  useEffect(() => {
    if (locationEdited) {
      setLocationEdited(false);
      dispatch(setRefreshLocations(true));
      onClickCloseLocationEdit();
    }
  }, [locationEdited]);

  useEffect(() => {
    if (hideDropDown) {
      setHideDropDown(false);
    }
  }, [hideDropDown]);

  return (
    <>
      <OutlineButton className="accessibleButton" onClick={setEditModalStatus}>
        Make Accessible
      </OutlineButton>

      <EditLocationModal
        isCommercialProperty={property?.name === 'commercial'}
        isOpen={isEditModalOpen}
        title={locationType}
        type={locationType}
        isCommercial={isCommercial}
        isAccessible={isAccessible}
        locationName={locationName}
        floorNumber={floorNumber}
        formErrors={errors}
        fetching={fetching}
        hideDropDown={hideDropDown}
        onLocationNameChange={onLocationNameChange}
        onSaveChangesFormButtonClick={onSaveChangesFormButtonClick}
        closeModal={onClickCloseLocationEdit}
        onCommercialCheckboxClick={onCommercialCheckboxClick}
        onAccessibleCheckboxClick={onAccessibleCheckboxClick}
        setFloorNumber={setFloorNumber}
      />
    </>
  );
};

const InaccessiblePlaceholderEditContainerMemo = memo(InaccessiblePlaceholderEditContainer, areEqual);

export { InaccessiblePlaceholderEditContainerMemo as InaccessiblePlaceholderEdit };
