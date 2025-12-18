from fastapi import APIRouter, Depends
from apps.orders.services import OrderService
from apps.payments.services.stripe import StripeService
from apps.accounts.dependencies import get_current_user
from apps.payments.webhooks import stripe_webhook


router = APIRouter(prefix="/payments", tags=["Payments"])

@router.post("/checkout")
def checkout(address_id: int, user=Depends(get_current_user)):
    order = OrderService.create_order(user.id, address_id)
    client_secret = StripeService.create_payment_intent(order)
    return {"client_secret": client_secret}


router.post("/webhook")(stripe_webhook)
