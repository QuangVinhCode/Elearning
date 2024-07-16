import React from "react";
import { useParams } from "react-router-dom";
import UserSidebar from "../components/account/user/UserSidebar";
import AccountSettings from "../components/account/user/AccountSettings";
import ChangePassword from "../components/account/user/ChangePassword";
import YourOrders from "../components/account/user/YourOrders";
import EditAccount from "../components/account/user/EditAccount";
import LegalNotice from "../components/account/user/LegalNotice";
import "./UserProfile.css";
const UserProfile = () => {
  const { activepage } = useParams();

  // alert(activepage)
  return (
    <div className="userprofile">
      <div className="userprofilein">
        <div className="left">
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right">
          {activepage === "accountsettings" && <AccountSettings />}
          {activepage === "changepassword" && <ChangePassword />}
          {activepage === "yourorders" && <YourOrders />}
          {activepage === "updateaccount" && <EditAccount />}
          {activepage === "legalnotice" && <LegalNotice />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
