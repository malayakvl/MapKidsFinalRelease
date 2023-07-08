import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseApiUrl } from "../../constants";
import { nonpaginatedItemsSelector } from "../../redux/images/selectors";
import { checkImageIdsAction, initImageIdsAction } from "../../redux/countries";
import { countryItemSelector } from "../../redux/countries/selectors";
import { fetchAllItemsAction } from "../../redux/images";

const ImageList: React.FC<any> = ({ markerData }: { markerData: any }) => {
  const dispatch = useDispatch();
  // const count = useSelector(itemCountSelector);
  const items = useSelector(nonpaginatedItemsSelector);
  const checkedIds = markerData.images;
  const countrySelectorData = useSelector(countryItemSelector);

  console.log("MARKER DATA IMAGES LIST DONE?", checkedIds);

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
                      onChange={() => dispatch(checkImageIdsAction(item.id))}
                      value={item.id}
                      checked={checkedIds.includes(item.id) ? true : false}
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
