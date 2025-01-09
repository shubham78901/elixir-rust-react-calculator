defmodule CalculatorBackend.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      CalculatorBackendWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:calculator_backend, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: CalculatorBackend.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: CalculatorBackend.Finch},
      # Start a worker by calling: CalculatorBackend.Worker.start_link(arg)
      # {CalculatorBackend.Worker, arg},
      # Start to serve requests, typically the last entry
      CalculatorBackendWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: CalculatorBackend.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    CalculatorBackendWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
