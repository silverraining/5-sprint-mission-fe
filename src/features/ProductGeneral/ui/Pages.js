import PageItem from "./PageItem";
import "./Pages.css";

const Pages = ({ changePage, pageSize }) => {
  return (
    <div className="pages">
      <PageItem>{"<"}</PageItem>
      {/* {Array.from({ length: pageSize }, (_, i) => (
        <PageItem></PageItem>
      ))} */}
      <PageItem>{">"}</PageItem>
    </div>
  );
};

export default Pages;
