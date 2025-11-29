import React from "react";
import {AArrowDown, ArrowBigRight, Calendar, Heart, Icon, Sparkles} from "lucide-react";

interface BreadcrumbProps {
    // Define any props if needed in the future
    shouldShow?: boolean;
    path?: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = () => {
    return (
        <div
            className="flex justify-center px-4 py-2 text-sm font-medium transition duration-300 bg-transparent"
        >
            {/*<ArrowBigRight/>*/}
            <div className={'text-indigo-600'}>Details</div>
        </div>
    );
}
export default Breadcrumb;
