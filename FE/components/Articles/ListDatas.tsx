import React, { useCallback, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable, ButtonTableAction } from "../../components/_common";
import { PaginationType } from "../../constants";
// import {
//   checkedIdsSelector,
//   paginationSelectorFactory,
// } from "../../redux/layouts/selectors";
// import { checkIdsAction, initIdsAction } from '../../redux/layouts';
import {
  itemCountSelector,
  paginatedItemsSelector,
} from "../../redux/articles/selectors";
import {
  fetchItemsAction,
  fetchItemAction,
  bulkDeleteAction,
  deleteItemAction,
} from "../../redux/articles/actions";
import Image from "next/image";
import {
  setActivePageAction,
  setModalConfirmationMetaAction,
} from "../../redux/layouts";

const ListDatas: React.FC<any> = () => {
  const dispatch = useDispatch();
  const count = useSelector(itemCountSelector);

  const items = useSelector(paginatedItemsSelector);

  const sendRequest = useCallback(() => {
    return dispatch(fetchItemsAction());
  }, [dispatch]);

  const sendDeleteRequest = useCallback(() => {
    return dispatch(bulkDeleteAction());
  }, [dispatch]);

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

  const handleEditBtnClick = useCallback(
    (event: React.SyntheticEvent): void => {
      const id = Number(event.currentTarget.getAttribute("data-id"));
      dispatch(fetchItemAction(id));
    },
    [items, dispatch]
  );

  // useEffect(() => {
  // }, [items]);

  return (
    <>
      <div className="mt-7">
        <DataTable
          hideBulk={false}
          paginationType={PaginationType.ARTICLES}
          totalAmount={count}
          sendRequest={sendRequest}
          sendDeleteRequest={sendDeleteRequest}
        >
          {items?.map((item: any) => (
            <Fragment key={item.id}>
              <tr className="intro-x">
                <td className="px-5 py-3 dark:border-darkmode-300 first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  {item.title}
                </td>
                <td
                  className="px-5 py-3 dark:border-darkmode-300 first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                  style={{ width: "100px" }}
                >
                  {item.created_at}
                </td>
                <td
                  className="px-5 dark:border-darkmode-300 first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
                  style={{ minWidth: "150px" }}
                >
                  <ButtonTableAction
                    dataId={String(item.id)}
                    localeKey="Edit"
                    className={"btn-edit"}
                    onClick={handleEditBtnClick}
                  />
                  &nbsp;&nbsp;
                  <ButtonTableAction
                    dataId={String(item.id)}
                    localeKey="Delete"
                    className={"btn-delete"}
                    onClick={handleDeleteBtnClick}
                  />
                  {/*<div className="flex items-center justify-center">*/}
                  {/*  /!* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions *!/*/}
                  {/*  <span*/}
                  {/*    onClick={() => handleEditBtnClick(item.id)}*/}
                  {/*    className="flex items-center mr-3 cursor-pointer"*/}
                  {/*  >*/}
                  {/*    <Image*/}
                  {/*      src="/images/btn-edit.svg"*/}
                  {/*      width={16}*/}
                  {/*      height={20}*/}
                  {/*      alt=""*/}
                  {/*    />*/}
                  {/*    &nbsp;Edit*/}
                  {/*  </span>*/}
                  {/*  /!* eslint-disable-next-line jsx-a11y/anchor-is-valid *!/*/}
                  {/*  <a className="flex items-center text-danger" href="#">*/}
                  {/*    <Image*/}
                  {/*      src="/images/btn-delete.svg"*/}
                  {/*      width={16}*/}
                  {/*      height={20}*/}
                  {/*      alt=""*/}
                  {/*    />*/}
                  {/*    &nbsp;Delete*/}
                  {/*  </a>*/}
                  {/*</div>*/}
                </td>
              </tr>
            </Fragment>
          ))}
        </DataTable>
      </div>
    </>
  );
};

export default ListDatas;
