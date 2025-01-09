defmodule CalculatorBackendWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :calculator_backend

  # Use CORSPlug to handle CORS requests
  plug CORSPlug, origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], headers: ["Authorization", "Content-Type", "Accept"]

  # The other plugs
  plug Plug.RequestId
  plug Plug.Logger
  plug Plug.Parsers, parsers: [:json, :urlencoded, :multipart], pass: ["*/*"], json_decoder: Jason
  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, store: :cookie, key: "_calculator_backend_key", signing_salt: "your-signing-salt"
  
  plug CalculatorBackendWeb.Router
end
