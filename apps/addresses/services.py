from sqlalchemy.orm import Session
from apps.addresses.models import Address
from fastapi import HTTPException, status


class AddressService:

    @staticmethod
    def create(db: Session, user_id: int, data: dict):
        if data.get("is_default"):
            db.query(Address).filter(
                Address.user_id == user_id,
                Address.is_default == True
            ).update({"is_default": False})

        address = Address(user_id=user_id, **data)
        db.add(address)
        db.commit()
        db.refresh(address)
        return address

    @staticmethod
    def list(db: Session, user_id: int):
        return db.query(Address).filter(Address.user_id == user_id).all()

    @staticmethod
    def get(db: Session, user_id: int, address_id: int):
        address = db.query(Address).filter(
            Address.id == address_id,
            Address.user_id == user_id
        ).first()

        if not address:
            raise HTTPException(status_code=404, detail="Address not found")
        return address

    @staticmethod
    def update(db: Session, user_id: int, address_id: int, data: dict):
        address = AddressService.get(db, user_id, address_id)

        if data.get("is_default"):
            db.query(Address).filter(
                Address.user_id == user_id,
                Address.is_default == True
            ).update({"is_default": False})

        for key, value in data.items():
            setattr(address, key, value)

        db.commit()
        db.refresh(address)
        return address

    @staticmethod
    def delete(db: Session, user_id: int, address_id: int):
        address = AddressService.get(db, user_id, address_id)
        db.delete(address)
        db.commit()
