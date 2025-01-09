use reqwest::Error;
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Serialize, Deserialize)]
struct CalculatorRequest {
    num1: String,
    num2: String,
    operation: String,
}

#[derive(Deserialize)]
struct CalculatorResponse {
    result: f64,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    // Collect command line arguments
    let args: Vec<String> = env::args().collect();

    if args.len() != 4 {
        println!("Usage: rust_cli_calculator <num1> <num2> <operation>");
        return Ok(());
    }

    let num1 = &args[1];
    let num2 = &args[2];
    let operation = &args[3];

    // Prepare the request payload
    let request_payload = CalculatorRequest {
        num1: num1.clone(),
        num2: num2.clone(),
        operation: operation.clone(),
    };

    // Send a POST request to the Elixir backend
    let client = reqwest::Client::new();
    let response = client
        .post("http://localhost:4000/api/calculate")
        .json(&request_payload)
        .send()
        .await?;

    // Check if the response is successful
    if response.status().is_success() {
        let response_body: CalculatorResponse = response.json().await?;
        println!("Result: {}", response_body.result);
    } else {
        println!("Error: Failed to calculate. Status: {}", response.status());
    }

    Ok(())
}
