import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const BackHeader = ({ backButton, link, title, rightSide, leftSide, backHeaderClass, backHeaderTitleClass }) => {
  return (
    <div className="flex justify-between items-center gap-2 md:gap-5 w-full">
      <div className={`${backHeaderClass} flex  items-center gap-2 md:gap-5 `}>
        {backButton === true && (
          <Link to={link}>
            <div className="flex items-center justify-center border border-secondary hover:border-primary rounded-sm w-6 h-6 cursor-pointer">
              <IoMdArrowRoundBack className="text-primary text-xs md:text-sm" />
            </div>
          </Link>
        )}
        {leftSide && (
          <div
            className="flex items-center justify-center border border-slate-300 rounded-sm w-6 h-6 cursor-pointer"
            onClick={leftSide}
          >
            <IoMdArrowRoundBack className="text-secondary text-xs md:text-sm" />
          </div>
        )}
        <h2 className={`${backHeaderTitleClass ? backHeaderTitleClass : "text-primary"} capitalize text-base md:text-lg xl:text-2xl text-center font-bold`}>
          {title}
        </h2>
      </div>
      {rightSide}
    </div>
  );
};

export default BackHeader;
