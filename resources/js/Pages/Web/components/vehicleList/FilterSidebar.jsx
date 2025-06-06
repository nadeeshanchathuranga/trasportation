import React, { useEffect, useState } from "react";

const FilterSidebar = ({ searchParams }) => {
  const [selectedBodyType, setSelectedBodyType] = useState("");

  useEffect(() => {
    if (searchParams?.bodyType) {
      setSelectedBodyType(searchParams.bodyType.toLowerCase());
    }
  }, [searchParams]);

  return (
    <div className="poppins text-[#0F0F0F80] text-[12px] font-[400] filter-sidebar w-[283px] h-[998px] p-5 bg-[#F4F3F3] rounded-[10px] ml-10 mt-10">
      <div className="filter-section mb-15 mt-5">
        <h3 className="bebas-neue text-[20px] text-[#0000008C] mb-2.5">
          VEHICLE TYPE
        </h3>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="suv"
              name="vehicleType"
              value="suv"
              className="mr-1.5"
              checked={selectedBodyType === "suv"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="suv">SUV</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="crossover"
              name="vehicleType"
              value="crossover"
              className="mr-1.5"
              checked={selectedBodyType === "crossover"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="crossover">Crossover</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="wagon"
              name="vehicleType"
              value="wagon"
              className="mr-1.5"
              checked={selectedBodyType === "wagon"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="wagon">Wagon</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="family"
              name="vehicleType"
              value="family mbp"
              className="mr-1.5"
              checked={selectedBodyType === "family mbp"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="family">Family MBP</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sportcoupe"
              name="vehicleType"
              value="sportcoupe"
              className="mr-1.5"
              checked={selectedBodyType === "sportcoupe"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="sportcoupe">Sport Coupe</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="compact"
              name="vehicleType"
              value="compact"
              className="mr-1.5"
              checked={selectedBodyType === "compact"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="compact">Compact</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="coupe"
              name="vehicleType"
              value="coupe"
              className="mr-1.5"
              checked={selectedBodyType === "coupe"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="coupe">Coupe</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="truck"
              name="vehicleType"
              value="truck"
              className="mr-1.5"
              checked={selectedBodyType === "truck"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="truck">Truck</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sedan"
              name="vehicleType"
              value="sedan"
              className="mr-1.5"
              checked={selectedBodyType === "sedan"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="sedan">Sedan</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="limousine"
              name="vehicleType"
              value="limousine"
              className="mr-1.5"
              checked={selectedBodyType === "limousine"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="limousine">Limousine</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="convertible"
              name="vehicleType"
              value="convertible"
              className="mr-1.5"
              checked={selectedBodyType === "convertible"}
              onChange={(e) => setSelectedBodyType(e.target.value)}
            />
            <label htmlFor="convertible">Convertible</label>
          </div>
          <span>(23)</span>
        </div>
      </div>

      <div className="filter-section mb-15">
        <h3 className="bebas-neue text-[20px] text-[#0000008C] mb-2.5 pb-2 border-b border-[#00000026]">
          CAPACITY
        </h3>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="2person"
              name="capacity"
              value="2person"
              className="mr-1.5"
            />
            <label htmlFor="2person">2 Person</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="4person"
              name="capacity"
              value="4person"
              className="mr-1.5"
            />
            <label htmlFor="4person">4 Person</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="6person"
              name="capacity"
              value="6person"
              className="mr-1.5"
            />
            <label htmlFor="6person">6 Person</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="8ormore"
              name="capacity"
              value="8ormore"
              className="mr-1.5"
            />
            <label htmlFor="8ormore">8 or More</label>
          </div>
          <span>(23)</span>
        </div>
      </div>

      <div className="filter-section mb-15">
        <h3 className="bebas-neue text-[20px] text-[#0000008C] mb-2.5 pb-2 border-b border-[#00000026]">
          PRICE PER DAY
        </h3>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="price0_50"
              name="price"
              value="0-50"
              className="mr-1.5"
            />
            <label htmlFor="price0_50">US$ 0 - US$ 50</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="price50_100"
              name="price"
              value="50-100"
              className="mr-1.5"
            />
            <label htmlFor="price50_100">US$ 50 - US$ 100</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="price100_150"
              name="price"
              value="100-150"
              className="mr-1.5"
            />
            <label htmlFor="price100_150">US$ 100 - US$ 150</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="price150_200"
              name="price"
              value="150-200"
              className="mr-1.5"
            />
            <label htmlFor="price150_200">US$ 150 - US$ 200</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="price200plus"
              name="price"
              value="200plus"
              className="mr-1.5"
            />
            <label htmlFor="price200plus">US$ 200+</label>
          </div>
          <span>(23)</span>
        </div>
      </div>

      <div className="filter-section mb-15">
        <h3 className="bebas-neue text-[20px] text-[#0000008C] mb-2.5 pb-2 border-b border-[#00000026]">
          MILAGE / KILOMETERS
        </h3>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="limited"
              name="mileage"
              value="limited"
              className="mr-1.5"
            />
            <label htmlFor="limited">Limited</label>
          </div>
          <span>(23)</span>
        </div>
        <div className="mb-1.5 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="unlimited"
              name="mileage"
              value="unlimited"
              className="mr-1.5"
            />
            <label htmlFor="unlimited">Unlimited</label>
          </div>
          <span>(23)</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
