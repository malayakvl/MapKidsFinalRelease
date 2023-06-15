import { ArticleForm } from "./index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { articleItemSelector } from "../../redux/articles/selectors";

const formData = {
  id: null,
  title: "Edit Happend",
  title_image: "",
  article_text: "",
  status: true,
  created_at: null,
  updated_at: null,
};

const EditArticle: React.FC = () => {
  const dispatch = useDispatch();
  const [dataFetched, setDataFetched] = useState(false);
  const articleData = useSelector(articleItemSelector);

  useEffect(() => {
    if (Object.keys(articleItemSelector).length > 0) {
      setDataFetched(true);
    }
  }, [dispatch, articleData]);

  return (
    <>{dataFetched && <ArticleForm articleData={articleData} photos={[]} />}</>
  );
};

export default EditArticle;
