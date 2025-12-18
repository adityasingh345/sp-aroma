from sqlalchemy import Column, Integer, String, ForeignKey, Numeric, DateTime
from sqlalchemy.sql import func
from config.database import FastModel
from sqlalchemy import UniqueConstraint


class Payment(FastModel):
    __tablename__ = "payments"

    __table_args__ = (
        UniqueConstraint("provider", "provider_payment_id"),
    )

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)

    provider = Column(String)  # stripe | razorpay
    provider_payment_id = Column(String)

    amount = Column(Numeric(12, 2), nullable=False)
    currency = Column(String(10), default="INR")

    status = Column(String)  
    # created | succeeded | failed

    created_at = Column(DateTime, server_default=func.now())
