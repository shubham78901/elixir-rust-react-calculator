defmodule CalculatorBackendWeb.CalculatorController do
  use CalculatorBackendWeb, :controller

  def calculate(conn, %{"num1" => num1, "num2" => num2, "operation" => operation}) do
    num1 = String.to_integer(num1)
    num2 = String.to_integer(num2)
    
    result = case operation do
      "multiply" -> num1 * num2
      "add" -> num1 + num2
      "subtract" -> num1 - num2
      "divide" -> num1 / num2
    end

    json(conn, %{result: result})
  rescue
    e in ArgumentError -> 
      conn
      |> put_status(:unprocessable_entity)
      |> json(%{error: "Invalid number format"})
    _ -> 
      conn
      |> put_status(:unprocessable_entity)
      |> json(%{error: "Calculation error"})
  end
end