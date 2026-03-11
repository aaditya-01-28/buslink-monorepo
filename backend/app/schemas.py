from pydantic import BaseModel

# Input Schema: What the Driver App sends us
class TripStartRequest(BaseModel):
    bus_id: int
    route_id: int
    driver_id: int

# Output Schema: What we send back
class TripResponse(BaseModel):
    message: str
    trip_id: int
    status: str