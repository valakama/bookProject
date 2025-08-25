import type { PageInfo } from "../types/book";
import ImagePlaceholder from "./ImagePlaceholder";
const Page = ({ page }: { page: PageInfo}) => {
  return (
    <div className="flex-1 flex items-center justify-center">
    <div
      className="
        bg-white shadow-lg rounded-md
        aspect-[210/297] 
        h-[calc(100vh-160px)]
        max-w-full
        p-10
      "
    >
    <div className="page" key={page.id}>
      {page.type === "text" ? (
        <p>{page.content}</p>
      ) : page.type === "image" ? (
        <ImagePlaceholder src={page.content} alt="Page Image" />
      ) : (
        <p>Unknown page type</p>
      )}
    </div>
    </div>
  </div>
  );
}

export default Page;