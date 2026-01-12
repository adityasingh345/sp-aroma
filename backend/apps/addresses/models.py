from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime,
    func
)
from config.database import FastModel


class Address(FastModel):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        index=True,
        nullable=False
    )

    full_name = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)

    line1 = Column(String(255), nullable=False)
    line2 = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    pincode = Column(String(10), nullable=False)
    country = Column(String(50), default="India")

    is_default = Column(Boolean, default=False)

    created_at = Column(DateTime, server_default=func.now())
