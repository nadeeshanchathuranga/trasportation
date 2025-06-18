import React from "react";
import Header from "../layouts/Header";
import Filter from "../components/driverSearchResults/Filter";
import VehicleListContent from "../components/vehicleList/VehicleListContent";
import SearchForm from "../components/vehicleList/searchForm";
import Footer from "../layouts/Footer";

const DriverSearchResults = () => {
    return (
        <div>
            <Header />

            <Filter />
            <div className="vehicle-list-container flex-1">
                {/* <SearchForm
                    formData={formData}
                    onFormChange={handleFormChange}
                />
                <VehicleListContent vehicles={props.vehicles} /> */}
            </div>

            <Footer />
        </div>
    );
};

export default DriverSearchResults;
