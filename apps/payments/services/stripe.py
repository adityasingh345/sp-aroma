import stripe
from config.settings import AppConfig
from apps.payments.models import Payment

config = AppConfig.get_config()
stripe.api_key = config.STRIPE_SECRET_KEY

class StripeService:

    @staticmethod
    def create_payment_intent(order):
        intent = stripe.PaymentIntent.create(
            amount=int(order.total_amount * 100),  # INR → paise
            currency=order.currency.lower(),
            metadata={"order_id": order.id}
        )

        Payment.create(
            order_id=order.id,
            provider="stripe",
            provider_payment_id=intent.id,
            amount=order.total_amount,
            status="created"
        )

        return intent.client_secret
