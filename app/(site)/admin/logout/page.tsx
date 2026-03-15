import AdminLogout from "./_";
import { LogoutAdmin } from "@/app/actions/AdminActions";
import CheckAuthentication from "@/app/components/CheckAuthentication";
import { adminLoginPage } from "@/constants";
import Loading from "../../loading";

export default function AdminLogoutPage() {
    return (
        <CheckAuthentication fallbackRoute={adminLoginPage}>
            <div className="fixed inset-0 m-auto flex size-fit items-center gap-2 text-3xl font-bold">
                <AdminLogout action={LogoutAdmin} />
                <Loading />
            </div>
        </CheckAuthentication>
    );
}
