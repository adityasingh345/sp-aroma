from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from apps.addresses.schemas import (
    CreateAddressIn,
    UpdateAddressIn,
    AddressOut,
    ListAddressOut
)
from apps.addresses.services import AddressService
from apps.accounts.dependencies import get_current_user
from config.database import get_db

router = APIRouter(
    prefix="/addresses",
    tags=["Addresses"]
)


@router.post("/", response_model=AddressOut, status_code=status.HTTP_201_CREATED)
def create_address(
    payload: CreateAddressIn,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return AddressService.create(db, user.id, payload.model_dump())


@router.get("/", response_model=ListAddressOut)
def list_addresses(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    addresses = AddressService.list(db, user.id)
    return {"addresses": addresses}


@router.get("/{address_id}", response_model=AddressOut)
def get_address(
    address_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return AddressService.get(db, user.id, address_id)


@router.put("/{address_id}", response_model=AddressOut)
def update_address(
    address_id: int,
    payload: UpdateAddressIn,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return AddressService.update(
        db, user.id, address_id,
        payload.model_dump(exclude_unset=True)
    )


@router.delete("/{address_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_address(
    address_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    AddressService.delete(db, user.id, address_id)
