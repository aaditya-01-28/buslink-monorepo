from fastapi import FastAPI
from .database import engine, Base
from .routers import driver

# Create Tables automatically (Basic migration)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Buslink API")

# Include our routes
app.include_router(driver.router)

@app.get("/")
def home():
    return {"message": "Buslink FastAPI System Online 🚀"}