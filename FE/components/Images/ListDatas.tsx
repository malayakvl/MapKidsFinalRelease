import React, { useCallback, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { DataGrid, ButtonTableAction } from "../../components/_common";
import { PaginationType } from "../../constants";
import { checkedIdsSelector } from "../../redux/layouts/selectors";
import { checkIdsAction, initIdsAction } from "../../redux/layouts";
import {
  itemCountSelector,
  paginatedItemsSelector,
} from "../../redux/images/selectors";
import {
  fetchItemsAction,
  bulkDeleteAction,
  deleteItemAction,
} from "../../redux/images/actions";
import { baseApiUrl } from "../../constants";
import { setModalConfirmationMetaAction } from "../../redux/layouts";
// import { setActivePageAction } from '../../redux/layouts/actions';
// import Image from 'next/image';

const ListDatas: React.FC<any> = () => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const count = useSelector(itemCountSelector);

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
        <div className="flex flex-wrap">
          <DataGrid
            hideBulk={false}
            paginationType={PaginationType.IMAGES}
            totalAmount={count}
            sendRequest={sendRequest}
            sendDeleteRequest={sendDeleteRequest}
          >
            {items?.map((item: any) => (
              <Fragment key={item.id}>
                <div className="flex w-1/4 flex-wrap">
                  <div className="relative w-full md:m-4 max-h-[250px]">
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
                    </div>
                    <img
                      src={
                        /(http(s?)):\/\//i.test(item.name)
                          ? item.name
                          : `${baseApiUrl}/uploads/photos/${item.name}`
                      }
                      alt=""
                      className="block h-full w-full rounded-lg object-cover object-center"
                    />
                  </div>
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
