from sqlalchemy import Column, Integer, ForeignKey, Numeric, String, DateTime
from sqlalchemy.sql import func
from config.database import FastModel

class Order(FastModel):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    address_id = Column(Integer, ForeignKey("addresses.id"), nullable=False)

    total_amount = Column(Numeric(12, 2), nullable=False)
    currency = Column(String(10), default="INR")

    status = Column(String, default="pending")  
    # pending | paid | failed | cancelled

    created_at = Column(DateTime, server_default=func.now())


class OrderItem(FastModel):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    quantity = Column(Integer, default=1)
    price = Column(Numeric(12, 2), nullable=False)
