import SharedBreadcrumb from "@/components/breadcrumb";
import CategoriesList from "@/features/categories/components/list";

export const CategoriesRoute = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SharedBreadcrumb name="Categories" />
      <div className="px-8 flex w-full flex-col items-start justify-center md:mt-0">
        <CategoriesList />
      </div>
    </div>
  );
};
