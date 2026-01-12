from pydantic import BaseModel
from typing import Optional, List


class AddressBase(BaseModel):
    full_name: str
    phone: str
    line1: str
    line2: Optional[str] = None
    city: str
    state: str
    pincode: str
    country: str = "India"
    is_default: bool = False


class CreateAddressIn(AddressBase):
    pass


class UpdateAddressIn(BaseModel):
    full_name: Optional[str]
    phone: Optional[str]
    line1: Optional[str]
    line2: Optional[str]
    city: Optional[str]
    state: Optional[str]
    pincode: Optional[str]
    country: Optional[str]
    is_default: Optional[bool]


class AddressOut(AddressBase):
    id: int

    class Config:
        from_attributes = True


class ListAddressOut(BaseModel):
    addresses: List[AddressOut]
