import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseApiUrl } from "../../constants";
import { nonpaginatedItemsSelector } from "../../redux/images/selectors";
import {
  checkImageIdsAction,
  initImageIdsAction,
  updateImageIdsAction,
} from "../../redux/coordinates";
import { countryItemSelector } from "../../redux/countries/selectors";
import { fetchAllItemsAction } from "../../redux/images";

const ImageList: React.FC<any> = ({ markerData }: { markerData: any }) => {
  const dispatch = useDispatch();
  // const count = useSelector(itemCountSelector);
  const items = useSelector(nonpaginatedItemsSelector);
  const [checkedIds, setCheckedIds] = useState(
    markerData.images ? markerData.images : []
  );
  const countrySelectorData = useSelector(countryItemSelector);

  useEffect(() => {
    const setupChecked: any = [];
    items.forEach((item: Images.ImageItem) => {
      setupChecked.push({
        id: item.id,
        checked: !!(countrySelectorData as any).images.includes(item.id),
      });
    });
    dispatch(initImageIdsAction(setupChecked));
  }, [items, countrySelectorData]);

  useEffect(() => {
    dispatch(fetchAllItemsAction());
  }, []);

  // useEffect(() => {
  //   if (markerData?.id) {
  //     console.log("MARKER DATA COUNTRIES", markerData);
  //     setMarkerImages(markerData.images);
  //     setDisplayTabs(true);
  //   }
  // }, [markerData]);

  // const checkImageData = (id: number) => {
  //   const tmpChecked = checkedIds;
  //   tmpChecked.push(id);
  //   setCheckedIds(tmpChecked);
  // };

  const handleCheck = (event: any) => {
    let updatedList = [...checkedIds];
    if (event.target.checked) {
      updatedList = [...checkedIds, parseInt(event.target.value)];
    } else {
      updatedList.splice(checkedIds.indexOf(parseInt(event.target.value)), 1);
    }
    setCheckedIds(updatedList);
    dispatch(updateImageIdsAction(updatedList));
  };

  const handleImage = (e: any) => {
    const tmpCheckedIds = checkedIds;
    if (e.target.checked) {
      tmpCheckedIds.push(parseInt(e.target.value));
      setCheckedIds(tmpCheckedIds);
    } else {
      setCheckedIds(
        tmpCheckedIds.filter(
          (item: number) => item !== parseInt(e.target.value)
        )
      );
    }
  };

  return (
    <>
      <div className="mt-7">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {items?.map((item: any) => (
            // eslint-disable-next-line react/jsx-key
            <div className="mb-[15px]">
              <Fragment key={item.id}>
                <img
                  src={
                    /(http(s?)):\/\//i.test(item.name)
                      ? item.name
                      : `${baseApiUrl}/uploads/photos/${item.name}`
                  }
                  alt=""
                  className="block h-full w-full rounded-lg object-cover object-center max-h-[70px]"
                />
                <div className="flex items-center mb-4">
                  <div className="flex items-center mt-[10px]">
                    <input
                      className="float-checkbox"
                      type="checkbox"
                      // onChange={(e) => handleCheck(e)}
                      onChange={(e) => {
                        dispatch(checkImageIdsAction(item.id));
                        // checkImageData(item.id);
                        handleCheck(e);
                      }}
                      value={item.id}
                      checked={checkedIds.includes(item.id)}
                    />
                  </div>
                </div>
              </Fragment>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageList;
