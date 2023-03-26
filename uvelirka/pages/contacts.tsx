import MiniMap from "../components/common/mini-map/MiniMapClientMapper";
import {applicationTabs, EAppNavbarTabs, HeaderTabs} from "../components/common/header/app-header.component";

export const Contacts = () => {


    return (
        <div>
            <HeaderTabs tabs={applicationTabs} selectedTabId={EAppNavbarTabs.CONTACTS} />
            <br/>
            <h1>It is a very interesting contacts page</h1>

            <MiniMap/>
        </div>
    )
}
export default Contacts;