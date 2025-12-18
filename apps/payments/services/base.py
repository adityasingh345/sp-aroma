from abc import ABC, abstractmethod

class PaymentProvider(ABC):

    @abstractmethod
    def create_payment(self, order):
        pass

    @abstractmethod
    def verify_payment(self, payload, sig):
        pass
