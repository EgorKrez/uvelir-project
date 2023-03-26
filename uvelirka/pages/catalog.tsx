import React from 'react';
import {applicationTabs, EAppNavbarTabs, HeaderTabs} from "../components/common/header/app-header.component";

const Catalog = () => {
    return (
        <div>
            <HeaderTabs tabs={applicationTabs} selectedTabId={EAppNavbarTabs.CATALOG} />
            <br/>
            <h1>
                This is catalog page
            </h1>
        </div>
    );
};

export default Catalog;