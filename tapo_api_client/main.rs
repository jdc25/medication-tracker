mod api_client;

#[tokio::main]
async fn main() {
    let base_url = "https://your-api-url.com";
    let username = "your_username";
    let password = "your_password";

    let mut client = match api_client::APIclient::new(base_url, username, password).await {
        Ok(client) => client,
        Err(e) => {
            eprintln!("Failed to create API client: {}", e);
            return;
        },
    };

    if let Err(e) = client.login().await {
        eprintln!("Login failed: {}", e);
        return;
    }

    match client.get_data("some-endpoint").await {
        Ok(data) => println!("Received data: {}", data),
        Err(e) => eprintln!("Failed to fetch data: {}", e),
    }
}