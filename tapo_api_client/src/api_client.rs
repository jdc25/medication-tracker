use reqwest::Client;
use serde::Deserialize;
use anyhow::{Result, Context};

pub struct APIclient {
    client: Client,
    base_url: String,
    username: String,
    password: String,
    session_token: Option<String>,
}

impl APIclient {
    pub async fn new(base_url: &str, username: &str, password: &str) -> Result<Self> {
        let client = Client::new();
        let api_client = Self {
            client,
            base_url: base_url.to_string(),
            username: username.to_string(),
            password: password.to_string(),
            session_token: None,
        };
        Ok(api_client)
    }

    pub async fn login(&mut self) -> Result<()> {
        let url = format!("{}/login", self.base_url);
        let params = serde_json::json!({
            "username": self.username,
            "password": self.password
        });

        let response = self.client.post(&url)
            .json(&params)
            .send()
            .await
            .context("Failed to send login request")?;

        if response.status().is_success() {
            self.session_token = Some(response.text().await?);
            Ok(())
        } else {
            anyhow::bail!("Invalid login credentials");
        }
    }

    pub async fn get_data(&self, endpoint: &str) -> Result<String> {
        let url = format!("{}/{}", self.base_url, endpoint);
        let response = self.client.get(&url)
            .bearer_auth(self.session_token.clone().unwrap_or_default())
            .send()
            .await
            .context("Failed to send GET request")?;

        if response.status().is_success() {
            let data = response.text().await?;
            Ok(data)
        } else {
            anyhow::bail!("Failed to fetch data");
        }
    }
}