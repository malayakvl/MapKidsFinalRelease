import React from "react";
import Image from "next/image";
import Link from "next/link";

const UserDropdown = () => {
  return (
    <>
      <div className="items-center flex">
        <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Link href="/profile">
            <Image
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/images/profile.png"
              width="48"
              height="48"
              alt=""
            />
          </Link>
        </span>
      </div>
    </>
  );
};

export default UserDropdown;
