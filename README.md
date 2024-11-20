# Receipt-Processor

---

## How to Set Up the Application

1. Download the `.zip` file and unzip it or run `git clone https://github.com/alexandratai/Receipt-Processor.git` in your terminal.
2. [Install Docker](https://www.docker.com/get-started) if you haven't already.
3. Build the Docker image: 
    ```bash
   docker build -t receipt-processor .
    ```
4. Run the Docker container:
    ```bash 
   docker run -p 3000:3000 receipt-processor
    ```
5. For **Endpoint: Process Receipts**, run either of the following:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d @examples/target_example.json http://localhost:3000/receipts/process
    ```

    or

    ```bash
    curl -X POST -H "Content-Type: application/json" -d @examples/mm_example.json http://localhost:3000/receipts/process
    ```

    or pass your own JSON object into the command. Copy the **id** that is returned from this call.

6. For **Endpoint: Get Points**, run the following with the **id** you copied from the previous call inputted where it reads `{id}`:

    ```bash
    curl http://localhost:3000/receipts/{id}/points
    ```  