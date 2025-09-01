import SharedBreadcrumb from "@/components/breadcrumb";
import PageLayout from "@/components/layouts/page-layout";
import CategoriesList from "@/features/categories/components/list";

export const CategoriesRoute = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SharedBreadcrumb name="Categories" />
      <PageLayout>
        <CategoriesList />
      </PageLayout>
    </div>
  );
};
