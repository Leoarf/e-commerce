import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderDetailsHeader } from './OrderDetailsPage/OrderDetailsHeader';
import { OrderProgressSection } from './OrderDetailsPage/OrderProgressSection';
import { OrderItemsSection } from './OrderDetailsPage/OrderItemsSection';
import { OrderTimelineSection } from './OrderDetailsPage/OrderTimelineSection';
import { OrderSummarySection } from './OrderDetailsPage/OrderSummarySection';
import { ShippingInfoSection } from './OrderDetailsPage/ShippingInfoSection';
import { PaymentInfoSection } from './OrderDetailsPage/PaymentInfoSection';
import { OrderDetailsLoading } from './OrderDetailsPage/OrderDetailsLoading';
import { OrderDetailsError } from './OrderDetailsPage/OrderDetailsError';
import { OrderNotFound } from './OrderDetailsPage/OrderNotFound';
import { useOrderDetails } from './OrderDetailsPage/useOrderDetails';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    orderDetails,
    loading,
    error,
    subtotal,
    totalItemsCount,
    shippingCost,
    paymentStatus,
    deliveryStatus,
    orderHeaderStatus,
    formatCurrency,
  } = useOrderDetails(id);

  if (loading) return <OrderDetailsLoading />;
  if (error) return <OrderDetailsError error={error} navigate={navigate} />;
  if (!orderDetails) return <OrderNotFound navigate={navigate} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        <OrderDetailsHeader
          orderDetails={orderDetails}
          orderHeaderStatus={orderHeaderStatus}
          navigate={navigate}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <OrderProgressSection
              paymentStatus={paymentStatus}
              deliveryStatus={deliveryStatus}
            />
            <OrderItemsSection
              orderDetails={orderDetails}
              totalItemsCount={totalItemsCount}
              subtotal={subtotal}
              formatCurrency={formatCurrency}
            />
            <OrderTimelineSection
              orderDetails={orderDetails}
              paymentStatus={paymentStatus}
              deliveryStatus={deliveryStatus}
            />
          </div>
          {/* Right Column - Summary & Info */}
          <div className="space-y-6">
            <OrderSummarySection
              orderDetails={orderDetails}
              subtotal={subtotal}
              totalItemsCount={totalItemsCount}
              shippingCost={shippingCost}
              paymentStatus={paymentStatus}
              formatCurrency={formatCurrency}
            />
            <ShippingInfoSection
              orderDetails={orderDetails}
              deliveryStatus={deliveryStatus}
            />
            <PaymentInfoSection
              orderDetails={orderDetails}
              paymentStatus={paymentStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
