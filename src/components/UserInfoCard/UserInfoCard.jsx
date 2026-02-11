import { useAuth } from "../../contexts/AuthContext"

function UserInfoCard() {

    const { user } = useAuth();

    return (
        <>
            <p className="mt-30! mb-4! font-bold text-center">User Information</p>
            <div className="flex flex-col wrap-normal items-center gap-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full md:w-3/4 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-8!">
                    <div className="shadow border rounded-md w-full p-2! text-black bg-white">
                        {user?.first_name}
                    </div>
                    <div className="shadow border rounded-md w-full p-2! text-black bg-white">
                        {user?.last_name}
                    </div>
                    <div className="shadow border rounded-md w-full p-2! text-black bg-white">
                        {user?.email}
                    </div>
                    <div className="shadow border rounded-md w-full p-2! text-black bg-white">
                        {user?.phone}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfoCard