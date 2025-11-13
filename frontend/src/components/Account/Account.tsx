import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import StepperModal from "../EventPlannerStepper/StepperModal.tsx";

const Account: React.FC = () => {
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector((state) => state.user);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);


    return (
        <div className="admin-dashboard p-6">
            <div className="admin-header mb-6 pt-20">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {userInfo?.firstName || "User"}!</p>
            </div>


            <div className="admin-content grid gap-6 md:grid-cols-2">
                <div className="admin-card rounded-lg border p-6">
                    <h2 className="mb-2 text-xl font-medium">Past Events</h2>
                    <p className="mb-4 text-sm text-gray-500">Manage all events in the system</p>
                    <div className="flex gap-3">
                        <button
                            className="admin-btn rounded-md bg-indigo-600 px-4 py-2 text-white"
                            onClick={() => setIsEventModalOpen(true)}
                        >
                            Event Queue
                        </button>
                    </div>
                </div>


                <div className="admin-card rounded-lg border p-6">
                    <h2 className="mb-2 text-xl font-medium">Settings</h2>
                    <p className="mb-4 text-sm text-gray-500">Configure system settings</p>
                    <button className="admin-btn rounded-md border px-4 py-2">View Settings</button>
                </div>
            </div>


            <StepperModal
                onClose={() => setIsEventModalOpen(false)}
                userFirstName={userInfo?.firstName}
            />
        </div>
    );
};


export default Account;
