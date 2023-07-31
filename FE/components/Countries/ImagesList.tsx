import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseApiUrl } from "../../constants";
import { nonpaginatedItemsSelector } from "../../redux/images/selectors";
import {
  checkImageIdsAction,
  initImageIdsAction,
  titleImageIdAction,
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
  const [titleImageId, setTitleImageId] = useState(markerData.titleImageId);
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

  const handleCheckRadio = (event: any) => {
    let updatedList = [...checkedIds];
    updatedList = [...checkedIds, parseInt(event.target.value)];
    setCheckedIds(updatedList);
    dispatch(updateImageIdsAction(updatedList));
    dispatch(titleImageIdAction(parseInt(event.target.value)));
  };

  // const handleImage = (e: any) => {
  //   const tmpCheckedIds = checkedIds;
  //   if (e.target.checked) {
  //     tmpCheckedIds.push(parseInt(e.target.value));
  //     setCheckedIds(tmpCheckedIds);
  //   } else {
  //     setCheckedIds(
  //       tmpCheckedIds.filter(
  //         (item: number) => item !== parseInt(e.target.value)
  //       )
  //     );
  //   }
  // };

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
                    <div className="inline-block min-h-[1.5rem] pl-[25px] pt-[15px]">
                      <input
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio"
                        name="main_image"
                        id={`main_${item.id}`}
                        value={item.id}
                        checked={item.id === parseInt(markerData.main_image_id)}
                        onClick={(e) => {
                          dispatch(checkImageIdsAction(item.id));
                          setTitleImageId(item.id);
                          handleCheckRadio(e);
                        }}
                      />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-[11px] whitespace-nowrap font-normal"
                        htmlFor={`main_${item.id}`}
                      >
                        Title image
                      </label>
                    </div>
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
