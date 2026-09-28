from pydantic import BaseModel
from typing import Generic, TypeVar

T = TypeVar("T")
class Success(BaseModel, Generic[T]):
    success: bool = True
    data: T
