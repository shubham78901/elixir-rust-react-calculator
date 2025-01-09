defmodule CalculatorBackendWeb.Router do
  use CalculatorBackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_flash
    plug :put_secure_browser_headers
  end

  scope "/api", CalculatorBackendWeb do
    pipe_through :api

    # Handle POST requests for /api/calculate
    post "/calculate", CalculatorController, :calculate

    # Handle OPTIONS preflight requests for /api/calculate
    options "/calculate", CalculatorController, :options
  end
end
