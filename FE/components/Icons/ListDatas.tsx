import React, { useCallback, useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, ButtonTableAction } from "../../components/_common";
import { PaginationType } from "../../constants";
import {
  checkedIdsSelector,
  titleImageSelector,
} from "../../redux/layouts/selectors";
import {
  checkIdsAction,
  checkTitleAction,
  initIdsAction,
  initTitleAction,
} from "../../redux/layouts";
import {
  itemCountSelector,
  paginatedItemsSelector,
} from "../../redux/icons/selectors";
import {
  fetchItemsAction,
  bulkDeleteAction,
  deleteItemAction,
  updateImageTitleActon,
} from "../../redux/icons/actions";
import { baseApiUrl } from "../../constants";
import { setModalConfirmationMetaAction } from "../../redux/layouts";

const ListDatas: React.FC<any> = () => {
  // const t = useTranslations();
  const dispatch = useDispatch();
  const count = useSelector(itemCountSelector);
  const [showTitleForm, setShowTitleForm] = useState([]);
  const [shareholderName, setSharholderName] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const itemsTitle = useSelector(titleImageSelector);

  const items = useSelector(paginatedItemsSelector);
  const checkedIds = useSelector(checkedIdsSelector);

  const sendRequest = useCallback(() => {
    return dispatch(fetchItemsAction());
  }, [dispatch]);

  const sendDeleteRequest = useCallback(() => {
    return dispatch(bulkDeleteAction());
  }, [dispatch]);

  useEffect(() => {
    const setupChecked: any = [];
    items.forEach((item: Icons.ImageItem) => {
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

  const editItem = (evt: any, item: any) => {
    item.title = evt.target.value;
    console.log("ITEM", item);
    dispatch(checkTitleAction(item));
  };

  return (
    <>
      <div className="mt-7">
        <div className="flex flex-wrap">
          <DataGrid
            hideBulk={false}
            paginationType={PaginationType.IMAGES}
            totalAmount={count}
            sendRequest={sendRequest}
            sendDeleteRequest={sendDeleteRequest}
          >
            {items?.map((item: any, idx: number) => (
              <Fragment key={item.id}>
                <div className="flex w-1/4 flex-wrap">
                  <div className="relative w-full md:m-4 max-h-[250px] h-[250px]">
                    <div className="rounded-t-lg absolute top-0 left-0 bg-blue-200 h-[40px] p-2 w-full img-opacity">
                      <input
                        className="float-checkbox img-checkbox"
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
                    </div>
                    <img
                      src={
                        /(http(s?)):\/\//i.test(item.name)
                          ? item.name
                          : `${baseApiUrl}/uploads/photos/${item.name}`
                      }
                      alt=""
                      className="block rounded-lg object-contain object-center pt-[70px] max-w-[75px]"
                    />
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  </div>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <div className="block w-[150px]" />
                  <div className="clearfix" />
                </div>
              </Fragment>
            ))}
          </DataGrid>
        </div>
      </div>
    </>
  );
};

export default ListDatas;
