import React from 'react';
import { PanelCommonHeader } from '../Home/FixedHeaderHome';

export const CommonHeaderContainer = ({
  title,
  renderLeft = () => <span />,
  rendeRight: renderRight = () => <span />,
}) => {
  return (
    <nav className="sticky top-0 px-2 border-gray-200 z-10 bg-gradient-to-b from-blue-900 to-slate-900 border-b border-b-slate-800">
      <div className="container flex flex-wrap justify-center items-center mx-auto relative">
        <div className="absolute left-0">{renderLeft()}</div>
        <PanelCommonHeader>
          <h3 className="text-lg font-bold text-slate-200 ">{title}</h3>
        </PanelCommonHeader>
        <div className="absolute right-0">{renderRight()}</div>
      </div>
    </nav>
  );
};
