import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseApiUrl } from "../../constants";
import {
  itemCountSelector,
  nonpaginatedItemsSelector,
} from "../../redux/images/selectors";
import { checkImageIdsAction, initImageIdsAction } from "../../redux/countries";
import {
  checkedImageIdsSelector,
  countryItemSelector,
} from "../../redux/countries/selectors";
import { fetchAllItemsAction } from "../../redux/images";

const ImageList: React.FC<any> = () => {
  const dispatch = useDispatch();
  const count = useSelector(itemCountSelector);
  const items = useSelector(nonpaginatedItemsSelector);
  const checkedIds = useSelector(checkedImageIdsSelector);
  const countrySelectorData = useSelector(countryItemSelector);

  // console.log("COUNTRY DATA", countrySelectorData);

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
                      checked={
                        checkedIds.find((data: any) => data.id === item.id)
                          ?.checked || false
                      }
                    />
                    {/*<label*/}
                    {/*  htmlFor="inline-checkbox"*/}
                    {/*  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"*/}
                    {/*>*/}
                    {/*  Select*/}
                    {/*</label>*/}
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
