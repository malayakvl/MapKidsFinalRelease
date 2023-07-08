import React, { useCallback, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemCountSelector } from "../../redux/images/selectors";
import { fetchAllItemsAction } from "../../redux/videos";
import { countryItemSelector } from "../../redux/countries/selectors";
import { nonpaginatedItemsSelector } from "../../redux/videos/selectors";
import { checkVideoIdsAction, initVideoIdsAction } from "../../redux/countries";

const VideoList: React.FC<any> = ({ markerData }: { markerData: any }) => {
  const dispatch = useDispatch();
  // const count = useSelector(itemCountSelector);
  const items = useSelector(nonpaginatedItemsSelector);
  const checkedIds = markerData.videos;
  const countrySelectorData = useSelector(countryItemSelector);

  useEffect(() => {
    const setupChecked: any = [];
    items.forEach((item: Videos.VideoItem) => {
      setupChecked.push({
        id: item.id,
        checked: !!(countrySelectorData as any).videos.includes(item.id),
      });
    });
    dispatch(initVideoIdsAction(setupChecked));
  }, [items, countrySelectorData]);

  useEffect(() => {
    dispatch(fetchAllItemsAction());
  }, []);

  return (
    <>
      <div className="mt-7">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items?.map((item: any) => (
            // eslint-disable-next-line react/jsx-key
            <div className="mb-[15px]">
              <Fragment key={item.id}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.code,
                  }}
                />
                <div className="flex items-center mb-4">
                  <div className="flex items-center mt-[10px]">
                    <input
                      className="float-checkbox"
                      type="checkbox"
                      onChange={() => dispatch(checkVideoIdsAction(item.id))}
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

export default VideoList;
