import React from 'react';

export const OrderProgressSection = ({ paymentStatus, deliveryStatus }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Progress</h2>
      <div className="space-y-8">
        {/* Payment Status */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${paymentStatus.bgColor}`}>
                <span className={paymentStatus.iconColor}>
                  {paymentStatus.icon}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {paymentStatus.statusText}
                </h3>
                <p className="text-sm text-gray-500">
                  {paymentStatus.description}
                </p>
              </div>
            </div>
            <span className={`font-semibold ${paymentStatus.textColor}`}>
              {paymentStatus.text}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${paymentStatus.progressColor} transition-all duration-500`}
              style={{ width: paymentStatus.progressWidth }}
            ></div>
          </div>
        </div>
        {/* Delivery Status */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${deliveryStatus.bgColor}`}>
                <span className={deliveryStatus.iconColor}>
                  {deliveryStatus.icon}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {deliveryStatus.statusText}
                </h3>
                <p className="text-sm text-gray-500">
                  {deliveryStatus.description}
                </p>
              </div>
            </div>
            <span className={`font-semibold ${deliveryStatus.textColor}`}>
              {deliveryStatus.text}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${deliveryStatus.progressColor} transition-all duration-500`}
              style={{ width: deliveryStatus.progressWidth }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
