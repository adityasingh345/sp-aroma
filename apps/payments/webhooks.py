import stripe
from fastapi import Request, HTTPException
from config.settings import AppConfig
from apps.payments.models import Payment
from apps.orders.models import Order

config = AppConfig.get_config()

async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig, config.STRIPE_WEBHOOK_SECRET
        )
    except Exception:
        raise HTTPException(status_code=400)

    if event["type"] == "payment_intent.succeeded":
        intent = event["data"]["object"]
        payment = Payment.filter(
            Payment.provider_payment_id == intent.id
        ).first()

        Payment.update(payment.id, status="succeeded")
        Order.update(payment.order_id, status="paid")

    return {"status": "ok"}


