import React from "react";
import Fragment from "@/packages/ui/src/atoms/fragment";
import CONSTANT from "@/packages/helpers/src/constants";
import MainDashboard from "@/packages/ui/src/organisms/dashboard/mainDashboard";
import LeftSideDashboard from "@/packages/ui/src/organisms/dashboard/leftSideDashboard";

async function Dashboard() {
  return (
    <Fragment className="min-h-screen relative grid grid-cols-4">
      <LeftSideDashboard
        className="col-span-1 fixed overscroll-none w-[20%] h-[calc(100dvh-9%)]"
        dashboardMenu={Object.keys(CONSTANT.fruitMenu.categories)}
      />
      <MainDashboard className="col-span-3 absolute left-[20%] w-[80%] h-[100%] overflow-auto bg-[url('/images/fruit-platter-002.webp')] bg-fixed bg-no-repeat bg-cover bg-center" />
    </Fragment>
  );
}

export default Dashboard;
