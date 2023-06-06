import React, { useCallback, useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { DataGrid, ButtonTableAction } from "../../components/_common";
import { PaginationType } from "../../constants";
import {
  checkedIdsSelector,
  paginationSelectorFactory,
} from "../../redux/layouts/selectors";
import { checkIdsAction, initIdsAction } from "../../redux/layouts";
import {
  itemCountSelector,
  paginatedItemsSelector,
} from "../../redux/articles/selectors";
import {
  fetchItemsAction,
  bulkDeleteAction,
  deleteItemAction,
} from "../../redux/videos/actions";
// import { baseApiUrl } from '../../constants';
import { setModalConfirmationMetaAction } from "../../redux/layouts";
// import { setActivePageAction } from '../../redux/layouts/actions';
// import Image from 'next/image';

const ListDatas: React.FC<any> = () => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const count = useSelector(itemCountSelector);

  const items = useSelector(paginatedItemsSelector);
  const checkedIds = useSelector(checkedIdsSelector);

  const [filterOpen, setFilterOpen] = useState(false);
  const { filters }: Layouts.Pagination = useSelector(
    paginationSelectorFactory(PaginationType.IMAGES)
  );

  const sendRequest = useCallback(() => {
    return dispatch(fetchItemsAction());
  }, [dispatch]);

  const sendDeleteRequest = useCallback(() => {
    return dispatch(bulkDeleteAction());
  }, [dispatch]);

  useEffect(() => {
    const setupChecked: any = [];
    items.forEach((item: Images.ImageItem) => {
      setupChecked.push({ id: item.id, checked: false });
    });
    dispatch(initIdsAction(setupChecked));
  }, [items]);

  const handleDeleteBtnClick = useCallback(
    (event: React.SyntheticEvent): void => {
      const id = Number(event.currentTarget.getAttribute("data-id"));
      dispatch(
        setModalConfirmationMetaAction({
          onConfirm: async () =>
            dispatch(deleteItemAction(id)).then(sendRequest),
        })
      );
    },
    [dispatch, sendRequest]
  );

  return (
    <>
      <div className="mt-7">
        <DataGrid
          hideBulk={false}
          paginationType={PaginationType.VIDEOS}
          totalAmount={count}
          sendRequest={sendRequest}
          sendDeleteRequest={sendDeleteRequest}
        >
          {items?.map((item: any) => (
            <Fragment key={item.id}>
              <div className="flex w-1/4 flex-wrap">
                <div
                  className="relative w-full md:m-4 max-h-[250px]"
                  style={{ minHeight: "250px" }}
                >
                  <div className="rounded-t-lg absolute top-0 left-0 bg-blue-200 h-[40px] p-2 w-full opacity-70">
                    <input
                      className="float-checkbox"
                      type="checkbox"
                      onChange={() => dispatch(checkIdsAction(item.id))}
                      value={item.id}
                      checked={
                        checkedIds.find((data: any) => data.id === item.id)
                          ?.checked || false
                      }
                    />
                    <ButtonTableAction
                      dataId={String(item.id)}
                      onClick={handleDeleteBtnClick}
                      localeKey="Delete"
                      className={"btn-delete"}
                    />
                    <div className="iframe-data">
                      <iframe
                        width="100%"
                        height="209"
                        src="https://www.youtube.com/embed/DFejhPTdfS4"
                        title="IBIZA SUMMER MIX 2022🍓Best Of Tropical Deep House Music Chill Out Mix 2022🍓Ambient Chillout Lounge"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </DataGrid>
      </div>
    </>
  );
};

export default ListDatas;
