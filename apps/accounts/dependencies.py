from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from apps.accounts.models import User
from apps.accounts.services.token import TokenService

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/accounts/login")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    try:
        user = await TokenService.fetch_user(token)
        return user
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )


async def require_superuser(
    current_user: User = Depends(get_current_user),
) -> User:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Superuser privileges required",
        )
    return current_user
