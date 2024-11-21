# Receipt Processor
A simple receipt processor application that allows users to process receipts and retrieve points (awarded based on predefined rules).

## Features

+ **Submits a receipt for processing**: Generates a unique ID for each receipt and stores it temporarily in memory.
+ **Returns the points awarded for the receipt**: Calculates and returns the points awarded for a specific receipt based on its content.

## Prerequisites 

1. [Install Docker](https://www.docker.com/get-started) if you haven't already.

## How to Set Up the Application

1. Download the `.zip` file and unzip it or run `git clone https://github.com/alexandratai/Receipt-Processor.git` in your terminal. Once downloaded navigate (`cd`) into the project.
2. Build the Docker image: 
    ```bash
   docker build -t receipt-processor .
    ```
3. Run the Docker container to start the app:
    ```bash 
   docker run -p 3000:3000 receipt-processor
    ```

    The application will now be accessible on `http://localhost:3000`.
4. For **Endpoint: Process Receipts**:
    Submit a receipt for processing. This endpoint accepts a JSON payload with receipt data and returns a unique ID for the receipt.

    You can run either of the following commands to pull from the provided example JSON files: 

    ```bash
    curl -X POST -H "Content-Type: application/json" -d @examples/target_example.json http://localhost:3000/receipts/process
    ```

    or

    ```bash
    curl -X POST -H "Content-Type: application/json" -d @examples/mm_example.json http://localhost:3000/receipts/process
    ```

    or pass your own JSON object into the command. Copy the **id** that is returned from this call.

    **Response example**:

    ```bash
    {
    "id": "123e4567-e89b-12d3-a456-426614174000"
    }
    ```


5. For **Endpoint: Get Points**:
    Retrieve the points awarded for a specific receipt using its unique ID.
    
    Run the following command with the **id** you copied from the previous call inputted where it reads `{id}`:

    ```bash
    curl http://localhost:3000/receipts/{id}/points
    ```  

     **Response example**:

    ```bash
    {
    "points": 42
    }
    ```
    
## Examples Directory

The examples directory contains sample JSON files for testing:

+ `target_example.json`: Example receipt from Target.
+ `mm_example.json`: Example receipt from M&M Corner Market.

You can use these files to test the application or create your own JSON files following the schema.

## API Documentation

**Endpoint: Process Receipts**

+ URL: `/receipts/process`
+ Method: `POST`
+ Request Body:

```bash
{
    "retailer": "Target",
    "purchaseDate": "2022-01-01",
    "purchaseTime": "13:01",
    "items": [
        { "shortDescription": "Mountain Dew 12PK", "price": "6.49" },
        { "shortDescription": "Emils Cheese Pizza", "price": "12.25" }
    ],
    "total": "18.74"
}
```

+ Response:

```bash
{
    "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Endpoint: Get Points**

+ URL: `/receipts/{id}/points`
+ Method: `GET`
+ Response:

```bash
{
    "points": 42
}
```

## Limitations

+ Data is stored in memory and will not persist across application restarts.
+ The application requires a valid JSON payload for processing receipts.